import Link from 'next/link';
import { config } from '@/lib/config';
import { generalMessage } from '@/lib/whatsapp';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';
import { WhatsAppButton, container } from './ui';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur">
      <div className={`${container} relative flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className="font-serif text-2xl font-semibold tracking-wide text-plum">
          {config.siteName}
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-plum">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <WhatsAppButton
          message={generalMessage}
          label="Konsultasi"
          className="hidden min-h-10! px-5! py-2! lg:inline-flex"
        />
        <MobileNav />
      </div>
    </header>
  );
}
