// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 6289536486993).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function normalizeWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

// Sumber: Informasi.txt
const waNumber = normalizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || '+62 895-3648-69938');
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak di production
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

export const config = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'YMI Decoration',
  // TODO: ganti dengan domain asli
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ymidecoration.vercel.app').replace(
    /\/+$/,
    '',
  ),
  waNumber,
};

// Satu-satunya pembuat link WhatsApp
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${config.name}, saya ingin konsultasi dekorasi untuk acara saya.`;

export const eventUrl = (slug: string) => `${config.siteUrl}/#acara-${slug}`;

export const eventMessage = (title: string, slug: string) =>
  `Halo ${config.name}, saya suka dekorasi ${title} dan ingin dekorasi seperti ini untuk acara saya. ${eventUrl(slug)}`;
