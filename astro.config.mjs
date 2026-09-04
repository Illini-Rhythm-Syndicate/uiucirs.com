// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Baloo 2",
      cssVariable: "--font-display",
      weights: [400, 600, 700],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Nunito",
      cssVariable: "--font-body",
      weights: [400, 600],
    },
  ],

  integrations: [
    react(),
    // Exclude freeplays page until it's finished
    sitemap({ filter: (page) => !page.includes("/freeplays") }),
  ],

  site: 'https://uiucirs.com',
});
