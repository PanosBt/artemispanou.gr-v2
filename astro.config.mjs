// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://artemispanou.gr',

  // Clean URLs without trailing slashes on Cloudflare Pages:
  // /case-studies -> dist/case-studies.html
  build: { format: 'file' },
  trailingSlash: 'never',

  integrations: [sitemap()],

  // Fonts are downloaded at build time and self-hosted (hashed, with metric-matched fallbacks).
  // Bricolage Grotesque's default instance is opsz 14 / wdth 100, which is what Figma uses.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      weights: ['600 800'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Montserrat',
      cssVariable: '--font-body',
      weights: ['400 500'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
