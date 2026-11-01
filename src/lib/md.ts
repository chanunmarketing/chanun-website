import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

export function md(src: string | undefined): string {
  if (!src || !src.trim()) return '';
  return marked.parse(src, { async: false }) as string;
}
