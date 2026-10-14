import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Showcase } from "@/shared/Showcase";
import VeilFeatures from "@/libs/tailark/registry/bases/radix/veil/blocks/features/one";
import VeilFooter from "@/libs/tailark/registry/bases/radix/veil/blocks/footer/one";
import { HeroHeader as VeilHeader } from "@/libs/tailark/registry/bases/radix/veil/blocks/hero-section/one/header";
import VeilHero from "@/libs/tailark/registry/bases/radix/veil/blocks/hero-section/one/hero-section";
import VeilLogos from "@/libs/tailark/registry/bases/radix/veil/blocks/logo-cloud/one";
import VeilTestimonials from "@/libs/tailark/registry/bases/radix/veil/blocks/testimonials/one";

gsap.registerPlugin(ScrollTrigger, SplitText);

// El header de Tailark es "fixed": transform crea un bloque contenedor para que quede dentro de su sección.
const contain = { transform: "translateZ(0)", minHeight: 88 };

function HeroGsap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const h1 = ref.current?.querySelector("h1");
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (h1) {
        const split = new SplitText(h1, { type: "chars" });
        tl.from(split.chars, { opacity: 0, y: 48, rotateX: -70, stagger: 0.02, duration: 0.7 });
      }
      const pEls = ref.current?.querySelectorAll("p");
      const chipEls = ref.current?.querySelectorAll(".rounded-xl");
      // El CTA (<a>) se anima aparte, por CSS (ver .combo-hero-cta en styles.css): el botón real de
      // Tailark tiene variantes de pseudo-clase (active:, hover:, disabled:) que hacen que GSAP no logre
      // escribirle opacity/transform de forma fiable; el resto de elementos no tiene ese problema.
      tl.from(pEls, { opacity: 0, y: 20, duration: 0.6 }, "-=0.35");
      tl.from(chipEls, { opacity: 0, scale: 0.8, stagger: 0.04, duration: 0.5 }, "-=0.2");
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} style={{ transform: "translateZ(0)" }}>
      <VeilHero />
    </div>
  );
}

function FeaturesGsap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current?.querySelectorAll("h2, h2 + p"), {
        opacity: 0,
        y: 24,
        duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
      gsap.from(ref.current?.querySelectorAll(".rounded-2xl"), {
        opacity: 0,
        y: 60,
        rotateX: -15,
        transformPerspective: 800,
        stagger: 0.12,
        duration: 0.7,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref}>
      <VeilFeatures />
    </div>
  );
}

function CardsGsap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll(".rounded-2xl");
      gsap.fromTo(
        cards ?? [],
        { opacity: 0.25, scale: 0.88 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 35%", scrub: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref}>
      <VeilTestimonials />
    </div>
  );
}

function GalleryGsap() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const logos = ref.current?.querySelectorAll(".grid > div");
      gsap.from(logos ?? [], {
        opacity: 0,
        scale: 0.6,
        stagger: { each: 0.06, grid: "auto", from: "center" },
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
      logos?.forEach((el) => {
        const node = el as HTMLElement;
        const enter = () => gsap.to(node, { scale: 1.15, duration: 0.25, ease: "power2.out" });
        const leave = () => gsap.to(node, { scale: 1, duration: 0.25, ease: "power2.out" });
        node.addEventListener("mouseenter", enter);
        node.addEventListener("mouseleave", leave);
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref}>
      <VeilLogos />
    </div>
  );
}

export default function Page() {
  return (
    <div data-theme="veil" className="bg-background text-foreground min-h-screen font-sans">
      <Showcase
        sections={[
          {
            id: "navbar",
            source: "oficial",
            note: "veil/hero-section/one/header (Tailark, sin animar)",
            render: () => (
              <div style={contain}>
                <VeilHeader />
              </div>
            ),
          },
          {
            id: "hero",
            source: "compuesto",
            note: "veil/hero-section/one (Tailark) + GSAP (SplitText por letra + timeline de entrada)",
            render: () => <HeroGsap />,
          },
          {
            id: "features",
            source: "compuesto",
            note: "veil/features/one (Tailark) + GSAP ScrollTrigger (entrada 3D escalonada)",
            render: () => <FeaturesGsap />,
          },
          {
            id: "cards",
            source: "compuesto",
            note: "veil/testimonials/one (Tailark) + GSAP ScrollTrigger (scrub: enfoca al hacer scroll)",
            render: () => <CardsGsap />,
          },
          {
            id: "gallery",
            source: "compuesto",
            note: "veil/logo-cloud/one (Tailark) + GSAP (entrada en abanico + hover)",
            render: () => <GalleryGsap />,
          },
          {
            id: "footer",
            source: "oficial",
            note: "veil/footer/one (Tailark, sin animar)",
            render: () => <VeilFooter />,
          },
        ]}
      />
    </div>
  );
}
