// Combos: Framework UI + librería de interacciones/transiciones, ya armados sobre las mismas
// secciones que el resto de la galería (hero, features, cards, galería). Cada uno es una mini
// página de aterrizaje completa en pages/<id>.html, igual que una librería.
import type { Price } from "./libraries";

export type Combo = {
  id: string; // = pages/<id>.html
  name: string;
  framework: string; // id de Library base (./libraries.ts)
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
];
