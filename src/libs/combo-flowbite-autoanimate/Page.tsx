import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  Badge,
  Button,
  Card,
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, img, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";

// @formkit/auto-animate: un solo hook por contenedor, sin escribir ninguna animación: anima solo
// lo que cambia (filtrar, reordenar, mezclar) en sus hijos directos.
const categories = ["Todas", "Producto", "Datos", "Comunidad"] as const;
const featureCategory: Record<string, (typeof categories)[number]> = {
  "Prototipado rápido": "Producto",
  "Investigación con usuarios": "Datos",
  "Diseño accesible": "Producto",
  "Datos en tiempo real": "Datos",
  Automatización: "Producto",
  Comunidad: "Comunidad",
};
const popularOrder = ["Coffee networking", "Cero papel", "Generador de piezas"];

function FeaturesAutoAnimate() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todas");
  const [gridRef] = useAutoAnimate<HTMLDivElement>();
  const list = filter === "Todas" ? features : features.filter((f) => featureCategory[f.title] === filter);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-gray-900">Pensado para equipos que prototipan rápido</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Button key={c} size="xs" color={filter === c ? "blue" : "alternative"} onClick={() => setFilter(c)}>
              {c}
            </Button>
          ))}
        </div>
      </div>
      <div ref={gridRef} className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {list.map((f) => {
          const Icon = featureIcons[f.icon];
          return (
            <div key={f.title}>
              <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-blue-100 lg:size-12">
                <Icon className="size-5 text-blue-600" />
              </div>
              <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
              <p className="text-gray-500">{f.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CardsAutoAnimate() {
  const [popular, setPopular] = useState(false);
  const [gridRef] = useAutoAnimate<HTMLDivElement>();
  const list = popular ? [...cards].sort((a, b) => popularOrder.indexOf(a.title) - popularOrder.indexOf(b.title)) : cards;
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16">
      <div className="mb-6 flex justify-end">
        <Button size="sm" color="alternative" onClick={() => setPopular((p) => !p)}>
          {popular ? "Orden original" : "Más popular primero"}
        </Button>
      </div>
      <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
        {list.map((c) => (
          <Card key={c.title} imgAlt="" imgSrc={c.image}>
            <Badge color="success" className="w-fit">
              {c.tag}
            </Badge>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900">{c.title}</h5>
            <p className="font-normal text-gray-700">{c.text}</p>
            <Button>Ver proyecto</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GalleryAutoAnimate() {
  const [order, setOrder] = useState(gallery);
  const [trackRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16">
      <div className="mb-6 flex justify-end">
        <Button size="sm" color="alternative" onClick={() => setOrder((o) => [...o].sort(() => Math.random() - 0.5))}>
          🔀 Mezclar orden
        </Button>
      </div>
      <div ref={trackRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {order.map((g) => (
          <figure key={g.src} className="overflow-hidden rounded-lg">
            <img src={g.src} alt={g.alt} className="aspect-video w-full object-cover" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "oficial",
          note: "Navbar (NavbarBrand, NavbarCollapse, NavbarLink) (Flowbite, sin animar)",
          render: () => (
            <Navbar fluid rounded className="border-b border-gray-200">
              <NavbarBrand href="#">
                <span className="self-center text-xl font-semibold whitespace-nowrap">{brand}</span>
              </NavbarBrand>
              <div className="flex md:order-2">
                <Button size="sm">Ingresar</Button>
                <NavbarToggle />
              </div>
              <NavbarCollapse>
                {nav.map((n, i) => (
                  <NavbarLink key={n} href="#" active={i === 0}>
                    {n}
                  </NavbarLink>
                ))}
              </NavbarCollapse>
            </Navbar>
          ),
        },
        {
          id: "hero",
          source: "oficial",
          note: "estilo «Jumbotron» de Flowbite (sin animar)",
          render: () => (
            <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{ backgroundImage: `url(${img("lab-fb-combo-hero", 1800, 900)})` }}>
              <div className="mx-auto max-w-screen-xl px-4 py-24 text-center lg:py-40">
                <Badge color="info" className="mx-auto w-fit">
                  {hero.eyebrow}
                </Badge>
                <h1 className="mt-4 mb-4 text-4xl leading-none font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">{hero.title}</h1>
                <p className="mb-8 text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl">{hero.subtitle}</p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg">{hero.primary}</Button>
                  <Button size="lg" color="alternative">
                    {hero.secondary}
                  </Button>
                </div>
              </div>
            </section>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "patrón «Feature section» (Flowbite) + @formkit/auto-animate (filtro por categoría)",
          render: () => <FeaturesAutoAnimate />,
        },
        {
          id: "cards",
          source: "compuesto",
          note: "Card (Flowbite) + @formkit/auto-animate (reordenar con «Más popular primero»)",
          render: () => <CardsAutoAnimate />,
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "grilla de imágenes (Flowbite no trae grilla; aquí no es Carousel, para poder reordenar) + @formkit/auto-animate (botón «Mezclar orden»)",
          render: () => <GalleryAutoAnimate />,
        },
        {
          id: "footer",
          source: "oficial",
          note: "Footer (FooterBrand, FooterLinkGroup, FooterCopyright) (Flowbite, sin animar)",
          render: () => (
            <Footer container className="rounded-none border-t">
              <div className="w-full">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                  <FooterBrand href="#" src="https://flowbite.com/docs/images/logo.svg" alt="" name={brand} />
                  <div className="mt-6 grid grid-cols-3 gap-8 sm:mt-4 sm:gap-6">
                    {footer.columns.map((c) => (
                      <div key={c.title}>
                        <FooterTitle title={c.title} />
                        <FooterLinkGroup col>
                          {c.links.map((l) => (
                            <FooterLink key={l} href="#">
                              {l}
                            </FooterLink>
                          ))}
                        </FooterLinkGroup>
                      </div>
                    ))}
                  </div>
                </div>
                <FooterDivider />
                <FooterCopyright href="#" by={brand} year={new Date().getFullYear()} />
              </div>
            </Footer>
          ),
        },
      ]}
    />
  );
}
