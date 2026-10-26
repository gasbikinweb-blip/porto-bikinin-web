import Link from 'next/link';
import { config } from '@/lib/config';
import { ShopeeIcon } from './icons';
import { CartDrawer } from './CartDrawer';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from './nav-links';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur-md">
      {/* Strip pengumuman reseller. TODO: verifikasi "mulai 10 pcs, boleh mix" (dari caption IG) */}
      <Link
        href="/#reseller"
        className="block bg-panel py-2 text-center text-xs font-semibold tracking-wide text-on-panel hover:bg-panel-strong"
      >
        ✦ Open reseller — harga grosir mulai 10 pcs, boleh mix.{' '}
        <span className="underline underline-offset-2">Lihat caranya</span>
      </Link>
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" aria-label="Farwa Hijab, ke beranda">
          <Logo />
        </Link>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-full px-4 py-3 text-sm font-semibold text-mocha/80 transition-colors hover:bg-surface hover:text-mocha"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={config.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-shopee px-5 text-sm font-bold text-white transition-colors hover:bg-shopee-strong sm:inline-flex"
          >
            <ShopeeIcon className="size-4" />
            Toko Shopee
            <span className="sr-only"> (tab baru)</span>
          </a>
          <ThemeToggle />
          <CartDrawer />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
