import { WhatsAppIcon } from '@/components/ui/icons';

// Tombol WA mengambang di pojok kanan bawah (href dibuat di server)
export function FloatingWhatsApp({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-accent text-on-accent shadow-[0_12px_30px_-8px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
