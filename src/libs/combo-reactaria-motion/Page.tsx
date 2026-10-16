import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
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

// React Aria es headless (componentes del kit "tailwind-*", sin estilos propios): aquí se anima
// envolviendo cada bloque en motion.div, nunca el Button/GridListItem/ToggleButton en sí (son el
// nodo interactivo/accesible real del kit; envolverlos evita interferir con sus estados de foco).
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

function HeroCombo() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <motion.p variants={fadeUp} className="text-sm font-medium text-blue-600">
        {hero.eyebrow}
      </motion.p>
      <motion.h1 variants={fadeUp} className="mt-4 text-5xl font-semibold tracking-tight text-balance text-neutral-900">
        {hero.title}
      </motion.h1>
      <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600">
        {hero.subtitle}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
        <Button>
          <span>{hero.primary}</span> <ArrowRight className="size-4" />
        </Button>
        <Button variant="secondary">{hero.secondary}</Button>
      </motion.div>
    </motion.div>
  );
}

function FeaturesCombo() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      className="mx-auto max-w-5xl px-6 py-16"
    >
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
                <motion.div variants={stagger} initial="hidden" animate="show" className="grid items-center gap-8 py-6 md:grid-cols-2">
                  <motion.div variants={fadeUp}>
                    <Icon className="size-6 text-blue-600" />
                    <h3 className="mt-4 text-2xl font-semibold">{f.title}</h3>
                    <p className="mt-2 text-neutral-600">{f.text}</p>
                  </motion.div>
                  <motion.img variants={fadeUp} src={gallery[i + 1].src} alt="" className="aspect-video w-full rounded-xl object-cover" />
                </motion.div>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
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
      className="mx-auto max-w-3xl px-6 py-16"
    >
      <GridList aria-label="Proyectos" className="w-full" selectionMode="multiple" items={cards.map((c) => ({ id: c.title, ...c }))}>
        {(c) => (
          <GridListItem textValue={c.title}>
            <motion.div variants={fadeUp} whileHover={{ x: 4 }} className="flex items-center gap-3">
              <img src={c.image} alt="" className="size-14 rounded-md object-cover" />
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-neutral-500">{c.text}</div>
              </div>
            </motion.div>
          </GridListItem>
        )}
      </GridList>
    </motion.div>
  );
}

function GalleryCombo() {
  const [selected, setSelected] = useState(new Set(["0"]));
  const i = Number([...selected][0] ?? 0);
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <AnimatePresence mode="wait">
        <motion.img
          key={gallery[i].src}
          src={gallery[i].src}
          alt={gallery[i].alt}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="aspect-video w-full rounded-xl object-cover"
        />
      </AnimatePresence>
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
          note: "MenuTrigger + Menu + Link + Button (React Aria, sin animar)",
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
          note: "Button (React Aria) + motion (stagger fade-in)",
          render: () => <HeroCombo />,
        },
        {
          id: "features",
          source: "compuesto",
          note: "Tabs (React Aria) + motion (whileInView con stagger por panel)",
          render: () => <FeaturesCombo />,
        },
        {
          id: "cards",
          source: "compuesto",
          note: "GridList (React Aria) + motion (stagger de entrada + hover)",
          render: () => <CardsCombo />,
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "ToggleButtonGroup (React Aria) + motion (fundido de la imagen al cambiar de selección)",
          render: () => <GalleryCombo />,
        },
        {
          id: "footer",
          source: "compuesto",
          note: "TextField + Button + Separator + Link (React Aria, sin animar)",
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
