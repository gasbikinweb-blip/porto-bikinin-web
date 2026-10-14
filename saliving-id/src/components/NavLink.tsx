'use client';

// Link navigasi dengan penanda halaman aktif (aria-current)
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className="relative py-2 text-foreground/75 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-foreground hover:after:w-full aria-[current=page]:text-foreground aria-[current=page]:after:w-full"
    >
      {children}
    </Link>
  );
}
