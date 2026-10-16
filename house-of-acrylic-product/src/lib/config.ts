// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6285233215781';
const DEFAULT_SITE_NAME = 'House of Acrylic Product';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 6285233215781).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function normalizeWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

const waNumber = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || DEFAULT_WA_NUMBER);
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak di production
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || DEFAULT_SITE_NAME,
  // TODO: isi NEXT_PUBLIC_SITE_URL dengan domain asli (mis. https://akriliksurabaya.com)
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  waNumber,
} as const;
