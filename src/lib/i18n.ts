export type Lang = 'th' | 'en';

/** Return obj[`${key}_${lang}`], falling back to Thai when the English field is empty. */
export function pick(obj: Record<string, any>, key: string, lang: Lang): string {
  const v = obj?.[`${key}_${lang}`];
  if (v && String(v).trim()) return v;
  return obj?.[`${key}_th`] ?? obj?.[`${key}_en`] ?? '';
}

export function href(lang: Lang, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'th') return clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}

/** Path of the same page in the other language. */
export function switchHref(currentPath: string, to: Lang): string {
  const base = currentPath.replace(/^\/en(?=\/|$)/, '') || '/';
  return href(to, base);
}

export function formatDate(d: Date, lang: Lang): string {
  return d.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Bangkok',
  });
}

export const ui = {
  th: {
    home: 'หน้าแรก', muses: 'Muses', membership: 'The Circle', services: 'The Collection', servicesSub: 'โปรแกรมและราคา', articles: 'Journal', journalTitle: 'The Atelier Journal', about: 'The Atelier', aboutSub: 'เกี่ยวกับ CHANUN', contact: 'Visit', contactTitle: 'Visit the Atelier', contactSub: 'ติดต่อและการเดินทาง',
    book: 'นัดหมายทาง LINE', call: 'โทร', askPrice: 'สอบถามราคา', from: 'เริ่มต้น', baht: 'บาท',
    allServices: 'ดู The Collection ทั้งหมด', allArticles: 'อ่าน The Atelier Journal', readMore: 'อ่านต่อ',
    viewDetails: 'ดูรายละเอียด', priceList: 'ราคา', suits: 'เหมาะกับใคร', avoid: 'ไม่ควรทำถ้า',
    watch: 'ดูวิดีโอ', sources: 'แหล่งอ้างอิง', hours: 'เวลาทำการ', address: 'ที่อยู่',
    openMap: 'เปิดใน Google Maps', followUs: 'ติดตามเรา', latest: 'อัปเดตล่าสุด',
    type: { all: 'ทั้งหมด', article: 'Journal', news: 'Clinic News', video: 'Just Talk With Dr.PP' },
    back: 'กลับ', ourDoctors: 'เบื้องหลัง Atelier', license: 'เลขใบประกอบวิชาชีพ', skip: 'ข้ามไปเนื้อหา',
    langName: 'ไทย', otherLang: 'EN', menu: 'เมนู', close: 'ปิด',
    noArticles: 'ยังไม่มีเรื่องในหมวดนี้',
  },
  en: {
    home: 'Home', muses: 'Muses', membership: 'The Circle', services: 'The Collection', servicesSub: 'Programmes & prices', articles: 'Journal', journalTitle: 'The Atelier Journal', about: 'The Atelier', aboutSub: 'About CHANUN', contact: 'Visit', contactTitle: 'Visit the Atelier', contactSub: 'Contact & directions',
    book: 'Book on LINE', call: 'Call', askPrice: 'Price on request', from: 'From', baht: 'THB',
    allServices: 'Explore the Collection', allArticles: 'Read the Atelier Journal', readMore: 'Read',
    viewDetails: 'Details', priceList: 'Prices', suits: 'Who it suits', avoid: 'Not suitable if',
    watch: 'Watch', sources: 'References', hours: 'Opening hours', address: 'Address',
    openMap: 'Open in Google Maps', followUs: 'Follow us', latest: 'Latest',
    type: { all: 'All', article: 'Journal', news: 'Clinic News', video: 'Just Talk With Dr.PP' },
    back: 'Back', ourDoctors: 'Behind the Atelier', license: 'Medical licence no.', skip: 'Skip to content',
    langName: 'English', otherLang: 'ไทย', menu: 'Menu', close: 'Close',
    noArticles: 'Nothing in this section yet',
  },
} as const;

export function youtubeId(url: string): string {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(url.trim()) ? url.trim() : '';
}

export function priceLabel(p: string, lang: Lang): string {
  const v = (p ?? '').toString().trim();
  if (!v) return ui[lang].askPrice;
  if (/^[\d,\.]+$/.test(v)) return `${Number(v.replace(/,/g, '')).toLocaleString('en-US')} ${ui[lang].baht}`;
  return v;
}
