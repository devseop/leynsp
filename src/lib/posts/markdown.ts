import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
});

export async function renderMarkdown(content: string): Promise<string> {
  const rendered = await marked.parse(content);

  return String(rendered);
}