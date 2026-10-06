import { ArrowRight, CalendarDays, FolderKanban, Home, Mail, Sparkles } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, img } from "@/shared/content";
import { featureIcons } from "@/shared/icons";
import { AnimatedShinyText } from "@/libs/magicui/ui/animated-shiny-text";
import { AuroraText } from "@/libs/magicui/ui/aurora-text";
import { BentoCard, BentoGrid } from "@/libs/magicui/ui/bento-grid";
import { BlurFade } from "@/libs/magicui/ui/blur-fade";
import { BorderBeam } from "@/libs/magicui/ui/border-beam";
import { Dock, DockIcon } from "@/libs/magicui/ui/dock";
import { FlickeringGrid } from "@/libs/magicui/ui/flickering-grid";
import { InteractiveHoverButton } from "@/libs/magicui/ui/interactive-hover-button";
import { MagicCard } from "@/libs/magicui/ui/magic-card";
import { Marquee } from "@/libs/magicui/ui/marquee";
import { RetroGrid } from "@/libs/magicui/ui/retro-grid";
import { Safari } from "@/libs/magicui/ui/safari";
import { ShimmerButton } from "@/libs/magicui/ui/shimmer-button";

const bentoSpans = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "compuesto",
          note: "Dock (magnificación al pasar el mouse) · en móvil baja a su propia fila",
          render: () => (
            <header className="flex flex-wrap items-center justify-between gap-y-3 px-6 py-4">
              <span className="font-semibold">{brand}</span>
              <div className="order-last flex w-full justify-center md:order-none md:w-auto">
              <Dock direction="middle" className="mt-0">
                {[Home, FolderKanban, CalendarDays, Sparkles, Mail].map((Icon, i) => (
                  <DockIcon key={i}>
                    <Icon className="size-5" />
                  </DockIcon>
                ))}
              </Dock>
              </div>
              <InteractiveHoverButton>Ingresar</InteractiveHoverButton>
            </header>
          ),
        },
        {
          id: "hero",
          source: "compuesto",
          note: "AnimatedShinyText + AuroraText + ShimmerButton + RetroGrid + Safari + BorderBeam",
          render: () => (
            <div className="relative overflow-hidden px-6 pt-20 pb-10 text-center">
              <RetroGrid />
              <BlurFade inView>
                <div className="mx-auto w-fit rounded-full border bg-neutral-100 px-4 py-1 text-sm">
                  <AnimatedShinyText>✨ {hero.eyebrow}</AnimatedShinyText>
                </div>
                <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tighter md:text-6xl">
                  Diseñamos experiencias que <AuroraText>transforman</AuroraText> la educación
                </h1>
                <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">{hero.subtitle}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <ShimmerButton>{hero.primary}</ShimmerButton>
                  <InteractiveHoverButton>{hero.secondary}</InteractiveHoverButton>
                </div>
              </BlurFade>
              <div className="relative mx-auto mt-14 max-w-4xl">
                <Safari url="lab.cesa.edu.co" imageSrc={img("lab-hero-shot", 1600, 1000)} />
                <BorderBeam size={120} duration={8} />
              </div>
            </div>
          ),
        },
        {
          id: "features",
          source: "oficial",
          note: "BentoGrid + BentoCard + FlickeringGrid",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-16">
              <BentoGrid className="lg:grid-cols-3">
                {features.slice(0, 4).map((f, i) => (
                  <BentoCard
                    key={f.title}
                    name={f.title}
                    description={f.text}
                    Icon={featureIcons[f.icon]}
                    href="#"
                    cta="Saber más"
                    className={bentoSpans[i]}
                    background={
                      <FlickeringGrid
                        className="absolute inset-0 [mask-image:radial-gradient(400px_circle_at_top,white,transparent)]"
                        squareSize={4}
                        gridGap={6}
                        color="#6366f1"
                        maxOpacity={0.4}
                        flickerChance={0.1}
                      />
                    }
                  />
                ))}
              </BentoGrid>
            </div>
          ),
        },
        {
          id: "cards",
          source: "oficial",
          note: "MagicCard (brillo que sigue el cursor)",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
              {cards.map((c) => (
                <MagicCard key={c.title} className="rounded-xl p-0" gradientFrom="#9E7AFF" gradientTo="#FE8BBB">
                  <div className="p-4">
                    <img src={c.image} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
                    <p className="mt-4 text-xs font-medium tracking-wide text-violet-600 uppercase">{c.tag}</p>
                    <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{c.text}</p>
                  </div>
                </MagicCard>
              ))}
            </div>
          ),
        },
        {
          id: "gallery",
          source: "oficial",
          note: "Marquee (dos filas, una en reversa)",
          render: () => (
            <div className="relative flex flex-col overflow-hidden py-16">
              {[false, true].map((reverse) => (
                <Marquee key={String(reverse)} reverse={reverse} pauseOnHover className="[--duration:30s]">
                  {gallery.map((g) => (
                    <figure key={g.src} className="relative w-72 overflow-hidden rounded-xl border">
                      <img src={g.src} alt={g.alt} className="aspect-video w-full object-cover" />
                      <figcaption className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
                        {g.caption}
                      </figcaption>
                    </figure>
                  ))}
                </Marquee>
              ))}
              <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r" />
              <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l" />
            </div>
          ),
        },
        {
          id: "footer",
          source: "compuesto",
          note: "FlickeringGrid de fondo",
          render: () => (
            <footer className="relative overflow-hidden border-t">
              <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
                <div>
                  <span className="font-semibold">{brand}</span>
                  <p className="text-muted-foreground mt-2 text-sm">{footer.copy}</p>
                </div>
                {footer.columns.map((c) => (
                  <div key={c.title}>
                    <h4 className="text-sm font-medium">{c.title}</h4>
                    <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
                      {c.links.map((l) => (
                        <li key={l} className="flex items-center gap-1 hover:text-foreground">
                          {l} <ArrowRight className="size-3 opacity-0 transition group-hover:opacity-100" />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="relative h-40">
                <FlickeringGrid
                  className="absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]"
                  squareSize={3}
                  gridGap={5}
                  color="#6B7280"
                  maxOpacity={0.3}
                />
                <p className="absolute inset-x-0 bottom-6 text-center text-6xl font-bold tracking-tighter text-neutral-200 md:text-8xl">
                  {brand}
                </p>
              </div>
            </footer>
          ),
        },
      ]}
    />
  );
}
