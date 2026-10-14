import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Showcase, ToolbarButton } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";

import { Hero45 } from "@/libs/shadcnblocks/blocks/hero45";
import { Feature43 } from "@/libs/shadcnblocks/blocks/feature43";
import HeroGrid from "@/libs/smoothui/blocks/header-1";
import { Deck, DeckCards, DeckItem } from "@/libs/kibo/ui/deck";
import { ImageZoom } from "@/libs/kibo/ui/image-zoom";
import { Marquee as KiboMarquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/libs/kibo/ui/marquee";
import { BentoCard, BentoGrid } from "@/libs/magicui/ui/bento-grid";
import { FlickeringGrid } from "@/libs/magicui/ui/flickering-grid";
import { MagicCard } from "@/libs/magicui/ui/magic-card";
import { Marquee as MagicMarquee } from "@/libs/magicui/ui/marquee";

// 4 librerías de la familia shadcn (comparten shadcn-theme.css): se puede elegir al azar, por sección,
// cuál de las dos pone cada una sin que choquen los estilos globales entre sí.
type Pick = { lib: string; render: () => React.ReactNode };

const bentoSpans = ["lg:col-span-2", "lg:col-span-1", "lg:col-span-1", "lg:col-span-2"];

const HERO_POOL: Pick[] = [
  { lib: "ShadcnBlocks", render: () => <Hero45 /> },
  { lib: "Smooth UI", render: () => <HeroGrid /> },
];

const FEATURES_POOL: Pick[] = [
  { lib: "ShadcnBlocks", render: () => <Feature43 /> },
  {
    lib: "Magic UI",
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
];

const CARDS_POOL: Pick[] = [
  {
    lib: "Kibo UI",
    render: () => (
      <div className="flex flex-col items-center px-6 py-16">
        <p className="text-muted-foreground mb-6 text-sm">Arrastra la tarjeta a la izquierda o derecha</p>
        <Deck className="h-[420px] w-80">
          <DeckCards>
            {[...cards, ...cards].map((c, i) => (
              <DeckItem key={i} className="flex-col items-stretch justify-start overflow-hidden bg-white p-0">
                <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" draggable={false} />
                <div className="p-5">
                  <p className="text-xs font-medium text-emerald-600 uppercase">{c.tag}</p>
                  <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{c.text}</p>
                </div>
              </DeckItem>
            ))}
          </DeckCards>
        </Deck>
      </div>
    ),
  },
  {
    lib: "Magic UI",
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
];

const GALLERY_POOL: Pick[] = [
  {
    lib: "Kibo UI",
    render: () => (
      <div className="py-16">
        <KiboMarquee>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
          <MarqueeContent pauseOnHover>
            {gallery.map((g) => (
              <MarqueeItem key={g.src} className="mx-3">
                <ImageZoom>
                  <img src={g.src} alt={g.alt} className="h-48 w-72 rounded-lg object-cover" />
                </ImageZoom>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </KiboMarquee>
      </div>
    ),
  },
  {
    lib: "Magic UI",
    render: () => (
      <div className="relative flex flex-col overflow-hidden py-16">
        {[false, true].map((reverse) => (
          <MagicMarquee key={String(reverse)} reverse={reverse} pauseOnHover className="[--duration:30s]">
            {gallery.map((g) => (
              <figure key={g.src} className="relative w-72 overflow-hidden rounded-xl border">
                <img src={g.src} alt={g.alt} className="aspect-video w-full object-cover" />
                <figcaption className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">{g.caption}</figcaption>
              </figure>
            ))}
          </MagicMarquee>
        ))}
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r" />
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l" />
      </div>
    ),
  },
];

function pickRandom(pool: Pick[], exclude?: Pick) {
  const options = pool.length > 1 && exclude ? pool.filter((p) => p !== exclude) : pool;
  return options[Math.floor(Math.random() * options.length)];
}

/** Envuelve la sección en un fundido corto al mezclar, para que el cambio no se sienta abrupto. */
function Swap({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default function Page() {
  const [heroPick, setHeroPick] = useState(() => pickRandom(HERO_POOL));
  const [featuresPick, setFeaturesPick] = useState(() => pickRandom(FEATURES_POOL));
  const [cardsPick, setCardsPick] = useState(() => pickRandom(CARDS_POOL));
  const [galleryPick, setGalleryPick] = useState(() => pickRandom(GALLERY_POOL));

  const total = HERO_POOL.length * FEATURES_POOL.length * CARDS_POOL.length * GALLERY_POOL.length;
  const shuffle = () => {
    setHeroPick((p) => pickRandom(HERO_POOL, p));
    setFeaturesPick((p) => pickRandom(FEATURES_POOL, p));
    setCardsPick((p) => pickRandom(CARDS_POOL, p));
    setGalleryPick((p) => pickRandom(GALLERY_POOL, p));
  };

  return (
    <Showcase
      toolbar={
        <>
          <span>Remix: {total} combinaciones posibles de la familia shadcn</span>
          <ToolbarButton onClick={shuffle}>🎲 Mezclar</ToolbarButton>
        </>
      }
      sections={[
        {
          id: "navbar",
          source: "compuesto",
          note: "base común (no se mezcla, para que el marco se mantenga estable)",
          render: () => (
            <header className="border-b">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span className="font-semibold">{brand}</span>
                <nav className="text-muted-foreground hidden gap-6 text-sm md:flex">
                  {nav.map((n) => (
                    <a key={n} href="#" className="hover:text-foreground">
                      {n}
                    </a>
                  ))}
                </nav>
              </div>
            </header>
          ),
        },
        {
          id: "hero",
          source: "oficial",
          note: `${heroPick.lib} (elegido al azar entre ${HERO_POOL.map((p) => p.lib).join(" / ")})`,
          render: () => <Swap id={heroPick.lib}>{heroPick.render()}</Swap>,
        },
        {
          id: "features",
          source: "oficial",
          note: `${featuresPick.lib} (elegido al azar entre ${FEATURES_POOL.map((p) => p.lib).join(" / ")})`,
          render: () => <Swap id={featuresPick.lib}>{featuresPick.render()}</Swap>,
        },
        {
          id: "cards",
          source: "oficial",
          note: `${cardsPick.lib} (elegido al azar entre ${CARDS_POOL.map((p) => p.lib).join(" / ")})`,
          render: () => <Swap id={cardsPick.lib}>{cardsPick.render()}</Swap>,
        },
        {
          id: "gallery",
          source: "oficial",
          note: `${galleryPick.lib} (elegido al azar entre ${GALLERY_POOL.map((p) => p.lib).join(" / ")})`,
          render: () => <Swap id={galleryPick.lib}>{galleryPick.render()}</Swap>,
        },
        {
          id: "footer",
          source: "compuesto",
          note: "base común (no se mezcla, para que el marco se mantenga estable)",
          render: () => (
            <footer className="bg-muted/40 border-t">
              <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                  <span className="font-semibold">{brand}</span>
                </div>
                {footer.columns.map((c) => (
                  <div key={c.title}>
                    <h4 className="text-sm font-medium">{c.title}</h4>
                    <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
                      {c.links.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mx-auto max-w-6xl px-6 py-6 text-sm">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
