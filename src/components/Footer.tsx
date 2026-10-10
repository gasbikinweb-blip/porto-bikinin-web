import Image from 'next/image';
import Link from 'next/link';
import { getCategories } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { navLinks } from './nav-links';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/brand/logo.webp" alt="" width={44} height={44} className="rounded-md" />
            <p className="font-serif text-2xl">{siteConfig.name}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {siteConfig.tagline}. Mebel kayu jati grade A dari pengrajin Jepara.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl">Menu</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-accent-strong">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Kategori</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {getCategories().map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/produk?kategori=${c.slug}`}
                  className="transition-colors hover:text-accent-strong"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Hubungi Kami</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="hover:text-accent-strong"
              >
                WhatsApp: {siteConfig.waDisplay}
              </a>
            </li>
            <li>
              <a href={siteConfig.instagram} {...external} className="hover:text-accent-strong">
                Instagram @linirumahjepara
              </a>
            </li>
            <li>
              <a href={siteConfig.tiktok} {...external} className="hover:text-accent-strong">
                TikTok @linirumahjepara
              </a>
            </li>
            <li>{siteConfig.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Semua pemesanan dilayani melalui WhatsApp.
        </p>
      </div>
    </footer>
  );
}
