import { buildWhatsAppLink, defaultMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

// Tombol WA mengambang di pojok kanan bawah
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Kirim file via WhatsApp (tab baru)"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#1f9e4f] text-white shadow-lg ring-4 ring-white transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
