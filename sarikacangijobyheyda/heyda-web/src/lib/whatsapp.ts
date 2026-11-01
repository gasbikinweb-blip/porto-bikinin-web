import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = 'Halo Heyda, saya mau tanya-tanya soal Sari Kacang Ijo dulu ya, Kak.';

export const variantMessage = (variantName: string) =>
  `Halo Heyda, saya mau pesan Sari Kacang Ijo varian ${variantName}.\n\nJumlah: ... botol\n\nKirim ke: ...`;

// Format harga ke Rupiah
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}
