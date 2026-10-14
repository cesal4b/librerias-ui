import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";
import { Badge } from "@/libs/shadcn/ui/badge";
import { Button } from "@/libs/shadcn/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/libs/shadcn/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/libs/shadcn/ui/carousel";
import { Input } from "@/libs/shadcn/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/libs/shadcn/ui/navigation-menu";
import { Separator } from "@/libs/shadcn/ui/separator";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/libs/shadcn/ui/sheet";

// Más popular primero: orden fijo por título, para la demo de animación de layout de las cards
const popularOrder = ["Coffee networking", "Cero papel", "Generador de piezas"];

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function HeroCombo() {
  const { scrollYProgress } = useScroll();
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  return (
    <div className="relative overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: blobY }}
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-300/40 via-sky-300/30 to-transparent blur-3xl"
      />
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.div variants={fadeUp}>
          <Badge variant="secondary">{hero.eyebrow}</Badge>
        </motion.div>
        <motion.h1 variants={fadeUp} className="mt-6 text-5xl font-semibold tracking-tight text-balance">
          {hero.title}
        </motion.h1>
        <motion.p variants={fadeUp} className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
          {hero.subtitle}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg">
            {hero.primary} <ArrowRight />
          </Button>
          <Button size="lg" variant="outline">
            {hero.secondary}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeaturesCombo() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto grid max-w-6xl gap-4 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3"
    >
      {features.map((f) => {
        const Icon = featureIcons[f.icon];
        return (
          <motion.div key={f.title} variants={fadeUp}>
            <Card>
              <CardHeader>
                <Icon className="size-5" />
                <CardTitle className="mt-2">{f.title}</CardTitle>
                <CardDescription>{f.text}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function CardsCombo() {
  const [popular, setPopular] = useState(false);
  const list = popular ? [...cards].sort((a, b) => popularOrder.indexOf(a.title) - popularOrder.indexOf(b.title)) : cards;
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex justify-end">
        <Button variant="outline" size="sm" onClick={() => setPopular((p) => !p)}>
          {popular ? "Orden original" : "Más popular primero"}
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {list.map((c) => (
          <motion.div key={c.title} layout transition={{ type: "spring", stiffness: 300, damping: 28 }} whileHover={{ y: -6 }} className="rounded-xl">
            <Card className="overflow-hidden pt-0 transition-shadow hover:shadow-lg">
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GalleryCombo() {
  // La API de Embla no exporta su tipo desde el Carousel de shadcn/ui; se tipa de forma laxa.
  const [api, setApi] = useState<{ selectedScrollSnap: () => number; on: (e: string, cb: () => void) => void; off: (e: string, cb: () => void) => void } | undefined>();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return (
    <div className="mx-auto max-w-5xl px-16 py-16">
      <Carousel opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {gallery.map((g, i) => (
            <CarouselItem key={g.src} className="md:basis-1/2">
              <motion.div animate={{ opacity: i === selected ? 1 : 0.55, scale: i === selected ? 1 : 0.94 }} transition={{ duration: 0.4 }}>
                <Card className="overflow-hidden p-0">
                  <CardContent className="p-0">
                    <img src={g.src} alt={g.alt} className="aspect-video w-full object-cover" />
                    <p className="p-3 text-sm font-medium">{g.caption}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
          note: "NavigationMenu + Button (igual que shadcn/ui, sin animar)",
          render: () => (
            <header className="border-b">
              <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <span className="font-semibold">{brand}</span>
                <NavigationMenu className="hidden md:flex">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>{nav[1]}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-2 p-2 md:grid-cols-2">
                          {features.slice(0, 4).map((f) => (
                            <li key={f.title}>
                              <NavigationMenuLink href="#">
                                <div className="text-sm font-medium">{f.title}</div>
                                <p className="text-muted-foreground line-clamp-2 text-sm">{f.text}</p>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    {nav.slice(2).map((n) => (
                      <NavigationMenuItem key={n}>
                        <NavigationMenuLink href="#" className="px-3 py-2 text-sm font-medium">
                          {n}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
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
          source: "compuesto",
          note: "Badge + Button + motion (stagger fade-in, parallax de fondo al hacer scroll)",
          render: () => <HeroCombo />,
        },
        {
          id: "features",
          source: "compuesto",
          note: "Card + motion (whileInView con stagger al entrar en pantalla)",
          render: () => <FeaturesCombo />,
        },
        {
          id: "cards",
          source: "compuesto",
          note: "Card + motion (hover-lift y animación de layout al reordenar)",
          render: () => <CardsCombo />,
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "Carousel (Embla) + motion (fundido/escala según el slide activo)",
          render: () => <GalleryCombo />,
        },
        {
          id: "footer",
          source: "compuesto",
          note: "Separator + Input + Button (igual que shadcn/ui, sin animar)",
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
              <Separator />
              <p className="text-muted-foreground mx-auto max-w-6xl px-6 py-6 text-sm">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
