#!/bin/bash
# Crea el esqueleto de una librería del ecosistema shadcn: pages/<id>.html + main.tsx + styles.css
id=$1; title=$2
./tools/new-page.sh "$id" "$title"
mkdir -p src/libs/$id
[ -f src/libs/$id/styles.css ] || cat > src/libs/$id/styles.css <<CSS
@import "tailwindcss" source(none);
@source "./";
@import "../../shared/shadcn-theme.css";
CSS
[ -f src/libs/$id/main.tsx ] || cat > src/libs/$id/main.tsx <<TSX
import { createRoot } from "react-dom/client";
import "./styles.css";
import Page from "./Page";

createRoot(document.getElementById("root")!).render(<Page />);
TSX
