'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { WhatsAppIcon } from './icons';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

const links = [
  { href: '/#menu', label: 'Menu' },
  { href: '/#pesan-acara', label: 'Pesan untuk Acara' },
  { href: '/#cara-pesan', label: 'Cara Pesan' },
  { href: '/#testimoni', label: 'Testimoni' },
  { href: '/#faq', label: 'FAQ' },
];

export function Header() {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/#beranda" className="flex min-h-11 items-center gap-2">
          <Image
            src="/images/logo.webp"
            alt="Logo ICH"
            width={44}
            height={44}
            priority
            className="size-11 rounded-full"
          />
          <span className="hidden text-sm leading-tight font-bold sm:block">
            Indonesia
            <br />
            Creative House
          </span>
        </Link>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex gap-6 text-sm font-semibold">
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
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-bold text-white hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-4" />
            Chat WhatsApp<span className="sr-only"> (tab baru)</span>
          </a>
          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            aria-label="Buka menu"
            className="grid size-11 place-items-center rounded-full border border-line text-xl lg:hidden"
          >
            ☰
          </button>
        </div>
      </div>
      <dialog
        ref={menu}
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-72 max-w-full bg-white p-6 text-foreground"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Tutup menu"
          className="ml-auto grid size-11 place-items-center rounded-full border border-line text-xl"
        >
          ×
        </button>
        <ul className="mt-6 space-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={close} className="block py-2 text-xl font-bold">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </dialog>
    </header>
  );
}
