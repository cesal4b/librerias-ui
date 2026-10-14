// Compatibilidad con Claude Artifacts: una sola página HTML, sin paso de build ni "npm install".
// Solo se permite traer código desde unos pocos CDN (cdnjs, jsdelivr /npm/, unpkg, el Play CDN de Tailwind)
// y hojas de estilo desde Google Fonts; todo lo demás va en línea en el propio HTML.
// Verificado el 2026-10-14 contra la documentación/stack de cada librería (no es un dato oficial de Anthropic).

export type ArtifactLevel = "Sí" | "Parcial" | "No";

export const artifactCompat: Record<string, { level: ArtifactLevel; why: string }> = {
  untitledui: {
    level: "Parcial",
    why: "Sus componentes (React Aria + Tailwind v4) no tienen un paquete listo para CDN. Se puede imitar el look a mano con el Play CDN de Tailwind y sus mismos tokens de color, pero no es el componente real ni su CLI.",
  },
  fragments: {
    level: "No",
    why: "Sus tokens se compilan desde SCSS (Sass). Un Artifact no tiene paso de build, así que no hay forma de generar ese CSS sin compilarlo antes en otro lado.",
  },
  shadcn: {
    level: "Parcial",
    why: "Radix UI (de donde viene shadcn) es JS puro y sí se puede traer vía `cdn.jsdelivr.net/npm/<paquete>+esm`, pero el tema de shadcn depende de utilidades y variables de Tailwind v4 que compila Vite. En un Artifact se recrea a mano con el Play CDN (basado en v3), no es una instalación real.",
  },
  kibo: {
    level: "Parcial",
    why: "Misma base técnica que shadcn/ui. Su Marquee sí es portable (usa `motion`, con build ESM en jsdelivr), pero Deck y Reel dependen del tema shadcn compilado.",
  },
  alignui: {
    level: "Parcial",
    why: "Usa Tailwind v3 con `tailwind.config.ts`, y el Play CDN de Tailwind sí acepta un `tailwind.config` declarado en línea, así que sus tokens son más fáciles de aproximar que los de una librería en Tailwind v4. Aun así, sus componentes (Button.Root, FancyButton.Root…) no tienen paquete CDN: se recrean a mano.",
  },
  magicui: {
    level: "Parcial",
    why: "Sus efectos corren sobre `motion`, que sí tiene build ESM cargable por CDN (de las animaciones más portables de la lista), pero la base es el tema shadcn compilado con Tailwind v4: el resultado final hay que recrearlo a mano.",
  },
  heroui: {
    level: "No",
    why: "No publica bundle para CDN y su sistema de temas (v3) no es solo clases de Tailwind: requiere su paquete @heroui/styles procesado en build.",
  },
  shadcnblocks: {
    level: "Parcial",
    why: "Misma base técnica que shadcn/ui: los bloques se recrean a mano con el Play CDN, no se instalan tal cual.",
  },
  tailwindplus: {
    level: "Parcial",
    why: "Headless UI y Heroicons son paquetes livianos sin build pesado, así que el patrón se puede reproducir a mano con el Play CDN. El bloque real de pago, de todas formas, no se puede usar fuera de un proyecto licenciado.",
  },
  mantine: {
    level: "No",
    why: "Sus componentes usan CSS Modules, que necesitan un bundler para generar las clases. Sin paso de build no hay forma de traer su CSS real.",
  },
  mui: {
    level: "No",
    why: "MUI quitó su bundle UMD desde la v6 (siguiendo a React 19) y su propia guía recomienda esm.sh para usarlo sin build — un dominio que Claude Artifacts no tiene en su lista blanca de scripts. Además Emotion (su motor de estilos) añade una cadena de dependencias pesada para auto-empaquetar.",
  },
  tailark: {
    level: "Parcial",
    why: "Registro shadcn (Radix o Base UI, según el kit) sobre Tailwind v4 compilado: misma situación que shadcn/ui, se recrea a mano.",
  },
  coss: {
    level: "Parcial",
    why: "Base UI + Tailwind v4 compilado: igual que shadcn/ui, el Frame y los demás componentes se recrean a mano con el Play CDN.",
  },
  smoothui: {
    level: "Parcial",
    why: "Registro shadcn + `motion` (esta última sí portable vía CDN), pero el tema base sigue dependiendo de Tailwind v4 compilado.",
  },
  basecn: {
    level: "Parcial",
    why: "Misma base técnica que shadcn/ui (Base UI en vez de Radix); se ve igual y tiene la misma limitación: Tailwind v4 compilado por Vite.",
  },
  "blocks-so": {
    level: "Parcial",
    why: "Registro shadcn sobre Tailwind v4 compilado: se recrea a mano, como el resto de la familia shadcn.",
  },
  baseui: {
    level: "Parcial",
    why: "Es headless: no trae CSS propio, así que no choca con ningún paso de build de estilos (tú defines todo con el Play CDN). Sus paquetes en teoría se pueden traer vía `+esm` de jsdelivr, pero sin probarlo en vivo dentro de un Artifact no se puede asegurar al 100 %.",
  },
  "react-aria": {
    level: "Parcial",
    why: "Igual que Base UI: headless, sin CSS propio, se estiliza con el Play CDN. Su kit de Tailwind se recrea a mano; el paquete real no está verificado como cargable en un Artifact.",
  },
  flowbite: {
    level: "Parcial",
    why: "`flowbite-react` no tiene bundle CDN, pero Flowbite (la versión sin React) sí se instala clásicamente con un script + Tailwind, así que la estética es de las más fáciles de aproximar a mano aunque no sea el paquete React real.",
  },
  "21st": {
    level: "No",
    why: "El directorio vive embebido en el CDN propio de 21st.dev (cdn.21st.dev), que no está en la lista blanca de Claude Artifacts. Se podría copiar a mano el código de un componente puntual (si su licencia lo permite), pero no el directorio como tal.",
  },
  daisyui: {
    level: "Sí",
    why: "daisyUI publica una ruta CDN oficial: su CSS en `cdn.jsdelivr.net/npm/daisyui@5` + el script `@tailwindcss/browser` (ambos dominios permitidos). El único ajuste: un Artifact solo permite hojas de estilo desde Google Fonts, así que el CSS de daisyUI se trae con un `<script>` que lo descarga e inyecta como `<style>`, en vez de un `<link>` directo.",
  },
  tailkits: {
    level: "Sí",
    why: "Es HTML y Tailwind puro, sin JavaScript: de las más fáciles de pegar casi literal en un Artifact con el Play CDN. Eso sí, como ya advierte su ficha, no trae el menú móvil con JS: hay que armarlo aparte.",
  },
};
