import { parsePostFile } from './postParser'
import { renderMarkdown } from './markdown'
import type { ParsedPost, PostMeta, PostWithHtml } from './postTypes'

const rawPosts = import.meta.glob('../../routes/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const parsedPosts: ParsedPost[] = Object.entries(rawPosts)
  .map(([filePath, raw]) => {
    const fileName = filePath.split('/').at(-1) ?? 'post.md'

    return parsePostFile(fileName, raw)
  })
  .filter((post) => !post.draft)

export function getAllPosts(): PostMeta[] {
  return parsedPosts.map(({ content: _content, ...meta }) => meta)
}

export async function getPostBySlug(slug: string): Promise<PostWithHtml | null> {
  const post = parsedPosts.find((candidate) => candidate.slug === slug)

  if (!post) return null

  const html = await renderMarkdown(post.content)

  return {
    slug: post.slug,
    title: post.title,
    tags: post.tags,
    date: post.date,
    draft: post.draft,
    html,
  }
}
