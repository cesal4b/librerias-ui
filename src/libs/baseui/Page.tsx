import { Button } from "@base-ui/react/button";
import { Input } from "@base-ui/react/input";
import { Menu } from "@base-ui/react/menu";
import { Separator } from "@base-ui/react/separator";
import { Tabs } from "@base-ui/react/tabs";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { useState } from "react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";
import ExampleAccordion from "./demos/accordion";
import ExampleNavigationMenu from "./demos/navigation-menu";
import ExamplePreviewCard from "./demos/preview-card";

// Base UI (equipo de MUI/Radix) es headless: no trae estilos. Las clases replican las de sus demos oficiales con Tailwind.
const btn =
  "flex h-10 items-center justify-center gap-2 rounded-none border border-neutral-950 bg-white px-4 text-sm whitespace-nowrap text-neutral-950 select-none hover:bg-neutral-100 active:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-neutral-950";
const btnSolid = btn.replace("bg-white", "bg-neutral-950").replace("text-neutral-950", "text-white").replace("hover:bg-neutral-100", "hover:bg-neutral-800");
const tab =
  "flex h-[calc(2rem+1px)] items-center px-3 text-sm whitespace-nowrap text-neutral-600 outline-none select-none hover:text-neutral-950 data-active:text-neutral-950 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950";

// Clases del demo oficial de Menu (Tailwind) de Base UI
const menuItem =
  "flex cursor-default py-2 pr-8 pl-4 text-sm leading-4 outline-hidden select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-white data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:bg-neutral-950 data-highlighted:before:content-['']";

/** Menú móvil con Menu de Base UI */
function MobileMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger aria-label="Abrir menú" className="flex size-10 items-center justify-center border border-neutral-950 bg-white hover:bg-neutral-100 data-popup-open:bg-neutral-100">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 4.5h14M2 9h14M2 13.5h14" />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="outline-hidden" sideOffset={8} align="end">
          <Menu.Popup className="relative min-w-48 origin-[var(--transform-origin)] border border-neutral-950 bg-white py-1 text-neutral-950 shadow-[0.25rem_0.25rem_0] shadow-black/12 outline-hidden transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
            {nav.map((n) => (
              <Menu.Item key={n} className={menuItem}>
                {n}
              </Menu.Item>
            ))}
            <Menu.Separator className="mx-1 my-1 h-px bg-neutral-950" />
            <Menu.Item className={menuItem}>Ingresar</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

function Gallery() {
  const [value, setValue] = useState(["0"]);
  const i = Number(value[0] ?? 0);
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <img src={gallery[i].src} alt={gallery[i].alt} className="aspect-video w-full border border-neutral-950 object-cover" />
      <ToggleGroup value={value} onValueChange={(v) => v.length && setValue(v)} className="mt-[-1px] flex border border-neutral-950">
        {gallery.map((g, idx) => (
          <Toggle
            key={idx}
            value={String(idx)}
            className="h-10 flex-1 border-r border-neutral-950 text-sm last:border-r-0 hover:bg-neutral-100 data-pressed:bg-neutral-950 data-pressed:text-white"
          >
            {g.caption}
          </Toggle>
        ))}
      </ToggleGroup>
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
          note: "demo oficial de NavigationMenu (Tailwind) · móvil: Menu",
          render: () => (
            <header className="flex items-center justify-between border-b border-neutral-950 px-6 py-3">
              <span className="font-semibold">{brand}</span>
              <div className="hidden md:block">
                <ExampleNavigationMenu />
              </div>
              <div className="flex items-center gap-2">
                <Button className={btnSolid + " hidden sm:flex"}>Ingresar</Button>
                <div className="md:hidden">
                  <MobileMenu />
                </div>
              </div>
            </header>
          ),
        },
        {
          id: "hero",
          source: "compuesto",
          note: "Button con el estilo de las demos",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-24">
              <p className="font-mono text-xs tracking-widest uppercase">{hero.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-6xl">{hero.title}</h1>
              <p className="mt-6 max-w-2xl text-lg text-neutral-600">{hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className={btnSolid}>{hero.primary}</Button>
                <Button className={btn}>{hero.secondary}</Button>
              </div>
            </div>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "Tabs (Tabs.Indicator con variables CSS)",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-16">
              <Tabs.Root defaultValue="0">
                <div className="overflow-x-auto">
                <Tabs.List className="relative z-1 -mb-px flex w-max gap-1">
                  {features.slice(0, 4).map((f, i) => (
                    <Tabs.Tab key={i} value={String(i)} className={tab}>
                      {f.title}
                    </Tabs.Tab>
                  ))}
                  <Tabs.Indicator className="absolute top-0 left-0 -z-1 h-full w-(--active-tab-width) translate-x-(--active-tab-left) border-x border-t border-neutral-950 bg-white transition-[translate,width] duration-150" />
                </Tabs.List>
                </div>
                <div className="grid border border-neutral-950">
                  {features.slice(0, 4).map((f, i) => {
                    const Icon = featureIcons[f.icon];
                    return (
                      <Tabs.Panel key={i} value={String(i)} className="col-start-1 row-start-1 grid gap-8 p-8 md:grid-cols-2 [[hidden]]:hidden">
                        <div>
                          <Icon className="size-6" strokeWidth={1.5} />
                          <h3 className="mt-4 text-2xl font-medium">{f.title}</h3>
                          <p className="mt-2 text-neutral-600">{f.text}</p>
                          <div className="mt-6">
                            <ExampleAccordion />
                          </div>
                        </div>
                        <img src={gallery[i + 1].src} alt="" className="aspect-[4/3] w-full border border-neutral-950 object-cover" />
                      </Tabs.Panel>
                    );
                  })}
                </div>
              </Tabs.Root>
            </div>
          ),
        },
        {
          id: "cards",
          source: "compuesto",
          note: "tarjetas con borde + demo oficial de PreviewCard",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="grid border-t border-l border-neutral-950 md:grid-cols-3">
                {cards.map((c) => (
                  <article key={c.title} className="border-r border-b border-neutral-950">
                    <img src={c.image} alt="" className="aspect-[4/3] w-full border-b border-neutral-950 object-cover grayscale hover:grayscale-0" />
                    <div className="p-5">
                      <p className="font-mono text-xs uppercase">{c.tag}</p>
                      <h3 className="mt-2 text-xl font-medium">{c.title}</h3>
                      <p className="mt-1 text-sm text-neutral-600">{c.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-6 text-sm">
                <ExamplePreviewCard />
              </div>
            </div>
          ),
        },
        { id: "gallery", source: "compuesto", note: "ToggleGroup como selector (Base UI no trae carrusel)", render: () => <Gallery /> },
        {
          id: "footer",
          source: "compuesto",
          note: "Input + Button + Separator",
          render: () => (
            <footer className="border-t border-neutral-950">
              <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                  <span className="font-semibold">{brand}</span>
                  <div className="mt-4 flex">
                    <Input placeholder="Tu correo" className="h-10 w-full border border-neutral-950 px-3 text-sm focus:outline-2 focus:-outline-offset-1 focus:outline-neutral-950" />
                    <Button className={btnSolid}>Unirme</Button>
                  </div>
                </div>
                {footer.columns.map((c) => (
                  <div key={c.title}>
                    <h4 className="font-mono text-xs uppercase">{c.title}</h4>
                    <ul className="mt-3 space-y-2 text-sm">
                      {c.links.map((l) => (
                        <li key={l}>
                          <a href="#" className="underline-offset-4 hover:underline">
                            {l}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Separator className="h-px bg-neutral-950" />
              <p className="mx-auto max-w-6xl px-6 py-6 font-mono text-xs">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
