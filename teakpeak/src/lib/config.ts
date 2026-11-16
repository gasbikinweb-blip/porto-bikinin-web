// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

// Sumber: caption Instagram @teakpeak.id
const DEFAULT_WA_NUMBER = '6285385083429';

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
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Teakpeak',
  tagline: 'Timeless Furniture',
  description:
    'Teakpeak Furniture: furnitur kayu jati solid buatan Jepara. Kursi, sofa, meja, tempat tidur, dan penyimpanan, bisa custom untuk rumah, villa, kafe, dan restoran.',
  // TODO: ganti dengan domain asli setelah deploy
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://porto-teakpeak.vercel.app',
  waNumber,
  // Tampilan nomor untuk dibaca manusia
  waDisplay: '0853-8508-3429',
  instagram: 'https://www.instagram.com/teakpeak.id/',
  instagramHandle: '@teakpeak.id',
  threads: 'https://www.threads.com/@teakpeak.id',
  linktree: 'https://lynk.id/teakpeakfurniture',
  // Bio IG: "Timeless Strength, Crafted in Jepara". TODO: alamat workshop lengkap dari pemilik
  address: 'Jepara, Jawa Tengah, Indonesia',
  // TODO: jam operasional asli dari pemilik
  hours: [{ day: 'Konsultasi & pemesanan', time: 'Via WhatsApp / DM Instagram' }],
} as const;
