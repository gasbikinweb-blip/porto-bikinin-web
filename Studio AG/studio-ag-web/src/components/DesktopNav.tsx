'use client';

// Menu desktop; item section yang sedang dilihat diberi garis bawah terracotta + aria-current
import { navLinks } from './nav-links';
import { useActiveSection } from './useActiveSection';

export function DesktopNav() {
  const active = useActiveSection();

  return (
    <nav aria-label="Navigasi utama" className="hidden md:block">
      <ul className="flex items-center gap-8 text-sm tracking-wide">
        {navLinks.map((l) => {
          const isActive = l.href === `/#${active}`;
          return (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={isActive ? 'location' : undefined}
                className="relative py-2 text-foreground/80 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-foreground hover:after:w-full aria-[current]:font-medium aria-[current]:text-accent-ink aria-[current]:after:w-full"
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
