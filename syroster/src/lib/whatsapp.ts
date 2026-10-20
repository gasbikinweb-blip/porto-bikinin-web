import { siteConfig } from './config';

/** Satu-satunya pembuat link WhatsApp. Pesan selalu di-encode dengan encodeURIComponent. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

/** Pesan umum untuk tombol "Minta Penawaran". */
export const defaultQuoteMessage = `Halo ${siteConfig.name}, saya ingin meminta penawaran roster. Mohon info harga dan ketersediaannya.`;

/** Pesan "Tanya Harga" untuk produk tertentu. */
export function productMessage(productName: string): string {
  return `Halo ${siteConfig.name}, saya ingin menanyakan harga dan ketersediaan ${productName}.`;
}

/** Pesan permintaan sampel. */
export function sampleMessage(productName?: string): string {
  return `Halo ${siteConfig.name}, saya ingin meminta sampel ${productName ?? 'roster'}. Bagaimana caranya?`;
}
