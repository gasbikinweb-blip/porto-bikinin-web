'use client';

// Menu desktop dengan penanda menu aktif (garis bawah plum)
import Link from 'next/link';
import { navLinks } from './nav-links';
import { isActive, useActiveNav } from './useActiveNav';

export function DesktopNav() {
  const active = useActiveNav();
  return (
    <nav aria-label="Menu utama" className="hidden lg:block">
      <ul className="flex items-center gap-7 text-sm">
        {navLinks.map((l) => {
          const on = isActive(l.href, active);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={on ? 'page' : undefined}
                className={`relative py-2 transition-colors hover:text-plum after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-plum after:transition-transform after:duration-300 ${
                  on ? 'font-semibold text-plum after:scale-x-100' : 'after:scale-x-0'
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
