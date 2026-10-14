import { buildWhatsAppLink, consultMessage } from '@/lib/whatsapp';
import { HeaderShell } from './HeaderShell';
import { RulerIcon } from './icons';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { NavLink } from './NavLink';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from './nav-links';

export function Header() {
  return (
    <HeaderShell>
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Logo />

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(consultMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-accent sm:inline-flex"
          >
            <RulerIcon className="size-4" />
            Ukur Gratis
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  );
}
