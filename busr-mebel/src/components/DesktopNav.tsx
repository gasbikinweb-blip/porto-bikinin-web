'use client';

// Navigasi desktop dengan penanda halaman aktif
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from './nav-links';

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigasi utama" className="hidden lg:block">
      <ul className="flex items-center gap-1 text-[11px] font-medium tracking-[0.22em] uppercase">
        {navLinks.map((l) => {
          const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className="relative px-3 py-2 text-foreground/70 transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-teak after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 aria-[current=page]:text-foreground aria-[current=page]:after:scale-x-100 xl:px-4 xl:after:inset-x-4"
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
