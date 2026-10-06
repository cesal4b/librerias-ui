import { useEffect } from "react";
import { Showcase, ToolbarButton, useParam } from "@/shared/Showcase";
import { brand, cards, features, footer, gallery, hero, img, nav } from "@/shared/content";
import { featureIcons } from "@/shared/icons";

// daisyUI: solo clases CSS sobre Tailwind (navbar, hero, card, carousel, footer...). Todo es oficial.
const themes = ["light", "dark", "cupcake", "retro", "cyberpunk", "garden", "lofi", "pastel", "luxury", "nord", "sunset", "caramellatte", "silk", "synthwave"];

export default function Page() {
  const [theme, setTheme] = useParam("theme", "light");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  return (
    <Showcase
      toolbar={
        <>
          <span>Tema de daisyUI:</span>
          {themes.map((t) => (
            <ToolbarButton key={t} active={t === theme} onClick={() => setTheme(t)}>
              {t}
            </ToolbarButton>
          ))}
        </>
      }
      sections={[
        {
          id: "navbar",
          source: "oficial",
          note: "navbar + menu + dropdown (móvil: hamburguesa)",
          render: () => (
            <div className="navbar bg-base-100 shadow-sm">
              <div className="navbar-start">
                {/* Menú móvil: dropdown con hamburguesa (patrón «responsive navbar» de daisyUI) */}
                <div className="dropdown">
                  <div tabIndex={0} role="button" aria-label="Abrir menú" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                    {nav.map((n) => (
                      <li key={n}>
                        <a>{n}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <a className="btn btn-ghost text-xl">{brand}</a>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <a>{nav[0]}</a>
                  </li>
                  <li>
                    {/* dropdown de daisyUI: el submenú flota sobre el hero (menu > details lo recortaría) */}
                    <details className="dropdown">
                      <summary>{nav[1]}</summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box z-10 mt-2 w-56 p-2 shadow-sm">
                        {features.slice(0, 3).map((f) => (
                          <li key={f.title}>
                            <a>{f.title}</a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                  {nav.slice(2).map((n) => (
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
          note: "hero + hero-overlay + hero-content",
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
          source: "oficial",
          note: "stats + card (compact)",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="stats stats-vertical lg:stats-horizontal w-full shadow">
                {[
                  ["Proyectos", "24", "desde 2024"],
                  ["Personas", "1.2k", "usaron nuestros prototipos"],
                  ["Tiempo", "3 sem", "de la idea al piloto"],
                ].map(([t, v, d]) => (
                  <div key={t} className="stat">
                    <div className="stat-title">{t}</div>
                    <div className="stat-value text-primary">{v}</div>
                    <div className="stat-desc">{d}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f) => {
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
          ),
        },
        {
          id: "cards",
          source: "oficial",
          note: "card + badge + card-actions",
          render: () => (
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
              {cards.map((c) => (
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
          ),
        },
        {
          id: "gallery",
          source: "oficial",
          note: "carousel (CSS puro, con scroll-snap)",
          render: () => (
            <div className="mx-auto max-w-6xl px-6 py-16">
              <div className="carousel carousel-center rounded-box bg-neutral w-full space-x-4 p-4">
                {gallery.map((g) => (
                  <div key={g.src} className="carousel-item">
                    <img src={g.src.replace("1600/1000", "640/440")} alt={g.alt} className="rounded-box h-72" />
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          id: "footer",
          source: "oficial",
          note: "footer + footer-title + join",
          render: () => (
            <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
              <aside>
                <span className="text-xl font-bold">{brand}</span>
                <p>{footer.copy}</p>
                <div className="join mt-2">
                  <input className="input join-item" placeholder="Tu correo" />
                  <button className="btn btn-primary join-item">Unirme</button>
                </div>
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
  );
}
