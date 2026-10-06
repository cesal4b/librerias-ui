import { Badge, Button, Card, Grid, Header, Icon, Image, Input, NavigationMenu, Separator, Stack, Tabs, Text } from "@fragments-sdk/ui";
import { Puzzle, Rocket, Shield, Sparkles } from "lucide-react";
import { Showcase } from "@/shared/Showcase";
import { brand, cards, footer, gallery } from "@/shared/content";

// Fragments UI (Base UI + tokens, MIT). Navbar, hero, features y cards usan el código de sus "blocks"
// tal como vienen en fragments.json del paquete (texto de ejemplo original en inglés).
const features = [
  { icon: Rocket, title: "Fast Performance", description: "Optimized for speed with minimal bundle size" },
  { icon: Shield, title: "Secure by Default", description: "Built-in security best practices" },
  { icon: Puzzle, title: "Modular Design", description: "Pick only what you need" },
  { icon: Sparkles, title: "Modern Stack", description: "Built with the latest technologies" },
];

export default function Page() {
  return (
    <Showcase
      sections={[
        {
          id: "navbar",
          source: "oficial",
          note: "block «Navigation Header»",
          render: () => (
            <Header>
              <Header.Brand href="/">Acme</Header.Brand>
              <NavigationMenu aria-label="Main navigation">
                <NavigationMenu.List>
                  <NavigationMenu.Item value="products">
                    <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", padding: "8px", minWidth: "400px" }}>
                        <NavigationMenu.Link href="#" title="Analytics" description="Track your metrics and KPIs in real time." />
                        <NavigationMenu.Link href="#" title="Automation" description="Automate repetitive workflows with ease." />
                        <NavigationMenu.Link href="#" title="Integrations" description="Connect with your favorite tools." />
                        <NavigationMenu.Link href="#" title="Security" description="Enterprise-grade protection for your data." />
                      </div>
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <NavigationMenu.Link href="#">Pricing</NavigationMenu.Link>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
                <NavigationMenu.Viewport />
              </NavigationMenu>
              <Header.Spacer />
              <Header.Actions>
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Header.Actions>
            </Header>
          ),
        },
        {
          id: "hero",
          source: "oficial",
          note: "block «Hero Section»",
          render: () => (
            <Stack gap="xl" align="center" style={{ textAlign: "center", padding: "64px 24px" }}>
              <Stack gap="md" align="center" style={{ maxWidth: "600px" }}>
                <Text as="h1" size="2xl" weight="semibold">
                  Build beautiful products faster
                </Text>
                <Text size="lg" color="secondary">
                  A modern component library designed for developers who want to ship quality interfaces without the complexity.
                </Text>
              </Stack>
              <Stack direction={{ base: "column", sm: "row" }} gap="md">
                <Button variant="primary">Get Started</Button>
                <Button variant="secondary">Learn More</Button>
              </Stack>
              <Image src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop" alt="Code on screen" aspectRatio="16:9" rounded="lg" width="100%" style={{ maxWidth: "800px" }} />
            </Stack>
          ),
        },
        {
          id: "features",
          source: "oficial",
          note: "block «Feature Grid»",
          render: () => (
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
              <Grid columns={{ base: 1, md: 2, lg: 4 }} gap="lg">
                {features.map((feature) => (
                  <Card key={feature.title}>
                    <Card.Body>
                      <Stack gap="md">
                        <Icon icon={feature.icon} size="lg" variant="accent" />
                        <Stack gap="xs">
                          <Text weight="semibold">{feature.title}</Text>
                          <Text size="sm" color="tertiary">
                            {feature.description}
                          </Text>
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card>
                ))}
              </Grid>
            </div>
          ),
        },
        {
          id: "cards",
          source: "oficial",
          note: "block «Product Card» con nuestro contenido",
          render: () => (
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
              <Grid columns={{ base: 1, md: 3 }} gap="lg">
                {cards.map((c) => (
                  <Card key={c.title}>
                    <Image src={c.image} alt="" aspectRatio="4:3" />
                    <Card.Body>
                      <Stack gap="sm">
                        <Stack direction="row" justify="between" align="start">
                          <Stack gap="xs">
                            <Text weight="semibold">{c.title}</Text>
                            <Text size="sm" color="tertiary">
                              {c.text}
                            </Text>
                          </Stack>
                          <Badge variant="success">{c.tag}</Badge>
                        </Stack>
                        <Button variant="primary" size="sm">
                          Ver proyecto
                        </Button>
                      </Stack>
                    </Card.Body>
                  </Card>
                ))}
              </Grid>
            </div>
          ),
        },
        {
          id: "gallery",
          source: "compuesto",
          note: "Tabs + Image (Fragments no trae carrusel)",
          render: () => (
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "48px 24px" }}>
              <Tabs defaultValue="0">
                <Tabs.List>
                  {gallery.map((g, i) => (
                    <Tabs.Tab key={i} value={String(i)}>
                      {g.caption}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
                {gallery.map((g, i) => (
                  <Tabs.Panel key={i} value={String(i)}>
                    <div style={{ marginTop: 16 }}>
                      <Image src={g.src} alt={g.alt} aspectRatio="16:9" rounded="lg" width="100%" />
                    </div>
                  </Tabs.Panel>
                ))}
              </Tabs>
            </div>
          ),
        },
        {
          id: "footer",
          source: "compuesto",
          note: "Stack + Text + Input + Separator",
          render: () => (
            <footer style={{ padding: "48px 24px 24px", maxWidth: 1100, margin: "0 auto" }}>
              <Grid columns={{ base: 1, md: 4 }} gap="lg">
                <Stack gap="sm">
                  <Text weight="semibold">{brand}</Text>
                  <Stack direction="row" gap="sm">
                    <Input placeholder="Tu correo" />
                    <Button variant="primary">Unirme</Button>
                  </Stack>
                </Stack>
                {footer.columns.map((c) => (
                  <Stack key={c.title} gap="xs">
                    <Text size="sm" weight="semibold">
                      {c.title}
                    </Text>
                    {c.links.map((l) => (
                      <Text key={l} size="sm" color="secondary">
                        {l}
                      </Text>
                    ))}
                  </Stack>
                ))}
              </Grid>
              <div style={{ margin: "32px 0 16px" }}>
                <Separator />
              </div>
              <Text size="sm" color="tertiary">
                {footer.copy}
              </Text>
            </footer>
          ),
        },
      ]}
    />
  );
}
