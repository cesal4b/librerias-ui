import { motion } from "motion/react";
import { Container, SimpleGrid } from "@mantine/core";
import { Showcase } from "@/shared/Showcase";
import { ArticleCard } from "@/libs/mantine/blocks/ArticleCard/ArticleCard";
import { CardsCarousel } from "@/libs/mantine/blocks/CardsCarousel/CardsCarousel";
import { FeaturesGrid } from "@/libs/mantine/blocks/FeaturesGrid/FeaturesGrid";
import { FooterLinks } from "@/libs/mantine/blocks/FooterLinks/FooterLinks";
import { HeaderMegaMenu } from "@/libs/mantine/blocks/HeaderMegaMenu/HeaderMegaMenu";
import { HeroBullets } from "@/libs/mantine/blocks/HeroBullets/HeroBullets";

// Mantine no usa Tailwind (CSS propio + CSS Modules): los bloques se animan envolviéndolos en
// motion.div (nunca tocando sus botones/inputs internos directamente, para no repetir el problema
// encontrado en el combo de Tailark + GSAP con elementos que tienen variantes de pseudo-clase).
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "navbar", source: "oficial", note: "ui.mantine.dev/HeaderMegaMenu (Mantine, sin animar)", render: () => <HeaderMegaMenu /> },
        {
          id: "hero",
          source: "compuesto",
          note: "ui.mantine.dev/HeroBullets (Mantine) + motion (entrada con escala)",
          render: () => (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
              <HeroBullets />
            </motion.div>
          ),
        },
        {
          id: "features",
          source: "compuesto",
          note: "ui.mantine.dev/FeaturesGrid (Mantine) + motion (desliza y aparece al hacer scroll)",
          render: () => (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <FeaturesGrid />
            </motion.div>
          ),
        },
        {
          id: "cards",
          source: "compuesto",
          note: "ui.mantine.dev/ArticleCard (Mantine) + motion (stagger + hover-lift, por tarjeta)",
          render: () => (
            <Container size="lg" py="xl">
              <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }}>
                      <ArticleCard />
                    </motion.div>
                  ))}
                </SimpleGrid>
              </motion.div>
            </Container>
          ),
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "ui.mantine.dev/CardsCarousel (Mantine + @mantine/carousel) + motion (entrada con fundido)",
          render: () => (
            <Container size="lg" py="xl">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
                <CardsCarousel />
              </motion.div>
            </Container>
          ),
        },
        { id: "footer", source: "oficial", note: "ui.mantine.dev/FooterLinks (Mantine, sin animar)", render: () => <FooterLinks /> },
      ]}
    />
  );
}
