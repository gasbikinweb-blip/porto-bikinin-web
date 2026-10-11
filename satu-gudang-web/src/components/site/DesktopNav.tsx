'use client';

// Menu desktop dengan penanda aktif: garis oranye beranimasi di bawah link section yang sedang dilihat
import type { NavItem } from './nav';
import { useActiveSection } from './useActiveSection';

export function DesktopNav({ items, label }: { items: NavItem[]; label: string }) {
  const active = useActiveSection(items.map((i) => i.href));

  return (
    <nav aria-label={label} className="hidden xl:block">
      <ul className="flex items-center gap-7 text-sm font-semibold">
        {items.map((l) => {
          const isActive = active === l.href;
          return (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={isActive ? 'location' : undefined}
                className="relative block py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent-text hover:after:scale-x-100 aria-[current]:text-accent-text aria-[current]:after:scale-x-100"
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
