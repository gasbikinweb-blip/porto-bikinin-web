'use client';

// Menu HP: panel geser dengan animasi, kunci scroll halaman, tutup dengan Esc / pindah halaman
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navLinks } from './nav-links';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { ArrowIcon, WhatsAppIcon } from './icons';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Tutup otomatis saat berpindah halaman
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-hp"
        onClick={() => setOpen((v) => !v)}
        className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface/40 backdrop-blur transition hover:border-accent"
      >
        <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 h-0.5 w-5 rounded bg-foreground transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`}
          />
          <span
            className={`absolute left-0 h-0.5 rounded bg-foreground transition-all duration-300 ${open ? 'top-1.5 w-5 -rotate-45' : 'top-3 w-3.5'}`}
          />
        </span>
      </button>
      <nav
        id="menu-hp"
        aria-label="Menu utama"
        inert={!open}
        data-open={open}
        className="mobile-menu absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-background sm:h-[calc(100dvh-5rem)]"
      >
        <ul className="flex flex-col px-6 pt-6">
          {navLinks.map((l, i) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <li
                key={l.href}
                className="mobile-menu-item"
                style={{ '--i': i } as React.CSSProperties}
              >
                <Link
                  href={l.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-line py-4 font-serif text-3xl text-foreground transition-colors hover:text-accent-strong aria-[current=page]:text-teak"
                >
                  {l.label}
                  <ArrowIcon className="size-5 -translate-x-2 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-aria-[current=page]:translate-x-0 group-aria-[current=page]:opacity-100" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="mobile-menu-item space-y-3 px-6 py-8"
          style={{ '--i': navLinks.length } as React.CSSProperties}
        >
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-4" />
            Konsultasi Gratis via WhatsApp
          </a>

          <a
            href={siteConfig.catalogPdfUrl}
            download="katalog-busr-mebel.pdf"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3.5 text-xs font-semibold text-foreground hover:border-accent"
          >
            Unduh E-Katalog (PDF)
          </a>
        </div>
      </nav>
    </div>
  );
}
