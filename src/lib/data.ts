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

import categoryData from '../data/categories.json';
export const categories = categoryData.categories;
export const categoryOrder = categories.map((c) => c.id);
export function catName(id: string): string {
  return categories.find((c) => c.id === id)?.name ?? id;
}
export function subgroupsOf(id: string): { id: string; name: string; desc_th: string; desc_en: string }[] {
  return ((categories.find((c) => c.id === id) as any)?.subgroups ?? []) as any[];
}
export function catDesc(id: string, lang: 'th' | 'en'): string {
  const c: any = categories.find((x) => x.id === id);
  return c ? (lang === 'en' ? c.desc_en || c.desc_th : c.desc_th) : '';
}

export async function getCases() {
  return (await getCollection('cases', (c) => c.data.published)).sort(
    (a, b) => a.data.order - b.data.order || b.data.date.getTime() - a.data.date.getTime(),
  );
}

/** Reference fields store a file path; turn it into the service id (file name without .md). */
export function refToId(ref: string): string {
  return (ref || '').split('/').pop()!.replace(/\.md$/, '');
}

/** Before & After gallery: published items with at least one image (the whole website carries one สบส. approval, shown in the footer). */
export async function getGallery() {
  return (await getCollection('gallery', (g) => g.data.published && g.data.images.length > 0)).sort(
    (a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
}
