import type { ComponentType } from "react";
import { Showcase, ToolbarButton, useParam } from "@/shared/Showcase";
import DuskFeatures from "@/libs/tailark/registry/bases/radix/dusk/blocks/features/one";
import DuskFooter from "@/libs/tailark/registry/bases/radix/dusk/blocks/footer/one";
import { HeroHeader as DuskHeader } from "@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/one/header";
import DuskHero from "@/libs/tailark/registry/bases/radix/dusk/blocks/hero-section/one/hero-section";
import DuskLogos from "@/libs/tailark/registry/bases/radix/dusk/blocks/logo-cloud/one";
import DuskTestimonials from "@/libs/tailark/registry/bases/radix/dusk/blocks/testimonials/one";
import MistFeatures from "@/libs/tailark/registry/bases/radix/mist/blocks/features/one/features";
import MistFooter from "@/libs/tailark/registry/bases/radix/mist/blocks/footer/one";
import { HeroHeader as MistHeader } from "@/libs/tailark/registry/bases/radix/mist/blocks/hero-section/one/header";
import MistHero from "@/libs/tailark/registry/bases/radix/mist/blocks/hero-section/one/hero-section";
import MistLogos from "@/libs/tailark/registry/bases/radix/mist/blocks/logo-cloud/one";
import MistTestimonials from "@/libs/tailark/registry/bases/radix/mist/blocks/testimonials/one";
import VeilFeatures from "@/libs/tailark/registry/bases/radix/veil/blocks/features/one";
import VeilFooter from "@/libs/tailark/registry/bases/radix/veil/blocks/footer/one";
import { HeroHeader as VeilHeader } from "@/libs/tailark/registry/bases/radix/veil/blocks/hero-section/one/header";
import VeilHero from "@/libs/tailark/registry/bases/radix/veil/blocks/hero-section/one/hero-section";
import VeilLogos from "@/libs/tailark/registry/bases/radix/veil/blocks/logo-cloud/one";
import VeilTestimonials from "@/libs/tailark/registry/bases/radix/veil/blocks/testimonials/one";

type Kit = Record<"header" | "hero" | "features" | "cards" | "gallery" | "footer", ComponentType>;

// Los tres kits gratuitos de Tailark (github.com/tailark/blocks, MIT). Dusk es el tema raíz; Mist y Veil se activan con data-theme.
const kits: Record<string, Kit> = {
  dusk: { header: DuskHeader, hero: DuskHero, features: DuskFeatures, cards: DuskTestimonials, gallery: DuskLogos, footer: DuskFooter },
  mist: { header: MistHeader, hero: MistHero, features: MistFeatures, cards: MistTestimonials, gallery: MistLogos, footer: MistFooter },
  veil: { header: VeilHeader, hero: VeilHero, features: VeilFeatures, cards: VeilTestimonials, gallery: VeilLogos, footer: VeilFooter },
};

// El header de Tailark es "fixed": transform crea un bloque contenedor para que quede dentro de su sección.
const contain = { transform: "translateZ(0)", minHeight: 88 };

export default function Page() {
  const [kit, setKit] = useParam("kit", "mist");
  const k = kits[kit] ?? kits.mist;
  return (
    <div data-theme={kit === "dusk" ? undefined : kit} className="bg-background text-foreground min-h-screen font-sans">
      <Showcase
        toolbar={
          <>
            <span>Kit de Tailark:</span>
            {Object.keys(kits).map((id) => (
              <ToolbarButton key={id} active={id === kit} onClick={() => setKit(id)}>
                {id[0].toUpperCase() + id.slice(1)}
              </ToolbarButton>
            ))}
          </>
        }
        sections={[
          { id: "navbar", source: "oficial", note: `${kit}/hero-section/one/header`, render: () => <div style={contain}><k.header /></div> },
          { id: "hero", source: "oficial", note: `${kit}/hero-section/one`, render: () => <div style={{ transform: "translateZ(0)" }}><k.hero /></div> },
          { id: "features", source: "oficial", note: `${kit}/features/one`, render: () => <k.features /> },
          { id: "cards", source: "oficial", note: `${kit}/testimonials/one (tarjetas de testimonio)`, render: () => <k.cards /> },
          { id: "gallery", source: "oficial", note: `${kit}/logo-cloud/one (slider infinito)`, render: () => <k.gallery /> },
          { id: "footer", source: "oficial", note: `${kit}/footer/one`, render: () => <k.footer /> },
        ]}
      />
    </div>
  );
}
