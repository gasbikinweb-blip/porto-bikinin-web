import { siteConfig } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${siteConfig.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${siteConfig.name}, saya ingin konsultasi custom order akrilik.`;

export const promoMessage = `Halo ${siteConfig.name}, saya tertarik dengan Paket Neon Box UMKM mulai Rp 400.000. Boleh minta info detailnya?`;

/** Pesan tanya produk/layanan tertentu */
export const itemMessage = (name: string) =>
  `Halo ${siteConfig.name}, saya ingin tanya tentang ${name}. Bisa dibantu info ukuran dan harganya?`;
