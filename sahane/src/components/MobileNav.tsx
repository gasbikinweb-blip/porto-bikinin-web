'use client';

// Menu HP: butuh state buka/tutup, jadi client component kecil
import { useEffect, useRef, useState } from 'react';
import { navLinks } from './nav-links';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  // Esc menutup menu dan mengembalikan fokus ke tombol
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="menu-hp"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border border-line"
      >
        <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-px w-5 bg-foreground transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-px w-5 bg-foreground transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
          />
        </span>
      </button>
      <nav
        id="menu-hp"
        aria-label="Menu utama"
        hidden={!open}
        className="animate-fade absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-background"
      >
        <ul className="flex flex-col px-6 py-6">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-4 font-serif text-3xl"
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
