// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6285923736006'; // WhatsApp Hendrik (+62 859-2373-6006)

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

/** Tampilan nomor untuk dibaca manusia, mis. 6281234567890 -> +62 812-3456-7890 */
function formatWaDisplay(n: string): string {
  const local = n.slice(2);
  return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Hendrik Flooring & Wall Covering',
  shortName: 'Hendrik Flooring',
  tagline: 'Spesialis lantai vinyl untuk rumah sakit dan fasilitas kesehatan',
  description:
    'Pengadaan dan pemasangan lantai vinyl lembaran untuk rumah sakit, klinik, klinik gigi, dan laboratorium. Rapat tanpa celah, plint naik ke dinding, mudah disanitasi.',
  // TODO: isi dengan domain asli / domain sementara (mis. https://nama-project.vercel.app)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com',
  waNumber,
  waDisplay: formatWaDisplay(waNumber),
  // Media sosial resmi (link keluar, tanpa embed/script pihak ketiga)
  socials: [
    {
      name: 'Instagram',
      handle: '@hendrikflooring',
      href: 'https://www.instagram.com/hendrikflooring/',
    },
    { name: 'TikTok', handle: '@hendrikflooring', href: 'https://www.tiktok.com/@hendrikflooring' },
    {
      name: 'Facebook',
      handle: 'Hendrik Flooring',
      href: 'https://www.facebook.com/788780714327656',
    },
    { name: 'Shopee', handle: 'hendrikflooring', href: 'https://shopee.co.id/hendrikflooring' },
  ],
  // Showroom/workshop Gading Serpong (BSD)
  address:
    'BSD Raya Utama, Ruko Mendrisio 2B, Jl. Boulevard Raya Gading Serpong No. 23, Cihuni, Kec. Pagedangan, Kab. Tangerang, Banten 15332',
  addressParts: {
    street: 'Ruko Mendrisio 2B, Jl. Boulevard Raya Gading Serpong No. 23',
    locality: 'Kabupaten Tangerang',
    region: 'Banten',
    postalCode: '15332',
  },
  city: 'BSD, Gading Serpong',
  foundedYear: null as number | null, // TODO: tahun berdiri, mis. 2015
  hours: [
    { day: 'Senin – Sabtu', time: '09.00 – 17.00 WIB' },
    { day: 'Minggu', time: 'Tutup' },
  ],
  // TODO: konfirmasi area layanan
  serviceAreas: ['BSD & Gading Serpong', 'Tangerang Raya', 'Jabodetabek', 'Luar kota by request'],
} as const;

/** Link keluar ke Google Maps (bukan iframe embed, sesuai kebijakan CSP) */
export const mapsUrl = 'https://share.google/Zbr8JjHXUiRYhKJl4';
