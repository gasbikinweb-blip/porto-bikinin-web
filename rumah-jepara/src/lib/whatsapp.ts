import { siteConfig } from './config';
import { formatPrice } from './format';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${siteConfig.name}, saya ingin bertanya tentang produk furnitur Anda.`;

/** Data minimal produk untuk pesan WhatsApp */
export type ProductInquiry = {
  slug: string;
  name: string;
  material?: string;
  dimensions?: string;
  colors?: readonly string[];
  price?: number;
};

/** URL absolut halaman produk; dipakai WhatsApp untuk menampilkan kartu pratinjau (foto + judul) */
export const productUrl = (slug: string) => new URL(`/produk/${slug}`, siteConfig.url).href;

/**
 * Pesan berisi detail produk + link halaman produk.
 * Saat link dibuka di WhatsApp, kartu pratinjau berfoto muncul dari metadata openGraph halaman.
 */
export function productMessage(p: ProductInquiry): string {
  const lines = [
    `Halo ${siteConfig.name}, saya tertarik dengan produk berikut:`,
    '',
    `• Produk : ${p.name}`,
    p.material && `• Bahan  : ${p.material}`,
    p.dimensions && `• Ukuran : ${p.dimensions}`,
    p.colors?.length && `• Warna  : ${p.colors.join(', ')}`,
    `• Harga  : ${formatPrice(p.price)}`,
    '',
    'Apakah produk ini tersedia? Terima kasih.',
    '',
    productUrl(p.slug),
  ];
  // Buang baris opsional yang kosong (undefined / 0)
  return lines.filter((line): line is string => typeof line === 'string').join('\n');
}
