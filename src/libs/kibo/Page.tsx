import { ArrowRight, Menu, Megaphone } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, img, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";
import { Announcement, AnnouncementTag, AnnouncementTitle } from "@/libs/kibo/ui/announcement";
import { Avatar, AvatarFallback, AvatarImage } from "@/libs/kibo/ui/avatar";
import { AvatarStack } from "@/libs/kibo/ui/avatar-stack";
import { Banner, BannerAction, BannerClose, BannerIcon, BannerTitle } from "@/libs/kibo/ui/banner";
import { Button } from "@/libs/kibo/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/libs/kibo/ui/sheet";
import { Deck, DeckCards, DeckItem } from "@/libs/kibo/ui/deck";
import { ImageZoom } from "@/libs/kibo/ui/image-zoom";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/libs/kibo/ui/marquee";
import { Pill, PillIndicator } from "@/libs/kibo/ui/pill";
import { Reel, ReelContent, ReelImage, ReelItem, ReelProgress } from "@/libs/kibo/ui/reel";

const people = [1, 2, 3, 4, 5].map((i) => `https://i.pravatar.cc/80?img=${i + 10}`);

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "compuesto",
          note: "Banner + Button · móvil: Sheet (Kibo no trae navbar)",
          render: () => (
            <>
              <Banner>
                <BannerIcon icon={Megaphone} />
                <BannerTitle>Inscripciones abiertas para el Demo Day 2027.</BannerTitle>
                <BannerAction>Inscribirme</BannerAction>
                <BannerClose />
              </Banner>
              <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
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
                {/* Menú móvil: Sheet de shadcn (base de Kibo) */}
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
              </header>
            </>
          ),
        },
        {
          id: "hero",
          source: "compuesto",
          note: "Announcement + AvatarStack + Reel",
          render: () => (
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 [&>*]:min-w-0">
              <div>
                <Announcement>
                  <AnnouncementTag>Nuevo</AnnouncementTag>
                  <AnnouncementTitle>
                    Convocatoria 2027 <ArrowRight className="text-muted-foreground size-4" />
                  </AnnouncementTitle>
                </Announcement>
                <h1 className="mt-6 text-5xl font-semibold tracking-tight">{hero.title}</h1>
                <p className="text-muted-foreground mt-4 text-lg">{hero.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button size="lg">{hero.primary}</Button>
                  <Button size="lg" variant="outline">
                    {hero.secondary}
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <AvatarStack animate size={36}>
                    {people.map((p) => (
                      <Avatar key={p}>
                        <AvatarImage src={p} />
                        <AvatarFallback>LB</AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarStack>
                  <span className="text-muted-foreground text-sm">+120 estudiantes en proyectos</span>
                </div>
              </div>
              <Reel
                className="mx-auto aspect-[9/16] h-[520px] overflow-hidden rounded-2xl"
                data={gallery.slice(0, 4).map((g, i) => ({ id: i, type: "image" as const, src: g.src.replace("1600/1000", "720/1280"), duration: 4, alt: g.alt }))}
              >
                <ReelProgress />
                <ReelContent>
                  {(item) => (
                    <ReelItem>
                      <ReelImage src={item.src} alt={item.alt ?? ""} duration={item.duration} />
                    </ReelItem>
                  )}
                </ReelContent>
              </Reel>
            </div>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "Pill (Kibo no trae bloques de features)",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => {
                  const Icon = featureIcons[f.icon];
                  return (
                    <div key={f.title}>
                      <Icon className="size-5" />
                      <h3 className="mt-3 font-medium">{f.title}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">{f.text}</p>
                      <Pill className="mt-3">
                        <PillIndicator variant={i % 2 ? "info" : "success"} pulse={i === 0} />
                        {i % 2 ? "Piloto" : "Activo"}
                      </Pill>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        },
        {
          id: "cards",
          source: "oficial",
          note: "Deck (tarjetas que se deslizan, estilo Tinder)",
          render: () => (
            <div className="flex flex-col items-center px-6 py-16">
              <p className="text-muted-foreground mb-6 text-sm">Arrastra la tarjeta a la izquierda o derecha</p>
              <Deck className="h-[420px] w-80">
                <DeckCards>
                  {[...cards, ...cards].map((c, i) => (
                    <DeckItem key={i} className="flex-col items-stretch justify-start overflow-hidden bg-white p-0">
                      <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" draggable={false} />
                      <div className="p-5">
                        <p className="text-xs font-medium text-emerald-600 uppercase">{c.tag}</p>
                        <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{c.text}</p>
                      </div>
                    </DeckItem>
                  ))}
                </DeckCards>
              </Deck>
            </div>
          ),
        },
        {
          id: "gallery",
          source: "oficial",
          note: "Marquee + ImageZoom (clic para ampliar)",
          render: () => (
            <div className="py-16">
              <Marquee>
                <MarqueeFade side="left" />
                <MarqueeFade side="right" />
                <MarqueeContent pauseOnHover>
                  {gallery.map((g) => (
                    <MarqueeItem key={g.src} className="mx-3">
                      <ImageZoom>
                        <img src={g.src} alt={g.alt} className="h-48 w-72 rounded-lg object-cover" />
                      </ImageZoom>
                    </MarqueeItem>
                  ))}
                </MarqueeContent>
              </Marquee>
            </div>
          ),
        },
        {
          id: "footer",
          source: "compuesto",
          note: "solo Tailwind (Kibo no trae footer)",
          render: () => (
            <footer className="border-t">
              <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">
                <div className="max-w-xs">
                  <span className="font-semibold">{brand}</span>
                  <p className="text-muted-foreground mt-2 text-sm">{hero.subtitle}</p>
                  <img src={img("lab-footer-map", 600, 240)} alt="" className="mt-4 rounded-md" />
                </div>
                <div className="grid grid-cols-3 gap-10">
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
              </div>
              <p className="text-muted-foreground border-t px-6 py-6 text-center text-sm">{footer.copy}</p>
            </footer>
          ),
        },
      ]}
    />
  );
}
