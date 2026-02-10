import matter from 'gray-matter';
import type { ParsedPost } from './postTypes';

function normalizeSlug(fileName: string, rawSlug: unknown): string {
  if (typeof rawSlug === 'string' && rawSlug.trim().length > 0) {
    return rawSlug.trim();
  }
  
  return fileName.replace(/\.md$/, '');
}

function normalizeTags(rawTags: unknown): string[] {
  if (Array.isArray(rawTags)) {
    return rawTags.map(String).map((v) => v.trim()).filter(Boolean)
  }

  if (typeof rawTags === 'string') {
    return rawTags
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean)
  }

  return []
}

export function parsePostFile(fileName: string, raw: string): ParsedPost {
  const { data, content } = matter(raw)

  return {
    slug: normalizeSlug(fileName, data.slug),
    title: String(data.title ?? fileName.replace(/\.md$/, '')),
    tags: normalizeTags(data.tags),
    date: String(data.date ?? ''),
    draft: data.draft === true,
    content,
  }
}