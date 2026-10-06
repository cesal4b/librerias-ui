import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import Page from "./Page";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <Page />
  </MantineProvider>,
);
