import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = 'Halo Sanaréa, saya mau tanya koleksi hijabnya. Terima kasih.';

/** Link deep-link modal produk (opsional dengan warna) */
export function productUrl(slug: string, color?: string): string {
  const url = new URL('/', siteConfig.url);
  if (color) url.searchParams.set('warna', color);
  url.hash = `produk-${slug}`;
  return url.href;
}

export function orderMessage(
  p: { name: string; slug: string },
  qty: number,
  color?: { name: string; slug: string },
) {
  const warna = color ? ` warna ${color.name}` : '';
  return `Halo Sanaréa, saya mau pesan ${p.name}${warna} sebanyak ${qty} pcs. ${productUrl(p.slug, color?.slug)} Apakah ready?`;
}
