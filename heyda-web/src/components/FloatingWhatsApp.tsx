import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

// Tombol WA mengambang di pojok kanan bawah
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp Heyda (membuka tab baru)"
      className="animate-wa-pulse fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-[#0b3d1f] shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
