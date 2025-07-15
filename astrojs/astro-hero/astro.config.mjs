// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    open: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    headingIdCompat: true,
  },

  integrations: [mdx(), react()],
});