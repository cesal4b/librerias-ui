import { Showcase } from "@/shared/Showcase";
import { cards, gallery, img } from "@/shared/content";
import Navbar from "@/libs/launchui/sections/navbar/default";
import Hero from "@/libs/launchui/sections/hero/default";
import Items from "@/libs/launchui/sections/items/default";
import FooterSection from "@/libs/launchui/sections/footer/default";
import { Badge } from "@/libs/launchui/ui/badge";
import { Button } from "@/libs/launchui/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/libs/launchui/ui/card";
import Glow from "@/libs/launchui/ui/glow";
import Screenshot from "@/libs/launchui/ui/screenshot";
import { Section } from "@/libs/launchui/ui/section";

// Launch UI (github.com/launch-ui/launch-ui, MIT): kit de landing para copiar y pegar, no un registro
// instalable por CLI. La versión gratis no trae cards ni galería (son PRO): esas dos se componen aquí
// con sus propios primitivos (Card, Badge, Glow), igual que el resto de secciones "compuesto" de la galería.
export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "oficial",
          note: "sections/navbar/default",
          render: () => <Navbar />,
        },
        {
          id: "hero",
          source: "oficial",
          note: "sections/hero/default (mockup: captura propia, Launch UI no la trae en el repo)",
          render: () => (
            <Hero
              mockup={
                <Screenshot srcLight={img("lab-launchui-hero", 1248, 765)} alt="Captura de ejemplo" width={1248} height={765} loading="eager" className="w-full" />
              }
            />
          ),
        },
        {
          id: "features",
          source: "oficial",
          note: "sections/items/default",
          render: () => <Items />,
        },
        {
          id: "cards",
          source: "compuesto",
          note: "Card + Badge + Button (Launch UI no trae cards en la versión gratis)",
          render: () => (
            <Section>
              <div className="max-w-container mx-auto grid gap-6 md:grid-cols-3">
                {cards.map((c) => (
                  <Card key={c.title} className="overflow-hidden pt-0">
                    <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" />
                    <CardHeader>
                      <Badge variant="outline">{c.tag}</Badge>
                      <CardTitle className="mt-2">{c.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground -mt-4 text-sm">{c.text}</CardContent>
                    <CardFooter>
                      <Button variant="link" className="px-0">
                        Ver proyecto
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </Section>
          ),
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "Card + Glow (Launch UI no trae galería en la versión gratis)",
          render: () => (
            <Section className="relative overflow-hidden">
              <Glow variant="center" className="opacity-40" />
              <div className="max-w-container relative z-10 mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((g) => (
                  <Card key={g.src} className="overflow-hidden p-0">
                    <img src={g.src} alt={g.alt} className="aspect-video w-full object-cover" />
                    <CardContent className="p-3">
                      <p className="text-sm font-medium">{g.caption}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          ),
        },
        {
          id: "footer",
          source: "oficial",
          note: "sections/footer/default",
          render: () => <FooterSection />,
        },
      ]}
    />
  );
}
