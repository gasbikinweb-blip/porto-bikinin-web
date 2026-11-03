'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { WhatsAppIcon } from './icons';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

const links = [
  { href: '/#katalog', label: 'Katalog' },
  { href: '/#keunggulan', label: 'Keunggulan' },
  { href: '/#cara-pesan', label: 'Cara Pesan' },
  { href: '/#galeri', label: 'Galeri' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#kontak', label: 'Kontak' },
];

export function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/#beranda" className="flex min-h-11 items-center">
          <Image
            src="/images/logo.webp"
            alt="Abika Furniture"
            width={730}
            height={40}
            priority
            className="h-4 w-auto sm:h-5"
          />
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex gap-7 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="py-2 hover:text-accent">
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
              <a href={l.href} onClick={close} className="block py-2 font-serif text-3xl">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  );
}
