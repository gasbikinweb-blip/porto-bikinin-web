'use client';

// Menu navbar desktop; menu section yang sedang dibaca ditandai aktif (warna maroon + garis emas)
import { navLinks } from './nav-links';
import { useActiveSection } from './useActiveSection';

export function DesktopNav() {
  const active = useActiveSection();
  return (
    <nav aria-label="Navigasi utama" className="hidden lg:block">
      <ul className="flex items-center gap-7 text-sm tracking-wide">
        {navLinks.map((l) => {
          const on = active === l.href.slice(1);
          return (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={on ? 'location' : undefined}
                className={`relative py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-gold after:transition-all after:duration-300 hover:text-foreground hover:after:w-full ${
                  on ? 'font-semibold text-accent after:w-full' : 'text-foreground/80 after:w-0'
                }`}
              >
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
