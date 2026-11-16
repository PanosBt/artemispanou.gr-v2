/**
 * With `build.format: 'file'`, `Astro.url.pathname` ends in `.html` at build
 * time (e.g. `/index.html`, `/case-studies.html`). Returns the clean URL path
 * (`/`, `/case-studies`) used for canonical links and nav state.
 */
export function cleanPath(pathname: string): string {
  return pathname.replace(/(\/index)?\.html$/, '') || '/';
}

/**
 * Link to a project's case study page. Every project card (homepage and
 * /case-studies) uses this, so the target changes in one place.
 * TODO: return `/case-studies/${slug}` once the case study pages exist.
 */
export function caseStudyUrl(_slug: string): string {
  return '#';
}
