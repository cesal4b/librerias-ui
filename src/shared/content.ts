// Contenido de ejemplo común para las secciones "compuestas", así las librerías se comparan con el mismo texto.
export const brand = "Lab Innovación";

export const nav = ["Inicio", "Programas", "Proyectos", "Eventos", "Contacto"];

export const hero = {
  eyebrow: "Nuevo · Convocatoria 2027",
  title: "Diseñamos experiencias que transforman la educación",
  subtitle:
    "Un laboratorio para prototipar ideas, probarlas con personas reales y llevarlas a producción en semanas, no en meses.",
  primary: "Conoce los proyectos",
  secondary: "Agenda una visita",
};

export const features = [
  { title: "Prototipado rápido", text: "De la idea a un prototipo navegable en días, con IA como copiloto.", icon: "Zap" },
  { title: "Investigación con usuarios", text: "Entrevistas, pruebas y métricas para decidir con evidencia.", icon: "Users" },
  { title: "Diseño accesible", text: "Componentes que cumplen WCAG y funcionan con teclado y lector de pantalla.", icon: "Accessibility" },
  { title: "Datos en tiempo real", text: "Tableros que muestran el impacto de cada iniciativa.", icon: "BarChart3" },
  { title: "Automatización", text: "Flujos que eliminan tareas repetitivas para el equipo.", icon: "Workflow" },
  { title: "Comunidad", text: "Talleres y espacios abiertos para estudiantes y docentes.", icon: "Sparkles" },
] as const;

export const img = (seed: string, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const cards = [
  { title: "Cero papel", tag: "Salud", text: "Digitalizamos la enfermería del campus de punta a punta.", image: img("lab-card-1", 800, 600) },
  { title: "Coffee networking", tag: "Comunidad", text: "Un kiosco para conectar estudiantes y egresados.", image: img("lab-card-2", 800, 600) },
  { title: "Generador de piezas", tag: "Marca", text: "Piezas institucionales listas en minutos.", image: img("lab-card-3", 800, 600) },
];

export const gallery = Array.from({ length: 6 }, (_, i) => ({
  src: img(`lab-gallery-${i + 1}`, 1600, 1000),
  alt: `Imagen de ejemplo ${i + 1}`,
  caption: ["Taller de IA", "Demo day", "Sprint de diseño", "Laboratorio abierto", "Pruebas con usuarios", "Feria de proyectos"][i],
}));

export const footer = {
  columns: [
    { title: "Laboratorio", links: ["Quiénes somos", "Equipo", "Metodología"] },
    { title: "Proyectos", links: ["En curso", "Terminados", "Propón uno"] },
    { title: "Recursos", links: ["Guías", "Librerías UI", "Blog"] },
  ],
  copy: `© ${new Date().getFullYear()} Lab Innovación. Contenido de ejemplo.`,
};
