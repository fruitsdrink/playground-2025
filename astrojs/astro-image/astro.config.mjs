// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['astro.build']
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});