import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";

// Tailwind Plus (antes Tailwind UI) es de pago: no se incluye su código.
// Esta página es una REFERENCIA hecha con Headless UI + Heroicons (gratis, de Tailwind Labs),
// que es la capa interactiva que usan sus bloques, para mostrar el estilo típico.
/** Menú móvil: panel lateral con Dialog de Headless UI (el patrón de los headers de Tailwind Plus) */
function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex lg:hidden">
      <button type="button" onClick={() => setOpen(true)} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Abrir menú</span>
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>
      <Dialog open={open} onClose={setOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="text-sm/6 font-semibold text-gray-900">{brand}</span>
            <button type="button" onClick={() => setOpen(false)} className="-m-2.5 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {nav.map((n) => (
                <a key={n} href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  {n}
                </a>
              ))}
            </div>
            <div className="py-6">
              <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                Ingresar
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  );
}

export default function Page() {
  return (
    <div className="bg-white font-[Inter,ui-sans-serif,system-ui]">
      <Showcase
        sections={[
          {
            id: "navbar",
            source: "referencia",
            note: "Popover de Headless UI (flyout) · móvil: Dialog",
            render: () => (
              <header className="relative isolate z-10 bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                  <span className="text-sm/6 font-semibold text-gray-900">{brand}</span>
                  <div className="hidden lg:flex lg:gap-x-12">
                    <Popover>
                      <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 outline-none">
                        {nav[1]}
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                      </PopoverButton>
                      <PopoverPanel transition className="absolute inset-x-0 top-0 -z-10 bg-white pt-16 shadow-lg ring-1 ring-gray-900/5 transition data-closed:-translate-y-1 data-closed:opacity-0">
                        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                          {features.slice(0, 4).map((f) => {
                            const Icon = featureIcons[f.icon];
                            return (
                              <div key={f.title} className="group relative rounded-lg p-6 text-sm/6 hover:bg-gray-50">
                                <div className="flex size-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                  <Icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                                </div>
                                <a href="#" className="mt-6 block font-semibold text-gray-900">
                                  {f.title}
                                </a>
                                <p className="mt-1 text-gray-600">{f.text}</p>
                              </div>
                            );
                          })}
                        </div>
                      </PopoverPanel>
                    </Popover>
                    {nav.slice(2).map((n) => (
                      <a key={n} href="#" className="text-sm/6 font-semibold text-gray-900">
                        {n}
                      </a>
                    ))}
                  </div>
                  <a href="#" className="hidden text-sm/6 font-semibold text-gray-900 lg:block">
                    Ingresar <span aria-hidden="true">&rarr;</span>
                  </a>
                  <MobileNav />
                </nav>
              </header>
            ),
          },
          {
            id: "hero",
            source: "referencia",
            note: "patrón de hero centrado con degradado (solo Tailwind)",
            render: () => (
              <div className="relative isolate overflow-hidden px-6 pt-14 lg:px-8">
                <div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                  <div
                    style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}
                    className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
                  />
                </div>
                <div className="mx-auto max-w-2xl py-28 text-center">
                  <div className="mb-8 inline-flex rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    {hero.eyebrow}.{" "}
                    <a href="#" className="ml-1 font-semibold text-indigo-600">
                      Leer más <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                  <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">{hero.title}</h1>
                  <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">{hero.subtitle}</p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500">
                      {hero.primary}
                    </a>
                    <a href="#" className="text-sm/6 font-semibold text-gray-900">
                      {hero.secondary} <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: "features",
            source: "referencia",
            note: "patrón de lista de features con íconos (solo Tailwind)",
            render: () => (
              <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                  <h2 className="text-base/7 font-semibold text-indigo-600">Más rápido</h2>
                  <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">Todo lo que necesitas para prototipar</p>
                </div>
                <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-4xl lg:grid-cols-2 lg:gap-y-16">
                  {features.slice(0, 4).map((f) => {
                    const Icon = featureIcons[f.icon];
                    return (
                      <div key={f.title} className="relative pl-16">
                        <dt className="text-base/7 font-semibold text-gray-900">
                          <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                            <Icon aria-hidden="true" className="size-6 text-white" />
                          </div>
                          {f.title}
                        </dt>
                        <dd className="mt-2 text-base/7 text-gray-600">{f.text}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ),
          },
          {
            id: "cards",
            source: "referencia",
            note: "tarjetas + Disclosure de Headless UI",
            render: () => (
              <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-3 lg:px-8">
                {cards.map((c) => (
                  <article key={c.title} className="flex flex-col">
                    <img src={c.image} alt="" className="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-2/1 lg:aspect-3/2" />
                    <div className="mt-6 flex items-center gap-x-4 text-xs">
                      <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">{c.tag}</span>
                    </div>
                    <h3 className="mt-3 text-lg/6 font-semibold text-gray-900">{c.title}</h3>
                    <Disclosure>
                      <DisclosureButton className="group mt-2 flex items-center gap-1 text-sm font-semibold text-indigo-600">
                        Detalles <ChevronUpIcon className="size-4 group-data-open:rotate-180" />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 text-sm/6 text-gray-600">{c.text}</DisclosurePanel>
                    </Disclosure>
                  </article>
                ))}
              </div>
            ),
          },
          {
            id: "gallery",
            source: "referencia",
            note: "TabGroup de Headless UI como galería",
            render: () => (
              <div className="mx-auto max-w-5xl px-6 py-16">
                <TabGroup>
                  <TabPanels>
                    {gallery.map((g) => (
                      <TabPanel key={g.src}>
                        <img src={g.src} alt={g.alt} className="aspect-video w-full rounded-lg object-cover" />
                      </TabPanel>
                    ))}
                  </TabPanels>
                  <TabList className="mt-4 grid grid-cols-6 gap-3">
                    {gallery.map((g) => (
                      <Tab key={g.src} className="overflow-hidden rounded-md opacity-60 ring-indigo-500 outline-none data-hover:opacity-90 data-selected:opacity-100 data-selected:ring-2">
                        <img src={g.src.replace("1600/1000", "320/200")} alt="" className="aspect-video w-full object-cover" />
                      </Tab>
                    ))}
                  </TabList>
                </TabGroup>
              </div>
            ),
          },
          {
            id: "footer",
            source: "referencia",
            note: "patrón de footer de 4 columnas (solo Tailwind)",
            render: () => (
              <footer className="bg-white">
                <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
                  <div className="grid gap-8 xl:grid-cols-3">
                    <div className="space-y-4">
                      <span className="text-sm/6 font-semibold text-gray-900">{brand}</span>
                      <p className="text-sm/6 text-balance text-gray-600">{hero.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 xl:col-span-2">
                      {footer.columns.map((c) => (
                        <div key={c.title}>
                          <h3 className="text-sm/6 font-semibold text-gray-900">{c.title}</h3>
                          <ul className="mt-6 space-y-4">
                            {c.links.map((l) => (
                              <li key={l}>
                                <a href="#" className="text-sm/6 text-gray-600 hover:text-gray-900">
                                  {l}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-16 flex items-center justify-between border-t border-gray-900/10 pt-8">
                    <p className="text-sm/6 text-gray-600">{footer.copy}</p>
                    <a href="https://tailwindcss.com/plus" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm/6 font-semibold text-indigo-600">
                      Ver los bloques reales en Tailwind Plus <ArrowRightIcon className="size-4" />
                    </a>
                  </div>
                </div>
              </footer>
            ),
          },
        ]}
      />
    </div>
  );
}
