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
