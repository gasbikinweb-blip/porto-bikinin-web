import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

/** Ganti placeholder {nama} pada template pesan (dari src/content) */
export function fillTemplate(template: string, values: Record<string, string> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/** Template + nilai → link WhatsApp siap pakai */
export function waLink(template: string, values?: Record<string, string>): string {
  return buildWhatsAppLink(fillTemplate(template, values));
}
