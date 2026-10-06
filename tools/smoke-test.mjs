// Prueba de humo: sirve dist/ y abre la galería y las 22 páginas en Chrome.
// Falla si alguna página tiene errores de JavaScript, errores de consola propios o se queda sin secciones.
// Uso: npm run build && node tools/smoke-test.mjs
//   En CI usa el Chrome que descarga `puppeteer`; en local se puede pasar CHROME_PATH para usar el Chrome instalado.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const dist = path.resolve("dist");
const pages = fs.readdirSync(path.join(dist, "pages")).filter((f) => f.endsWith(".html"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2" };

// Servidor estático mínimo (404 reales, sin "fallback" a index.html, para detectar rutas rotas)
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(dist, url.endsWith("/") ? url + "index.html" : url);
  if (!file.startsWith(dist) || !fs.existsSync(file)) {
    res.writeHead(404).end("not found");
    return;
  }
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const puppeteer = (await import(process.env.CHROME_PATH ? "puppeteer-core" : "puppeteer")).default;
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || undefined, headless: "new", args: ["--no-sandbox"] });

let failed = 0;
async function check(url, { expectSections }) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const errors = [];
  page.on("pageerror", (e) => errors.push("JS: " + e.message.slice(0, 200)));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const t = m.text();
    // recursos externos (picsum, CDN de las librerías) pueden fallar por red: no son errores de la galería
    if (t.startsWith("Failed to load resource")) return;
    errors.push("console: " + t.slice(0, 200));
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(base)) errors.push(`${r.status()} ${r.url().replace(base, "")}`);
  });
  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await new Promise((r) => setTimeout(r, 1500));
    if (expectSections) {
      const n = await page.evaluate(() => document.querySelectorAll("[data-section]").length);
      const boundary = await page.evaluate(() => document.body.innerText.includes("Error al renderizar"));
      if (n === 0) errors.push("la página no tiene secciones");
      if (boundary) errors.push("una sección mostró «Error al renderizar»");
    }
  } catch (e) {
    errors.push("carga: " + e.message.slice(0, 200));
  }
  await page.close();
  const name = url.replace(base, "") || "/";
  if (errors.length) {
    failed++;
    console.log(`✗ ${name}\n  - ${errors.join("\n  - ")}`);
  } else console.log(`✓ ${name}`);
}

await check(base + "/", { expectSections: false });
for (const p of pages) await check(`${base}/pages/${p}`, { expectSections: true });

await browser.close();
server.close();
console.log(`\n${pages.length + 1 - failed}/${pages.length + 1} páginas sin errores`);
process.exit(failed ? 1 : 0);
