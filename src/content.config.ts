// Content collections: https://docs.astro.build/en/guides/content-collections/
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per case study; the filename is the URL slug.
// For now this holds the fields the homepage needs. The case study page
// will extend the schema (and use the Markdown body) when we build it.
const caseStudies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      tags: z.array(z.string()).min(1),
      thumbnail: image(),
      thumbnailAlt: z.string(),
    }),
});

export const collections = { 'case-studies': caseStudies };
