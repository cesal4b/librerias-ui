import { ArrowRight, BarChart10, Lightning01, Users01 } from "@untitledui/icons";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, hero } from "@/shared/content";
import { HeaderNavigationDualTierDemo } from "./components/application/app-navigation/header-navigation.demo";
import { CarouselMd } from "./components/application/carousel/carousel.demo";
import { BadgeGroup } from "./components/base/badges/badge-groups";
import { Badge } from "./components/base/badges/badges";
import { Button } from "./components/base/buttons/button";
import { FeaturedIcon } from "./components/foundations/featured-icon/featured-icon";

// Untitled UI React (parte gratuita, MIT): React Aria + Tailwind v4 + sus tokens de diseño.
const featIcons = [Lightning01, Users01, BarChart10];

export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "navbar", source: "oficial", note: "demo oficial HeaderNavigation (dual tier)", render: () => <HeaderNavigationDualTierDemo /> },
        {
          id: "hero",
          source: "compuesto",
          note: "BadgeGroup + Button (las secciones de marketing son PRO)",
          render: () => (
            <div className="mx-auto max-w-4xl px-6 py-24 text-center">
              <BadgeGroup addonText="Nuevo" color="brand" theme="modern" className="mx-auto">
                Convocatoria 2027
              </BadgeGroup>
              <h1 className="text-display-lg mt-6 font-semibold tracking-tight text-primary">{hero.title}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-tertiary">{hero.subtitle}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button size="xl" color="secondary">
                  {hero.secondary}
                </Button>
                <Button size="xl" iconTrailing={ArrowRight}>
                  {hero.primary}
                </Button>
              </div>
            </div>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "FeaturedIcon (tema modern)",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="grid gap-12 md:grid-cols-3">
                {features.slice(0, 3).map((f, i) => (
                  <div key={f.title} className="flex flex-col items-center text-center">
                    <FeaturedIcon icon={featIcons[i]} color="brand" theme="modern" size="lg" />
                    <h3 className="mt-5 text-xl font-semibold text-primary">{f.title}</h3>
                    <p className="mt-2 text-md text-tertiary">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          id: "cards",
          source: "compuesto",
          note: "Badge (pill-color) + Button link",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
              {cards.map((c) => (
                <article key={c.title}>
                  <img src={c.image} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                  <Badge type="pill-color" color="brand" size="md" className="mt-5">
                    {c.tag}
                  </Badge>
                  <h3 className="mt-3 text-xl font-semibold text-primary">{c.title}</h3>
                  <p className="mt-1 text-md text-tertiary">{c.text}</p>
                  <Button color="link-color" iconTrailing={ArrowRight} className="mt-3">
                    Ver proyecto
                  </Button>
                </article>
              ))}
            </div>
          ),
        },
        {
          id: "gallery",
          source: "oficial",
          note: "demo oficial Carousel (md)",
          render: () => (
            <div className="flex justify-center px-6 py-16">
              <CarouselMd />
            </div>
          ),
        },
        {
          id: "footer",
          source: "compuesto",
          note: "Button link-gray",
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
