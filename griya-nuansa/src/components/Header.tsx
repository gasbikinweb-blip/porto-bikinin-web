'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight } from './icons';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { isActive, navItems } from './nav';
import { defaultWaMessage, site } from '@/data/site';
import { buildWhatsAppLink } from '@/lib/config';

// Header menempel di atas layar; garis bawah & bayangan muncul setelah halaman di-scroll
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b bg-bg/90 backdrop-blur-md transition-shadow ${
        scrolled ? 'border-line shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between gap-6 px-5 md:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, ke beranda`}>
          <Logo className="h-9 w-9" />
          <span className="font-serif text-lg tracking-[0.18em] uppercase">{site.name}</span>
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[11px] font-medium tracking-[0.18em] uppercase">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-fg after:transition-transform ${
                      active
                        ? 'text-fg after:scale-x-100'
                        : 'text-muted after:scale-x-0 hover:text-fg hover:after:scale-x-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-3 rounded-sm bg-fg px-5 py-3 text-[11px] font-medium tracking-[0.18em] text-bg uppercase hover:opacity-85 sm:inline-flex"
          >
            Hubungi Kami
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            <span className="sr-only"> lewat WhatsApp (tab baru)</span>
          </a>
          <ThemeToggle className="flex h-10 w-10 items-center justify-center rounded-full border border-line hover:border-fg" />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
