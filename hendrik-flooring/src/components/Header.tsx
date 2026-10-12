'use client';

// Navbar: transparan di atas hero beranda, lalu berlatar putih setelah di-scroll.
// Menu menandai section yang sedang dilihat (scrollspy) dengan penanda yang bergeser.
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';
import { WhatsAppButton } from './WhatsAppButton';

const ids = navLinks.map((l) => l.href.split('#')[1] ?? '');

export function Header() {
  const isHome = usePathname() === '/';
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);

  // Latar navbar muncul setelah halaman di-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scrollspy: section yang melewati garis tengah layar dianggap aktif
  useEffect(() => {
    if (!isHome) return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener('scroll', onTop, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onTop);
    };
  }, [isHome]);

  // Posisi penanda menu aktif (bergeser dengan animasi)
  useLayoutEffect(() => {
    const el = active ? listRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [active]);

  const solid = scrolled || !isHome;

  return (
    <header
      data-solid={solid}
      className={`group/header fixed inset-x-0 top-0 z-30 transition-all duration-500 ${solid ? 'border-b border-line bg-background/90 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-md' : 'border-b border-transparent bg-transparent'}`}
    >
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 lg:px-8 ${solid ? 'h-18' : 'h-22'}`}
      >
        <div className={solid ? '' : 'logo-light'}>
          <Logo />
        </div>
        <nav aria-label="Menu utama" className="hidden xl:block">
          <ul ref={listRef} className="relative flex items-center gap-1">
            {/* Penanda menu aktif */}
            <span
              aria-hidden="true"
              className={`absolute top-1/2 h-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${solid ? 'bg-accent-soft' : 'bg-white/15'} ${pill ? 'opacity-100' : 'opacity-0'}`}
              style={pill ? { left: pill.left, width: pill.width } : { left: 0, width: 0 }}
            />
            {navLinks.map((l) => {
              const id = l.href.split('#')[1];
              const isActive = id === active;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-id={id}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative block rounded-full px-3 py-2 text-[0.95rem] font-medium whitespace-nowrap 2xl:px-4 2xl:text-base transition-colors ${solid ? (isActive ? 'text-accent-strong' : 'text-muted hover:text-foreground') : isActive ? 'text-white' : 'text-white/85 hover:text-white'}`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {/* Di HP sudah ada tombol WhatsApp mengambang */}
          <div className="hidden sm:block xl:hidden 2xl:block">
            <WhatsAppButton>Minta Penawaran</WhatsAppButton>
          </div>
          <MobileNav light={!solid} />
        </div>
      </div>
    </header>
  );
}
