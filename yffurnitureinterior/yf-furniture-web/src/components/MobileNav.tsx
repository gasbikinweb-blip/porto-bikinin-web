'use client';

// Menu HP: butuh state buka/tutup, jadi client component kecil
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks } from './nav-links';

export function MobileNav({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);

  // Tutup menu dengan Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-hp"
        onClick={() => setOpen((v) => !v)}
        className={`grid size-11 place-items-center rounded-full border ${light && !open ? 'border-white/40 bg-white/15 backdrop-blur-md' : 'border-line bg-background text-foreground'}`}
      >
        <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
          />
        </span>
      </button>
      <nav
        id="menu-hp"
        aria-label="Menu utama"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] border-t border-line bg-background text-foreground"
      >
        <ul className="flex flex-col px-4 py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-4 font-serif text-3xl"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
