'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

// Urutan mengikuti urutan section di halaman
const links = [
  { href: '/#tentang', label: 'Tentang' },
  { href: '/#keunggulan', label: 'Keunggulan' },
  { href: '/#katalog', label: 'Katalog' },
  { href: '/#galeri', label: 'Galeri' },
  { href: '/#cara-pesan', label: 'Cara Pesan' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#kontak', label: 'Kontak' },
];

export function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();
  const [active, setActive] = useState('');

  // Tandai menu sesuai section yang sedang berada di tengah layar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`/#${entry.target.id}`);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    const ids = ['beranda', ...links.map((l) => l.href.slice(2))];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/#beranda" className="flex min-h-11 items-center">
          <Image
            src="/images/logo.webp"
            alt="Abika Furniture"
            width={820}
            height={120}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex gap-7 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? 'true' : undefined}
                  className="border-b border-transparent py-2 transition-colors hover:text-accent aria-[current]:border-accent aria-[current]:text-accent"
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
                aria-current={active === l.href ? 'true' : undefined}
                className="block py-2 font-serif text-3xl aria-[current]:text-accent"
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
