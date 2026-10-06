import type { Library } from "./libraries";

// Datos para armar la instrucción completa de vibe coding de cada librería.
// docs: qué darle a la IA (llms.txt / MCP verificados el 2026-10-06). antiGeneric: cómo evitar el look por defecto.
const extras: Record<string, { docs: string[]; antiGeneric: string }> = {
  untitledui: {
    docs: ["Documentación para la IA: https://www.untitledui.com/llms.txt"],
    antiGeneric: "Cambia el color de marca (brand) en styles/theme.css y usa los FeaturedIcon en tema «modern»; evita el morado por defecto.",
  },
  fragments: {
    docs: ["MCP y CLI: npx @usefragments/cli", "Documentación para la IA: https://usefragments.com/llms.txt", "Bloques listos: fragments.json dentro del paquete"],
    antiGeneric: "Define las semillas del tema en SCSS ($fui-brand, $fui-neutral, $fui-radius-style) antes de construir.",
  },
  shadcn: {
    docs: ["MCP: npx shadcn@latest mcp init", "Documentación para la IA: https://ui.shadcn.com/llms.txt"],
    antiGeneric: "Es el look más visto de todos: cambia --primary, --radius y la tipografía en el CSS, y no uses el gris neutro por defecto.",
  },
  kibo: {
    docs: ["Se instala con el CLI de shadcn: npx shadcn@latest add @kibo-ui/<componente>"],
    antiGeneric: "Apóyate en sus componentes poco comunes (Deck, Reel, Banner) y personaliza el tema shadcn de base.",
  },
  alignui: {
    docs: ["Starter gratuito: github.com/alignui/alignui-nextjs-typescript-starter", "No tiene llms.txt ni MCP: pásale a la IA los archivos de components/ui que vaya a usar."],
    antiGeneric: "Respeta su escala tipográfica (text-title-h1…h6, text-paragraph-*) y sus sombras; cambia solo el color primario.",
  },
  magicui: {
    docs: ["MCP: npx @magicuidesign/mcp@latest", "Documentación para la IA: https://magicui.design/llms.txt"],
    antiGeneric: "Máximo 2 efectos por página (por ejemplo marquee y border-beam). Abusar de aurora, shimmer y bento es lo que hace ver un sitio «hecho con IA».",
  },
  heroui: {
    docs: ["MCP: @heroui/react-mcp", "Documentación para la IA: https://heroui.com/react/llms.txt", "Aclárale que es la v3: los modelos tienden a escribir código de la v2 (NextUI)."],
    antiGeneric: "Cambia el color accent del tema y usa las variantes secondary y tertiary de Card y Button para dar jerarquía.",
  },
  shadcnblocks: {
    docs: ["Se instala con el CLI de shadcn: npx shadcn@latest add @shadcnblocks/<bloque>", "Catálogo: https://www.shadcnblocks.com"],
    antiGeneric: "Los bloques usan el tema shadcn por defecto: define tu paleta, radio y tipografía antes de agregarlos.",
  },
  tailwindplus: {
    docs: ["Requiere licencia: pega en el chat el código del bloque que compraste.", "Para la interactividad usa Headless UI: https://headlessui.com"],
    antiGeneric: "Cambia el indigo-600 por tu color de marca y reemplaza las ilustraciones de ejemplo.",
  },
  mantine: {
    docs: ["MCP: @mantine/mcp-server", "Documentación para la IA: https://mantine.dev/llms.txt", "Bloques gratuitos: https://ui.mantine.dev"],
    antiGeneric: "Define primaryColor y la fuente en createTheme(); no mezcles con Tailwind.",
  },
  mui: {
    docs: ["MCP: @mui/mcp", "Documentación para la IA: https://mui.com/material-ui/llms.txt", "Plantilla de partida: «Marketing page» en mui.com/material-ui/getting-started/templates"],
    antiGeneric: "Crea un tema propio con createTheme (paleta, tipografía, shape.borderRadius); sin él se ve «Google».",
  },
  tailark: {
    docs: ["Kits gratuitos (MIT): github.com/tailark/blocks", "Bloques PRO por CLI: npx shadcn@latest add @tailark/<bloque>"],
    antiGeneric: "Elige un solo kit (Veil es el más distinto) y no mezcles bloques de kits diferentes.",
  },
  coss: {
    docs: ["Se instala con el CLI de shadcn: npx shadcn@latest add @coss/ui", "Documentación para la IA: https://coss.com/ui/llms.txt"],
    antiGeneric: "Usa su componente Frame para paneles destacados y cambia el color --primary.",
  },
  smoothui: {
    docs: ["Se instala con el CLI de shadcn: npx shadcn@latest add @smoothui/<componente>", "Documentación para la IA: https://smoothui.dev/llms.txt"],
    antiGeneric: "Usa una o dos microinteracciones protagonistas (coverflow, navbar flotante), no todas.",
  },
  basecn: {
    docs: ["Se instala con el CLI de shadcn: npx shadcn@latest add @basecn/<componente>", "Documentación para la IA: https://basecn.dev/llms.txt"],
    antiGeneric: "Se ve igual que shadcn: personaliza el tema sí o sí.",
  },
  "blocks-so": {
    docs: ["Se instala con el CLI de shadcn: npx shadcn@latest add @blocks-so/<bloque>"],
    antiGeneric: "Úsala solo para pantallas internas (login, métricas, tablas), no para la landing.",
  },
  baseui: {
    docs: ["Documentación para la IA: https://base-ui.com/llms.txt", "No trae estilos: pásale a la IA tu guía visual (paleta, tipografía, radios, sombras)."],
    antiGeneric: "Al no tener estilos, es la mejor opción para una identidad 100 % propia: define la guía visual antes de pedir componentes.",
  },
  "react-aria": {
    docs: ["MCP: @react-aria/mcp", "Documentación para la IA: https://react-aria.adobe.com/llms.txt", "Kit de arranque: npx shadcn@latest add @react-aria/tailwind-<componente>"],
    antiGeneric: "El kit de arranque es una base neutra: cambia colores y radios en sus archivos según tu guía visual.",
  },
  flowbite: {
    docs: ["MCP: flowbite-mcp", "Documentación: https://flowbite-react.com"],
    antiGeneric: "Cambia el azul por defecto (primary) en la configuración del tema y evita el look de plantilla.",
  },
  "21st": {
    docs: ["MCP y CLI: npx @21st-dev/cli@latest init --client <cursor|claude|codex|vscode>", "Requiere API key (gratis con límite diario): https://21st.dev/mcp", "Documentación para la IA: https://21st.dev/llms.txt"],
    antiGeneric: "Cura los componentes: revisa la licencia (que sea MIT) y adapta cada uno a la misma paleta para que no parezca un collage.",
  },
  daisyui: {
    docs: ["Documentación para la IA: https://daisyui.com/llms.txt"],
    antiGeneric: "Elige un tema con personalidad (retro, nord, caramellatte…) o crea uno propio con la paleta de marca.",
  },
  tailkits: {
    docs: ["Componentes gratuitos (HTML): github.com/tailkits/tailkits-ui", "Tiene integración MCP: ver https://tailkits.com/ui"],
    antiGeneric: "Convierte el HTML a componentes y cambia los degradados de fondo por los colores de marca.",
  },
};

/** Instrucción completa para pegar en Lovable, v0, Cursor o Claude Code */
export function buildInstruction(lib: Library): string {
  const x = extras[lib.id];
  return [
    `Vas a construir un micrositio con ${lib.name} (${lib.stack}).`,
    ``,
    `1. Instalación`,
    `   ${lib.install}`,
    ``,
    `2. Reglas`,
    `   - ${lib.prompt}`,
    `   - Usa los componentes de ${lib.name} para todo; no mezcles con otra librería de componentes.`,
    `   - ${x?.antiGeneric ?? "Personaliza el tema antes de construir."}`,
    ``,
    `3. Documentación que debes consultar`,
    ...(x?.docs ?? []).map((d) => `   - ${d}`),
    ``,
    `4. Estructura`,
    `   - Secciones: barra de navegación, hero, features, tarjetas, galería/carrusel y footer.`,
    `   - Antes de escribir código, propón la paleta, la tipografía y el radio de bordes, y espera mi aprobación.`,
  ].join("\n");
}
