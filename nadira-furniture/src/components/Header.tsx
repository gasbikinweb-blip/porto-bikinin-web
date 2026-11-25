import Link from 'next/link';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { DesktopNav } from './DesktopNav';
import { HeaderShell } from './HeaderShell';
import { WhatsAppIcon } from './icons';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-xl leading-none tracking-wide sm:text-2xl">
            Nadira<span className="text-accent">.</span>
            <span className="ml-1.5 text-[10px] tracking-[0.35em] text-muted uppercase">
              Furniture
            </span>
          </span>
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Hubungi Kami
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  );
}
