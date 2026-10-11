// Konfigurasi bisnis. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6282144609680';

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

// Tanpa slash di akhir. WAJIB diisi di hosting (Vercel) sebelum live.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Satu Gudang',
  legalName: 'Satu Gudang Project',
  url: siteUrl,
  waNumber,
  // Tampilan nomor untuk dibaca manusia
  waDisplay: '+62 821-4460-9680',
  phoneE164: `+${waNumber}`,
  instagram: 'https://www.instagram.com/satugudang.project/',
  threads: 'https://www.threads.net/@satugudang.project',
  socialHandle: '@satugudang.project',
  // TODO: alamat workshop/studio (kalau ingin ditampilkan & dipakai di Google Business Profile)
  region: 'Bali',
  country: 'ID',
  ogImage: '/og/og-default.jpg',
} as const;

/** True saat build production; dipakai untuk menyembunyikan konten contoh (testimoni dummy) */
export const isProduction = process.env.NODE_ENV === 'production';
