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
  {
    id: "combo-reactaria-motion",
    name: "React Aria + Motion",
    framework: "react-aria",
    interaction: { name: "Motion (antes Framer Motion)", url: "https://motion.dev", price: "Gratis" },
    description:
      "El kit de arranque oficial de React Aria (Adobe), headless y accesible, con Motion encima: stagger de entrada en el hero, aparición por panel en las Tabs de features, stagger + hover en el GridList de cards, y fundido de la imagen al cambiar de selección en la galería (React Aria no trae carrusel).",
    why: "React Aria es de las bases más accesibles de la galería (navegación completa por teclado, roles ARIA correctos) pero también de las menos vistas en sitios hechos con IA. Motion le suma el movimiento que normalmente falta cuando se usa tal cual viene del kit, sin tocar el foco ni los estados de sus componentes.",
    install: "npm i react-aria-components  →  npm i motion",
    prompt:
      "Usa los componentes de arranque de React Aria (`react-aria-components`, kit oficial con Tailwind) para toda la UI: son headless y accesibles por defecto. Para el movimiento, envuelve cada bloque en un `motion.div` de Motion (`import { motion } from \"motion/react\"`), nunca el Button/GridListItem/ToggleButton en sí (son el nodo interactivo real del kit; animar un div envolvente evita interferir con sus estados de foco/selección).",
  },
  {
    id: "combo-baseui-gsap",
    name: "Base UI + GSAP",
    framework: "baseui",
    interaction: { name: "GSAP (ScrollTrigger)", url: "https://gsap.com", price: "Gratis" },
    description:
      "Base UI (equipo de MUI/Radix), headless y con las clases de sus propias demos oficiales, con GSAP: timeline de entrada en el hero, ScrollTrigger revelando el panel de features (Tabs + Accordion) y las cards al hacer scroll, y un fundido de imagen en la galería al cambiar de pestaña.",
    why: "Base UI es de las bases más 'a medida' de la galería (sin ningún estilo propio): GSAP aporta el tipo de entrada con scroll que un sitio headless normalmente no trae por sí solo, sin competir con el sistema de diseño porque no hay ninguno que romper.",
    install: "npm i @base-ui/react  →  npm i gsap",
    prompt:
      "Usa Base UI (`@base-ui/react`, headless) con las clases de sus demos oficiales con Tailwind. Para el movimiento, usa GSAP con `gsap/ScrollTrigger`: revela cada sección con un `gsap.from` al entrar en pantalla. Nunca animes `opacity`/`transform` directo sobre un Button/Toggle de Base UI (tienen variantes hover:/active:/data-pressed: que no responden de forma fiable si GSAP se los escribe encima, visto antes con Tailark); siempre sobre un div contenedor.",
  },
  {
    id: "combo-untitledui-motion",
    name: "Untitled UI + Motion",
    framework: "untitledui",
    interaction: { name: "Motion (antes Framer Motion)", url: "https://motion.dev", price: "Gratis" },
    description:
      "La parte gratuita de Untitled UI React (React Aria + Tailwind v4 + sus tokens de diseño) con Motion: stagger de entrada en el hero (BadgeGroup + título + botones), aparición escalonada de los FeaturedIcon en features, stagger + hover-lift en las cards, y un fundido de entrada sobre el carrusel oficial de la galería.",
    why: "Untitled UI es de los look más premium/SaaS de la galería, pero su demo base ya se ve pulida sin animar; Motion suma el nivel de detalle que distingue un sitio hecho a mano de uno genérico, sin tocar sus componentes internos (la mayoría de secciones de marketing son PRO, así que esto sigue usando solo piezas gratuitas).",
    install: "npm i @untitledui/icons  →  npm i motion",
    prompt:
      "Usa los componentes gratuitos de Untitled UI React (React Aria + Tailwind v4, con sus propios tokens de color como `text-primary`/`text-tertiary`). Para el movimiento, envuelve cada bloque en un `motion.div` de Motion: stagger fade-in en el hero, whileInView con stagger en features y cards, y un fundido simple sobre el carrusel oficial (no lo reconstruyas, Motion solo envuelve el bloque).",
  },
  {
    id: "combo-flowbite-autoanimate",
    name: "Flowbite + Auto-Animate",
    framework: "flowbite",
    interaction: { name: "Auto-Animate (@formkit/auto-animate)", url: "https://auto-animate.formkit.com", price: "Gratis" },
    description:
      "flowbite-react (navbar, jumbotron, cards y footer oficiales) con Auto-Animate en las listas que cambian: un filtro por categoría en features, un botón «Más popular primero» en cards, y un botón «Mezclar orden» en una grilla de galería (en vez del carrusel oficial, para poder reordenar). Ningún bloque se re-escribe, solo se envuelve el contenedor que cambia.",
    why: "Mismo espíritu que daisyUI + Auto-Animate: mínimo esfuerzo, pero sobre una base distinta (Flowbite, con Tailwind clásico en vez de utilidades de daisyUI). Sirve para comparar cómo se ve Auto-Animate sobre dos librerías de look muy distinto.",
    install: "npm i flowbite-react  →  npm i @formkit/auto-animate",
    prompt:
      "Usa flowbite-react para toda la UI. Para cualquier lista que el usuario pueda filtrar, reordenar o mezclar, envuelve el contenedor con el hook `useAutoAnimate` de `@formkit/auto-animate/react` y usa el ref que devuelve en el elemento padre directo de los ítems: no hace falta escribir ninguna animación a mano. Si necesitas reordenar una galería, usa una grilla en vez del Carousel oficial de Flowbite (el carrusel no se presta a reordenar sus hijos).",
  },
  {
    id: "combo-mui-motion",
    name: "MUI + Motion",
    framework: "mui",
    interaction: { name: "Motion (antes Framer Motion)", url: "https://motion.dev", price: "Gratis" },
    description:
      "Las secciones oficiales de la plantilla gratuita «Marketing page» de MUI (AppAppBar, Hero, Features, Testimonials, Footer) con Motion encima: entrada con escala en el hero, deslizamiento al hacer scroll en features y testimonials, y un fundido sobre el ImageList en mampostería de la galería.",
    why: "MUI es de las librerías con el look menos 'vibecodeado' de la galería por su sistema Material tan reconocible y, como Mantine, no usa Tailwind (CSS-in-JS con Emotion): confirma que Motion funciona igual de bien ahí. Sirve para equipos que ya usan Material Design y quieren sumarle movimiento sin salirse del sistema.",
    install: "npm i @mui/material @emotion/react @emotion/styled  →  npm i motion",
    prompt:
      "Usa la plantilla gratuita 'Marketing page' de MUI (github.com/mui/material-ui, MIT) como base: AppTheme + CssBaseline, y sus secciones AppAppBar/Hero/Features/Testimonials/Footer. Para el movimiento, envuelve cada sección (menos la barra de navegación, que es `position: fixed`) en un `motion.div` de Motion: nunca apliques `whileHover`/`whileInView` directo sobre los componentes de MUI, siempre sobre tu propio div envolvente.",
  },
  {
    id: "combo-heroui-motion",
    name: "HeroUI + Motion",
    framework: "heroui",
    interaction: { name: "Motion (antes Framer Motion)", url: "https://motion.dev", price: "Gratis" },
    description:
      "HeroUI v3 (React Aria + Tailwind v4) con Motion: stagger de entrada en el hero (Chip + título + botones), aparición escalonada de las Card de features, stagger + hover-lift en las cards de proyectos, y un fundido de imagen por pestaña en la galería (HeroUI v3 no trae carrusel).",
    why: "HeroUI v3 cambió de API recientemente (vibe coding: Media, porque la IA todavía conoce mejor la v2), así que mostrarla con un look más trabajado ayuda a justificar el esfuerzo extra de documentarla. Motion es el mismo patrón ya probado en shadcn/ui, Mantine, React Aria y Untitled UI: envolver, nunca tocar el componente interactivo.",
    install: "npm i @heroui/react @heroui/styles  →  npm i motion",
    prompt:
      "Usa HeroUI v3 (`@heroui/react`, React Aria + Tailwind v4) para toda la UI. Para el movimiento, envuelve cada bloque en un `motion.div` de Motion: stagger fade-in en el hero, whileInView con stagger en features y cards (con whileHover para el lift), y un fundido simple en la imagen de cada panel de la galería. Nunca animes el Button/Card de HeroUI directamente.",
  },
  {
    id: "combo-launchui-gsap",
    name: "Launch UI + GSAP",
    framework: "launchui",
    interaction: { name: "GSAP (ScrollTrigger)", url: "https://gsap.com", price: "Gratis" },
    description:
      "Launch UI (la librería recién aprobada en la revisión de octubre) con GSAP: el hero mantiene su propia entrada CSS escalonada (animate-appear, ya la trae Launch UI; no se duplica con GSAP), y ScrollTrigger revela los items de features, las cards y la galería (estas dos últimas compuestas, porque la versión gratis no las trae) al hacer scroll.",
    why: "Es el único combo donde la base ya trae su propia animación de entrada de fábrica: sirve para mostrar que un combo no siempre significa 'animar todo de nuevo', sino sumar GSAP donde la librería no llega (debajo del pliegue), sin pisar lo que ya funciona bien arriba.",
    install: "Copiar Launch UI de github.com/launch-ui/launch-ui (MIT, gratis)  →  npm i gsap",
    prompt:
      "Usa los bloques de Launch UI (sections/navbar, hero, items, footer) como base; su hero ya trae una entrada escalonada propia con la utilidad `animate-appear` (no la reanimes). Para las secciones de abajo (features, cards, galería), usa GSAP con `gsap/ScrollTrigger`: revela cada bloque con un `gsap.from` apuntando a sus elementos hijos directos (por ejemplo `[data-slot=\"item\"]`) al entrar en pantalla, sin animar los botones/enlaces directamente.",
  },
];
