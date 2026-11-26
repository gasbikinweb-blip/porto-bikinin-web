// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

// Sumber: caption Instagram @nadira.furniture
const DEFAULT_WA_NUMBER = '6281324974722';

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

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Nadira Furniture',
  tagline: 'Interior Custom Bandung',
  description:
    'Nadira Furniture: jasa interior custom di Bandung. Kitchen set, lemari, backdrop TV, meja rias, kamar set, dan partisi dari multiplek 18 mm & HPL TACO. Survei dan konsultasi gratis.',
  // TODO: ganti dengan domain asli setelah deploy
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nadira-furniture.vercel.app',
  waNumber,
  // Tampilan nomor untuk dibaca manusia
  waDisplay: '0813-2497-4722',
  instagram: 'https://www.instagram.com/nadira.furniture/',
  instagramHandle: '@nadira.furniture',
  threads: 'https://www.threads.com/@nadira.furniture',
  // Sumber: caption Instagram ("Lokasi : Bandung", proyek di Rancamanyar). TODO: alamat workshop lengkap
  address: 'Bandung, Jawa Barat',
  // TODO: jam buka dari pemilik
  hours: [{ day: 'Survei & konsultasi', time: 'Gratis, atur jadwal via WA' }],
} as const;
