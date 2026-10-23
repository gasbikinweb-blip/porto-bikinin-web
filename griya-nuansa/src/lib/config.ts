// Konfigurasi publik. Semua NEXT_PUBLIC_* ikut terbundel ke browser (BUKAN secret).

/** Bersihkan nomor WA menjadi format internasional tanpa "+" dan spasi. Mengembalikan null jika tidak valid. */
export function sanitizeWaNumber(raw: string | undefined): string | null {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = '62' + digits.slice(1); // 0811... -> 62811...
  return /^62\d{8,13}$/.test(digits) ? digits : null;
}

const DEFAULT_WA = '62811187001';
const DEFAULT_WA_2 = '6281901187001';

export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME?.trim() || 'Griya Nuansa',
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://griyanuansa.id').replace(
    /\/+$/,
    '',
  ),
  waNumber: sanitizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER) ?? DEFAULT_WA,
  waNumber2: sanitizeWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER_2) ?? DEFAULT_WA_2,
} as const;

/** Satu-satunya pembuat link WhatsApp. Dipakai semua tombol. */
export function buildWhatsAppLink(message: string, number?: string): string {
  const target = sanitizeWaNumber(number) ?? config.waNumber;
  const text = message.trim().slice(0, 1000);
  return `https://wa.me/${target}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

/** Tampilkan nomor dalam format yang mudah dibaca: +62 811-187-001 */
export function formatWaNumber(n: string): string {
  const local = n.replace(/^62/, '');
  const parts = [local.slice(0, 3), local.slice(3, 6), local.slice(6)].filter(Boolean);
  return `+62 ${parts.join('-')}`;
}
