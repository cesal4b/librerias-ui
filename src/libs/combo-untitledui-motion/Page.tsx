import { motion, type Variants } from "motion/react";
import { ArrowRight, BarChart10, Lightning01, Users01 } from "@untitledui/icons";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, hero } from "@/shared/content";
import { HeaderNavigationDualTierDemo } from "@/libs/untitledui/components/application/app-navigation/header-navigation.demo";
import { CarouselMd } from "@/libs/untitledui/components/application/carousel/carousel.demo";
import { BadgeGroup } from "@/libs/untitledui/components/base/badges/badge-groups";
import { Badge } from "@/libs/untitledui/components/base/badges/badges";
import { Button } from "@/libs/untitledui/components/base/buttons/button";
import { FeaturedIcon } from "@/libs/untitledui/components/foundations/featured-icon/featured-icon";

const featIcons = [Lightning01, Users01, BarChart10];

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

function HeroCombo() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <motion.div variants={fadeUp}>
        <BadgeGroup addonText="Nuevo" color="brand" theme="modern" className="mx-auto">
          Convocatoria 2027
        </BadgeGroup>
      </motion.div>
      <motion.h1 variants={fadeUp} className="text-display-lg mt-6 font-semibold tracking-tight text-primary">
        {hero.title}
      </motion.h1>
      <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-xl text-tertiary">
        {hero.subtitle}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
        <Button size="xl" color="secondary">
          {hero.secondary}
        </Button>
        <Button size="xl" iconTrailing={ArrowRight}>
          {hero.primary}
        </Button>
      </motion.div>
    </motion.div>
  );
}

function FeaturesCombo() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto max-w-6xl px-6 py-16"
    >
      <div className="grid gap-12 md:grid-cols-3">
        {features.slice(0, 3).map((f, i) => (
          <motion.div key={f.title} variants={fadeUp} className="flex flex-col items-center text-center">
            <FeaturedIcon icon={featIcons[i]} color="brand" theme="modern" size="lg" />
            <h3 className="mt-5 text-xl font-semibold text-primary">{f.title}</h3>
            <p className="mt-2 text-md text-tertiary">{f.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function CardsCombo() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3"
    >
      {cards.map((c) => (
        <motion.article key={c.title} variants={fadeUp} whileHover={{ y: -6 }}>
          <img src={c.image} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          <Badge type="pill-color" color="brand" size="md" className="mt-5">
            {c.tag}
          </Badge>
          <h3 className="mt-3 text-xl font-semibold text-primary">{c.title}</h3>
          <p className="mt-1 text-md text-tertiary">{c.text}</p>
          <Button color="link-color" iconTrailing={ArrowRight} className="mt-3">
            Ver proyecto
          </Button>
        </motion.article>
      ))}
    </motion.div>
  );
}

export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "navbar", source: "oficial", note: "demo oficial HeaderNavigation (Untitled UI, sin animar)", render: () => <HeaderNavigationDualTierDemo /> },
        {
          id: "hero",
          source: "compuesto",
          note: "BadgeGroup + Button (Untitled UI) + motion (stagger fade-in)",
          render: () => <HeroCombo />,
        },
        {
          id: "features",
          source: "compuesto",
          note: "FeaturedIcon (Untitled UI) + motion (whileInView con stagger)",
          render: () => <FeaturesCombo />,
        },
        {
          id: "cards",
          source: "compuesto",
          note: "Badge + Button link (Untitled UI) + motion (stagger de entrada + hover-lift)",
          render: () => <CardsCombo />,
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "demo oficial Carousel md (Untitled UI) + motion (entrada con fundido)",
          render: () => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center px-6 py-16"
            >
              <CarouselMd />
            </motion.div>
          ),
        },
        {
          id: "footer",
          source: "compuesto",
          note: "Button link-gray (Untitled UI, sin animar)",
          render: () => (
            <footer className="bg-secondary">
              <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
                <div>
                  <span className="text-lg font-semibold text-primary">{brand}</span>
                  <p className="mt-3 text-md text-tertiary">Diseño y prototipado con IA.</p>
                </div>
                {footer.columns.map((c) => (
                  <div key={c.title}>
                    <h4 className="text-sm font-semibold text-quaternary">{c.title}</h4>
                    <ul className="mt-4 space-y-3">
                      {c.links.map((l) => (
                        <li key={l}>
                          <Button color="link-gray" size="lg">
                            {l}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mx-auto max-w-6xl border-t border-secondary px-6 py-8 text-md text-quaternary">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
