import { Showcase } from "@/shared/Showcase";
import { Blog7 } from "./blocks/blog7";
import { Feature43 } from "./blocks/feature43";
import { Footer7 } from "./blocks/footer7";
import { Gallery6 } from "./blocks/gallery6";
import { Hero45 } from "./blocks/hero45";
import { Navbar1 } from "./blocks/navbar1";

// Bloques gratuitos de shadcnblocks.com tal como los publica el registro (contenido por defecto en inglés).
export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "navbar", source: "oficial", note: "shadcnblocks/navbar1", render: () => <Navbar1 /> },
        { id: "hero", source: "oficial", note: "shadcnblocks/hero45", render: () => <Hero45 /> },
        { id: "features", source: "oficial", note: "shadcnblocks/feature43", render: () => <Feature43 /> },
        { id: "cards", source: "oficial", note: "shadcnblocks/blog7", render: () => <Blog7 /> },
        { id: "gallery", source: "oficial", note: "shadcnblocks/gallery6", render: () => <Gallery6 /> },
        { id: "footer", source: "oficial", note: "shadcnblocks/footer7", render: () => <Footer7 /> },
      ]}
    />
  );
}
