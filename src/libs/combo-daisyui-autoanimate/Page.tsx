import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, img, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";

// @formkit/auto-animate: un solo hook (useAutoAnimate) y el contenedor anima solo cualquier
// adición, salida o reordenamiento de sus hijos directos. Sin keyframes ni props de animación.

const categories = ["Todas", "Producto", "Datos", "Comunidad"] as const;
const featureCategory: Record<string, (typeof categories)[number]> = {
  "Prototipado rápido": "Producto",
  "Investigación con usuarios": "Datos",
  "Diseño accesible": "Producto",
  "Datos en tiempo real": "Datos",
  Automatización: "Producto",
  Comunidad: "Comunidad",
};

const popularOrder = ["Coffee networking", "Cero papel", "Generador de piezas"];

function FeaturesAutoAnimate() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todas");
  const [gridRef] = useAutoAnimate<HTMLDivElement>();
  const list = filter === "Todas" ? features : features.filter((f) => featureCategory[f.title] === filter);
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`btn btn-sm ${filter === c ? "btn-primary" : "btn-ghost"}`}>
            {c}
          </button>
        ))}
      </div>
      <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f) => {
          const Icon = featureIcons[f.icon];
          return (
            <div key={f.title} className="card card-border bg-base-100">
              <div className="card-body">
                <Icon className="text-secondary size-6" />
                <h3 className="card-title">{f.title}</h3>
                <p className="text-base-content/70">{f.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CardsAutoAnimate() {
  const [popular, setPopular] = useState(false);
  const [gridRef] = useAutoAnimate<HTMLDivElement>();
  const list = popular ? [...cards].sort((a, b) => popularOrder.indexOf(a.title) - popularOrder.indexOf(b.title)) : cards;
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex justify-end">
        <button className="btn btn-outline btn-sm" onClick={() => setPopular((p) => !p)}>
          {popular ? "Orden original" : "Más popular primero"}
        </button>
      </div>
      <div ref={gridRef} className="grid gap-6 md:grid-cols-3">
        {list.map((c) => (
          <div key={c.title} className="card bg-base-100 shadow-sm">
            <figure>
              <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {c.title}
                <div className="badge badge-accent">{c.tag}</div>
              </h2>
              <p>{c.text}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">Ver proyecto</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryAutoAnimate() {
  const [order, setOrder] = useState(gallery);
  const [trackRef] = useAutoAnimate<HTMLDivElement>();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-6 flex justify-end">
        <button className="btn btn-outline btn-sm" onClick={() => setOrder((o) => [...o].sort(() => Math.random() - 0.5))}>
          🔀 Mezclar orden
        </button>
      </div>
      <div ref={trackRef} className="carousel carousel-center rounded-box bg-neutral w-full space-x-4 p-4">
        {order.map((g) => (
          <div key={g.src} className="carousel-item">
            <img src={g.src.replace("1600/1000", "640/440")} alt={g.alt} className="rounded-box h-72" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div data-theme="retro">
      <Showcase
        sections={[
          {
            id: "navbar",
            source: "oficial",
            note: "navbar + menu + dropdown (daisyUI, sin animar)",
            render: () => (
              <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                  <a className="btn btn-ghost text-xl">{brand}</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                  <ul className="menu menu-horizontal px-1">
                    {nav.map((n) => (
                      <li key={n}>
                        <a>{n}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="navbar-end">
                  <a className="btn btn-primary">Ingresar</a>
                </div>
              </div>
            ),
          },
          {
            id: "hero",
            source: "oficial",
            note: "hero + hero-overlay (daisyUI, tema retro, sin animar)",
            render: () => (
              <div className="hero min-h-[34rem]" style={{ backgroundImage: `url(${img("lab-daisy-hero", 1800, 900)})` }}>
                <div className="hero-overlay" />
                <div className="hero-content text-neutral-content text-center">
                  <div className="max-w-2xl">
                    <div className="badge badge-secondary">{hero.eyebrow}</div>
                    <h1 className="mt-4 mb-5 text-5xl font-bold">{hero.title}</h1>
                    <p className="mb-5">{hero.subtitle}</p>
                    <div className="flex justify-center gap-2">
                      <button className="btn btn-primary">{hero.primary}</button>
                      <button className="btn btn-outline btn-neutral-content text-neutral-content">{hero.secondary}</button>
                    </div>
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: "features",
            source: "compuesto",
            note: "card (daisyUI) + @formkit/auto-animate (filtro por categoría, sin escribir ninguna animación)",
            render: () => <FeaturesAutoAnimate />,
          },
          {
            id: "cards",
            source: "compuesto",
            note: "card (daisyUI) + @formkit/auto-animate (reordenar con «Más popular primero»)",
            render: () => <CardsAutoAnimate />,
          },
          {
            id: "gallery",
            source: "compuesto",
            note: "carousel (daisyUI, CSS puro) + @formkit/auto-animate (botón «Mezclar orden»)",
            render: () => <GalleryAutoAnimate />,
          },
          {
            id: "footer",
            source: "oficial",
            note: "footer + footer-title + join (daisyUI, sin animar)",
            render: () => (
              <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                <aside>
                  <span className="text-xl font-bold">{brand}</span>
                  <p>{footer.copy}</p>
                </aside>
                {footer.columns.map((c) => (
                  <nav key={c.title}>
                    <h6 className="footer-title">{c.title}</h6>
                    {c.links.map((l) => (
                      <a key={l} className="link link-hover">
                        {l}
                      </a>
                    ))}
                  </nav>
                ))}
              </footer>
            ),
          },
        ]}
      />
    </div>
  );
}
