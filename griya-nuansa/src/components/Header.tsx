'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InstagramIcon } from './icons';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';
import { isActive, navItems } from './nav';
import { ExternalLink, WhatsAppIcon } from './WhatsApp';
import { defaultWaMessage, site } from '@/data/site';
import { buildWhatsAppLink } from '@/lib/config';

const roundBtn =
  'flex h-10 w-10 items-center justify-center rounded-full border hairline transition-colors hover:bg-white hover:text-neutral-900';

// Header menempel di atas layar. Di puncak halaman ia transparan di atas hero;
// setelah di-scroll ia berubah menjadi bilah pill berlatar agar tetap terbaca.
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="site-header fixed inset-x-2 top-2 z-30 text-white transition-all duration-300 md:inset-x-3 md:top-3"
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'mt-1 h-16 max-w-screen-xl rounded-full bg-bg/85 px-4 shadow-lg ring-1 ring-line backdrop-blur-md md:px-6'
            : 'h-20 px-5 md:h-24 md:px-12'
        }`}
      >
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, ke beranda`}>
          <Logo className="h-10 w-10" />
          <span className="font-serif text-xl tracking-wide">{site.name}</span>
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border hairline bg-white/5 p-1 text-xs tracking-wide backdrop-blur-md">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-full px-4 py-2 transition-colors ${active ? 'nav-active' : 'hover-tint'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ExternalLink href={site.social.instagram} className={`hidden sm:flex ${roundBtn}`}>
            <InstagramIcon />
            <span className="sr-only">Instagram</span>
          </ExternalLink>
          <ExternalLink
            href={buildWhatsAppLink(defaultWaMessage)}
            className={`hidden sm:flex ${roundBtn}`}
          >
            <WhatsAppIcon />
            <span className="sr-only">WhatsApp</span>
          </ExternalLink>
          <ThemeToggle className={roundBtn} />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
