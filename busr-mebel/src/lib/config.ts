// Konfigurasi identitas Busr Mebel.
// Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.
// Tanda // TODO menandakan nilai placeholder yang perlu diverifikasi oleh pemilik bisnis.

const DEFAULT_WA_NUMBER = '6282231807569';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 6281234567890).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function normalizeWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

const waNumber = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER ?? DEFAULT_WA_NUMBER);
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Busr Mebel',
  tagline: 'Pabrik Furnitur Kayu Solid, Kantor & Custom Interior',
  description:
    'Produsen & pengadaan furnitur ready-stock dan custom untuk perkantoran, kafe, hotel, dan residensial. Spesialis kayu jati solid, plywood HPL, dan metal frame presisi.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://busrmebel.com', // TODO: sesuaikan domain live
  waNumber,
  waDisplay: '0822-3180-7569',
  email: 'busrmebel@gmail.com',
  instagram: 'https://www.instagram.com/busrmebel', // Akun Instagram Busr Mebel
  tiktok: 'https://www.tiktok.com/@busrmebel',
  youtube: 'https://www.youtube.com/@busrmebel1904',
  address: 'Jl. K.H. Nawawi, RW 2, Sinanggul, Kec. Mlonggo, Kabupaten Jepara, Jawa Tengah 59452',
  streetAddress: 'Jl. K.H. Nawawi, RW 2, Sinanggul, Kec. Mlonggo',
  postalCode: '59452',
  mapsUrl: 'https://share.google/NpUZsVhAX2fXPpw0Y',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Busrmebel,+Jl.+K.H.+Nawawi,+Sinanggul,+Mlonggo,+Jepara,+Jawa+Tengah+59452&output=embed',
  city: 'Kabupaten Jepara',
  province: 'Jawa Tengah',
  country: 'Indonesia',
  shippingCoverage: 'Melayani Pengiriman & Perakitan ke Seluruh Wilayah Indonesia (Jabodetabek, Jawa, Bali, Sumatera, Kalimantan, Sulawesi, dll.)',
  establishedYear: 2018, // TODO: tahun berdiri perusahaan
  catalogPdfUrl: '/katalog-busr-mebel.pdf',
  hours: [{ day: 'Senin – Minggu', time: '08.00 – 21.00 WIB' }],
} as const;
