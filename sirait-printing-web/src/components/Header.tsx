import Link from 'next/link';
import { buildWhatsAppLink, defaultMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/#beranda" aria-label="Sirait Printing, ke beranda" className="py-2">
          <Logo />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg px-3 py-3 text-sm font-semibold whitespace-nowrap text-ink/80 transition-colors hover:bg-surface hover:text-red"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-red px-4 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-red-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Kirim File
            <span className="sr-only"> via WhatsApp (tab baru)</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
