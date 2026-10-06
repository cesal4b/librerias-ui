import * as React from "react";

/** Botón para las barras de herramientas (estilos en línea, independientes de la librería) */
export function ToolbarButton({ active, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      {...props}
      style={{
        font: "500 12px/1 ui-sans-serif, system-ui, sans-serif",
        padding: "6px 10px",
        borderRadius: 6,
        border: "1px solid " + (active ? "#fafafa" : "#3f3f46"),
        background: active ? "#fafafa" : "transparent",
        color: active ? "#09090b" : "#e4e4e7",
        cursor: "pointer",
      }}
    />
  );
}

/** Lee y escribe un parámetro de la URL (para que el estado sobreviva al recargar y se pueda enlazar) */
export function useParam(name: string, fallback: string) {
  const [value, setValue] = React.useState(() => new URLSearchParams(location.search).get(name) ?? fallback);
  const set = (v: string) => {
    const u = new URL(location.href);
    u.searchParams.set(name, v);
    history.replaceState(null, "", u);
    setValue(v);
  };
  return [value, set] as const;
}

export type SectionId = "navbar" | "hero" | "features" | "cards" | "gallery" | "footer";

export const SECTION_NAMES: Record<SectionId, string> = {
  navbar: "Barra de navegación",
  hero: "Hero",
  features: "Features",
  cards: "Cards",
  gallery: "Galería / carrusel",
  footer: "Footer",
};

export type Section = {
  id: SectionId;
  /** oficial = bloque o componente tal como lo publica la librería; compuesto = armado por nosotros con sus componentes */
  source: "oficial" | "compuesto" | "referencia";
  /** Qué componente o bloque se usó, p. ej. "shadcnblocks/hero1" */
  note: string;
  render: () => React.ReactNode;
};

// Franja de etiqueta con estilos en línea: no depende del CSS de ninguna librería.
const chip: React.CSSProperties = {
  position: "relative",
  // sin z-index: los menús desplegables (dentro de la sección o en portales al final del body) deben quedar encima de la franja
  display: "flex",
  gap: 8,
  alignItems: "center",
  padding: "5px 16px",
  font: "500 11px/1.4 ui-sans-serif, system-ui, sans-serif",
  letterSpacing: 0,
  textTransform: "none",
  background: "#18181b",
  color: "#fafafa",
};

const dot = { oficial: "#22c55e", compuesto: "#f59e0b", referencia: "#a78bfa" } as const;

class Boundary extends React.Component<{ name: string; children: React.ReactNode }, { error?: Error }> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error)
      return (
        <div style={{ padding: 24, font: "13px ui-monospace, monospace", color: "#b91c1c", background: "#fef2f2" }}>
          Error al renderizar {this.props.name}: {this.state.error.message}
        </div>
      );
    return this.props.children;
  }
}

/** Página de una librería: renderiza sus secciones con una etiqueta que dice de dónde salió cada una.
 *  ?only=<seccion> muestra solo esa sección (lo usa la vista "Comparar"); ?labels=0 oculta las etiquetas. */
export function Showcase({
  sections,
  wrap,
  toolbar,
}: {
  sections: Section[];
  wrap?: (children: React.ReactNode) => React.ReactNode;
  /** Controles propios de la librería (p. ej. selector de kit o tema), en una franja superior */
  toolbar?: React.ReactNode;
}) {
  // Las demos no navegan: sus enlaces de ejemplo ("/", "/dashboard"…) cargarían la galería dentro del iframe.
  // Solo se permiten los enlaces que abren en pestaña nueva (target="_blank").
  React.useEffect(() => {
    const block = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (a && a.target !== "_blank") e.preventDefault();
    };
    document.addEventListener("click", block, true);
    return () => document.removeEventListener("click", block, true);
  }, []);
  const params = new URLSearchParams(location.search);
  const only = params.get("only");
  const labels = params.get("labels") !== "0";
  const list = only ? sections.filter((s) => s.id === only) : sections;
  const missing = (Object.keys(SECTION_NAMES) as SectionId[]).filter((id) => !sections.some((s) => s.id === id));
  const body = (
    <>
      {toolbar && !only && (
        <div style={{ ...chip, gap: 10, padding: "8px 16px", background: "#09090b", flexWrap: "wrap" }}>{toolbar}</div>
      )}
      {list.map((s) => (
        <section
          key={s.id}
          id={s.id}
          data-section={s.id}
          // Solo la barra de navegación sube de capa, para que sus menús no queden detrás del hero.
          // Las demás secciones no crean capa propia: así los menús que se abren en un portal (Base UI, Radix…) quedan encima.
          style={{ position: "relative", overflowX: "clip", zIndex: s.id === "navbar" ? 2 : undefined }}
        >
          {labels && (
            <div style={chip}>
              <span style={{ width: 7, height: 7, borderRadius: 9, background: dot[s.source] }} />
              <span>{SECTION_NAMES[s.id]}</span>
              <span style={{ opacity: 0.6 }}>{s.source}</span>
              <code style={{ opacity: 0.85, font: "11px ui-monospace, monospace" }}>{s.note}</code>
            </div>
          )}
          <Boundary name={s.note}>{s.render()}</Boundary>
        </section>
      ))}
      {!only && missing.length > 0 && (
        <div style={{ ...chip, background: "#27272a", padding: "14px 16px", fontSize: 13 }}>
          Esta librería no trae: {missing.map((m) => SECTION_NAMES[m]).join(", ")}
        </div>
      )}
      {only && list.length === 0 && (
        <div style={{ padding: 32, font: "14px system-ui", color: "#666" }}>Esta librería no tiene esta sección.</div>
      )}
    </>
  );
  return <>{wrap ? wrap(body) : body}</>;
}
