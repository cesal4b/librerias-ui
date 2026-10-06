import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Columns2, Copy, ExternalLink, HelpCircle, LayoutGrid, Monitor, Search, Smartphone, Sparkles, Tablet, X } from "lucide-react";
import { libraries, SECTIONS, type Library, type Look, type Vibe } from "./libraries";
import { buildInstruction } from "./vibe";
import { responsive, type Responsive } from "./responsive";

// Navegación por hash: #/lib/<id>  ·  #/comparar/<seccion>  ·  #/lado/<idA>/<idB>/<seccion|todo>
function useRoute() {
  const read = () => location.hash.replace(/^#\/?/, "").split("/");
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

// Ancho real con el que se renderiza cada demo
export type Device = "escritorio" | "tablet" | "movil";
const DEVICES: Record<Device, { label: string; width: number; Icon: typeof Monitor }> = {
  escritorio: { label: "Escritorio", width: 1280, Icon: Monitor },
  tablet: { label: "Tablet", width: 768, Icon: Tablet },
  movil: { label: "Móvil", width: 390, Icon: Smartphone },
};

function useDevice() {
  const [device, setDevice] = useState<Device>(() => {
    try {
      const v = localStorage.getItem("dispositivo") as Device | null;
      return v && v in DEVICES ? v : "escritorio";
    } catch {
      return "escritorio";
    }
  });
  const set = (d: Device) => {
    try {
      localStorage.setItem("dispositivo", d);
    } catch {}
    setDevice(d);
  };
  return [device, set] as const;
}

function DevicePicker({ device, onChange }: { device: Device; onChange: (d: Device) => void }) {
  return (
    <div className="inline-flex rounded-md bg-white/10 p-0.5" role="radiogroup" aria-label="Tamaño de pantalla">
      {(Object.keys(DEVICES) as Device[]).map((d) => {
        const { label, width, Icon } = DEVICES[d];
        return (
          <button
            key={d}
            role="radio"
            aria-checked={device === d}
            title={`${label} · ${width} px`}
            onClick={() => onChange(d)}
            className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${device === d ? "bg-white text-[#041f3e]" : "text-white/80 hover:bg-white/10"}`}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

const vibeStyle: Record<Vibe, string> = {
  Alta: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  Media: "bg-amber-50 text-amber-800 ring-amber-600/20",
  Baja: "bg-rose-50 text-rose-800 ring-rose-600/20",
};
const lookStyle: Record<Look, string> = {
  "Muy visto": "bg-zinc-100 text-zinc-700 ring-zinc-500/20",
  Intermedio: "bg-sky-50 text-sky-800 ring-sky-600/20",
  Distintivo: "bg-violet-50 text-violet-800 ring-violet-600/20",
};

function Tag({ className, children, title }: { className: string; children: React.ReactNode; title?: string }) {
  return (
    <span title={title} className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}>
      {children}
    </span>
  );
}

const respStyle: Record<Responsive, string> = {
  Completo: "bg-teal-50 text-teal-800 ring-teal-600/20",
  Parcial: "bg-orange-50 text-orange-800 ring-orange-600/20",
  Manual: "bg-rose-50 text-rose-800 ring-rose-600/20",
  Variable: "bg-zinc-100 text-zinc-700 ring-zinc-500/20",
};

/** Etiqueta de comportamiento responsivo (ícono de celular + nivel) */
function RespTag({ lib, short }: { lib: Library; short?: boolean }) {
  const r = responsive[lib.id];
  if (!r) return null;
  return (
    <Tag className={respStyle[r.level]} title={`Responsivo: ${r.level}. ${r.why}`}>
      <Smartphone className="size-3" />
      {short ? "" : "Responsivo: "}
      {r.level}
    </Tag>
  );
}

function VibeTag({ lib, short }: { lib: Library; short?: boolean }) {
  return (
    <Tag className={vibeStyle[lib.vibe]} title={`Vibe coding: ${lib.vibe}. ${lib.vibeWhy}`}>
      <Sparkles className="size-3" />
      {short ? "" : "Vibe coding: "}
      {lib.vibe}
    </Tag>
  );
}

function CopyBox({ label, text, tall }: { label: string; text: string; tall?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <div>
      <div className="mb-1 text-[11px] font-semibold tracking-wide text-[#013998] uppercase">{label}</div>
      <div className={`flex items-start gap-2 rounded-lg bg-[#041f3e] px-3 py-2 text-[13px] leading-relaxed text-zinc-100 ${tall ? "max-h-72 overflow-y-auto" : ""}`}>
        <code className="flex-1 font-mono break-words whitespace-pre-wrap">{text}</code>
        <button
          className="mt-0.5 shrink-0 text-zinc-400 hover:text-white"
          aria-label={`Copiar ${label}`}
          onClick={() => {
            navigator.clipboard?.writeText(text).catch(() => {});
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          }}
        >
          {done ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
    </div>
  );
}

const signalNames = { cli: "CLI", mcp: "MCP", llms: "llms.txt", shadcnRegistry: "Registro shadcn" } as const;

/** Estado de la ficha (abierta/cerrada) recordado en este navegador; por defecto cerrada para dejar espacio a la demo */
function useFichaOpen() {
  const [open, setOpen] = useState(() => {
    try {
      return localStorage.getItem("ficha-abierta") === "1";
    } catch {
      return false;
    }
  });
  const toggle = () =>
    setOpen((o) => {
      try {
        localStorage.setItem("ficha-abierta", o ? "0" : "1");
      } catch {}
      return !o;
    });
  return [open, toggle] as const;
}

function LibraryView({ lib, device, setDevice }: { lib: Library; device: Device; setDevice: (d: Device) => void }) {
  const [open, toggle] = useFichaOpen();
  const [tab, setTab] = useState<"instruccion" | "prompt">("instruccion");
  return (
    <div className="flex h-full flex-col">
      {/* Barra compacta, siempre visible */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-[#041f3e] px-5 py-2.5 text-white">
        <h2 className="text-lg font-semibold tracking-tight">{lib.name}</h2>
        <VibeTag lib={lib} />
        <Tag className={lookStyle[lib.look]} title={lib.lookWhy}>
          Look: {lib.look}
        </Tag>
        <RespTag lib={lib} />
        <Tag className="bg-white/10 text-white ring-white/20">{lib.kind}</Tag>
        <Tag className="bg-white/10 text-white ring-white/20">{lib.price}</Tag>
        <div className="ml-auto flex items-center gap-1">
          <DevicePicker device={device} onChange={setDevice} />
          <a href={lib.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-white/80 hover:bg-white/10 hover:text-white">
            Sitio oficial <ExternalLink className="size-3.5" />
          </a>
          <a href={`pages/${lib.id}.html`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-white/80 hover:bg-white/10 hover:text-white">
            Abrir demo <ExternalLink className="size-3.5" />
          </a>
          <button
            onClick={toggle}
            aria-expanded={open}
            className="ml-1 inline-flex items-center gap-1.5 rounded-md bg-[#305fff] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#232be6]"
          >
            {open ? "Ocultar ficha" : "Ver ficha e instrucción"}
            <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      {/* Ficha desplegable */}
      {open && (
        <div className="grid max-h-[55vh] gap-5 overflow-y-auto border-b border-[#c9d6fb] bg-[#eef3ff] px-5 py-4 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-3 text-sm text-zinc-700">
            <p>
              <span className="font-semibold text-[#041f3e]">Hecha con:</span> {lib.stack}
            </p>
            <p>
              <span className="font-semibold text-[#041f3e]">Vibe coding ({lib.vibe}):</span> {lib.vibeWhy}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(signalNames) as (keyof typeof signalNames)[]).map((k) => (
                <Tag key={k} className={lib.signals[k] ? "bg-[#013998] text-white ring-[#013998]" : "bg-white/60 text-zinc-400 ring-zinc-200 line-through"}>
                  {signalNames[k]}
                </Tag>
              ))}
            </div>
            <p>
              <span className="font-semibold text-[#041f3e]">Look ({lib.look}):</span> {lib.lookWhy}
            </p>
            <p>
              <span className="font-semibold text-[#041f3e]">Responsivo ({responsive[lib.id]?.level}):</span> {responsive[lib.id]?.why}
            </p>
            <p className="rounded-lg bg-white/70 p-2.5 text-[13px] text-zinc-600">
              <span className="font-semibold text-zinc-900">En esta demo:</span> {lib.demo}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex gap-1 text-sm">
              {(
                [
                  ["instruccion", "Instrucción completa"],
                  ["prompt", "Prompt corto"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 ${tab === id ? "bg-[#013998] text-white" : "bg-white/70 text-[#013998] hover:bg-white"}`}
                >
                  {id === "instruccion" && <Sparkles className="size-3.5" />}
                  {label}
                </button>
              ))}
            </div>
            {tab === "instruccion" ? (
              <CopyBox tall label="Pégala en Lovable, v0, Cursor o Claude Code" text={buildInstruction(lib)} />
            ) : (
              <>
                <CopyBox label="Prompt sugerido para la IA" text={lib.prompt} />
                <CopyBox label="Instalación" text={lib.install} />
              </>
            )}
          </div>
        </div>
      )}
      {device === "escritorio" ? (
        <iframe key={lib.id} src={`pages/${lib.id}.html`} title={`Demo de ${lib.name}`} className="w-full flex-1 bg-white" />
      ) : (
        <div className="min-h-0 flex-1">
          <ScaledFrame key={lib.id + device} src={`pages/${lib.id}.html`} title={`Demo de ${lib.name}`} width={DEVICES[device].width} />
        </div>
      )}
    </div>
  );
}

/** iframe que renderiza la demo a un ancho real (1280 / 768 / 390 px) y la escala para caber en su contenedor.
 *  Si sobra espacio, la centra; en tablet y móvil la enmarca como un dispositivo. */
function ScaledFrame({ src, title, width = 1280, lazy }: { src: string; title: string; width?: number; lazy?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const framed = width < 1280;
  const pad = framed ? 16 : 0;
  const avail = Math.max(1, size.w - pad * 2);
  const scale = Math.min(1, avail / width);
  const left = Math.max(0, (size.w - width * scale) / 2);
  const h = size.h - pad * 2;
  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${framed ? "bg-[#dfe8ff]" : "bg-white"}`}>
      {size.w > 0 && (
        <iframe
          src={src}
          title={title}
          loading={lazy ? "lazy" : undefined}
          style={{
            position: "absolute",
            top: pad,
            left,
            width,
            height: h / scale,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            border: 0,
            background: "white",
            borderRadius: framed ? 18 / scale : 0,
            boxShadow: framed ? "0 0 0 1px rgba(4,31,62,.15), 0 12px 32px rgba(4,31,62,.18)" : undefined,
          }}
        />
      )}
    </div>
  );
}

function SideBySideView({ a, b, section, device, setDevice }: { a: Library; b: Library; section: string; device: Device; setDevice: (d: Device) => void }) {
  const go = (na: string, nb: string, ns: string) => (location.hash = `#/lado/${na}/${nb}/${ns}`);
  const q = section === "todo" ? "" : `?only=${section}`;
  const picker = (value: string, onChange: (v: string) => void) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-md border border-white/20 bg-white/10 px-2 py-1 text-sm text-white [&>option]:text-zinc-950">
      {libraries.map((l) => (
        <option key={l.id} value={l.id}>
          {l.name}
        </option>
      ))}
    </select>
  );
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-2 bg-[#041f3e] px-5 py-2.5 text-white">
        <span className="text-sm font-medium">Lado a lado:</span>
        {picker(a.id, (v) => go(v, b.id, section))}
        <span className="text-white/60">vs</span>
        {picker(b.id, (v) => go(a.id, v, section))}
        <DevicePicker device={device} onChange={setDevice} />
        <span className="ml-3 text-sm text-white/70">Sección:</span>
        {[{ id: "todo", label: "Página completa" }, ...SECTIONS].map((s) => (
          <button
            key={s.id}
            onClick={() => go(a.id, b.id, s.id)}
            className={`rounded-full px-2.5 py-0.5 text-sm ${s.id === section ? "bg-[#305fff] text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-1 gap-px bg-[#c9d6fb]">
        {[a, b].map((lib) => (
          <div key={lib.id} className="flex min-h-0 flex-col bg-white">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-[#c9d6fb] bg-[#eef3ff] px-3 py-1.5">
              <a href={`#/lib/${lib.id}`} className="font-medium text-[#041f3e] hover:underline">
                {lib.name}
              </a>
              <VibeTag lib={lib} short />
              <Tag className={lookStyle[lib.look]}>{lib.look}</Tag>
              <RespTag lib={lib} short />
            </div>
            <div className="min-h-0 flex-1">
              <ScaledFrame key={lib.id + section + device} src={`pages/${lib.id}.html${q}`} title={lib.name} width={DEVICES[device].width} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompareView({ section, list, device, setDevice }: { section: string; list: Library[]; device: Device; setDevice: (d: Device) => void }) {
  // Cada demo se renderiza al ancho del dispositivo y se escala para caber en la tarjeta
  const cols = { escritorio: "grid-cols-2 2xl:grid-cols-3", tablet: "grid-cols-3 2xl:grid-cols-4", movil: "grid-cols-4 2xl:grid-cols-6" }[device];
  // La barra de navegación es baja: no hace falta tanto alto
  const frameH = section === "navbar" ? { escritorio: 110, tablet: 140, movil: 200 }[device] : { escritorio: 300, tablet: 380, movil: 520 }[device];
  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 bg-[#041f3e] px-5 py-2.5 text-white">
        <DevicePicker device={device} onChange={setDevice} />
        <span className="mr-1 ml-2 text-sm font-medium">Comparar sección:</span>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#/comparar/${s.id}`}
            className={`rounded-full px-3 py-1 text-sm ${s.id === section ? "bg-[#305fff] text-white" : "bg-white/10 text-white/80 hover:bg-white/20"}`}
          >
            {s.label}
          </a>
        ))}
      </div>
      <div className={`grid gap-5 p-5 ${cols}`}>
        {list.map((lib) => (
          <div key={lib.id} className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-zinc-100 px-3 py-2">
              <a href={`#/lib/${lib.id}`} className="font-medium hover:underline">
                {lib.name}
              </a>
              <VibeTag lib={lib} short />
              <Tag className={lookStyle[lib.look]}>{lib.look}</Tag>
              <RespTag lib={lib} short />
            </div>
            <div className="relative overflow-hidden" style={{ height: frameH }}>
              <ScaledFrame lazy key={lib.id + section + device} src={`pages/${lib.id}.html?only=${section}&labels=0`} title={`${lib.name} · ${section}`} width={DEVICES[device].width} />
              <a href={`#/lib/${lib.id}`} className="absolute inset-0" aria-label={`Ver ${lib.name}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Help({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 text-sm text-zinc-700 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-950">Cómo leer esta galería</h2>
          <button onClick={onClose} aria-label="Cerrar" className="rounded-md p-1 hover:bg-zinc-100">
            <X className="size-4" />
          </button>
        </div>
        <h3 className="mt-5 font-semibold text-zinc-950">Compatibilidad con vibe coding</h3>
        <p className="mt-1">Qué tan fácil es que una herramienta de IA (Lovable, v0, Cursor, Claude Code) use bien la librería:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <b>Alta:</b> se instala con un comando, la IA la conoce bien y tiene recursos para agentes (MCP, llms.txt o registro shadcn).
          </li>
          <li>
            <b>Media:</b> funciona, pero hay que darle documentación a la IA: es muy nueva, cambió de versión, no trae estilos o el código es de pago.
          </li>
          <li>
            <b>Baja:</b> la IA casi no puede usarla sin trabajo manual. Ninguna de las 22 quedó aquí.
          </li>
        </ul>
        <p className="mt-2 text-zinc-500">Las señales (CLI, MCP, llms.txt, registro shadcn) se verificaron el 2026-10-06. La calificación es criterio del laboratorio.</p>
        <h3 className="mt-5 font-semibold text-zinc-950">Look</h3>
        <p className="mt-1">
          Qué tanto se parece al sitio "vibecodeado" típico. <b>Muy visto</b> = la estética por defecto de shadcn, Magic UI o plantillas Tailwind, que hay que personalizar sí o sí. <b>Distintivo</b> = poco común
          o fácil de llevar a una identidad propia.
        </p>
        <h3 className="mt-5 font-semibold text-zinc-950">Responsivo</h3>
        <p className="mt-1">Qué tanto resuelve la librería por sí sola el comportamiento en móvil y tablet (revisado con las demos a 390 px):</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <b>Completo:</b> sus bloques o componentes oficiales ya traen menú móvil, grillas que se apilan y carruseles táctiles.
          </li>
          <li>
            <b>Parcial:</b> trae las piezas (Sheet, Drawer, dropdown…), pero el armado móvil lo haces tú o tiene algún detalle (por ejemplo, un menú que no colapsa).
          </li>
          <li>
            <b>Manual:</b> headless, sin estilos: todo el comportamiento móvil lo defines tú.
          </li>
          <li>
            <b>Variable:</b> depende de cada autor (21st.dev).
          </li>
        </ul>
        <p className="mt-2 text-zinc-500">Pruébalo tú mismo con el selector Escritorio / Tablet / Móvil.</p>
        <h3 className="mt-5 font-semibold text-zinc-950">Etiqueta de cada sección en las demos</h3>
        <ul className="mt-2 space-y-1">
          <li>
            <span className="mr-2 inline-block size-2 rounded-full bg-emerald-500" />
            <b>oficial:</b> bloque o componente tal como lo publica la librería.
          </li>
          <li>
            <span className="mr-2 inline-block size-2 rounded-full bg-amber-500" />
            <b>compuesto:</b> armado por el laboratorio con los componentes de la librería, porque no trae ese bloque.
          </li>
          <li>
            <span className="mr-2 inline-block size-2 rounded-full bg-violet-400" />
            <b>referencia:</b> no se pudo usar el código original (de pago o con API key); es una aproximación o un directorio de enlaces.
          </li>
        </ul>
        <p className="mt-4 text-zinc-500">
          Las secciones compuestas usan el mismo texto de ejemplo en todas las librerías, para comparar en igualdad de condiciones. Los bloques oficiales conservan su texto original (en inglés).
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  const [q, setQ] = useState("");
  const [vibe, setVibe] = useState<Vibe | "Todas">("Todas");
  const [look, setLook] = useState<Look | "Todos">("Todos");
  const [resp, setResp] = useState<Responsive | "Todos">("Todos");
  const [help, setHelp] = useState(false);
  const [device, setDevice] = useDevice();

  const filtered = useMemo(
    () =>
      libraries.filter(
        (l) =>
          (vibe === "Todas" || l.vibe === vibe) &&
          (look === "Todos" || l.look === look) &&
          (resp === "Todos" || responsive[l.id]?.level === resp) &&
          (q === "" || (l.name + l.stack + l.kind).toLowerCase().includes(q.toLowerCase())),
      ),
    [q, vibe, look, resp],
  );

  const mode = route[0] === "comparar" ? "compare" : route[0] === "lado" ? "side" : "lib";
  const byId = (id?: string) => libraries.find((l) => l.id === id);
  const current = (mode === "side" ? byId(route[1]) : byId(route[1])) ?? libraries[0];
  const section = SECTIONS.some((s) => s.id === route[1]) ? route[1] : "hero";
  // Lado a lado: A = librería actual, B = shadcn/ui (el look "vibecodeado" de referencia) si no se eligió otra
  const sideA = byId(route[1]) ?? libraries[0];
  const sideB = byId(route[2]) ?? (sideA.id === "shadcn" ? libraries[0] : byId("shadcn")!);
  const sideSection = route[3] && (route[3] === "todo" || SECTIONS.some((s) => s.id === route[3])) ? route[3] : "todo";

  return (
    <div className="flex h-screen bg-[#eef3ff] text-zinc-950">
      <aside className="flex w-72 shrink-0 flex-col border-r border-[#c9d6fb] bg-[#f4f7ff]">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[15px] font-semibold tracking-tight text-[#041f3e]">Librerías UI</h1>
            <button onClick={() => setHelp(true)} className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
              <HelpCircle className="size-3.5" /> Cómo leer
            </button>
          </div>
          <p className="mt-0.5 text-xs text-zinc-500">22 librerías · Laboratorio de Innovación</p>
          <div className="mt-3 grid grid-cols-[auto_auto_auto] rounded-lg bg-[#dfe8ff] p-0.5 text-xs whitespace-nowrap">
            <a href={`#/lib/${current.id}`} className={`rounded-md px-2 py-1.5 text-center ${mode === "lib" ? "bg-white font-medium text-[#041f3e] shadow-sm" : "text-[#013998]"}`}>
              Explorar
            </a>
            <a href={`#/comparar/${section}`} className={`inline-flex items-center justify-center gap-1 rounded-md px-2 py-1.5 ${mode === "compare" ? "bg-white font-medium text-[#041f3e] shadow-sm" : "text-[#013998]"}`}>
              <LayoutGrid className="size-3.5" /> Comparar
            </a>
            <a href={`#/lado/${sideA.id}/${sideB.id}/${sideSection}`} className={`inline-flex items-center justify-center gap-1 rounded-md px-2 py-1.5 ${mode === "side" ? "bg-white font-medium text-[#041f3e] shadow-sm" : "text-[#013998]"}`}>
              <Columns2 className="size-3.5" /> Lado a lado
            </a>
          </div>
          <label className="mt-3 flex items-center gap-2 rounded-lg border border-[#c9d6fb] bg-white px-2.5 py-1.5 text-sm focus-within:border-[#305fff]">
            <Search className="size-4 text-zinc-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar" className="w-full bg-transparent outline-none" />
          </label>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex flex-wrap items-center gap-1">
              <span className="w-[4.5rem] text-zinc-500">Vibe coding</span>
              {(["Todas", "Alta", "Media"] as const).map((v) => (
                <button key={v} onClick={() => setVibe(v)} className={`rounded-full px-2 py-0.5 ${vibe === v ? "bg-[#013998] text-white" : "bg-white text-zinc-700 ring-1 ring-[#c9d6fb] hover:bg-[#e8eeff]"}`}>
                  {v}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <span className="w-[4.5rem] text-zinc-500">Responsivo</span>
              {(["Todos", "Completo", "Parcial", "Manual"] as const).map((v) => (
                <button key={v} onClick={() => setResp(v)} className={`rounded-full px-2 py-0.5 ${resp === v ? "bg-[#013998] text-white" : "bg-white text-zinc-700 ring-1 ring-[#c9d6fb] hover:bg-[#e8eeff]"}`}>
                  {v}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <span className="w-[4.5rem] text-zinc-500">Look</span>
              {(["Todos", "Distintivo", "Intermedio", "Muy visto"] as const).map((v) => (
                <button key={v} onClick={() => setLook(v)} className={`rounded-full px-2 py-0.5 ${look === v ? "bg-[#013998] text-white" : "bg-white text-zinc-700 ring-1 ring-[#c9d6fb] hover:bg-[#e8eeff]"}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
        <nav className="mt-3 flex-1 overflow-y-auto border-t border-[#c9d6fb] px-2 py-2">
          {filtered.map((l) => (
            <a
              key={l.id}
              // En "lado a lado", elegir en la lista cambia la librería de la derecha
              href={mode === "side" ? `#/lado/${sideA.id}/${l.id}/${sideSection}` : `#/lib/${l.id}`}
              className={`flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm ${
                (mode === "lib" && l.id === current.id) || (mode === "side" && (l.id === sideA.id || l.id === sideB.id)) ? "bg-[#dfe8ff] font-medium text-[#041f3e]" : "hover:bg-[#e8eeff]"
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate">{l.name}</span>
                <span className="block truncate text-xs font-normal text-zinc-500">
                  {l.kind} · {l.price}
                </span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <VibeTag lib={l} short />
                <RespTag lib={l} short />
              </span>
            </a>
          ))}
          {filtered.length === 0 && <p className="px-2.5 py-4 text-sm text-zinc-500">Ninguna librería coincide con los filtros.</p>}
        </nav>
      </aside>
      <main className="min-w-0 flex-1">
        {mode === "compare" ? (
          <CompareView section={section} list={filtered} device={device} setDevice={setDevice} />
        ) : mode === "side" ? (
          <SideBySideView a={sideA} b={sideB} section={sideSection} device={device} setDevice={setDevice} />
        ) : (
          <LibraryView lib={current} device={device} setDevice={setDevice} />
        )}
      </main>
      {help && <Help onClose={() => setHelp(false)} />}
    </div>
  );
}
