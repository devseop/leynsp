import fs from 'node:fs/promises';
import path from 'node:path';
import { parsePostFile } from './postParser';
import { renderMarkdown } from './markdown';
import type { PostMeta, ParsedPost, PostWithHtml } from './postTypes';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

async function readAllParsedPosts(): Promise<ParsedPost[]> {
  let files: string[] = [];

  try {
    files = await fs.readdir(POSTS_DIR);
  } catch {
    return [];
  }

  const mdFiles = files.filter((file) => file.endsWith('.md'));

  const posts = await Promise.all(
    mdFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
      
      return parsePostFile(file, raw);
    }),
  )

  return posts.filter((post) => !post.draft);
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const posts = await readAllParsedPosts();
  
  return posts.map(({ content: _content, ...meta }) => meta);
}

export async function getPostBySlug(slug: string): Promise<PostWithHtml | null> {
  const posts = await readAllParsedPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) return null;

  const html = await renderMarkdown(post.content);

  return {
    slug: post.slug,
    title: post.title,
    tags: post.tags,
    date: post.date,
    draft: post.draft,
    html,
  };
}