import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

/** Link produk Shopee; jatuh kembali ke halaman toko kalau shop ID atau item ID kosong */
export function buildShopeeProductLink(itemId?: string): string {
  const shop = siteConfig.shopeeShopId;
  if (!shop || !itemId || !/^\d+$/.test(itemId) || !/^\d+$/.test(shop))
    return siteConfig.shopeeStoreUrl;
  return `https://shopee.co.id/product/${shop}/${itemId}`;
}

export const generalMessage = `Halo ${siteConfig.shortName}, saya mau konsultasi souvenir.`;

export function productMessage(name: string, variant?: string, url?: string): string {
  return [
    `Halo ${siteConfig.shortName}, saya tertarik dengan souvenir:`,
    `- ${name}${variant ? ` (${variant})` : ''}`,
    '',
    'Mohon info harga grosir, minimal order, dan estimasi pengerjaannya ya. Terima kasih.',
    url ?? '',
  ]
    .filter((l, i, a) => !(l === '' && i === a.length - 1))
    .join('\n');
}
