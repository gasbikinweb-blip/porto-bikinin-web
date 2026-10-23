'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navLinks } from '@/data/site';
import { buildWhatsAppLink, defaultQuoteMessage } from '@/lib/whatsapp';

/** Menu mobile: tombol toggle dengan aria-expanded, tutup dengan Esc atau saat pindah halaman. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Tutup menu saat halaman berganti
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

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
        aria-controls="menu-mobile"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-white"
      >
        <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="size-6"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <nav
        id="menu-mobile"
        aria-label="Navigasi mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-lg"
      >
        <ul className="mx-auto max-w-6xl px-4 py-3">
          <li>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-3 font-medium text-ink hover:bg-surface"
            >
              Beranda
            </Link>
          </li>
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 font-medium text-ink hover:bg-surface"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 pb-1">
            <a
              href={buildWhatsAppLink(defaultQuoteMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg bg-wa px-4 py-3 text-center font-semibold text-white hover:bg-wa-dark"
            >
              Minta Penawaran via WhatsApp
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
