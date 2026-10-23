// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6282124723648'; // dari bio Instagram @sy_roster.industrie

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 628123456789).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function normalizeWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

const waNumber = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER ?? DEFAULT_WA_NUMBER);
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak di production
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

const siteName = (process.env.NEXT_PUBLIC_SITE_NAME ?? '').trim() || 'Syroster Industrie';

export const siteConfig = {
  name: siteName,
  // TODO: isi dengan domain asli (mis. https://syroster.co.id)
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://syroster-industrie.example.com').replace(
    /\/$/,
    '',
  ),
  waNumber,
} as const;
