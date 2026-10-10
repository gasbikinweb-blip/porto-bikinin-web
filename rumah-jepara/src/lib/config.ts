// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6282133030062';

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
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Lini Rumah Jepara',
  tagline: 'Sentuhan seni untuk setiap rumah',
  description:
    'Mebel kayu jati grade A asli Jepara: kursi, sofa, tempat tidur, dan lemari dengan desain klasik, modern, hingga custom. Siap untuk proyek cafe, resto, dan villa.',
  // TODO: ganti dengan domain asli. Sementara memakai subdomain Netlify (sesuaikan dengan nama site di Netlify)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lini-rumah-jepara.netlify.app',
  waNumber,
  // Tampilan nomor untuk dibaca manusia
  waDisplay: '0821-3303-0062',
  instagram: 'https://www.instagram.com/linirumahjepara/',
  tiktok: 'https://www.tiktok.com/@linirumahjepara',
  // TODO: ganti dengan alamat dan jam buka asli
  address: 'Jepara, Jawa Tengah, Indonesia',
  hours: [
    { day: 'Senin – Sabtu', time: '08.00 – 17.00 WIB' },
    { day: 'Minggu', time: 'Dengan janji temu' },
  ],
} as const;
