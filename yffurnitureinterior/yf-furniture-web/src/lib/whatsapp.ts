import { config } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo YF Furniture, saya ingin konsultasi pembuatan furnitur custom.`;

export const workMessage = (title: string) =>
  `Halo YF Furniture, saya tertarik dengan "${title}" di katalog, bisa dibuatkan yang serupa?`;
