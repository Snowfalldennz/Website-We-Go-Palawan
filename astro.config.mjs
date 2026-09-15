// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Placeholder until a real domain is chosen. Every canonical URL, Open
  // Graph tag and sitemap entry is built from this one value (via
  // Astro.site) — update it here and rebuild, nothing else needs to change.
  site: 'https://wegopalawan.com',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  image: {
    // sharp handles jpg/png/webp/avif inputs and emits optimized WebP/AVIF.
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [sitemap()],
});
