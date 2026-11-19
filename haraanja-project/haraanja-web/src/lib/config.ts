// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULT_WA_NUMBER = '6281259424848'; // dari assets/Informasi.txt

/** Bersihkan nomor WA ke format 62xxxxxxxxxx. Mengembalikan null kalau tidak valid. */
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
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Haraanja Project Souvenir',
  shortName: 'Haraanja Project',
  legalName: 'CV. Hara Anja',
  tagline: 'Souvenir custom untuk setiap momen bahagia',
  description:
    'Souvenir pernikahan, khitan, dan haji umroh custom dari Probolinggo: tumbler kaca, gelas, mangkok, handuk, hingga box souvenir custom. Bisa custom nama, kirim ke seluruh Indonesia.',
  // TODO: ganti dengan domain asli setelah deploy
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://porto-haraanja.vercel.app',
  waNumber,
  waDisplay: '0812-5942-4848',
  shopeeStoreUrl:
    process.env.NEXT_PUBLIC_SHOPEE_STORE_URL ?? 'https://shopee.co.id/haraanjaproject',
  shopeeShopId: process.env.NEXT_PUBLIC_SHOPEE_SHOP_ID ?? '1020698239',
  instagram: 'https://www.instagram.com/haraanjaproject_souvenir/',
  // TODO: konfirmasi akun Threads
  threads: 'https://www.threads.com/@haraanjaproject_souvenir',
  tiktok: 'https://www.tiktok.com/@haraanjaproject',
  invitation: 'https://www.instagram.com/haraanjaproject_invitation/',
  // Dari caption IG (23 Jul 2026). TODO: lengkapi nomor/patokan alamat
  address: 'Jl. Pahlawan Timur (dekat JNE), Kota Probolinggo, Jawa Timur',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Haraanja+Project+Jl.+Pahlawan+Timur+Probolinggo',
  // TODO: jam operasional dari pemilik
  hours: [{ day: 'Konsultasi & pemesanan', time: 'Via WhatsApp' }],
} as const;
