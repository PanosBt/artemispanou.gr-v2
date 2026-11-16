/**
 * With `build.format: 'file'`, `Astro.url.pathname` ends in `.html` at build
 * time (e.g. `/index.html`, `/case-studies.html`). Returns the clean URL path
 * (`/`, `/case-studies`) used for canonical links and nav state.
 */
export function cleanPath(pathname: string): string {
  return pathname.replace(/(\/index)?\.html$/, '') || '/';
}
