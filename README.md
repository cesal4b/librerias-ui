# Librerías UI · Lab Innovación CESA

Galería para comparar **22 librerías de componentes** (React, Tailwind y otras) con las mismas secciones de un micrositio: barra de navegación, hero, features, cards, galería/carrusel y footer.

Está pensada para equipos que construyen sitios con IA (vibe coding) y quieren elegir una librería que **no se vea genérica**.

**Ver la galería:** https://cesal4b.github.io/librerias-ui/

## Qué incluye

- **Explorar:** una librería a la vez, con su ficha.
- **Comparar:** la misma sección en todas las librerías.
- **Lado a lado:** dos librerías completas, una junto a la otra.
- **Selector Escritorio / Tablet / Móvil:** disponible en los tres modos.
- **Etiquetas por librería:**
  - **Vibe coding** (Alta/Media): qué tan bien la usan Lovable, v0, Cursor o Claude Code.
  - **Look** (Muy visto/Intermedio/Distintivo): qué tanto se parece al sitio "hecho con IA" típico.
  - **Responsivo** (Completo/Parcial/Manual/Variable): qué tanto resuelve el móvil por sí sola.
- **Instrucción para vibe coding** lista para copiar en cada ficha.
- **Origen de cada sección:**
  - **oficial:** bloque o componente tal como lo publica la librería.
  - **compuesto:** armado con sus componentes, porque la librería no trae ese bloque.
  - **referencia:** aproximación, cuando el código original es de pago.

Las calificaciones son criterio del laboratorio. Las señales técnicas (CLI, MCP, llms.txt, registro shadcn) se verificaron en las fuentes oficiales.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # → dist/
```

- Cada librería es una página aislada (`pages/<id>.html` → `src/libs/<id>/`), para que sus estilos globales no choquen entre sí.
- Las fichas están en `src/shell/libraries.ts`, `responsive.ts` y `vibe.ts`.
- `tools/fetch-registry.mjs` descarga componentes de cualquier registro shadcn.

Cada push a `main` se publica solo en GitHub Pages (`.github/workflows/deploy.yml`).

## Créditos

El código de terceros incluido es gratuito y conserva su licencia original: ver [CREDITOS.md](CREDITOS.md).
