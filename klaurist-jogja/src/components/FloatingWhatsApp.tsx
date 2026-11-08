import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

// Tombol WA mengambang di pojok kanan bawah: gelombang denyut + badge "1" yang berkedip
export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(generalMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp, 1 pesan baru (membuka tab baru)"
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#1f7a46] text-white shadow-lg transition-transform duration-300 hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <span aria-hidden="true" className="wa-ring absolute inset-0 rounded-full bg-[#25d366]" />
      <WhatsAppIcon className="relative size-7" />
      <span
        aria-hidden="true"
        className="wa-blink absolute top-0 right-0 size-4 rounded-full border-2 border-ivory bg-[#e5304a]"
      />
    </a>
  );
}
