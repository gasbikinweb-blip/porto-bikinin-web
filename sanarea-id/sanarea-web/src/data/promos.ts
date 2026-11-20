// Promo hanya tampil di antara startDate dan endDate (dicek saat build & di browser).
// Data SALE di highlight belum punya periode, jadi belum diaktifkan. Contoh dari story:
// - Aleena Instant Sport 50.000 → 37.000
// - Printed Shawl 89.000 → 80.100 (disc 10%)
// - Diskon 10% untuk follow + tag IG, clearance sale mulai 20K, harga bundling di rak toko
// TODO: isi periode promo dari pemilik, lalu tambahkan di sini.
import type { Promo } from './types';

export const promos: readonly Promo[] = [];

const today = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date());

export function activePromos(now = today()): Promo[] {
  return promos.filter((p) => p.startDate <= now && now <= p.endDate);
}

export function salePriceOf(slug: string, now = today()): number | undefined {
  for (const p of activePromos(now)) {
    const price = p.salePrice?.[slug];
    if (price !== undefined) return price;
  }
  return undefined;
}
