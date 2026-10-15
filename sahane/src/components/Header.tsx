import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { HeaderShell } from './HeaderShell';
import { WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from './nav-links';

export function Header() {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a href="#" aria-label="Sahane.id, ke beranda">
          <Logo />
        </a>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[13px] tracking-[0.12em] uppercase">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative py-2 text-foreground/75 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-foreground hover:after:w-full"
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
            className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-colors hover:bg-accent-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Pesan via WA
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  );
}
