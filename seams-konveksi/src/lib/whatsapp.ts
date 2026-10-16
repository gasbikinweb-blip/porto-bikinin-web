import { config } from './config';

// Satu-satunya pembuat link WhatsApp; semua tombol WA memakai fungsi ini
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = `Halo ${config.siteName}, saya ingin konsultasi dan meminta penawaran jasa konveksi.`;

export const productMessage = (productName: string) =>
  `Halo ${config.siteName}, saya ingin konsultasi dan meminta penawaran untuk produksi ${productName}.`;

export const solutionMessage = (clientType: string) =>
  `Halo ${config.siteName}, saya dari ${clientType} dan ingin konsultasi kebutuhan produksi.`;

export const serviceMessage = (service: string) =>
  `Halo ${config.siteName}, saya ingin bertanya tentang layanan ${service}.`;
