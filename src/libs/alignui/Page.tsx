import { RiMenuLine, RiArrowRightLine, RiBarChartBoxLine, RiFlashlightLine, RiTeamLine, RiAccessibilityLine, RiFlowChart, RiSparkling2Line } from "@remixicon/react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import * as Badge from "./components/ui/badge";
import * as Button from "./components/ui/button";
import * as Divider from "./components/ui/divider";
import * as Drawer from "./components/ui/drawer";
import * as FancyButton from "./components/ui/fancy-button";
import * as Input from "./components/ui/input";
import * as LinkButton from "./components/ui/link-button";
import * as StatusBadge from "./components/ui/status-badge";
import * as TabMenu from "./components/ui/tab-menu-horizontal";

// AlignUI: componentes gratuitos del starter (github.com/alignui/alignui-nextjs-typescript-starter, MIT).
// Los bloques de marketing son de la versión PRO, así que las secciones se componen con estos componentes.
const icons = [RiFlashlightLine, RiTeamLine, RiAccessibilityLine, RiBarChartBoxLine, RiFlowChart, RiSparkling2Line];

export default function Page() {
  return (
    <div className="bg-bg-white-0 text-text-strong-950 font-sans">
      <Showcase
        sections={[
          {
            id: "navbar",
            source: "compuesto",
            note: "LinkButton + FancyButton · móvil: Drawer",
            render: () => (
              <header className="border-stroke-soft-200 border-b">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                  <span className="text-label-lg">{brand}</span>
                  <nav className="hidden gap-6 md:flex">
                    {nav.map((n) => (
                      <LinkButton.Root key={n} variant="gray" size="medium">
                        {n}
                      </LinkButton.Root>
                    ))}
                  </nav>
                  <div className="flex items-center gap-2">
                    <FancyButton.Root variant="neutral" size="small" className="hidden sm:flex">
                      Ingresar
                    </FancyButton.Root>
                    {/* Menú móvil: Drawer de AlignUI */}
                    <Drawer.Root>
                      <Drawer.Trigger asChild>
                        <Button.Root variant="neutral" mode="ghost" size="small" className="md:hidden" aria-label="Abrir menú">
                          <Button.Icon as={RiMenuLine} />
                        </Button.Root>
                      </Drawer.Trigger>
                      <Drawer.Content>
                        <Drawer.Header>
                          <Drawer.Title>{brand}</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                          <nav className="flex flex-col gap-1 p-5">
                            {nav.map((n) => (
                              <LinkButton.Root key={n} variant="gray" size="medium" className="justify-start py-2">
                                {n}
                              </LinkButton.Root>
                            ))}
                          </nav>
                        </Drawer.Body>
                        <Drawer.Footer>
                          <FancyButton.Root variant="primary" className="w-full">
                            Ingresar
                          </FancyButton.Root>
                        </Drawer.Footer>
                      </Drawer.Content>
                    </Drawer.Root>
                  </div>
                </div>
              </header>
            ),
          },
          {
            id: "hero",
            source: "compuesto",
            note: "Badge + FancyButton + Button",
            render: () => (
              <div className="mx-auto max-w-4xl px-6 py-24 text-center">
                <Badge.Root variant="lighter" color="purple" size="medium">
                  {hero.eyebrow}
                </Badge.Root>
                <h1 className="text-title-h1 mt-6">{hero.title}</h1>
                <p className="text-paragraph-lg text-text-sub-600 mx-auto mt-5 max-w-2xl">{hero.subtitle}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <FancyButton.Root variant="primary">
                    {hero.primary}
                    <FancyButton.Icon as={RiArrowRightLine} />
                  </FancyButton.Root>
                  <Button.Root variant="neutral" mode="stroke">
                    {hero.secondary}
                  </Button.Root>
                </div>
              </div>
            ),
          },
          {
            id: "features",
            source: "compuesto",
            note: "StatusBadge + tokens de color/tipografía",
            render: () => (
              <div className="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => {
                  const Icon = icons[i];
                  return (
                    <div key={f.title} className="ring-stroke-soft-200 shadow-regular-xs rounded-2xl bg-bg-white-0 p-5 ring-1 ring-inset">
                      <div className="bg-bg-weak-50 flex size-10 items-center justify-center rounded-full">
                        <Icon className="text-text-sub-600 size-5" />
                      </div>
                      <h3 className="text-label-md mt-4">{f.title}</h3>
                      <p className="text-paragraph-sm text-text-sub-600 mt-1">{f.text}</p>
                      <StatusBadge.Root status={i % 2 ? "pending" : "completed"} className="mt-4">
                        <StatusBadge.Dot />
                        {i % 2 ? "Piloto" : "Activo"}
                      </StatusBadge.Root>
                    </div>
                  );
                })}
              </div>
            ),
          },
          {
            id: "cards",
            source: "compuesto",
            note: "Badge + LinkButton",
            render: () => (
              <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
                {cards.map((c) => (
                  <article key={c.title} className="ring-stroke-soft-200 shadow-regular-xs overflow-hidden rounded-2xl ring-1 ring-inset">
                    <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" />
                    <div className="p-5">
                      <Badge.Root variant="light" color="blue" size="small">
                        {c.tag}
                      </Badge.Root>
                      <h3 className="text-label-lg mt-3">{c.title}</h3>
                      <p className="text-paragraph-sm text-text-sub-600 mt-1">{c.text}</p>
                      <LinkButton.Root variant="primary" size="medium" className="mt-3">
                        Ver proyecto <LinkButton.Icon as={RiArrowRightLine} />
                      </LinkButton.Root>
                    </div>
                  </article>
                ))}
              </div>
            ),
          },
          {
            id: "gallery",
            source: "compuesto",
            note: "TabMenuHorizontal como selector (AlignUI no trae carrusel)",
            render: () => (
              <div className="mx-auto max-w-5xl px-6 py-16">
                <TabMenu.Root defaultValue="0">
                  <TabMenu.List>
                    {gallery.map((g, i) => (
                      <TabMenu.Trigger key={i} value={String(i)}>
                        {g.caption}
                      </TabMenu.Trigger>
                    ))}
                  </TabMenu.List>
                  {gallery.map((g, i) => (
                    <TabMenu.Content key={i} value={String(i)}>
                      <img src={g.src} alt={g.alt} className="mt-6 aspect-video w-full rounded-2xl object-cover" />
                    </TabMenu.Content>
                  ))}
                </TabMenu.Root>
              </div>
            ),
          },
          {
            id: "footer",
            source: "compuesto",
            note: "Input + Button + Divider",
            render: () => (
              <footer className="bg-bg-weak-50">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
                  <div>
                    <span className="text-label-lg">{brand}</span>
                    <div className="mt-4 flex gap-2">
                      <Input.Root size="small">
                        <Input.Wrapper>
                          <Input.Input placeholder="Tu correo" />
                        </Input.Wrapper>
                      </Input.Root>
                      <Button.Root size="small">Unirme</Button.Root>
                    </div>
                  </div>
                  {footer.columns.map((c) => (
                    <div key={c.title}>
                      <h4 className="text-subheading-xs text-text-soft-400 uppercase">{c.title}</h4>
                      <ul className="mt-3 space-y-2">
                        {c.links.map((l) => (
                          <li key={l}>
                            <LinkButton.Root variant="gray" size="medium">
                              {l}
                            </LinkButton.Root>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Divider.Root />
                <p className="text-paragraph-sm text-text-sub-600 mx-auto max-w-6xl px-6 py-6">{footer.copy}</p>
              </footer>
            ),
          },
        ]}
      />
    </div>
  );
}
