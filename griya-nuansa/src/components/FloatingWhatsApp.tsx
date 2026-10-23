import { WhatsAppIcon } from './WhatsApp';
import { defaultWaMessage } from '@/data/site';
import { buildWhatsAppLink } from '@/lib/config';

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(defaultWaMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-pulse fixed right-4 bottom-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:right-8 md:bottom-8"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="sr-only">Konsultasi via WhatsApp (tab baru)</span>
    </a>
  );
}
