import hljs from 'highlight.js/lib/common';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

marked.setOptions({
  gfm: true,
  breaks: false,
});

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    emptyLangClass: 'hljs',
    highlight(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }

      return hljs.highlightAuto(code).value;
    },
  }),
);

export async function renderMarkdown(content: string): Promise<string> {
  const rendered = await marked.parse(content);

  return String(rendered);
}
