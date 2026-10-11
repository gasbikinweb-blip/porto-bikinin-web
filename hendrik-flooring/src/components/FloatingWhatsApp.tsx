import { buildWhatsAppLink, defaultMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

/** Tombol WhatsApp mengambang di semua halaman */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(defaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp untuk minta survei dan penawaran (tab baru)"
      className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full bg-wa p-4 text-white shadow-lg shadow-black/20 transition-colors hover:bg-wa-strong sm:right-6 sm:bottom-6 sm:px-5"
    >
      <WhatsAppIcon className="size-6" />
      <span className="hidden text-sm font-semibold sm:inline">Chat WhatsApp</span>
    </a>
  );
}
