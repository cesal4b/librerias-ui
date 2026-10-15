import { ArrowRight, Menu } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";
import { Badge } from "@/libs/shadcn/ui/badge";
import { Button } from "@/libs/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/libs/shadcn/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/libs/shadcn/ui/carousel";
import { Input } from "@/libs/shadcn/ui/input";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/libs/shadcn/ui/sheet";

// Shadcn Studio tiene licencia MIT + "Commons Clause": prohíbe redistribuir sus componentes
// (solos o en un paquete), justo lo que haría esta galería. Por eso NO se copia su código real.
// Esta página es una REFERENCIA armada con shadcn/ui (gratis, MIT, sin restricciones), la base
// técnica que Shadcn Studio extiende, solo para mostrar el estilo aproximado de "shadcn + temas".
export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "referencia",
          note: "shadcn/ui gratis (Shadcn Studio real: licencia con restricción de redistribución)",
          render: () => (
            <header className="border-b">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span className="font-semibold">{brand}</span>
                <nav className="text-muted-foreground hidden gap-6 text-sm md:flex">
                  {nav.map((n) => (
                    <a key={n} href="#" className="hover:text-foreground">
                      {n}
                    </a>
                  ))}
                </nav>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="hidden sm:inline-flex">
                    Ingresar
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button size="icon" variant="ghost" className="md:hidden" aria-label="Abrir menú">
                        <Menu />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <SheetHeader>
                        <SheetTitle>{brand}</SheetTitle>
                      </SheetHeader>
                      <nav className="grid gap-1 px-4">
                        {nav.map((n) => (
                          <a key={n} href="#" className="hover:bg-accent rounded-md px-3 py-2 text-sm font-medium">
                            {n}
                          </a>
                        ))}
                      </nav>
                      <SheetFooter>
                        <Button>Ingresar</Button>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>
          ),
        },
        {
          id: "hero",
          source: "referencia",
          note: "shadcn/ui gratis (Shadcn Studio real: licencia con restricción de redistribución)",
          render: () => (
            <div className="mx-auto max-w-4xl px-6 py-24 text-center">
              <Badge variant="secondary">{hero.eyebrow}</Badge>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance">{hero.title}</h1>
              <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">{hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button size="lg">
                  {hero.primary} <ArrowRight />
                </Button>
                <Button size="lg" variant="outline">
                  {hero.secondary}
                </Button>
              </div>
            </div>
          ),
        },
        {
          id: "features",
          source: "referencia",
          note: "shadcn/ui gratis (Shadcn Studio real: licencia con restricción de redistribución)",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => {
                const Icon = featureIcons[f.icon];
                return (
                  <Card key={f.title}>
                    <CardHeader>
                      <Icon className="size-5" />
                      <CardTitle className="mt-2">{f.title}</CardTitle>
                      <CardDescription>{f.text}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          ),
        },
        {
          id: "cards",
          source: "referencia",
          note: "shadcn/ui gratis (Shadcn Studio real: licencia con restricción de redistribución)",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
              {cards.map((c) => (
                <Card key={c.title} className="overflow-hidden pt-0">
                  <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" />
                  <CardHeader>
                    <Badge variant="outline">{c.tag}</Badge>
                    <CardTitle>{c.title}</CardTitle>
                    <CardDescription>{c.text}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="link" className="px-0">
                      Ver proyecto <ArrowRight />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ),
        },
        {
          id: "gallery",
          source: "referencia",
          note: "shadcn/ui gratis (Shadcn Studio real: licencia con restricción de redistribución)",
          render: () => (
            <div className="mx-auto max-w-5xl px-16 py-16">
              <Carousel opts={{ loop: true }}>
                <CarouselContent>
                  {gallery.map((g) => (
                    <CarouselItem key={g.src} className="md:basis-1/2">
                      <Card className="overflow-hidden p-0">
                        <CardContent className="p-0">
                          <img src={g.src} alt={g.alt} className="aspect-video w-full object-cover" />
                          <p className="p-3 text-sm font-medium">{g.caption}</p>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ),
        },
        {
          id: "footer",
          source: "referencia",
          note: "shadcn/ui gratis (Shadcn Studio real: licencia con restricción de redistribución)",
          render: () => (
            <footer className="bg-muted/40 border-t">
              <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
                <div>
                  <span className="font-semibold">{brand}</span>
                  <div className="mt-4 flex gap-2">
                    <Input placeholder="Tu correo" />
                    <Button>Suscribirme</Button>
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
              <p className="text-muted-foreground mx-auto max-w-6xl px-6 py-6 text-sm">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
