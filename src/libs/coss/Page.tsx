import { ArrowRight, ChevronDown, Menu as MenuIcon } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";
import { Badge } from "@/libs/coss/ui/badge";
import { Button } from "@/libs/coss/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/libs/coss/ui/card";
import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from "@/libs/coss/ui/frame";
import { Input } from "@/libs/coss/ui/input";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/libs/coss/ui/menu";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@/libs/coss/ui/preview-card";
import { Separator } from "@/libs/coss/ui/separator";
import { Sheet, SheetHeader, SheetPanel, SheetPopup, SheetTitle, SheetTrigger } from "@/libs/coss/ui/sheet";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/libs/coss/ui/tabs";

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "compuesto",
          note: "Menu + Button · móvil: Sheet (COSS no trae navbar)",
          render: () => (
            <header className="border-b">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span className="font-semibold">{brand}</span>
                <nav className="hidden items-center gap-1 md:flex">
                  <Menu>
                    <MenuTrigger render={<Button variant="ghost" />}>
                      {nav[1]} <ChevronDown />
                    </MenuTrigger>
                    <MenuPopup>
                      {features.slice(0, 4).map((f) => (
                        <MenuItem key={f.title}>{f.title}</MenuItem>
                      ))}
                    </MenuPopup>
                  </Menu>
                  {nav.slice(2).map((n) => (
                    <Button key={n} variant="ghost">
                      {n}
                    </Button>
                  ))}
                </nav>
                <div className="flex items-center gap-2">
                  <Button className="hidden sm:inline-flex">Ingresar</Button>
                  {/* Menú móvil: Sheet de COSS */}
                  <Sheet>
                    <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú" />}>
                      <MenuIcon />
                    </SheetTrigger>
                    <SheetPopup side="right">
                      <SheetHeader>
                        <SheetTitle>{brand}</SheetTitle>
                      </SheetHeader>
                      <SheetPanel>
                        <nav className="grid gap-1">
                          {nav.map((n) => (
                            <Button key={n} variant="ghost" className="justify-start">
                              {n}
                            </Button>
                          ))}
                          <Button className="mt-4">Ingresar</Button>
                        </nav>
                      </SheetPanel>
                    </SheetPopup>
                  </Sheet>
                </div>
              </div>
            </header>
          ),
        },
        {
          id: "hero",
          source: "compuesto",
          note: "Badge + Button + Frame",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="mx-auto max-w-3xl text-center">
                <Badge variant="outline">{hero.eyebrow}</Badge>
                <h1 className="font-heading mt-5 text-5xl font-semibold tracking-tight text-balance">{hero.title}</h1>
                <p className="text-muted-foreground mt-5 text-lg">{hero.subtitle}</p>
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  <Button size="lg">
                    {hero.primary} <ArrowRight />
                  </Button>
                  <Button size="lg" variant="outline">
                    {hero.secondary}
                  </Button>
                </div>
              </div>
              <Frame className="mx-auto mt-14 max-w-4xl">
                <FrameHeader>
                  <FrameTitle>Tablero del laboratorio</FrameTitle>
                  <FrameDescription>Frame: el contenedor con borde doble típico de COSS</FrameDescription>
                </FrameHeader>
                <FramePanel>
                  <img src={gallery[0].src} alt="" className="aspect-[16/7] w-full rounded-lg object-cover" />
                </FramePanel>
              </Frame>
            </div>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "Tabs (variante underline)",
          render: () => (
            <div className="mx-auto max-w-5xl px-6 py-16">
              <Tabs defaultValue={features[0].title}>
                {/* en móvil las 4 pestañas no caben: la lista se desplaza horizontalmente */}
                <div className="-mx-6 overflow-x-auto px-6">
                <TabsList variant="underline">
                  {features.slice(0, 4).map((f) => (
                    <TabsTab key={f.title} value={f.title}>
                      {f.title}
                    </TabsTab>
                  ))}
                </TabsList>
                </div>
                {features.slice(0, 4).map((f, i) => {
                  const Icon = featureIcons[f.icon];
                  return (
                    <TabsPanel key={f.title} value={f.title} className="mt-6 grid items-center gap-8 md:grid-cols-2">
                      <div>
                        <Icon className="size-6" />
                        <h3 className="mt-4 text-2xl font-semibold">{f.title}</h3>
                        <p className="text-muted-foreground mt-2">{f.text}</p>
                      </div>
                      <img src={gallery[i + 1].src} alt="" className="aspect-video w-full rounded-xl object-cover" />
                    </TabsPanel>
                  );
                })}
              </Tabs>
            </div>
          ),
        },
        {
          id: "cards",
          source: "oficial",
          note: "Card + PreviewCard (vista previa al pasar el mouse)",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
              {cards.map((c) => (
                <Card key={c.title} className="overflow-hidden">
                  <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" />
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      {c.tag}
                    </Badge>
                    <CardTitle>{c.title}</CardTitle>
                    <CardDescription>{c.text}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <PreviewCard>
                      <PreviewCardTrigger href="#" className="text-sm font-medium underline underline-offset-4">
                        Ver responsable
                      </PreviewCardTrigger>
                      <PreviewCardPopup className="w-64">
                        <p className="text-sm font-medium">Equipo Lab Innovación</p>
                        <p className="text-muted-foreground mt-1 text-sm">2 diseñadores UX · 1 desarrollador</p>
                      </PreviewCardPopup>
                    </PreviewCard>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ),
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "Tabs como selector de imágenes (COSS no trae carrusel)",
          render: () => (
            <div className="mx-auto max-w-5xl px-6 py-16">
              <Tabs defaultValue="0">
                {gallery.map((g, i) => (
                  <TabsPanel key={i} value={String(i)}>
                    <Frame>
                      <FramePanel className="p-1">
                        <img src={g.src} alt={g.alt} className="aspect-video w-full rounded-lg object-cover" />
                      </FramePanel>
                    </Frame>
                  </TabsPanel>
                ))}
                <TabsList className="mt-4 w-full justify-center">
                  {gallery.map((g, i) => (
                    <TabsTab key={i} value={String(i)}>
                      {g.caption}
                    </TabsTab>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          ),
        },
        {
          id: "footer",
          source: "compuesto",
          note: "Input + Button + Separator",
          render: () => (
            <footer className="bg-muted/50">
              <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                  <span className="font-semibold">{brand}</span>
                  <div className="mt-4 flex gap-2">
                    <Input placeholder="Tu correo" />
                    <Button>Unirme</Button>
                  </div>
                </div>
                {footer.columns.map((c) => (
                  <div key={c.title}>
                    <h4 className="text-sm font-medium">{c.title}</h4>
                    <ul className="text-muted-foreground mt-3 space-y-2 text-sm">
                      {c.links.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="text-muted-foreground mx-auto max-w-6xl px-6 py-6 text-sm">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
