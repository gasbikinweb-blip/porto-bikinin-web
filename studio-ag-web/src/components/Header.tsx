import Link from 'next/link';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';
import { DesktopNav } from './DesktopNav';
import { LogoBadge } from './Logo';
import { MobileNav } from './MobileNav';
import { WhatsAppIcon } from './icons';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Ke beranda">
          <LogoBadge className="size-11 sm:size-14" />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-ink sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Konsultasi
            <span className="sr-only"> via WhatsApp (tab baru)</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
