import { Showcase } from "@/shared/Showcase";
import Ai01 from "./blocks/ai-01";
import GridList02 from "./blocks/grid-list-02";
import Stats03 from "./blocks/stats-03";

// Blocks.so publica bloques de aplicación (dashboards, formularios, chat), no secciones de landing.
export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "hero", source: "oficial", note: "ai-01 (no hay hero: este es su bloque de entrada de IA)", render: () => <div className="mx-auto max-w-3xl px-6 py-20"><Ai01 /></div> },
        { id: "features", source: "oficial", note: "stats-03 (tarjetas de métricas)", render: () => <div className="mx-auto max-w-6xl px-6 py-16"><Stats03 /></div> },
        { id: "cards", source: "oficial", note: "grid-list-02", render: () => <div className="mx-auto max-w-6xl px-6 py-16"><GridList02 /></div> },
      ]}
    />
  );
}
