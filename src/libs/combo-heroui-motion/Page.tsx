import { motion, type Variants } from "motion/react";
import { Avatar, Button, Card, Chip, Drawer, Input, Link, Separator, Tabs } from "@heroui/react";
import { Menu } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";

// HeroUI v3 (React Aria + Tailwind v4): se anima envolviendo cada bloque en motion.div, nunca el
// Button/Card en sí (son el nodo interactivo real del kit).
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const fadeUp: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

function HeroCombo() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="mx-auto max-w-4xl px-6 py-24 text-center">
      <motion.div variants={fadeUp}>
        <Chip color="accent">{hero.eyebrow}</Chip>
      </motion.div>
      <motion.h1 variants={fadeUp} className="mt-6 text-5xl font-bold tracking-tight text-balance">
        {hero.title}
      </motion.h1>
      <motion.p variants={fadeUp} className="text-muted mx-auto mt-6 max-w-2xl text-lg">
        {hero.subtitle}
      </motion.p>
      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg">{hero.primary}</Button>
        <Button size="lg" variant="secondary">
          {hero.secondary}
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
      className="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {features.map((f, i) => {
        const Icon = featureIcons[f.icon];
        return (
          <motion.div key={f.title} variants={fadeUp}>
            <Card variant={i % 3 === 1 ? "secondary" : "default"}>
              <Icon className="text-accent size-6" />
              <Card.Header>
                <Card.Title>{f.title}</Card.Title>
                <Card.Description>{f.text}</Card.Description>
              </Card.Header>
            </Card>
          </motion.div>
        );
      })}
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
      className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3"
    >
      {cards.map((c) => (
        <motion.div key={c.title} variants={fadeUp} whileHover={{ y: -6 }}>
          <Card className="overflow-hidden p-0">
            <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" />
            <div className="flex flex-col gap-3 p-4">
              <Card.Header>
                <Chip size="sm" color="success" className="w-fit">
                  {c.tag}
                </Chip>
                <Card.Title>{c.title}</Card.Title>
                <Card.Description>{c.text}</Card.Description>
              </Card.Header>
              <Card.Footer>
                <Link href="#">
                  Ver proyecto <Link.Icon />
                </Link>
              </Card.Footer>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function GalleryCombo() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <Tabs>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Galería">
            {gallery.map((g, i) => (
              <Tabs.Tab key={i} id={String(i)}>
                {g.caption}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
        {gallery.map((g, i) => (
          <Tabs.Panel key={i} id={String(i)}>
            <motion.img
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={g.src}
              alt={g.alt}
              className="mt-4 aspect-video w-full rounded-2xl object-cover"
            />
          </Tabs.Panel>
        ))}
      </Tabs>
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
          note: "Link + Button + Avatar (HeroUI) · móvil: Drawer (sin animar)",
          render: () => (
            <header className="border-separator border-b">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span className="font-semibold">{brand}</span>
                <nav className="hidden gap-6 md:flex">
                  {nav.map((n) => (
                    <Link key={n} href="#">
                      {n}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" className="hidden sm:inline-flex">
                    Ingresar
                  </Button>
                  <Drawer>
                    <Button isIconOnly variant="ghost" aria-label="Abrir menú" className="md:hidden">
                      <Menu className="size-5" />
                    </Button>
                    <Drawer.Backdrop>
                      <Drawer.Content placement="right">
                        <Drawer.Dialog>
                          <Drawer.CloseTrigger />
                          <Drawer.Header>
                            <Drawer.Heading>{brand}</Drawer.Heading>
                          </Drawer.Header>
                          <Drawer.Body>
                            <nav className="flex flex-col gap-4">
                              {nav.map((n) => (
                                <Link key={n} href="#">
                                  {n}
                                </Link>
                              ))}
                            </nav>
                          </Drawer.Body>
                        </Drawer.Dialog>
                      </Drawer.Content>
                    </Drawer.Backdrop>
                  </Drawer>
                  <Avatar>
                    <Avatar.Image src="https://i.pravatar.cc/80?img=32" alt="" />
                    <Avatar.Fallback>LB</Avatar.Fallback>
                  </Avatar>
                </div>
              </div>
            </header>
          ),
        },
        { id: "hero", source: "compuesto", note: "Chip + Button (HeroUI) + motion (stagger fade-in)", render: () => <HeroCombo /> },
        { id: "features", source: "compuesto", note: "Card (HeroUI) + motion (whileInView con stagger)", render: () => <FeaturesCombo /> },
        { id: "cards", source: "compuesto", note: "Card + Chip + Link (HeroUI) + motion (stagger de entrada + hover-lift)", render: () => <CardsCombo /> },
        { id: "gallery", source: "compuesto", note: "Tabs (HeroUI, sin carrusel propio) + motion (fundido de la imagen por pestaña)", render: () => <GalleryCombo /> },
        {
          id: "footer",
          source: "compuesto",
          note: "Input + Button + Separator + Link (HeroUI, sin animar)",
          render: () => (
            <footer className="bg-surface">
              <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                  <span className="font-semibold">{brand}</span>
                  <div className="mt-4 flex gap-2">
                    <Input aria-label="Correo" placeholder="Tu correo" />
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
              <p className="text-muted mx-auto max-w-6xl px-6 py-6 text-sm">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
