import { getCollection } from 'astro:content';

export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  return posts;
}
