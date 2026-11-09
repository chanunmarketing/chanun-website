import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const str = z.union([z.string(), z.number()]).nullish().transform((v) => (v == null ? '' : String(v)));
const bool = (d: boolean) => z.boolean().nullish().transform((v) => v ?? d);

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    name_en: z.string(),
    name_th: str,
    category: z.string().default('skin'),
    subgroup: str,
    also_in: z.array(z.string()).nullish().transform((v) => v ?? []),
    summary_th: str,
    summary_en: str,
    image: str,
    price_from: str,
    prices: z
      .array(z.object({ item_th: str, item_en: str, price: str, note_th: str, note_en: str }))
      .nullish()
      .transform((v) => v ?? []),
    suits_th: str,
    suits_en: str,
    seo_title_th: str,
    seo_title_en: str,
    faq: z.array(z.object({ q_th: str, q_en: str, a_th: str, a_en: str })).nullish().transform((v) => v ?? []),
    avoid_th: str,
    avoid_en: str,
    youtube: str,
    body_en: str,
    featured: bool(false),
    order: z.number().nullish().transform((v) => v ?? 99),
    published: bool(true),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title_th: z.string(),
    title_en: str,
    type: z.string().default('article'),
    date: z.coerce.date(),
    cover: str,
    excerpt_th: str,
    excerpt_en: str,
    youtube: str,
    body_en: str,
    sources: z.array(z.string().nullish().transform((v) => v ?? '')).nullish().transform((v) => v ?? []),
    published: bool(true),
  }),
});

const doctors = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/doctors' }),
  schema: z.object({
    name_th: z.string(),
    name_en: str,
    fullname_th: str,
    fullname_en: str,
    role_th: str,
    role_en: str,
    license: str,
    photo: str,
    body_en: str,
    order: z.number().nullish().transform((v) => v ?? 99),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    kind: z.string().default('note'),
    category: str,
    title_th: z.string(),
    title_en: str,
    muse_name: str,
    portrait: str,
    concern_th: str,
    concern_en: str,
    assessment_th: str,
    assessment_en: str,
    plan_th: str,
    plan_en: str,
    programs: z.array(z.string().nullish().transform((v) => v ?? '')).nullish().transform((v) => (v ?? []).filter(Boolean)),
    aftercare_th: str,
    aftercare_en: str,
    before_image: str,
    after_image: str,
    ba_images: z.array(z.string().nullish().transform((v) => v ?? '')).nullish().transform((v) => (v ?? []).filter(Boolean)),
    treatment_date: str,
    photo_date: str,
    approval_no: str,
    date: z.coerce.date(),
    order: z.number().nullish().transform((v) => v ?? 99),
    published: bool(false),
    body_en: str,
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    images: z.array(z.string().nullish().transform((v) => v ?? '')).nullish().transform((v) => (v ?? []).filter(Boolean)),
    program: str,
    category: str,
    person: str,
    is_muse: bool(false),
    treatment_date: str,
    approval_no: str,
    case: str,
    order: z.number().nullish().transform((v) => v ?? 10),
    published: bool(true),
  }),
});

export const collections = { services, articles, doctors, cases, gallery };
