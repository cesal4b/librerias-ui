import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

// Una página HTML por librería (pages/<id>.html), cada una con su propio CSS,
// para que los estilos globales de una librería no contaminen a las demás.
const pages = Object.fromEntries(
  fs
    .readdirSync(path.resolve(__dirname, "pages"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => [f.replace(".html", ""), path.resolve(__dirname, "pages", f)]),
);

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Los bloques de registros vienen escritos para Next.js
      "next/link": path.resolve(__dirname, "src/shared/next-link.tsx"),
      "next/image": path.resolve(__dirname, "src/shared/next-image.tsx"),
    },
  },
  build: {
    chunkSizeWarningLimit: 4000,
    rollupOptions: { input: { index: path.resolve(__dirname, "index.html"), ...pages } },
  },
});
