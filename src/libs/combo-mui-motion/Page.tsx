import { motion } from "motion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Showcase } from "@/shared/Showcase";
import { gallery } from "@/shared/content";
import AppTheme from "@/libs/mui/shared-theme/AppTheme";
import AppAppBar from "@/libs/mui/template/components/AppAppBar";
import Features from "@/libs/mui/template/components/Features";
import Footer from "@/libs/mui/template/components/Footer";
import Hero from "@/libs/mui/template/components/Hero";
import Testimonials from "@/libs/mui/template/components/Testimonials";

// MUI es CSS-in-JS (Emotion, sin Tailwind): igual que en el combo de Mantine, se anima envolviendo
// cada bloque oficial en motion.div, sin tocar sus botones/inputs internos.
export default function Page() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Showcase
        sections={[
          {
            id: "navbar",
            source: "oficial",
            note: "plantilla marketing-page/AppAppBar (MUI, sin animar)",
            render: () => (
              <div style={{ transform: "translateZ(0)", height: 110 }}>
                <AppAppBar />
              </div>
            ),
          },
          {
            id: "hero",
            source: "compuesto",
            note: "plantilla marketing-page/Hero (MUI) + motion (entrada con fundido y escala)",
            render: () => (
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
                <Hero />
              </motion.div>
            ),
          },
          {
            id: "features",
            source: "compuesto",
            note: "plantilla marketing-page/Features (MUI) + motion (desliza y aparece al hacer scroll)",
            render: () => (
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Features />
              </motion.div>
            ),
          },
          {
            id: "cards",
            source: "compuesto",
            note: "plantilla marketing-page/Testimonials (MUI) + motion (fundido al entrar en pantalla)",
            render: () => (
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
                <Testimonials />
              </motion.div>
            ),
          },
          {
            id: "gallery",
            source: "compuesto",
            note: "ImageList en mampostería (MUI, no trae carrusel) + motion (entrada con fundido)",
            render: () => (
              <Container sx={{ py: 8 }}>
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
                  <ImageList variant="masonry" cols={3} gap={12}>
                    {gallery.map((g, i) => (
                      <ImageListItem key={g.src}>
                        <img src={g.src.replace("1600/1000", i % 2 ? "800/1000" : "800/560")} alt={g.alt} loading="lazy" style={{ borderRadius: 8 }} />
                        <ImageListItemBar title={g.caption} sx={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </motion.div>
              </Container>
            ),
          },
          { id: "footer", source: "oficial", note: "plantilla marketing-page/Footer (MUI, sin animar)", render: () => <Footer /> },
        ]}
      />
    </AppTheme>
  );
}
