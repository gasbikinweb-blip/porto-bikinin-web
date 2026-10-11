'use client';

// Menu HP: butuh state buka/tutup, jadi client component kecil (hanya menerima string)
import { useEffect, useState } from 'react';
import type { NavItem } from './nav';
import { useActiveSection } from './useActiveSection';

type Props = {
  items: NavItem[];
  labels: { open: string; close: string; menu: string };
  cta: { href: string; label: string };
  language: { href: string; label: string; hrefLang: string };
};

export function MobileNav({ items, labels, cta, language }: Props) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items.map((i) => i.href));

  // Tutup dengan Escape & kunci scroll halaman saat menu terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border border-line"
      >
        <span className="sr-only">{open ? labels.close : labels.open}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`}
          />
        </span>
      </button>
      <nav
        id="mobile-menu"
        aria-label={labels.menu}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-line bg-background text-foreground"
      >
        <ul className="flex flex-col px-5 py-4">
          {items.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href ? 'location' : undefined}
                className="flex items-center gap-3 border-b border-line py-4 font-serif text-2xl before:size-2 before:scale-0 before:rounded-full before:bg-accent before:transition-transform before:duration-300 aria-[current]:text-accent-text aria-[current]:before:scale-100"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={language.href}
              hrefLang={language.hrefLang}
              className="block py-4 text-sm font-bold tracking-wide"
            >
              {language.label}
            </a>
          </li>
        </ul>
        <div className="px-5 pb-10">
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center rounded-full bg-accent px-6 font-bold text-on-accent"
          >
            {cta.label}
          </a>
        </div>
      </nav>
    </div>
  );
}
