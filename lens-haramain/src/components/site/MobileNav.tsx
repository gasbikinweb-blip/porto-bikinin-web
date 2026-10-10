'use client';

// Menu HP: butuh state buka/tutup, jadi client component kecil
import { useEffect, useState } from 'react';
import type { Content } from '@/content/types';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';

export function MobileNav({ t }: { t: Pick<Content, 'nav' | 'menu' | 'wa' | 'navCta'> }) {
  const [open, setOpen] = useState(false);

  // Tutup dengan tombol Escape
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
        className="grid size-9 place-items-center rounded-full border border-line sm:size-10"
      >
        <span className="sr-only">{open ? t.menu.close : t.menu.open}</span>
        <span aria-hidden="true" className="relative block h-2.5 w-4.5">
          <span
            className={`absolute left-0 h-px w-4.5 bg-foreground transition-all duration-300 ${open ? 'top-1.25 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-px w-4.5 bg-foreground transition-all duration-300 ${open ? 'top-1.25 -rotate-45' : 'top-2.5'}`}
          />
        </span>
      </button>
      <nav
        id="menu-hp"
        aria-label={t.menu.label}
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-background"
      >
        <ul className="flex flex-col px-6 pt-6">
          {t.nav.map((l, i) => (
            <li key={l.href} className="border-b border-line">
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-5 font-serif text-3xl"
              >
                <span className="text-xs text-muted">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-6 py-8">
          <a
            href={buildWhatsAppLink(t.wa.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background"
          >
            <WhatsAppIcon className="size-5" />
            {t.navCta}
            <span className="sr-only">{t.wa.newTab}</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
