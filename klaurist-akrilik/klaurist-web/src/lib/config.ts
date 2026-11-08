// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

/** Bersihkan nomor WA ke format 62xxx. Awalan "0" menjadi "62". Null kalau tidak valid. */
export function cleanWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^62\d{8,13}$/.test(digits) ? digits : null;
}

const waNumber = cleanWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || '6289673029841');
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak
if (!waNumber) throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxx.');

export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Klaurist Jogja',
  // TODO: ganti dengan domain asli saat deploy
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://klaurist-jogja.vercel.app').replace(
    /\/+$/,
    '',
  ),
  waNumber,
} as const;
