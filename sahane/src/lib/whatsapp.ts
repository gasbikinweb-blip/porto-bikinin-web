import { siteConfig } from './config';
import { formatPrice } from './format';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${siteConfig.name}, saya ingin bertanya tentang koleksi dan jadwal Pre-Order terbaru.`;

/** Data minimal produk untuk pesan WhatsApp */
export type ProductInquiry = {
  slug: string;
  name: string;
  material?: string;
  colors?: readonly string[];
  price?: number;
};

/** Pesan tanya produk berisi nama, warna, dan harga */
export function productMessage(p: ProductInquiry): string {
  const lines = [
    `Halo ${siteConfig.name}, saya tertarik dengan produk berikut:`,
    '',
    `• Produk : ${p.name}`,
    p.colors?.length && `• Warna  : ${p.colors.join(', ')}`,
    `• Harga  : ${formatPrice(p.price)}`,
    '',
    'Apakah masih bisa ikut PO / masih ready? Terima kasih.',
  ];
  return lines.filter((line): line is string => typeof line === 'string').join('\n');
}
