'use client';

// Menu HP: butuh state buka/tutup, jadi client component kecil
import { useState } from 'react';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { navLinks } from './nav-links';

export function MobileNav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-hp"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 place-items-center rounded-full border border-line bg-card"
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
        className="animate-fade absolute inset-x-0 top-full border-b border-line bg-background shadow-xl"
      >
        <ul className="flex flex-col px-4 py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href.slice(1) ? 'location' : undefined}
                className="block border-b border-line py-4 text-lg font-semibold aria-[current=location]:text-red"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="py-4">
            <a
              href={buildWhatsAppLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center rounded-lg bg-red font-bold text-white"
            >
              Chat WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
