'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { navLinks as links } from '@/data/nav';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

// Section aktif = section terakhir yang bagian atasnya sudah melewati 35% tinggi layar
function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(2));
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Di dasar halaman, section terakhir (Kontak) dianggap aktif
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return active;
}

export function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();
  const active = useActiveSection();
  const isOn = (href: string) => href.slice(2) === active;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/#beranda" aria-label="DMS Jepara Furniture, ke beranda" className="shrink-0">
          <Image
            src="/brand/logo-dark.png"
            alt="DMS Furniture"
            width={488}
            height={182}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex gap-7 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isOn(l.href) ? 'location' : undefined}
                  className={`relative py-2 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-accent after:transition-all hover:text-accent ${
                    isOn(l.href) ? 'text-accent after:w-full' : 'after:w-0'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 bg-ink px-4 text-sm font-medium text-white hover:bg-accent sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Hubungi Kami<span className="sr-only"> (tab baru)</span>
          </a>
          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            aria-label="Buka menu"
            className="grid size-11 place-items-center border border-line text-xl lg:hidden"
          >
            ☰
          </button>
        </div>
      </div>
      <dialog
        ref={menu}
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-72 max-w-full bg-background p-6 text-foreground"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Tutup menu"
          className="ml-auto grid size-11 place-items-center border border-line text-xl"
        >
          ×
        </button>
        <ul className="mt-6 space-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={close}
                aria-current={isOn(l.href) ? 'location' : undefined}
                className={`block py-2 font-serif text-3xl ${isOn(l.href) ? 'text-accent' : ''}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  );
}
