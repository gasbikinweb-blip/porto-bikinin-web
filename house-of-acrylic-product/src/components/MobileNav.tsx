'use client';

import { useEffect, useRef, useState } from 'react';
import { CloseIcon, MenuIcon } from './icons';
import { navLinks } from './nav-links';

// Menu ponsel: tombol buka/tutup, Esc menutup dan fokus kembali ke tombol
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-ponsel"
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-md border border-line-dark"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      <nav
        id="menu-ponsel"
        aria-label="Navigasi ponsel"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line-dark bg-ink"
      >
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line-dark py-3 text-silver hover:text-paper"
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
