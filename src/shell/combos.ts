// Combos: Framework UI + librería de interacciones/transiciones, ya armados sobre las mismas
// secciones que el resto de la galería (hero, features, cards, galería). Cada uno es una mini
// página de aterrizaje completa en pages/<id>.html, igual que una librería.
import type { Price } from "./libraries";

export type Combo = {
  id: string; // = pages/<id>.html
  name: string;
  /** id de Library base (./libraries.ts), o "remix" si mezcla varias al azar (ver ComboView en App.tsx) */
  framework: string;
  interaction: { name: string; url: string; price: Price };
  description: string;
  /** Qué lo hace atractivo y cuándo conviene */
  why: string;
  install: string;
  prompt: string;
};

export const combos: Combo[] = [
  {
    id: "combo-shadcn-motion",
    name: "shadcn/ui + Motion",
    framework: "shadcn",
    interaction: { name: "Motion (antes Framer Motion)", url: "https://motion.dev", price: "Gratis" },
    description:
      "El stack más estándar de vibe coding (shadcn/ui) con Motion encima, solo en hero, features, cards y galería: stagger de entrada y parallax de fondo en el hero, aparición escalonada de las features al hacer scroll, hover-lift y animación de layout en las cards (botón «Más popular primero»), y un fundido/escala según el slide activo en la galería.",
    why: "Es el combo más seguro para empezar: no cambia la base (shadcn sigue siendo el look de referencia), así que sirve para medir cuánto levanta la percepción de «hecho a mano» solo con movimiento, sin tocar componentes ni tema.",
    install: "npx shadcn@latest init  →  npm i motion",
    prompt:
      "Usa shadcn/ui tal como lo instalarías normalmente, pero envuelve el hero, las features, las cards y la galería con Motion (`import { motion } from \"motion/react\"`): stagger fade-in en el hero, whileInView con stagger en las features, whileHover + layout en las cards, y una transición de opacidad/escala en el carrusel según el slide activo. No animes la barra de navegación ni el footer.",
  },
  {
    id: "combo-tailark-gsap",
    name: "Tailark (kit Veil) + GSAP",
    framework: "tailark",
    interaction: { name: "GSAP (ScrollTrigger + SplitText)", url: "https://gsap.com", price: "Gratis" },
    description:
      "El kit Veil de Tailark (serif cálida, tonos crema) con GSAP: el hero revela el título letra por letra al cargar (SplitText) con una entrada en timeline; features y testimonios aparecen con ScrollTrigger (los testimonios se enfocan progresivamente con scrub, ligados al scroll); el logo cloud entra en abanico y reacciona al pasar el mouse.",
    why: "Tailark ya es de los look más distintivos de la galería (poco visto en sitios hechos con IA); GSAP le suma el tipo de movimiento cinematográfico que normalmente solo se ve en sitios hechos a mano, no en los genéricos de IA.",
    install: "Copiar el kit Veil de github.com/tailark/blocks (gratis)  →  npm i gsap",
    prompt:
      "Usa los bloques del kit Veil de Tailark como base. Para el movimiento, usa GSAP (`gsap`, con `gsap/ScrollTrigger` y `gsap/SplitText`, ambos gratis desde la licencia actual de GSAP): el título del hero se revela letra por letra al cargar, features y testimonios aparecen con ScrollTrigger al hacer scroll (los testimonios con scrub, para que se enfoquen progresivamente), y el logo cloud entra en abanico. No mezcles con otro kit de Tailark ni con otra librería de animación.",
  },
  {
    id: "combo-remix",
    name: "Remix aleatorio (familia shadcn)",
    framework: "remix",
    interaction: { name: "Motion (fundido al mezclar)", url: "https://motion.dev", price: "Gratis" },
    description:
      "Mezcla, al azar por sección, componentes oficiales de 4 librerías que comparten el mismo tema (ShadcnBlocks, Smooth UI, Kibo UI y Magic UI): hero y features eligen entre 2 librerías, cards y galería entre otras 2 (16 combinaciones posibles). El botón «Mezclar» vuelve a tirar los dados con un fundido suave. La barra de navegación y el footer no se mezclan, para que el marco se mantenga estable.",
    why: "Responde directo a la duda de cómo saber de qué librería sale cada pieza: cada sección trae su propia etiqueta con el nombre de la librería elegida. Como las 4 comparten el mismo tema de colores (shadcn-theme.css), se pueden combinar sin que los estilos choquen entre sí, cosa que no es segura con cualquier librería de la galería (ver DOCUMENTACION §10).",
    install: "Cada librería se instala por separado con el CLI de shadcn (@shadcnblocks, @kibo-ui, @magicui) o copiando su bloque (Smooth UI)",
    prompt:
      "Arma la landing combinando bloques de ShadcnBlocks, Smooth UI, Kibo UI y Magic UI (todas sobre el mismo tema shadcn, para que no choquen los colores): elige un hero, un bloque de features, uno de cards y uno de galería, cada uno de una librería distinta si quieres variedad, o de la misma si prefieres consistencia. No mezcles con librerías que traigan su propio reset de CSS (Mantine, MUI, daisyUI, HeroUI, Flowbite): esas sí pueden chocar con las demás.",
  },
  {
    id: "combo-daisyui-autoanimate",
    name: "daisyUI + Auto-Animate",
    framework: "daisyui",
    interaction: { name: "Auto-Animate (@formkit/auto-animate)", url: "https://auto-animate.formkit.com", price: "Gratis" },
    description:
      "daisyUI con el tema «retro» y Auto-Animate en features, cards y galería: un filtro por categoría en features, un botón «Más popular primero» en cards y un botón «Mezclar orden» en la galería, los tres reordenan sus tarjetas con una transición automática. No se escribió ninguna animación: Auto-Animate observa el contenedor y anima solo lo que cambia.",
    why: "Es el extremo opuesto a GSAP/Motion en esta lista: cero configuración, cero curvas de animación que decidir. Sirve para mostrar que hasta la librería más simple de la galería (solo clases CSS) puede verse pulida con el mínimo esfuerzo posible.",
    install: "npm i -D daisyui  →  npm i @formkit/auto-animate",
    prompt:
      "Usa daisyUI 5 (tema «retro» u otro con personalidad) para toda la UI. Para cualquier lista que el usuario pueda filtrar, reordenar o mezclar (features, cards, galería), envuelve el contenedor con el hook `useAutoAnimate` de `@formkit/auto-animate/react` y usa el ref que devuelve en el elemento padre: no hace falta escribir ninguna animación a mano, Auto-Animate detecta los cambios solo.",
  },
  {
    id: "combo-mantine-motion",
    name: "Mantine + Motion",
    framework: "mantine",
    interaction: { name: "Motion (antes Framer Motion)", url: "https://motion.dev", price: "Gratis" },
    description:
      "Los bloques oficiales de ui.mantine.dev (HeroBullets, FeaturesGrid, ArticleCard, CardsCarousel) con Motion encima: el hero entra con una escala suave, las features se deslizan hacia arriba al hacer scroll, y cada card se anima por separado (stagger + hover-lift). Mantine no usa Tailwind, así que es la prueba de que Motion funciona igual de bien sobre cualquier sistema de estilos.",
    why: "Mantine es de las librerías menos vistas en sitios hechos con IA (no usa Tailwind, así que los modelos tienden a ignorarla salvo que se las pidas explícitamente). Combinada con movimiento, es de las que más se aleja del look «vibecodeado» por defecto.",
    install: "npm i @mantine/core @mantine/hooks @mantine/carousel  →  npm i motion",
    prompt:
      "Usa Mantine v9 (no Tailwind) con sus bloques gratuitos de ui.mantine.dev como base. Para el movimiento, envuelve cada bloque en un `motion.div` de Motion (`import { motion } from \"motion/react\"`): nunca apliques `whileHover`/`whileInView` directo sobre los botones o inputs internos de Mantine, siempre sobre tu propio div envolvente. Evita animar la propiedad `clipPath` con `whileInView`: en pruebas no disparaba la animación de forma confiable; usa `opacity`/`y` en su lugar.",
  },
];
