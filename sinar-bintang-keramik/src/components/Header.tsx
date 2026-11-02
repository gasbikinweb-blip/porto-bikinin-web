'use client';

// Navbar sticky: menu aktif mengikuti section yang sedang terlihat di tengah layar.
// Setelah digulir, navbar lebih padat dan berbayang tipis.
import { useEffect, useState } from 'react';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = ['beranda', ...navLinks.map((l) => l.href.slice(1))];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('beranda');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Section yang melewati garis tengah layar menjadi aktif
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ${scrolled ? 'border-line bg-background/90 shadow-[0_8px_24px_-18px_rgb(0_0_0/0.35)]' : 'border-transparent bg-background/60'}`}
    >
      <div
        className={`relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 ${scrolled ? 'h-16' : 'h-20'}`}
      >
        <a href="#beranda" aria-label="Sinar Bintang Keramik, ke atas halaman">
          <Logo />
        </a>
        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-card/80 p-1">
            {navLinks.map((l) => {
              const id = l.href.slice(1);
              const on = active === id;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={on ? 'location' : undefined}
                    onClick={() => setActive(id)}
                    className={`block rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${on ? 'bg-foreground text-background' : 'text-foreground/75 hover:bg-surface hover:text-foreground'}`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-red px-5 text-sm font-bold whitespace-nowrap text-white transition-colors hover:bg-red-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Chat WhatsApp
            <span className="sr-only"> (tab baru)</span>
          </a>
          <ThemeToggle />
          <MobileNav active={active} />
        </div>
      </div>
    </header>
  );
}
