import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

// Tombol WA mengambang: lingkaran charcoal tipis, menyatu dengan palet
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-20 grid size-13 place-items-center rounded-full bg-ink text-background shadow-lg transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-5" />
      <span className="sr-only">Chat SANARÉA via WhatsApp (tab baru)</span>
    </a>
  );
}
