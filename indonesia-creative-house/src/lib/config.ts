// Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

/** Bersihkan nomor ke format 62xxx. Mengembalikan null kalau tidak valid. */
export function cleanWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^62\d{8,13}$/.test(digits) ? digits : null;
}

const waNumber = cleanWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || '081381168884');
if (!waNumber) throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxx.');

export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'ICH Indonesia Creative House',
  // TODO: ganti dengan domain asli saat deploy
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ich-web.vercel.app').replace(/\/+$/, ''),
  waNumber,
};

/** Satu-satunya pembuat link WhatsApp */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = 'Halo ICH, saya mau tanya menu dan pesanan untuk acara.';

export const itemUrl = (slug: string) => `${config.siteUrl}/#menu-${slug}`;

export const itemMessage = (name: string, slug: string, qty: number, unit: string) =>
  `Halo ICH, saya tertarik dengan ${name} sebanyak ${qty} ${unit}. ${itemUrl(slug)}. Bisa info harga dan ketersediaannya?`;
