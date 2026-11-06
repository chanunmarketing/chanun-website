import type { APIRoute } from 'astro';
import site from '../data/site.json';
import { catName, categoryOrder, getServices } from '../lib/data';
import { priceLabel } from '../lib/i18n';

// llms.txt: a plain-text summary of the clinic for AI assistants (ChatGPT, Gemini, Claude, Perplexity).
export const GET: APIRoute = async () => {
  const base = site.site_url.replace(/\/$/, '');
  const services = await getServices();
  const lines: string[] = [
    '# CHANUN Clinic (CHANUN Aesthetic Wellness & Surgery)',
    '',
    '> Atelier of Longevity: a doctor-led aesthetic and longevity clinic on Sukhumvit 61 (Park Lane Ekamai), Bangkok, Thailand. Every treatment plan starts with an assessment by the doctor and is designed for each person, based on the five layers of the face and the Triple Derma Layer technique.',
    '',
    '- Doctor: Dr. Chanunwat Thanatcharoenwit (Dr. PP, คุณหมอปิงปอง), medical licence no. 78055; every case is treated by the doctor',
    `- ${(site as any).license_en ?? ''}`,
    `- Address: ${(site as any).address_en ?? ''}`,
    `- Phone: ${site.phone} · LINE: ${site.line_url}`,
    '- Hours: Mon and Wed–Sun 11:00–20:00 (doctor 13:00–20:00); closed every Tuesday and the Wednesday of the 3rd week of each month',
    '- Languages: Thai, English',
    '',
    '## Treatment categories',
    '',
  ];
  for (const c of categoryOrder) {
    const items = services.filter((s) => s.data.category === c);
    lines.push(`### ${catName(c)}`, '');
    if (!items.length) lines.push('- Ask the clinic on LINE for details', '');
    for (const s of items) {
      const d: any = s.data;
      const price = d.price_from ? ` (from ${priceLabel(d.price_from, 'en')})` : '';
      lines.push(`- [${d.name_en}](${base}/en/services/${s.id}/)${price}: ${d.summary_en || d.summary_th}`);
    }
    lines.push('');
  }
  lines.push(
    '## Key pages',
    '',
    `- [Programmes and prices](${base}/en/services/)`,
    `- [Atelier of Muses: real results](${base}/en/atelier-of-muses/)`,
    `- [The Atelier Journal](${base}/en/articles/)`,
    `- [About the clinic and doctor](${base}/en/about/)`,
    `- [Contact and directions](${base}/en/contact/)`,
    `- Thai version: ${base}/`,
    '',
    'Results vary from person to person.',
  );
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
