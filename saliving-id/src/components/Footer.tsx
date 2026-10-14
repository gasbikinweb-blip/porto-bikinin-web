import Link from 'next/link';
import { getCategories } from '@/data/products';
import { fullAddress, siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { navLinks } from './nav-links';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const link = 'transition-colors hover:text-accent-strong';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo className="h-16" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.tagline}. Wallpaper dinding, gorden, lantai SPC, dan kasa nyamuk magnet,
            lengkap dengan jasa ukur dan pasang.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-lg">Menu</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg">Produk</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {getCategories().map((c) => (
              <li key={c.slug}>
                <Link href={`/produk?kategori=${c.slug}`} className={link}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-lg">Kunjungi Toko</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href={siteConfig.mapsUrl} {...external} className={link}>
                {fullAddress}
                <span className="sr-only"> (buka Google Maps di tab baru)</span>
              </a>
            </li>
            {siteConfig.hours.map((h) => (
              <li key={h.day}>
                {h.day}: {h.time}
              </li>
            ))}
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className={link}>
                WhatsApp {siteConfig.waDisplay}
              </a>
            </li>
            <li className="flex gap-4">
              <a href={siteConfig.instagram} {...external} className={link}>
                Instagram
              </a>
              <a href={siteConfig.threads} {...external} className={link}>
                Threads
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Konsultasi, ukur, dan penawaran dilayani
          melalui WhatsApp.
        </p>
      </div>
    </footer>
  );
}
