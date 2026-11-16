// Content collections: https://docs.astro.build/en/guides/content-collections/
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project; the filename is the URL slug.
// Every project is listed on /case-studies and links to its case study page.
// The case study page will extend the schema (and use the Markdown body) when we build it.
const caseStudies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Position on /case-studies; the card number (01, 02, …) follows this order. */
      order: z.number().int().positive(),
      category: z.string(),
      summary: z.string(),
      thumbnail: image(),
      /** Leave empty when the thumbnail is only a stand-in for a project's own artwork. */
      thumbnailAlt: z.string(),
    }),
});

export const collections = { 'case-studies': caseStudies };
