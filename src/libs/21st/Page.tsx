import { ArrowUpRight, KeyRound } from "lucide-react";
import { Showcase, type SectionId } from "@/shared/Showcase";
import data from "./components.json";

// 21st.dev es un catálogo comunitario. Descargar el código exige una API key, pero cada componente tiene una
// vista previa en vivo pública en su CDN (bundle.html). Aquí se incrusta esa vista previa tal cual, sin copiar código.
type Item = { title: string; description: string; author: string; license: string; deps: string; url: string; bundle: string };

const heights: Record<SectionId, number> = { navbar: 320, hero: 640, features: 620, cards: 460, gallery: 520, footer: 480 };
const okLicense = (l: string) => /^mit/i.test(l);

function Live({ it, height }: { it: Item; height: number }) {
  return (
    <div className="border-b last:border-b-0">
      <div className="bg-muted/50 flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 text-sm">
        <span className="font-medium">{it.title}</span>
        <span className="text-muted-foreground">@{it.author}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs ${okLicense(it.license) ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
          Licencia: {it.license || "sin dato"}
        </span>
        <a href={it.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground ml-auto inline-flex items-center gap-1 text-xs">
          Ver en 21st.dev <ArrowUpRight className="size-3.5" />
        </a>
      </div>
      <iframe src={`${it.bundle}?theme=light`} title={it.title} loading="lazy" className="block w-full border-0 bg-white" style={{ height }} />
    </div>
  );
}

export default function Page() {
  const d = data as Record<SectionId, Item[]>;
  return (
    <Showcase
      toolbar={
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <KeyRound size={14} /> Vistas previas en vivo desde 21st.dev. Para instalar el código se necesita una API key, y cada componente tiene su propia licencia: prefiere los MIT.
        </span>
      }
      sections={(Object.keys(d) as SectionId[]).map((id) => ({
        id,
        source: "oficial" as const,
        note: "vista previa en vivo de 3 componentes de la comunidad",
        render: () => (
          <div>
            {d[id].map((it) => (
              <Live key={it.url} it={it} height={heights[id]} />
            ))}
          </div>
        ),
      }))}
    />
  );
}
