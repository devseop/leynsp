import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  posts,
};
