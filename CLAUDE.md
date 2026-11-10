# artemispanou.gr v2

Portfolio website for Artemis Panou.

## Sources of truth

1. **Figma (primary, always wins).** The file URL and key are in `CLAUDE.local.md` (gitignored, kept out of this public repo).
   - Layout, spacing, typography, colors, copy, and assets all come from Figma.
2. **Animation reference only:** `../artemispanou.gr-claude-code-design-project/`
   - A static HTML prototype Artemis built with Claude to try out animations Figma can't express.
   - Use it **only** for animation and interaction behavior that Figma doesn't show. Don't copy its layout, styles, or content when they differ from Figma.
   - Files: `index.html`, `case-studies.html`, `case-study-booking-system.html`, `case-study-celeste.html`, `case-study-chris-raptis.html`, `assets/`, `_system/`.

## Workflow

- Build page by page. Only start a page when the user asks for it. Don't build other pages ahead of time.
- All generated code goes in this directory (`artemispanou.gr-v2/`, a git repo on `main`).
- Commit only when the user asks.

## Tech stack

- **Astro 7** (static output), **SCSS** via `sass`, `@astrojs/sitemap`. Plain JS, no UI framework.
- **Node 26** (see `.nvmrc`; installed with `n`).
- Hosted on **Cloudflare Pages**: build command `npm run build`, output dir `dist`.

Commands: `npm run dev`, `npm run build`, `npm run preview`, `npm run check` (type check).

## Structure

```
public/               copied as-is, NOT hashed: favicon, robots.txt, _headers (Cloudflare cache rules)
src/
  assets/             images/fonts, optimized + hashed (use <Image /> from astro:assets)
  components/         reusable .astro components (Header, Footer, ...)
  layouts/            BaseLayout.astro: <head>, meta/OG/canonical, global.scss, main.js
  pages/              one file per route
  content/            content collections (case study data)
  content.config.ts   collection schemas
  styles/             _tokens, _mixins, _reset, global.scss
  js/                 client JS, loaded via <script> tags (bundled + hashed; don't use is:inline)
```

- Global styles: `global.scss`, imported once in `BaseLayout`. Component styles: `<style lang="scss">` (scoped), with `@use '../styles/tokens' as *;`.
- Design tokens (colors, type, spacing, breakpoints) come from Figma variables and go in `_tokens.scss` / `_mixins.scss`.

## URLs

Clean URLs with no trailing slash: `build.format: 'file'` + `trailingSlash: 'never'`. Domain: `https://artemispanou.gr`.

| URL | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/case-studies` | `src/pages/case-studies.astro` (listing, reads the collection) |
| `/case-studies/<slug>` (`celeste`, `booking-system`, `chris-raptis`) | `src/pages/case-studies/[slug].astro` (single template) |

- All case studies share one layout: one template plus one data file per case study in `src/content/case-studies/`, with images in `src/assets/case-studies/<slug>/`. The data format (YAML vs Markdown/MDX) and the schema get decided when we build that page.
- `Astro.url.pathname` ends in `.html` at build time because of `format: 'file'`. `BaseLayout` strips it for canonical/OG URLs, so reuse that logic wherever a clean URL is needed.
