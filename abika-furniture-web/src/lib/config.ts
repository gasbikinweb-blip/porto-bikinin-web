// Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

/** Bersihkan nomor ke format 62xxx. Mengembalikan null kalau tidak valid. */
export function cleanWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^62\d{8,13}$/.test(digits) ? digits : null;
}

const waNumber = cleanWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || '6285805668632');
if (!waNumber) throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxx.');

export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Abika Furniture',
  // TODO: ganti dengan domain asli saat deploy
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://abika-furniture.vercel.app').replace(
    /\/+$/,
    '',
  ),
  waNumber,
};

/** Satu-satunya pembuat link WhatsApp */
export function buildWhatsAppLink(message: string, number: string = config.waNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${config.siteName}, saya ingin bertanya tentang produk furniturnya.`;

export const productUrl = (slug: string) => `${config.siteUrl}/#produk-${slug}`;

export const productMessage = (name: string, slug: string) =>
  `Halo ${config.siteName}, saya tertarik dengan ${name}. ${productUrl(slug)}. Apakah masih tersedia?`;
