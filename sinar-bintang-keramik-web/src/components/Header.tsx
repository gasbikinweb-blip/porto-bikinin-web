import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#beranda" aria-label="Sinar Bintang Keramik, ke atas halaman">
          <Logo />
        </a>
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-lg px-3 py-3 text-sm font-semibold text-ink/80 hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-lg bg-red px-4 text-sm font-bold text-white hover:bg-red-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Chat WhatsApp
            <span className="sr-only"> (tab baru)</span>
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
