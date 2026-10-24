'use client';

// Navbar pill: transparan di atas hero, berlatar krem setelah digulir.
// Pill aktif (diklik / section yang sedang terlihat) berubah latar.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';
import { ThemeToggle } from './ThemeToggle';

const sectionIds = navLinks.map((l) => l.href.replace('/#', ''));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('beranda');
  // Hanya beranda yang punya hero foto gelap di bawah navbar
  const onHero = usePathname() === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Tandai section yang sedang berada di tengah layar
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  // Di atas hero (belum digulir) teks putih; setelah digulir latar krem & teks gelap
  const light = onHero && !scrolled;
  const pill = 'rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors';
  const pillOn = light ? 'bg-white text-ink' : 'bg-foreground text-background';
  const pillOff = light
    ? 'bg-white/15 text-white backdrop-blur-md hover:bg-white/30'
    : 'bg-surface text-foreground hover:bg-surface-2';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${!light ? 'border-b border-line bg-background/90 text-foreground backdrop-blur-md' : 'text-white'}`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <ul className="flex items-center gap-2">
            {navLinks.map((l) => {
              const id = l.href.replace('/#', '');
              const on = active === id;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={on ? 'location' : undefined}
                    onClick={() => setActive(id)}
                    className={`${pill} ${on ? pillOn : pillOff}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="/#beranda"
          aria-label="YF Furniture & Interior, ke beranda"
          onClick={() => setActive('beranda')}
          className={light ? '[&_.text-wood]:text-brand-gold' : ''}
        >
          <Logo priority />
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={buildWhatsAppLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:inline-flex ${light ? 'bg-white text-ink hover:bg-brand-gold' : 'bg-foreground text-background hover:bg-wood-strong'}`}
          >
            <WhatsAppIcon className="size-4" />
            Hubungi Kami
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <ThemeToggle light={light} />
          <MobileNav light={light} />
        </div>
      </div>
    </header>
  );
}
