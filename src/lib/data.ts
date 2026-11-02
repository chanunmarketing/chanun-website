import { getCollection } from 'astro:content';

export async function getServices() {
  return (await getCollection('services', (s) => s.data.published)).sort(
    (a, b) => a.data.order - b.data.order || a.data.name_en.localeCompare(b.data.name_en),
  );
}

export async function getArticles() {
  return (await getCollection('articles', (a) => a.data.published)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export async function getDoctors() {
  return (await getCollection('doctors')).sort((a, b) => a.data.order - b.data.order);
}

export const categoryOrder = ['lifting', 'skin', 'injectables', 'scar', 'wellness'];

export async function getCases() {
  return (await getCollection('cases', (c) => c.data.published)).sort(
    (a, b) => a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime(),
  );
}

/** Reference fields store a file path; turn it into the service id (file name without .md). */
export function refToId(ref: string): string {
  return (ref || '').split('/').pop()!.replace(/\.md$/, '');
}
