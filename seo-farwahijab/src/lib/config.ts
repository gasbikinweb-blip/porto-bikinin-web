// Konfigurasi dari environment. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6285166310005';
const DEFAULT_SHOPEE_URL = 'https://id.shp.ee/p3cKKxkH';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+", spasi, dan strip (contoh: 6285166310005).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function normalizeWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

/** Hanya terima link https (menolak javascript:, data:, dll.) */
function safeUrl(raw: string, fallback: string): string {
  try {
    const url = new URL(raw);
    return url.protocol === 'https:' ? url.href : fallback;
  } catch {
    return fallback;
  }
}

const waNumber = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || DEFAULT_WA_NUMBER);
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak di production
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Farwa Hijab',
  // TODO: ganti dengan domain asli saat rilis
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://farwa-hijab.vercel.app',
  shopeeUrl: safeUrl(process.env.NEXT_PUBLIC_SHOPEE_URL || DEFAULT_SHOPEE_URL, DEFAULT_SHOPEE_URL),
  waNumber,
} as const;
