import * as React from "react";
import { hydrateRoot } from "react-dom/client";
import { PageContextClient } from "./types";
import { MantineProvider } from "@mantine/core";

export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;

  if (!Page) {
    throw new Error(
      "Client-side render() hook expects pageContext.Page to be defined"
    );
  }

  const root = document.getElementById("react-root");

  if (!root) {
    throw new Error("DOM element #react-root not found");
  }

  hydrateRoot(
    root,
    <MantineProvider
      theme={{ globalStyles: () => ({ body: { margin: 0, padding: 0 } }) }}
    >
      <Page {...pageProps} />
    </MantineProvider>
  );
}
