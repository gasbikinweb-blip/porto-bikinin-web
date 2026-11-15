'use client';

// Navigasi sticky: link aktif mengikuti section yang sedang dibaca, menu HP berupa panel.
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { navLinks } from '@/data/site';

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const onScroll = () => {
      const lineY = window.innerHeight * 0.35;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= lineY) current = `#${id}`;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#beranda"
          className="flex min-h-11 items-center"
          aria-label="AKAA Construction, ke beranda"
        >
          <Logo />
        </a>
        <nav aria-label="Menu utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? 'true' : undefined}
                  className="relative flex min-h-11 items-center px-3 text-sm font-semibold text-muted hover:text-foreground aria-[current=true]:text-foreground aria-[current=true]:after:absolute aria-[current=true]:after:inset-x-3 aria-[current=true]:after:bottom-2 aria-[current=true]:after:h-[3px] aria-[current=true]:after:bg-accent"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#konsultasi"
            className="hidden min-h-11 items-center rounded-md bg-accent px-5 text-sm font-bold text-accent-ink hover:brightness-95 sm:inline-flex"
          >
            Konsultasi Gratis
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-hp"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-md border border-line md:hidden"
          >
            <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav
        id="menu-hp"
        aria-label="Menu HP"
        hidden={!open}
        className="border-t border-line bg-background md:hidden"
      >
        <ul className="px-4 py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href ? 'true' : undefined}
                className="flex min-h-12 items-center justify-between border-b border-line font-display text-xl font-bold uppercase aria-[current=true]:text-accent-text"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="py-3">
            <a
              href="#konsultasi"
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-md bg-accent font-bold text-accent-ink"
            >
              Konsultasi Gratis
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
