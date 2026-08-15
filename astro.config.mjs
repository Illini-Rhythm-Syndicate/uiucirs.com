// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

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

  integrations: [react()],
  
  site: 'https://illini-rhythm-syndicate.github.io',
  base: '/uiucirs.com',
});