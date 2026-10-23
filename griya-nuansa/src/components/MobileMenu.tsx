'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { isActive, navItems } from './nav';

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Tutup menu saat pindah halaman (reset state saat render, tanpa effect)
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
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((v) => !v)}
        className={`relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border hairline ${open ? 'text-white' : ''}`}
      >
        <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
        <span
          className={`block h-px w-4 bg-current transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
        />
        <span
          className={`block h-px w-4 bg-current transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
        />
      </button>
      <nav
        id="menu-mobile"
        aria-label="Menu utama"
        hidden={!open}
        className="fixed inset-0 z-40 bg-ink px-8 pt-32 text-white"
      >
        <ul className="space-y-5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className="font-serif text-4xl font-light aria-[current=page]:text-amber aria-[current=page]:italic"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
