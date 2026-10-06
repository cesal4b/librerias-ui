// Descarga componentes de un registro shadcn (y sus dependencias) dentro de src/libs/<lib>/
// Uso: node tools/fetch-registry.mjs <lib> <url-con-{name}> <item> [item...]
// Reescribe los imports "@/components/ui/..." etc. para que apunten a la carpeta de esa librería,
// así cada librería conserva su propia versión de button, card, etc.
import fs from "node:fs";
import path from "node:path";

const [lib, template, ...items] = process.argv.slice(2);
const SHADCN = "https://ui.shadcn.com/r/styles/new-york-v4/{name}.json";
const root = path.resolve("src/libs", lib);
const registries = Object.fromEntries(
  (await (await fetch("https://ui.shadcn.com/r/registries.json")).json()).map((r) => [r.name, r.url]),
);

const seen = new Set();
const deps = new Set();
const css = [];

function urlFor(name, preferOwn) {
  if (name.startsWith("http")) return [name];
  const ns = name.match(/^(@[^/]+)\/(.+)$/);
  if (ns) {
    const t = registries[ns[1]];
    if (!t) throw new Error("Registro desconocido " + ns[1]);
    return [t.replace("{name}", ns[2]).replace("{style}", "default")];
  }
  const own = template.replace("{name}", name);
  const base = SHADCN.replace("{name}", name);
  return preferOwn ? [own, base] : [base];
}

async function getItem(name, preferOwn = true) {
  for (const u of urlFor(name, preferOwn)) {
    const r = await fetch(u, { headers: { "user-agent": "Mozilla/5.0" } });
    if (r.ok) return { item: await r.json(), from: u };
  }
  throw new Error("No se pudo descargar " + name);
}

function folderFor(type) {
  if (type === "registry:ui") return "ui";
  if (type === "registry:lib") return "lib";
  if (type === "registry:hook") return "hooks";
  return "blocks";
}

function rewrite(src) {
  return src
    .replace(/(["'])@\/lib\/utils\1/g, "$1@/shared/utils$1")
    .replace(/from (["'])cn\1/g, 'from "@/shared/utils"')
    .replace(/(["'])@\/(?:registry\/[^"']*?\/)?components\/ui\//g, `$1@/libs/${lib}/ui/`)
    .replace(/(["'])@\/(?:registry\/[^"']*?\/)?ui\//g, `$1@/libs/${lib}/ui/`)
    .replace(/(["'])@\/(?:registry\/[^"']*?\/)?hooks\//g, `$1@/libs/${lib}/hooks/`)
    .replace(/(["'])@\/(?:registry\/[^"']*?\/)?lib\//g, `$1@/libs/${lib}/lib/`)
    .replace(/(["'])@\/(?:registry\/[^"']*?\/)?components\//g, `$1@/libs/${lib}/blocks/`)
    .replace(/^["']use client["'];?\s*\n/m, "");
}

async function add(name, preferOwn = true) {
  const key = name;
  if (seen.has(key)) return;
  seen.add(key);
  const { item, from } = await getItem(name, preferOwn);
  console.log("✓", name, "←", from);
  (item.dependencies || []).forEach((d) => deps.add(d));
  if (item.css || item.cssVars) css.push({ name, css: item.css, cssVars: item.cssVars });
  for (const f of item.files || []) {
    if (!f.content) continue;
    const parts = (f.target || f.path).split("/");
    const base = parts.at(-1);
    // Componentes publicados como <nombre>/index.tsx conservan su carpeta para no pisarse entre sí
    let rel = base.startsWith("index.") ? path.join(folderFor(f.type), parts.at(-2), base) : path.join(folderFor(f.type), base);
    if (f.type === "registry:lib" && base.startsWith("utils.")) continue; // usamos src/shared/utils
    const out = path.join(root, rel);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, rewrite(f.content));
  }
  // Dependencias del mismo registro primero; si no existen ahí, del registro base de shadcn.
  const ownIsShadcn = template === SHADCN;
  for (const d of item.registryDependencies || []) {
    if (d === "utils") continue;
    await add(d, !ownIsShadcn && !from.startsWith("https://ui.shadcn.com"));
  }
}

for (const it of items) {
  try {
    await add(it);
  } catch (e) {
    console.log("✗", it, "—", e.message, "(¿de pago o no existe?)");
  }
}
if (css.length) {
  fs.writeFileSync(path.join(root, "_registry-css.json"), JSON.stringify(css, null, 2));
  // Convierte css/cssVars del registro a un archivo que el styles.css de la librería importa
  const block = (obj, indent = "") =>
    Object.entries(obj)
      .map(([k, v]) =>
        typeof v === "object"
          ? Object.keys(v).length === 0 && k.startsWith("@")
            ? `${indent}${k};\n` // p. ej. @plugin "x" {} → @plugin "x";
            : `${indent}${k} {\n${block(v, indent + "  ")}${indent}}\n`
          : `${indent}${k}: ${v};\n`,
      )
      .join("");
  const vars = (o) => Object.entries(o || {}).map(([k, v]) => `  --${k}: ${v};\n`).join("");
  let out = "/* Generado por tools/fetch-registry.mjs a partir del css/cssVars del registro */\n";
  for (const c of css) {
    if (c.cssVars?.theme) out += `@theme inline {\n${vars(c.cssVars.theme)}}\n`;
    if (c.cssVars?.light) out += `:root {\n${vars(c.cssVars.light)}}\n`;
    if (c.cssVars?.dark) out += `.dark {\n${vars(c.cssVars.dark)}}\n`;
    if (c.css) out += block(c.css);
  }
  // varios componentes repiten las mismas directivas: se escriben una sola vez
  const seenRule = new Set();
  out = out.replace(/^@(plugin|import) [^\n]+;\n/gm, (m) => (seenRule.has(m) ? "" : (seenRule.add(m), m)));
  fs.writeFileSync(path.join(root, "_registry.css"), out);
}
console.log("\nnpm deps:", [...deps].join(" ") || "(ninguna)");
