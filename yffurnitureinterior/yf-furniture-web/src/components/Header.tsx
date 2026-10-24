import Link from 'next/link';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="YF Furniture & Interior, ke beranda">
          <Logo />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="py-2 text-foreground/80 hover:text-wood">
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
            className="hidden items-center gap-2 rounded-full bg-wood px-4 py-2.5 text-sm font-semibold text-white hover:bg-wood-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Pesan Custom
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
