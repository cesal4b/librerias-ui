import { Showcase } from "@/shared/Showcase";
import { ArticleCard } from "./blocks/ArticleCard/ArticleCard";
import { CardsCarousel } from "./blocks/CardsCarousel/CardsCarousel";
import { FeaturesGrid } from "./blocks/FeaturesGrid/FeaturesGrid";
import { FooterLinks } from "./blocks/FooterLinks/FooterLinks";
import { HeaderMegaMenu } from "./blocks/HeaderMegaMenu/HeaderMegaMenu";
import { HeroBullets } from "./blocks/HeroBullets/HeroBullets";
import { SimpleGrid, Container } from "@mantine/core";

// Bloques oficiales y gratuitos de ui.mantine.dev (MIT), copiados tal cual.
export default function Page() {
  return (
    <Showcase
      sections={[
        { id: "navbar", source: "oficial", note: "ui.mantine.dev/HeaderMegaMenu", render: () => <HeaderMegaMenu /> },
        { id: "hero", source: "oficial", note: "ui.mantine.dev/HeroBullets", render: () => <HeroBullets /> },
        { id: "features", source: "oficial", note: "ui.mantine.dev/FeaturesGrid", render: () => <FeaturesGrid /> },
        {
          id: "cards",
          source: "oficial",
          note: "ui.mantine.dev/ArticleCard",
          render: () => (
            <Container size="lg" py="xl">
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <ArticleCard />
                <ArticleCard />
                <ArticleCard />
              </SimpleGrid>
            </Container>
          ),
        },
        { id: "gallery", source: "oficial", note: "ui.mantine.dev/CardsCarousel (@mantine/carousel)", render: () => <Container size="lg" py="xl"><CardsCarousel /></Container> },
        { id: "footer", source: "oficial", note: "ui.mantine.dev/FooterLinks", render: () => <FooterLinks /> },
      ]}
    />
  );
}
