import Link from 'next/link';
import { navLinks } from '@/data/site';
import { HeaderShell } from './HeaderShell';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { WaButton } from './WaButton';

export function Header() {
  return (
    <HeaderShell>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" aria-label="Syroster Industrie, ke beranda" className="shrink-0">
          <Logo />
        </Link>
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-brand"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <WaButton className="min-h-10 rounded-full px-5 py-2 text-sm">Minta Penawaran</WaButton>
        </div>
        <MobileNav />
      </div>
    </HeaderShell>
  );
}
