import type { APIRoute } from 'astro';
import { getArticles, getServices } from '../lib/data';

export const GET: APIRoute = async ({ site }) => {
  const origin = site!.toString().replace(/\/$/, '');
  const base = ['/', '/services/', '/articles/', '/membership/', '/about/', '/contact/'];
  const services = (await getServices()).map((s) => `/services/${s.id}/`);
  const articles = (await getArticles()).map((a) => `/articles/${a.id}/`);
  const paths = [...base, ...services, ...articles];
  const url = (p: string) => {
    const th = origin + p;
    const en = origin + (p === '/' ? '/en/' : `/en${p}`);
    const alt = `<xhtml:link rel="alternate" hreflang="th" href="${th}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/>`;
    return `<url><loc>${th}</loc>${alt}</url><url><loc>${en}</loc>${alt}</url>`;
  };
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${paths.map(url).join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
