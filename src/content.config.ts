// Content collections: https://docs.astro.build/en/guides/content-collections/
//
// The case-studies collection will be defined when we build the case study
// page, once its fields are known from Figma. Sketch:
//
// import { defineCollection } from 'astro:content';
// import { glob } from 'astro/loaders';
// import { z } from 'astro/zod';
//
// const caseStudies = defineCollection({
//   loader: glob({ pattern: '**/*.yaml', base: './src/content/case-studies' }),
//   schema: ({ image }) =>
//     z.object({
//       title: z.string(),
//       order: z.number(),
//       cover: image(),
//     }),
// });
//
// export const collections = { 'case-studies': caseStudies };

export const collections = {};
