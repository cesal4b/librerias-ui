import {
  Badge,
  Button,
  Card,
  Carousel,
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

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "oficial",
          note: "Navbar (NavbarBrand, NavbarCollapse, NavbarLink)",
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
          source: "compuesto",
          note: "estilo «Jumbotron» de Flowbite con Badge + Button",
          render: () => (
            <section className="bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{ backgroundImage: `url(${img("lab-fb-hero", 1800, 900)})` }}>
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
          note: "patrón de «Feature section» de Flowbite Blocks",
          render: () => (
            <div className="mx-auto max-w-screen-xl px-4 py-16">
              <h2 className="mb-10 max-w-2xl text-4xl font-extrabold tracking-tight text-gray-900">Pensado para equipos que prototipan rápido</h2>
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {features.map((f) => {
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
          ),
        },
        {
          id: "cards",
          source: "oficial",
          note: "Card con imagen",
          render: () => (
            <div className="mx-auto grid max-w-screen-xl gap-6 px-4 py-16 md:grid-cols-3">
              {cards.map((c) => (
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
          ),
        },
        {
          id: "gallery",
          source: "oficial",
          note: "Carousel",
          render: () => (
            <div className="mx-auto h-72 max-w-5xl px-4 py-10 sm:h-[28rem]">
              <Carousel slideInterval={4000}>
                {gallery.map((g) => (
                  <img key={g.src} src={g.src} alt={g.alt} className="h-full w-full object-cover" />
                ))}
              </Carousel>
            </div>
          ),
        },
        {
          id: "footer",
          source: "oficial",
          note: "Footer (FooterBrand, FooterLinkGroup, FooterCopyright)",
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
