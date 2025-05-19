// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  site: 'https://devseop.github.io',
  base: '/leynsp',
});
