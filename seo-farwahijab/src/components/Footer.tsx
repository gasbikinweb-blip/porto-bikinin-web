import Link from 'next/link';
import { categories } from '@/data/categories';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { InstagramIcon, ShopeeIcon, TikTokIcon, WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { navLinks } from './nav-links';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const link = 'inline-flex min-h-10 min-w-11 items-center hover:text-on-panel';
// Ikon kontak dalam lingkaran kecil
const contact = 'inline-flex min-h-11 items-center gap-3 hover:text-on-panel';
const badge =
  'grid size-8 shrink-0 place-items-center rounded-full bg-on-panel/10 text-on-panel transition-colors group-hover:bg-on-panel/20';

export function Footer() {
  return (
    <footer className="bg-panel-strong text-on-panel/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <span className="text-on-panel">
            <Logo light />
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {site.tagline}. Dikirim dari {site.city}.
          </p>
        </div>
        <div className="text-sm">
          <h2 className="font-serif text-lg text-on-panel italic">Menu</h2>
          <ul className="mt-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-serif text-lg text-on-panel italic">Kategori</h2>
          <ul className="mt-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href="/#koleksi" className={link}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <h2 className="font-serif text-lg text-on-panel italic">Belanja & kontak</h2>
          <ul className="mt-2">
            <li>
              <a href={config.shopeeUrl} {...external} className={`group ${contact}`}>
                <span className={badge}>
                  <ShopeeIcon className="size-4" />
                </span>
                Toko Shopee Farwaheejab
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className={`group ${contact}`}
              >
                <span className={badge}>
                  <WhatsAppIcon className="size-4" />
                </span>
                WhatsApp {site.waDisplay}
              </a>
            </li>
            <li>
              <a href={site.instagram} {...external} className={`group ${contact}`}>
                <span className={badge}>
                  <InstagramIcon className="size-4" />
                </span>
                Instagram {site.handle}
              </a>
            </li>
            <li>
              <a href={site.tiktok} {...external} className={`group ${contact}`}>
                <span className={badge}>
                  <TikTokIcon className="size-4" />
                </span>
                TikTok @farwa.heejab
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-on-panel/10 px-4 py-5 text-center text-xs">
        © {new Date().getFullYear()} {site.name}. Bagian dari {site.parentBrand}.
      </p>
    </footer>
  );
}
