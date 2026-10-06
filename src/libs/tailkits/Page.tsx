import { Showcase } from "@/shared/Showcase";
import blog1 from "./html/blog-1.html?raw";
import features1 from "./html/features-1.html?raw";
import footer1 from "./html/footer-1.html?raw";
import hero1 from "./html/hero-1.html?raw";
import navbar1 from "./html/navbar-1.html?raw";

// Componentes gratuitos de github.com/tailkits/tailkits-ui (MIT): HTML + Tailwind, sin JavaScript.
const Html = ({ html }: { html: string }) => <div dangerouslySetInnerHTML={{ __html: html }} />;

export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "navbar", source: "oficial", note: "tailkits-ui/navbar-1.html", render: () => <Html html={navbar1} /> },
        { id: "hero", source: "oficial", note: "tailkits-ui/hero-1.html", render: () => <Html html={hero1} /> },
        { id: "features", source: "oficial", note: "tailkits-ui/features-1.html", render: () => <Html html={features1} /> },
        { id: "cards", source: "oficial", note: "tailkits-ui/blog-1.html (tarjetas de blog)", render: () => <Html html={blog1} /> },
        { id: "footer", source: "oficial", note: "tailkits-ui/footer-1.html", render: () => <Html html={footer1} /> },
      ]}
    />
  );
}
