'use client';

// Navigasi sticky: link aktif mengikuti section yang sedang dibaca, tombol mode gelap/terang,
// menu HP berupa panel yang tertutup sendiri setelah link diklik
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { navLinks } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

type Theme = 'light' | 'dark';

// Ikon mengikuti atribut data-theme lewat varian CSS `dark:` (tanpa state, tanpa hydration mismatch)
function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('klaurist-theme', next);
    } catch {
      // Penyimpanan diblokir: tema tetap berlaku untuk sesi ini
    }
  };

  const svg = {
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti mode gelap atau terang"
      title="Mode gelap / terang"
      className="grid size-11 place-items-center rounded-full border border-line hover:bg-blush-soft"
    >
      <svg {...svg} className="size-5 dark:hidden">
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
      </svg>
      <svg {...svg} className="hidden size-5 dark:block">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

  // Scrollspy: section yang melewati garis 35% tinggi layar dianggap aktif
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = ids[0]!;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Mentok di bawah halaman: aktifkan link terakhir
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4)
        current = ids[ids.length - 1]!;
      setActive(`#${current}`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#beranda"
          className="flex min-h-11 shrink-0 items-center gap-2"
          aria-label="Klaurist Jogja, ke beranda"
        >
          <Image
            src="/images/logo.webp"
            alt=""
            width={44}
            height={44}
            priority
            className="size-11 rounded-full"
          />
          <span className="font-serif text-2xl font-semibold">Klaurist</span>
        </a>
        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? 'true' : undefined}
                  className="relative flex min-h-11 items-center rounded-full px-3.5 text-sm tracking-wide transition-colors hover:bg-blush-soft aria-[current=true]:bg-blush aria-[current=true]:font-medium aria-[current=true]:text-rose-strong"
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
            href="#pesan"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-rose px-5 text-sm font-medium tracking-wide text-on-rose hover:bg-rose-strong sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" /> Pesan via WA
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-hp"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
          >
            <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>
      <nav
        id="menu-hp"
        aria-label="Menu HP"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ivory lg:hidden"
      >
        <ul className="px-4 py-2">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active === l.href ? 'true' : undefined}
                className="flex min-h-12 items-center justify-between border-b border-line font-serif text-xl aria-[current=true]:text-rose"
              >
                {l.label}
                {active === l.href && (
                  <span aria-hidden="true" className="size-2 rounded-full bg-rose" />
                )}
              </a>
            </li>
          ))}
          <li className="py-3">
            <a
              href={buildWhatsAppLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose font-medium text-on-rose"
            >
              <WhatsAppIcon className="size-5" /> Chat WhatsApp
              <span className="sr-only"> (tab baru)</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
