// Format harga ke Rupiah; kalau kosong tampilkan ajakan menanyakan harga
export function formatRupiah(n: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPrice(price?: number, note?: string): string {
  if (price === undefined) return 'Tanya harga';
  return `${note ? `${note} ` : ''}${formatRupiah(price)}`;
}
