import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import { generalMessage } from '@/lib/whatsapp';
import { MobileNav } from './MobileNav';
import { navLinks } from './nav-links';
import { WaLink } from './WaLink';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line-dark bg-ink/95 text-paper backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#beranda" className="flex items-center gap-2.5">
          <Image
            src="/brand/logo.webp"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-full bg-paper object-cover ring-1 ring-line-dark"
            priority
          />
          <span className="text-sm leading-tight font-bold tracking-wide uppercase">
            {siteConfig.name}
          </span>
        </a>
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex gap-6 text-sm text-silver">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden lg:block">
          <WaLink message={generalMessage} className="py-2!">
            Chat WhatsApp
          </WaLink>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
