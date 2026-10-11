import type { Locale } from '@/content/types';

/** Format Rupiah, mis. 15000000 → "Rp15.000.000" (id) / "IDR 15,000,000" (en) */
export function formatIdr(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}
