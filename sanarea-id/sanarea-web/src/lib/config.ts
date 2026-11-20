// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

// Nomor WA SANARÉA (dari pemilik). Bisa ditimpa lewat NEXT_PUBLIC_WA_NUMBER (format 62xxx).
const DEFAULT_WA_NUMBER = '62895401392031';

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

/** Hanya terima URL https agar link dari env tidak bisa berupa javascript: dsb. */
function safeHttpsUrl(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' ? u.href : undefined;
  } catch {
    return undefined;
  }
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'SANARÉA',
  // Domain live (Vercel); bisa ditimpa NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://porto-sanarea-id.vercel.app',
  waNumber,
  marketplaceUrl: safeHttpsUrl(process.env.NEXT_PUBLIC_MARKETPLACE_URL),
} as const;
