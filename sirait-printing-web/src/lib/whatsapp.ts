import { config } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultMessage = 'Halo Sirait Printing, saya mau print. File saya kirim di sini ya.';

export const serviceMessage = (service: string) =>
  `Halo Sirait Printing, saya mau tanya soal ${service}.`;
