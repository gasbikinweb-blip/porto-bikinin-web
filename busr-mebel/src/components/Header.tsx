import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { HeaderShell } from './HeaderShell';
import { WhatsAppIcon } from './icons';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { DesktopNav } from './DesktopNav';

export function Header() {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${siteConfig.name} — Beranda`}>
          <Image
            src="/brand/logo.webp"
            alt=""
            width={40}
            height={40}
            priority
            className="size-9 rounded-md transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105 sm:size-10"
          />
          <span className="text-sm leading-none font-semibold tracking-[0.3em] uppercase sm:text-base">{siteConfig.name}</span>
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-foreground px-5 py-3 text-[11px] font-semibold tracking-[0.2em] text-background uppercase transition-colors hover:bg-accent sm:inline-flex"
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
