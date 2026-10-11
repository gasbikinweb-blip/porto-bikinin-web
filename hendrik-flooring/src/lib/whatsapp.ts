import { siteConfig } from './config';

/** Satu-satunya pembuat link WhatsApp. Pesan selalu di-encode dengan encodeURIComponent. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultMessage = `Halo ${siteConfig.name}, saya ingin meminta survei dan penawaran lantai vinyl untuk fasilitas kesehatan.`;

export const productMessage = (productName: string) =>
  `Halo ${siteConfig.name}, saya tertarik dengan ${productName} dan ingin meminta survei serta penawaran.`;
