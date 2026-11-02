// Konfigurasi toko. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

const DEFAULTS = {
  waNumber: '6281299686117',
  shopeeStoreUrl: 'https://shopee.co.id/sinarbintangsbk',
  shopeeShopId: '171087386',
  siteName: 'Sinar Bintang Keramik',
  // TODO: ganti dengan domain asli
  siteUrl: 'https://sinar-bintang-keramik.vercel.app',
};

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 628123456789).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function normalizeWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

/** Hanya terima URL https; selain itu pakai cadangan */
function safeHttpsUrl(raw: string | undefined, fallback: string): string {
  try {
    const url = new URL(raw ?? fallback);
    return url.protocol === 'https:' ? url.href.replace(/\/$/, '') : fallback;
  } catch {
    return fallback;
  }
}

const waNumber = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER ?? DEFAULTS.waNumber);
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak di production
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

const shopId = (process.env.NEXT_PUBLIC_SHOPEE_SHOP_ID ?? DEFAULTS.shopeeShopId).replace(/\D/g, '');

export const config = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? DEFAULTS.siteName,
  url: safeHttpsUrl(process.env.NEXT_PUBLIC_SITE_URL, DEFAULTS.siteUrl),
  waNumber,
  shopeeStoreUrl: safeHttpsUrl(process.env.NEXT_PUBLIC_SHOPEE_STORE_URL, DEFAULTS.shopeeStoreUrl),
  shopeeShopId: shopId,
} as const;
