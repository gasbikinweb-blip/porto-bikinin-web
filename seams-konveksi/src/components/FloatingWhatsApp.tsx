import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

// Tombol WA mengambang di pojok kanan bawah semua halaman
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Seams Konveksi (membuka tab baru)"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#1f8f4e] text-white shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
