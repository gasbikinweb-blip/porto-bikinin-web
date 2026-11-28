// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

// Sumber: Informasi.txt & caption Instagram @ruangmebelfurniture
const DEFAULT_WA_NUMBER = '628214132560';

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
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Ruang Mebel',
  tagline: 'Furnitur Kayu Jati Jepara',
  description:
    'Ruang Mebel: furnitur kayu jati solid buatan pengrajin Jepara. Nakas, bufet & credenza, meja TV, meja tamu, dan meja makan bergaya minimalis, retro, dan Scandinavian. Bisa custom ukuran, pesan via WhatsApp.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://porto-ruang-mebel.vercel.app',
  waNumber,
  // Tampilan nomor untuk dibaca manusia
  waDisplay: '0821-4132-560',
  instagram: 'https://www.instagram.com/ruangmebelfurniture/',
  instagramHandle: '@ruangmebelfurniture',
  threads: 'https://www.threads.com/@ruangmebelfurniture',
  tiktok: 'https://www.tiktok.com/@ruangmebel_',
  tiktokHandle: '@ruangmebel_',
  facebook: 'https://www.facebook.com/share/1iVZDpmqqw/',
  email: 'ruangmebelfurniture@gmail.com',
  // Sumber: caption Instagram ("Workshop : ...")
  address: 'Jl. Bulak Baru RT 01/RW 01, Bulakbaru, Kec. Kedung, Kab. Jepara, Jawa Tengah 59463',
  city: 'Jepara',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Bulakbaru%2C+Kedung%2C+Jepara%2C+Jawa+Tengah+59463',
  // TODO: jam buka dari pemilik
  hours: [{ day: 'Pemesanan', time: 'Chat WhatsApp kapan saja' }],
} as const;
