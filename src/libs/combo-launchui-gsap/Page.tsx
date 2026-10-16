import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

function FeaturesGsap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.querySelectorAll('[data-slot="item"]'), {
        opacity: 0,
        y: 32,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref}>
      <Items />
    </div>
  );
}

function CardsGsap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.querySelectorAll(":scope > div"), {
        opacity: 0,
        y: 40,
        scale: 0.96,
        duration: 0.6,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Section>
      <div ref={ref} className="max-w-container mx-auto grid gap-6 md:grid-cols-3">
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
  );
}

function GalleryGsap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.querySelectorAll(":scope > div"), {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: { each: 0.08, grid: "auto", from: "start" },
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Section className="relative overflow-hidden">
      <Glow variant="center" className="opacity-40" />
      <div ref={ref} className="max-w-container relative z-10 mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}

export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "navbar", source: "oficial", note: "sections/navbar/default (Launch UI, sin animar)", render: () => <Navbar /> },
        {
          id: "hero",
          source: "oficial",
          note: "sections/hero/default (Launch UI ya trae su propia entrada CSS escalonada con animate-appear; no se re-anima con GSAP)",
          render: () => (
            <Hero
              mockup={
                <Screenshot srcLight={img("lab-launchui-combo-hero", 1248, 765)} alt="Captura de ejemplo" width={1248} height={765} loading="eager" className="w-full" />
              }
            />
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "sections/items/default (Launch UI) + GSAP ScrollTrigger (stagger de entrada por ítem)",
          render: () => <FeaturesGsap />,
        },
        {
          id: "cards",
          source: "compuesto",
          note: "Card + Badge + Button (Launch UI no trae cards en la versión gratis) + GSAP ScrollTrigger",
          render: () => <CardsGsap />,
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "Card + Glow (Launch UI no trae galería en la versión gratis) + GSAP ScrollTrigger",
          render: () => <GalleryGsap />,
        },
        { id: "footer", source: "oficial", note: "sections/footer/default (Launch UI, sin animar)", render: () => <FooterSection /> },
      ]}
    />
  );
}
