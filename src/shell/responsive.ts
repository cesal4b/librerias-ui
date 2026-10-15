// Qué tan bien resuelve cada librería el comportamiento responsivo (móvil/tablet).
// Criterio del laboratorio, basado en la revisión de las demos a 390 px (2026-10-06) y en lo que trae cada librería.
//  Completo  = sus bloques/componentes oficiales ya resuelven el móvil (menú que colapsa, grillas que se apilan, carrusel táctil)
//  Parcial   = trae las piezas (Sheet, Drawer, dropdown…), pero el armado móvil lo haces tú
//  Manual    = headless o sin estilos: todo el comportamiento móvil lo defines tú
//  Variable  = depende de cada autor (catálogo comunitario)

export type Responsive = "Completo" | "Parcial" | "Manual" | "Variable";

export const responsive: Record<string, { level: Responsive; why: string }> = {
  untitledui: { level: "Completo", why: "Su header oficial colapsa en menú móvil, el carrusel responde al gesto de deslizar y los componentes usan las clases responsivas de Tailwind." },
  fragments: { level: "Completo", why: "El header de su bloque oficial colapsa en menú móvil, y Grid y Stack aceptan valores por tamaño de pantalla (columns={{ base: 1, md: 2 }})." },
  shadcn: { level: "Parcial", why: "Los componentes son responsivos, pero NavigationMenu no colapsa solo: el menú móvil lo armas tú con Sheet." },
  kibo: { level: "Parcial", why: "Sus componentes funcionan bien en móvil (Deck y Marquee responden al gesto), pero no trae navbar ni secciones: el resto lo armas tú." },
  alignui: { level: "Parcial", why: "Trae Drawer para el menú móvil, pero las secciones y su comportamiento móvil las armas tú (los bloques son PRO)." },
  magicui: { level: "Parcial", why: "Efectos pensados para escritorio: algunos (Dock, Safari, Bento) hay que reacomodarlos en móvil, y los fondos animados se recortan." },
  heroui: { level: "Parcial", why: "La v3 trae Drawer, pero no Navbar: el menú móvil y el layout responsivo los armas tú." },
  shadcnblocks: { level: "Completo", why: "Los bloques ya incluyen menú móvil (Sheet), grillas que se apilan y carruseles táctiles." },
  tailwindplus: { level: "Completo", why: "Sus bloques de pago incluyen versión móvil (menú con Dialog de Headless UI). En esta galería la página es una referencia." },
  mantine: { level: "Completo", why: "Los bloques de ui.mantine.dev traen Burger + Drawer y props responsivas (cols={{ base: 1, sm: 3 }}, visibleFrom)." },
  mui: { level: "Completo", why: "La plantilla oficial trae menú móvil con Drawer, y MUI tiene breakpoints en sx y Grid." },
  tailark: { level: "Completo", why: "Sus headers traen menú móvil y los bloques se apilan bien. Algunas ilustraciones decorativas se recortan en móvil." },
  coss: { level: "Parcial", why: "Trae Sheet para el menú móvil, pero no bloques: el layout responsivo lo armas tú." },
  smoothui: { level: "Parcial", why: "Hero, features y footer se adaptan, pero su navbar flotante no colapsa en móvil: los enlaces se salen de la pantalla." },
  basecn: { level: "Parcial", why: "Igual que shadcn: los componentes son responsivos, pero el menú móvil lo armas tú con Sheet." },
  "blocks-so": { level: "Parcial", why: "Sus bloques de aplicación se adaptan, pero no trae navbar, galería ni footer para un micrositio." },
  baseui: { level: "Manual", why: "Sin estilos: el menú móvil, las columnas y los tamaños los defines tú. A cambio, control total." },
  "react-aria": { level: "Manual", why: "Sin estilos propios: el layout móvil lo defines tú. A favor: la interacción táctil y con lector de pantalla es de las mejores." },
  flowbite: { level: "Completo", why: "La Navbar colapsa con NavbarToggle, el Carousel es táctil y las grillas son responsivas." },
  "21st": { level: "Variable", why: "Depende de cada autor: revisa cada componente en vista Móvil antes de usarlo." },
  daisyui: { level: "Parcial", why: "Trae las piezas: hamburguesa con dropdown, carrusel táctil con scroll-snap y un footer que se apila. Pero el navbar responsivo lo armas tú siguiendo su patrón." },
  tailkits: { level: "Parcial", why: "El HTML es responsivo, pero no trae JavaScript: el botón del menú móvil no hace nada hasta que lo programes." },
  launchui: { level: "Completo", why: "El navbar colapsa con un Sheet (panel lateral) propio, los títulos y grillas (features, footer) ya traen clases responsivas de Tailwind." },
  shadcnstudio: { level: "Variable", why: "No se pudo verificar en vivo: su licencia (Commons Clause) prohíbe copiar sus bloques reales para probarlos aquí. Depende de cada componente/tema." },
};
