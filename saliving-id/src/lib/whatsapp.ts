import { siteConfig } from './config';
import { formatPrice } from './format';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
/** `number` opsional untuk nomor tambahan (format 62xxx yang sudah divalidasi di config) */
export function buildWhatsAppLink(message: string, number: string = siteConfig.waNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${siteConfig.name}, saya ingin bertanya tentang wallpaper / gorden / lantai SPC.`;

/** Pesan utama CTA "Minta Ukur & Konsultasi Gratis" */
export function consultMessage(topic?: string): string {
  return [
    `Halo ${siteConfig.name}, saya ingin minta ukur & konsultasi gratis${topic ? ` untuk ${topic}` : ''}.`,
    '',
    '• Nama   : ',
    '• Lokasi : ',
    '• Ruangan: ',
    '',
    'Kapan jadwal survei yang tersedia? Terima kasih.',
  ].join('\n');
}

/** Data minimal produk untuk pesan WhatsApp */
export type ProductInquiry = {
  slug: string;
  name: string;
  priceFrom?: number;
  priceUnit?: string;
};

/** URL absolut halaman produk; dipakai WhatsApp untuk menampilkan kartu pratinjau (foto + judul) */
export const productUrl = (slug: string) => new URL(`/produk/${slug}`, siteConfig.url).href;

/** Pesan berisi nama produk + link halaman produk (kartu pratinjau dari og:image) */
export function productMessage(p: ProductInquiry): string {
  return [
    `Halo ${siteConfig.name}, saya tertarik dengan produk berikut:`,
    '',
    `• Produk : ${p.name}`,
    `• Harga  : ${formatPrice(p.priceFrom, p.priceUnit)}`,
    '',
    'Mohon info motif/warna yang tersedia dan jadwal ukur gratis. Terima kasih.',
    '',
    productUrl(p.slug),
  ].join('\n');
}
