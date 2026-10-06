import { useState } from "react";
import { ArrowRight, ChevronDown, Menu as MenuIcon } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";
import { Button } from "@/libs/react-aria/ui/Button";
import { GridList, GridListItem } from "@/libs/react-aria/ui/GridList";
import { Link } from "@/libs/react-aria/ui/Link";
import { Menu, MenuItem, MenuTrigger } from "@/libs/react-aria/ui/Menu";
import { Separator } from "@/libs/react-aria/ui/Separator";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@/libs/react-aria/ui/Tabs";
import { TextField } from "@/libs/react-aria/ui/TextField";
import { ToggleButton } from "@/libs/react-aria/ui/ToggleButton";
import { ToggleButtonGroup } from "@/libs/react-aria/ui/ToggleButtonGroup";

// React Aria (Adobe) es headless: aquí se usan sus componentes de arranque con Tailwind (registro oficial "tailwind-*").
function Gallery() {
  const [selected, setSelected] = useState(new Set(["0"]));
  const i = Number([...selected][0] ?? 0);
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <img src={gallery[i].src} alt={gallery[i].alt} className="aspect-video w-full rounded-xl object-cover" />
      <ToggleButtonGroup
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selected}
        onSelectionChange={(k) => setSelected(k as Set<string>)}
        className="mt-4 flex-wrap justify-center"
      >
        {gallery.map((g, idx) => (
          <ToggleButton key={idx} id={String(idx)}>
            {g.caption}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "compuesto",
          note: "MenuTrigger + Menu + Link + Button · móvil: Menu",
          render: () => (
            <header className="border-b border-neutral-200">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span className="font-semibold">{brand}</span>
                <nav className="hidden items-center gap-5 text-sm md:flex">
                  <MenuTrigger>
                    <Button variant="quiet">
                      <span>{nav[1]}</span> <ChevronDown className="size-4" />
                    </Button>
                    <Menu>
                      {features.slice(0, 4).map((f) => (
                        <MenuItem key={f.title}>{f.title}</MenuItem>
                      ))}
                    </Menu>
                  </MenuTrigger>
                  {nav.slice(2).map((n) => (
                    <Link key={n} href="#">
                      {n}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-2">
                  <Button className="hidden sm:inline-flex">Ingresar</Button>
                  {/* Menú móvil: MenuTrigger + Menu del kit de React Aria */}
                  <div className="md:hidden">
                    <MenuTrigger>
                      <Button variant="quiet" aria-label="Abrir menú">
                        <MenuIcon className="size-5" />
                      </Button>
                      <Menu placement="bottom end">
                        {nav.map((n) => (
                          <MenuItem key={n}>{n}</MenuItem>
                        ))}
                      </Menu>
                    </MenuTrigger>
                  </div>
                </div>
              </div>
            </header>
          ),
        },
        {
          id: "hero",
          source: "compuesto",
          note: "Button (variantes primary y secondary)",
          render: () => (
            <div className="mx-auto max-w-4xl px-6 py-24 text-center">
              <p className="text-sm font-medium text-blue-600">{hero.eyebrow}</p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-neutral-900">{hero.title}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {/* el texto va en <span>: con un solo elemento <svg> el kit lo trata como botón de solo ícono */}
                <Button>
                  <span>{hero.primary}</span> <ArrowRight className="size-4" />
                </Button>
                <Button variant="secondary">{hero.secondary}</Button>
              </div>
            </div>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "Tabs (navegables con teclado)",
          render: () => (
            <div className="mx-auto max-w-5xl px-6 py-16">
              <Tabs>
                <div className="-mx-6 overflow-x-auto px-6">
                <TabList aria-label="Características" className="w-max">
                  {features.slice(0, 4).map((f, i) => (
                    <Tab key={i} id={String(i)} className="whitespace-nowrap">
                      {f.title}
                    </Tab>
                  ))}
                </TabList>
                </div>
                <TabPanels>
                  {features.slice(0, 4).map((f, i) => {
                    const Icon = featureIcons[f.icon];
                    return (
                      <TabPanel key={i} id={String(i)}>
                        <div className="grid items-center gap-8 py-6 md:grid-cols-2">
                          <div>
                            <Icon className="size-6 text-blue-600" />
                            <h3 className="mt-4 text-2xl font-semibold">{f.title}</h3>
                            <p className="mt-2 text-neutral-600">{f.text}</p>
                          </div>
                          <img src={gallery[i + 1].src} alt="" className="aspect-video w-full rounded-xl object-cover" />
                        </div>
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </Tabs>
            </div>
          ),
        },
        {
          id: "cards",
          source: "compuesto",
          note: "GridList (lista seleccionable y accesible)",
          render: () => (
            <div className="mx-auto max-w-3xl px-6 py-16">
              <GridList aria-label="Proyectos" className="w-full" selectionMode="multiple" items={cards.map((c) => ({ id: c.title, ...c }))}>
                {(c) => (
                  <GridListItem textValue={c.title}>
                    <img src={c.image} alt="" className="size-14 rounded-md object-cover" />
                    <div>
                      <div className="font-medium">{c.title}</div>
                      <div className="text-sm text-neutral-500">{c.text}</div>
                    </div>
                  </GridListItem>
                )}
              </GridList>
            </div>
          ),
        },
        { id: "gallery", source: "compuesto", note: "ToggleButtonGroup como selector de imagen (no trae carrusel)", render: () => <Gallery /> },
        {
          id: "footer",
          source: "compuesto",
          note: "TextField + Button + Separator + Link",
          render: () => (
            <footer className="bg-neutral-50">
              <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                  <span className="font-semibold">{brand}</span>
                  <div className="mt-4 flex items-end gap-2">
                    <TextField label="Correo" placeholder="tu@correo.com" />
                    <Button>Unirme</Button>
                  </div>
                </div>
                {footer.columns.map((c) => (
                  <div key={c.title}>
                    <h4 className="text-sm font-medium">{c.title}</h4>
                    <ul className="mt-3 space-y-2 text-sm">
                      {c.links.map((l) => (
                        <li key={l}>
                          <Link href="#">{l}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="mx-auto max-w-6xl px-6 py-6 text-sm text-neutral-500">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
