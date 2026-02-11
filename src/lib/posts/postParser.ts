import type { ParsedPost } from './postTypes';

type FrontmatterData = Record<string, unknown>

function stripQuotes(value: string): string {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseScalar(value: string): unknown {
  const normalized = stripQuotes(value)
  const lower = normalized.toLowerCase()

  if (lower === 'true') return true
  if (lower === 'false') return false

  return normalized
}

function splitFrontmatter(raw: string): { data: FrontmatterData; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)

  if (!match) {
    return { data: {}, content: raw }
  }

  const frontmatterBlock = match[1]
  const content = raw.slice(match[0].length)
  const data: FrontmatterData = {}
  let currentArrayKey: string | null = null

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) continue

    const arrayItemMatch = line.match(/^\s*-\s*(.*)$/)

    if (arrayItemMatch && currentArrayKey) {
      const existing = data[currentArrayKey]
      const list = Array.isArray(existing) ? existing : []
      list.push(parseScalar(arrayItemMatch[1]))
      data[currentArrayKey] = list
      continue
    }

    const keyValueMatch = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/)

    if (!keyValueMatch) {
      currentArrayKey = null
      continue
    }

    const [, key, rawValue] = keyValueMatch

    if (rawValue.trim() === '') {
      data[key] = []
      currentArrayKey = key
      continue
    }

    currentArrayKey = null
    data[key] = parseScalar(rawValue)
  }

  return { data, content }
}

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

function normalizeDraft(rawDraft: unknown): boolean {
  if (typeof rawDraft === 'boolean') return rawDraft

  if (typeof rawDraft === 'string') {
    return rawDraft.trim().toLowerCase() === 'true'
  }

  return false
}

export function parsePostFile(fileName: string, raw: string): ParsedPost {
  const { data, content } = splitFrontmatter(raw)

  return {
    slug: normalizeSlug(fileName, data.slug),
    title: String(data.title ?? fileName.replace(/\.md$/, '')),
    tags: normalizeTags(data.tags),
    date: String(data.date ?? ''),
    draft: normalizeDraft(data.draft),
    content,
  }
}
