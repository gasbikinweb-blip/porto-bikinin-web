import { buildWhatsAppLink, defaultQuoteMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

/** Tombol WhatsApp mengambang di semua halaman, dengan denyut cahaya (mati bila reduced motion). */
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(defaultQuoteMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp untuk minta penawaran (tab baru)"
      className="group fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
    >
      {/* Dua cincin yang memancar bergantian */}
      <span aria-hidden="true" className="wa-pulse absolute inset-0 rounded-full bg-wa" />
      <span
        aria-hidden="true"
        className="wa-pulse wa-pulse-late absolute inset-0 rounded-full bg-wa"
      />
      <span className="wa-glow relative inline-flex size-14 items-center justify-center rounded-full bg-wa text-white ring-4 ring-white transition-transform group-hover:scale-105 group-hover:bg-wa-dark">
        <WhatsAppIcon className="size-7" />
      </span>
    </a>
  );
}
