import { Avatar, Button, Card, Chip, Drawer, Input, Link, Separator, Tabs } from "@heroui/react";
import { Menu } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";

// HeroUI v3 (React Aria + Tailwind v4). No trae bloques de landing: todo se compone con sus componentes.
export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "compuesto",
          note: "Link + Button + Avatar · móvil: Drawer (v3 no trae Navbar)",
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
                  {/* Menú móvil: Drawer de HeroUI v3 */}
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
        {
          id: "hero",
          source: "compuesto",
          note: "Chip + Button",
          render: () => (
            <div className="mx-auto max-w-4xl px-6 py-24 text-center">
              <Chip color="accent">{hero.eyebrow}</Chip>
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-balance">{hero.title}</h1>
              <p className="text-muted mx-auto mt-6 max-w-2xl text-lg">{hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button size="lg">{hero.primary}</Button>
                <Button size="lg" variant="secondary">
                  {hero.secondary}
                </Button>
              </div>
            </div>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "Card (variantes default y secondary)",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => {
                const Icon = featureIcons[f.icon];
                return (
                  <Card key={f.title} variant={i % 3 === 1 ? "secondary" : "default"}>
                    <Icon className="text-accent size-6" />
                    <Card.Header>
                      <Card.Title>{f.title}</Card.Title>
                      <Card.Description>{f.text}</Card.Description>
                    </Card.Header>
                  </Card>
                );
              })}
            </div>
          ),
        },
        {
          id: "cards",
          source: "oficial",
          note: "Card + Chip + Link",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
              {cards.map((c) => (
                <Card key={c.title} className="overflow-hidden p-0">
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
              ))}
            </div>
          ),
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "Tabs con indicador animado (HeroUI no trae carrusel)",
          render: () => (
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
                    <img src={g.src} alt={g.alt} className="mt-4 aspect-video w-full rounded-2xl object-cover" />
                  </Tabs.Panel>
                ))}
              </Tabs>
            </div>
          ),
        },
        {
          id: "footer",
          source: "compuesto",
          note: "Input + Button + Separator + Link",
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
