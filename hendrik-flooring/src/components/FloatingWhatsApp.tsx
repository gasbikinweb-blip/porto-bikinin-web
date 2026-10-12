import { buildWhatsAppLink, defaultMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

/** Tombol WhatsApp mengambang di semua halaman, dengan denyut lembut (mati saat reduced motion) */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp untuk minta survei dan penawaran (tab baru)"
      className="wa-pulse fixed right-3 bottom-3 z-40 inline-flex items-center gap-2 rounded-full bg-wa p-3 text-white shadow-lg shadow-black/20 transition-colors hover:bg-wa-strong sm:right-6 sm:bottom-6 sm:p-4 sm:px-5"
    >
      <WhatsAppIcon className="wa-glow size-6 sm:size-6" />
      <span className="hidden text-sm font-semibold sm:inline">Chat WhatsApp</span>
    </a>
  );
}
