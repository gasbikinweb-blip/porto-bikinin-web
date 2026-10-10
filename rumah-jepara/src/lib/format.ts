// Format harga ke Rupiah; kalau kosong tampilkan ajakan menghubungi
export function formatPrice(price?: number): string {
  if (price === undefined) return 'Hubungi kami untuk harga';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(price);
}
