export type PostMeta = {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  draft: boolean;
}

export type ParsedPost = PostMeta & {
  content: string;
}

export type PostWithHtml = PostMeta & {
  html: string;
}