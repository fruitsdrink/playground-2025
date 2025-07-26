// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import react from "@astrojs/react";

import node from "@astrojs/node";

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

  adapter: node({
    mode: "standalone",
  }),
});