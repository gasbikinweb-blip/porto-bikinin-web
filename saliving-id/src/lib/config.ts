// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.
// Data diambil dari profil Instagram/Threads @saliving.id.

const DEFAULT_WA_NUMBER = '6281377228802'; // TODO: verifikasi (WA utama 0813 7722 8802)

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

// Nomor WA tambahan (hanya ditampilkan; tombol utama selalu ke waNumber)
// TODO: verifikasi nomor tambahan
const extraNumbers = ['0853 6320 8208', '0822 8973 1588'];

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'SA Living',
  // TODO: verifikasi (tagline dari bio Instagram)
  tagline: 'Gorden, Wallpaper Batam',
  description:
    'SA Living Batam: wallpaper dinding, gorden blackout & vitrase, lantai SPC, dan kasa nyamuk magnet. Gratis ukur & konsultasi, dipasang rapi oleh tim kami.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://saliving.id',
  waNumber,
  waDisplay: '0813 7722 8802', // TODO: verifikasi
  waExtra: extraNumbers.map((display) => ({ display, number: normalizeWaNumber(display)! })),
  instagram: 'https://www.instagram.com/saliving.id/', // TODO: verifikasi
  // TODO: verifikasi — link Threads di catatan klien mengarah ke @busrmebel, bukan @saliving.id
  threads: 'https://www.threads.com/@saliving.id',
  linkPage: 'https://desty.page/saliving.id', // TODO: verifikasi
  email: '', // TODO: isi email resmi bila ada (kosong = tidak ditampilkan)
  foundedYear: undefined as number | undefined, // TODO: isi tahun berdiri
  address: {
    street: 'Ruko Nagoya Thamrin City G-18', // TODO: verifikasi
    locality: 'Lubuk Baja',
    city: 'Batam',
    region: 'Kepulauan Riau',
    postalCode: '29444',
  },
  mapsUrl: 'https://maps.app.goo.gl/smoRLoQrJ7CEBJMm6', // TODO: verifikasi
  // TODO: verifikasi — catatan klien menyebut 09:00 dan 10:00 sebagai jam buka
  hours: [
    { day: 'Senin – Sabtu', time: '09.00 – 18.00 WIB', opens: '09:00', closes: '18:00' },
    { day: 'Minggu', time: 'Tutup' },
  ],
} as const;

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`;
