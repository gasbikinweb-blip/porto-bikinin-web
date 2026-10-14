// Format harga ke Rupiah; kalau kosong tampilkan ajakan konsultasi
export function formatPrice(price?: number, unit?: string): string {
  if (price === undefined) return 'Harga sesuai ukuran, konsultasi gratis';
  const rupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
  return `Mulai ${rupiah}${unit ? ` / ${unit}` : ''}`;
}
