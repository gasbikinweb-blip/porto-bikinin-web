'use client';

import Link from 'next/link';
import { navLinks } from './nav-links';
import { useActiveNav } from './use-active-nav';

export function DesktopNav() {
  const active = useActiveNav();
  return (
    <nav aria-label="Navigasi utama" className="hidden lg:block">
      <ul className="flex items-center gap-6 text-sm tracking-wide whitespace-nowrap">
        {navLinks.map((l) => {
          const on = l.href === active;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={on ? 'page' : undefined}
                className={`relative py-2 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 hover:text-foreground hover:after:w-full ${
                  on ? 'text-accent-strong after:w-full' : 'text-foreground/80 after:w-0'
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
