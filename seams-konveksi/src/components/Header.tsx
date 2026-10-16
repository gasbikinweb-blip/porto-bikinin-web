import Link from 'next/link';
import { config } from '@/lib/config';
import { generalMessage } from '@/lib/whatsapp';
import { HeaderShell } from './HeaderShell';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';
import { WhatsAppButton, container } from './ui';

export function Header() {
  return (
    <HeaderShell>
      <div className={`${container} relative flex h-[4.5rem] items-center justify-between gap-4`}>
        <Link href="/" aria-label={`${config.siteName}, ke beranda`}>
          <Logo priority />
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
        <div className="hidden lg:block">
          <WhatsAppButton
            message={generalMessage}
            label="Konsultasi"
            className="min-h-10! px-5! py-2!"
          />
        </div>
        <MobileNav />
      </div>
    </HeaderShell>
  );
}
