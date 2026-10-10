import type { Content } from '@/content/types';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

// Tombol WA mengambang di pojok kanan bawah
export function FloatingWhatsApp({ t }: { t: Content }) {
  return (
    <a
      href={buildWhatsAppLink(t.wa.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.wa.floating} ${t.wa.newTab}`}
      className="animate-wa-pulse fixed right-4 bottom-4 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
