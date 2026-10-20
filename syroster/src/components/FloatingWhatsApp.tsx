import { buildWhatsAppLink, defaultQuoteMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

/** Tombol WhatsApp mengambang di semua halaman. */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(defaultQuoteMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp untuk minta penawaran (tab baru)"
      className="fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-wa text-white shadow-lg ring-4 ring-white transition-transform hover:scale-105 hover:bg-wa-dark sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
