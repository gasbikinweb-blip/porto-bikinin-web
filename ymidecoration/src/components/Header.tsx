'use client';

// Navigasi sticky: transparan di atas hero, solid setelah menggulir. Menu HP memakai <dialog>.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CloseIcon, MenuIcon } from './icons';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { href: '#portofolio', label: 'Portofolio' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#cara-booking', label: 'Cara Booking' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
        solid ? 'border-b border-line bg-paper/95 text-ink backdrop-blur' : 'text-white'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-8">
        <a href="#beranda" className="flex min-h-11 items-center gap-3">
          <Image
            src="/brand/monogram.png"
            alt=""
            width={190}
            height={192}
            className={`h-10 w-auto transition ${solid ? '' : 'brightness-0 invert'}`}
          />
          <span className="leading-none">
            <span className="block font-serif text-xl tracking-[0.18em]">YMI</span>
            <span className="mt-1 block text-[0.625rem] tracking-[0.3em] uppercase opacity-80">
              Decoration
            </span>
          </span>
        </a>

        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-9 text-sm tracking-wide">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative inline-flex min-h-11 items-center after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#konsultasi"
            className={`hidden min-h-11 items-center border px-6 text-xs tracking-[0.2em] uppercase transition sm:inline-flex ${
              solid
                ? 'border-ink bg-ink text-paper hover:bg-transparent hover:text-ink'
                : 'border-white/70 hover:bg-white hover:text-ink'
            }`}
          >
            Konsultasi
          </a>
          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            aria-label="Buka menu"
            className="grid size-11 place-items-center lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      <dialog
        ref={menu}
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-0 ml-auto h-dvh max-h-none w-80 max-w-full bg-paper p-8 text-ink"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Tutup menu"
          className="ml-auto grid size-11 place-items-center"
        >
          <CloseIcon className="size-6" />
        </button>
        <ul className="mt-10 space-y-2">
          {[
            ...links,
            { href: '#konsultasi', label: 'Konsultasi' },
            { href: '#kontak', label: 'Kontak' },
          ].map((l) => (
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
