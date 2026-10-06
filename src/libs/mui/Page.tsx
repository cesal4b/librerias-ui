import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Showcase } from "@/shared/Showcase";
import { gallery } from "@/shared/content";
import AppTheme from "./shared-theme/AppTheme";
import AppAppBar from "./template/components/AppAppBar";
import Features from "./template/components/Features";
import Footer from "./template/components/Footer";
import Hero from "./template/components/Hero";
import Testimonials from "./template/components/Testimonials";

// Secciones de la plantilla gratuita "Marketing page" de MUI (github.com/mui/material-ui, MIT).
export default function Page() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Showcase
        sections={[
          {
            id: "navbar",
            source: "oficial",
            note: "plantilla marketing-page/AppAppBar",
            // La barra es position="fixed": transform la deja dentro de su sección
            render: () => <div style={{ transform: "translateZ(0)", height: 110 }}><AppAppBar /></div>,
          },
          { id: "hero", source: "oficial", note: "plantilla marketing-page/Hero", render: () => <Hero /> },
          { id: "features", source: "oficial", note: "plantilla marketing-page/Features", render: () => <Features /> },
          { id: "cards", source: "oficial", note: "plantilla marketing-page/Testimonials", render: () => <Testimonials /> },
          {
            id: "gallery",
            source: "compuesto",
            note: "ImageList en mampostería (MUI no trae carrusel)",
            render: () => (
              <Container sx={{ py: 8 }}>
                <ImageList variant="masonry" cols={3} gap={12}>
                  {gallery.map((g, i) => (
                    <ImageListItem key={g.src}>
                      <img src={g.src.replace("1600/1000", i % 2 ? "800/1000" : "800/560")} alt={g.alt} loading="lazy" style={{ borderRadius: 8 }} />
                      <ImageListItemBar title={g.caption} sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Container>
            ),
          },
          { id: "footer", source: "oficial", note: "plantilla marketing-page/Footer", render: () => <Footer /> },
        ]}
      />
    </AppTheme>
  );
}
