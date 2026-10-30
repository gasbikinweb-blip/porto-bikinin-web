// Konfigurasi situs. Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

// Nomor dari assets/Informasi.txt (0898-7701-605)
const DEFAULT_WA_NUMBER = '628987701605';

/**
 * Bersihkan nomor WA ke format internasional tanpa "+" dan spasi (contoh: 628987701605).
 * Awalan "0" diubah menjadi "62". Mengembalikan null kalau formatnya tidak valid.
 */
export function cleanWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^[1-9]\d{9,14}$/.test(digits) ? digits : null;
}

const waNumber = cleanWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || DEFAULT_WA_NUMBER);
// Gagalkan build kalau nomor salah, supaya tidak ada tombol WA yang rusak di production
if (!waNumber) {
  throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxxx.');
}

export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Studio AG',
  // TODO: ganti dengan domain asli saat deploy
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://studioag.example.com',
  waNumber,
};

/** Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${config.siteName}, saya ingin konsultasi desain interior.`;
