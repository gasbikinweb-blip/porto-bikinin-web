import { config } from './config';

/** Satu-satunya pembuat link WhatsApp */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage =
  'Halo Klaurist, saya mau tanya-tanya soal papan akrilik dan bucket ya, Kak.';

/** URL deep link produk (membuka modal detail) */
export const productUrl = (slug: string) => `${config.siteUrl}/#produk-${slug}`;

/** Pesan singkat dari modal produk */
export const productMessage = (name: string, slug: string) =>
  `Halo Klaurist, saya tertarik dengan ${name}.\n\nApakah masih tersedia dan berapa harganya, Kak?\n\n${productUrl(slug)}`;

/** Format Rupiah */
export const formatRupiah = (n: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);
