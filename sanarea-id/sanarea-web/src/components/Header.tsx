'use client';

// Navigasi sticky: logo kiri, menu teks kapital di tengah, tombol WhatsApp pill di kanan; menu HP berupa panel.
import { useEffect, useState } from 'react';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { CartButton } from './CartButton';
import { Logo } from './Logo';
import { navLinks } from './nav-links';

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  // Menu aktif mengikuti section yang terlihat
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of [
      'beranda',
      'koleksi',
      'katalog',
      'tentang',
      'moments',
      'toko',
      'cara-order',
      'faq',
    ]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const isOn = (href: string) => active === href || (href === '#koleksi' && active === '#katalog');
  const link =
    'relative flex min-h-11 items-center text-[0.7rem] tracking-[0.28em] uppercase text-muted transition-colors hover:text-ink aria-[current=location]:text-ink';

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:h-20 sm:px-8">
        <a href="#beranda" aria-label="SANARÉA, ke beranda" className="flex min-h-11 items-center">
          <Logo />
        </a>
        <nav aria-label="Navigasi utama" className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isOn(l.href) ? 'location' : undefined}
                  className={link}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu-hp"
          onClick={() => setOpen((v) => !v)}
          className="order-last grid size-11 place-items-center justify-self-end lg:hidden"
        >
          <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>

        <div className="flex items-center justify-end gap-2">
          <CartButton />
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid hidden min-h-11 rounded-full px-5 tracking-[0.14em] whitespace-nowrap normal-case sm:inline-flex"
          >
            Shop via WhatsApp<span className="sr-only"> (tab baru)</span>
          </a>
        </div>
      </div>

      <nav
        id="menu-hp"
        aria-label="Menu HP"
        hidden={!open}
        className="animate-fade border-t border-line bg-background lg:hidden"
      >
        <ul className="px-6 py-4">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isOn(l.href) ? 'location' : undefined}
                className="flex min-h-12 items-center border-b border-line font-serif text-2xl font-light tracking-[0.18em] uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-5">
            <a
              href={buildWhatsAppLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid w-full"
            >
              Shop via WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
