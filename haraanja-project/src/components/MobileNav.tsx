'use client';

// Menu HP: butuh state buka/tutup, jadi client component kecil

import { useState } from 'react';
import { navLinks } from './nav-links';
import { useActiveSection } from './useActiveSection';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-hp"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border border-line"
      >
        <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
          />
        </span>
      </button>
      <nav
        id="menu-hp"
        aria-label="Menu utama"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] border-b border-line bg-background shadow-2xl"
      >
        <ul className="flex flex-col px-4 py-4">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href.slice(1) ? 'location' : undefined}
                className="flex items-center justify-between border-b border-line py-4 font-serif text-2xl last:border-0 aria-[current=location]:text-accent aria-[current=location]:after:size-2 aria-[current=location]:after:rounded-full aria-[current=location]:after:bg-gold aria-[current=location]:after:content-['']"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
