import { config } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

/** Link produk Shopee; jatuh kembali ke halaman toko kalau shop ID / item ID kosong */
export function buildShopeeProductLink(itemId?: string): string {
  const id = itemId?.replace(/\D/g, '');
  if (!config.shopeeShopId || !id) return config.shopeeStoreUrl;
  return `https://shopee.co.id/product/${config.shopeeShopId}/${id}`;
}

export const generalMessage = `Halo ${config.name}, saya mau tanya stok dan harga keramik.`;
