import { CalendarDays, FolderKanban, Home, Mail } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, gallery, img } from "@/shared/content";
import FeaturesGrid from "@/libs/smoothui/blocks/features-1";
import FooterSimple from "@/libs/smoothui/blocks/footer-1";
import HeroGrid from "@/libs/smoothui/blocks/header-1";
import CoverflowCarousel from "@/libs/smoothui/ui/coverflow-carousel";
import FloatingNavbar from "@/libs/smoothui/ui/floating-navbar";
import GlassCard from "@/libs/smoothui/ui/glass-card";

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "oficial",
          note: "floating-navbar",
          render: () => (
            // transform crea un bloque contenedor para que la barra "fixed" quede dentro de la sección
            <div style={{ transform: "translateZ(0)", height: 96 }} className="bg-neutral-100">
              <FloatingNavbar
                logo={<span className="font-semibold">{brand}</span>}
                activeId="inicio"
                hideOnScroll={false}
                items={[
                  { id: "inicio", label: "Inicio", icon: <Home className="size-4" /> },
                  { id: "proyectos", label: "Proyectos", icon: <FolderKanban className="size-4" /> },
                  { id: "eventos", label: "Eventos", icon: <CalendarDays className="size-4" /> },
                  { id: "contacto", label: "Contacto", icon: <Mail className="size-4" /> },
                ]}
              />
            </div>
          ),
        },
        { id: "hero", source: "oficial", note: "header-1 (HeroGrid)", render: () => <HeroGrid /> },
        { id: "features", source: "oficial", note: "features-1 (FeaturesGrid)", render: () => <FeaturesGrid /> },
        {
          id: "cards",
          source: "compuesto",
          note: "glass-card sobre una foto",
          render: () => (
            <div
              className="grid gap-6 bg-cover bg-center px-6 py-20 md:grid-cols-3 md:px-16"
              style={{ backgroundImage: `url(${img("lab-glass-bg", 1800, 1000)})` }}
            >
              {cards.map((c) => (
                <GlassCard key={c.title} interactive specular shadow tint="rgba(15,15,25,.35)">
                  <div className="p-6 text-white">
                    <p className="text-xs font-medium tracking-wide uppercase opacity-80">{c.tag}</p>
                    <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm opacity-90">{c.text}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          ),
        },
        {
          id: "gallery",
          source: "oficial",
          note: "coverflow-carousel",
          render: () => (
            <div className="py-16">
              <CoverflowCarousel autoplay loop items={gallery.map((g, i) => ({ id: String(i), image: g.src, alt: g.alt }))} />
            </div>
          ),
        },
        { id: "footer", source: "oficial", note: "footer-1 (FooterSimple)", render: () => <FooterSimple /> },
      ]}
    />
  );
}
