import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}
