import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { HeaderShell } from './HeaderShell';
import { WhatsAppIcon } from './icons';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from './nav-links';

export function Header() {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo.webp"
            alt=""
            width={40}
            height={40}
            priority
            className="size-9 rounded-md sm:size-10"
          />
          <span className="font-serif text-xl leading-none sm:text-2xl">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm tracking-wide">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative py-2 text-foreground/80 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
