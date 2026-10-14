import { siteConfig } from './config';
import { formatPrice } from './format';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${siteConfig.name}, saya ingin berkonsultasi mengenai pengadaan dan pembuatan furnitur.`;

export const catalogQuoteMessage = `Halo ${siteConfig.name}, saya ingin meminta E-Katalog produk terbaru dan penawaran harga pengadaan furnitur untuk proyek saya. Terima kasih.`;

/** Data minimal produk untuk pesan WhatsApp */
export type ProductInquiry = {
  slug: string;
  name: string;
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
    `• Produk   : ${p.name}`,
    p.price !== undefined && `• Estimasi : ${formatPrice(p.price)}`,
    '',
    'Mohon info harga, ukuran, ketersediaan stok, dan opsi custom. Terima kasih.',
    '',
    productUrl(p.slug),
  ];
  return lines.filter((line): line is string => typeof line === 'string').join('\n');
}

/** Tipe input pembuat pesan WhatsApp interaktif */
export type InquiryBuilderInput = {
  orderType: 'Beli Jadi' | 'Custom Sesuai Desain';
  furnitureType: string;
  quantity: number | string;
  city: string;
  notes?: string;
};

/**
 * Menyusun pesan WhatsApp terstruktur dari komponen pembuat pesan cepat.
 */
export function buildInquiryMessage(input: InquiryBuilderInput): string {
  const safeQty = String(input.quantity).trim() || '1';
  const safeCity = input.city.trim() || 'Indonesia';
  const safeNotes = input.notes?.trim();

  const lines = [
    `Halo ${siteConfig.name}, saya ingin meminta estimasi penawaran furnitur:`,
    '',
    `• Skema Pesanan : ${input.orderType}`,
    `• Tipe Furnitur : ${input.furnitureType}`,
    `• Perkiraan Qty : ${safeQty} unit / set`,
    `• Lokasi Kirim  : ${safeCity}`,
    safeNotes ? `• Catatan Khusus: ${safeNotes}` : undefined,
    '',
    'Mohon informasi estimasi biaya, waktu produksi, dan konsultasi lebih lanjut. Terima kasih.',
  ];

  return lines.filter((line): line is string => typeof line === 'string').join('\n');
}
