import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum([
      'Street Photography',
      'Videography',
      'Urban/Street Videography',
      'Video Editing',
    ]),
    thumbnail: z.string(),
    embedUrl: z.string().optional(),
    featured: z.boolean().default(false),
    sortOrder: z.number().optional(),
  }),
});

const pagesCollection = defineCollection({
  type: 'data',
  schema: z.any(),
});

export const collections = {
  work: workCollection,
  pages: pagesCollection,
};
