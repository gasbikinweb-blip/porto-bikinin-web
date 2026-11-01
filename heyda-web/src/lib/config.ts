// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6285843766377';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 6285843766377).
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

/** Tampilan nomor untuk dibaca manusia: 6285843766377 -> 0858-4376-6377 */
function formatWaDisplay(num: string): string {
  const local = `0${num.slice(2)}`;
  return local.replace(/^(\d{4})(\d{4})(\d+)$/, '$1-$2-$3');
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Sari Kacang Ijo by Heyda',
  shortName: 'Heyda',
  tagline: 'Sari kacang ijo segar khas Jogja, tanpa pengawet',
  description:
    'Sari Kacang Ijo by Heyda, minuman kacang hijau tanpa pengawet dan tanpa pemanis buatan dari Yogyakarta. Varian ORI, Bumil & Busui, Kids, No Sugar. Free ongkir se-Jogja, pesan via WhatsApp.',
  // TODO: isi dengan domain asli (mis. https://sarikacangijoheyda.com)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sarikacangijobyheyda.vercel.app',
  waNumber,
  waDisplay: formatWaDisplay(waNumber),
  instagram: 'https://www.instagram.com/sarikacangijobyheyda/',
  threads: 'https://www.threads.com/@sarikacangijobyheyda',
  igHandle: '@sarikacangijobyheyda',
  city: 'Yogyakarta',
  serviceArea: 'Seluruh Daerah Istimewa Yogyakarta', // TODO: konfirmasi cakupan area kirim
  // TODO: nomor P-IRT asli dari owner. JANGAN diisi karangan.
  pirt: undefined as string | undefined,
} as const;
