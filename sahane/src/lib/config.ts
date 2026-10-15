// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

// Nomor Pre-Order WhatsApp (dari bio Instagram @sahane.id)
const DEFAULT_WA_NUMBER = '6285113288003';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 6285113288003).
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

/** Tampilan nomor untuk dibaca manusia: 6285113288003 -> 0851-1328-8003 */
function displayNumber(n: string): string {
  const local = n.startsWith('62') ? `0${n.slice(2)}` : n;
  return local.replace(/^(\d{4})(\d{4})(\d+)$/, '$1-$2-$3');
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Sahane.id',
  tagline: 'Abaya & busana muslimah elegan dengan bahan pilihan dan detail bordir yang rapi',
  description:
    'Sahane.id: abaya premium dan baju muslimah elegan dengan detail bordir, warna lembut, dan sistem Pre-Order. Lihat katalog dan pesan langsung via WhatsApp.',
  // TODO: isi dengan domain asli (mis. https://sahane.id) lewat NEXT_PUBLIC_SITE_URL
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sahane-id.vercel.app',
  waNumber,
  waDisplay: displayNumber(waNumber),
  instagram: 'https://www.instagram.com/sahane.id/',
  instagramHandle: '@sahane.id',
  threads: 'https://www.threads.com/@sahane.id',
} as const;
