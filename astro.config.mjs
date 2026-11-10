// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://artemispanou.gr',

  // Clean URLs without trailing slashes on Cloudflare Pages:
  // /case-studies -> dist/case-studies.html
  build: { format: 'file' },
  trailingSlash: 'never',

  integrations: [sitemap()],
});
