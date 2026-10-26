import { config } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = 'Halo Farwa, saya mau tanya-tanya soal hijabnya, Kak.';
export const resellerMessage =
  'Halo Farwa, saya tertarik gabung jadi reseller. Boleh minta info syarat dan harga grosirnya, Kak?';
