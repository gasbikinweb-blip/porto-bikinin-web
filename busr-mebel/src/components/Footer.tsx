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
        {/* Brand & Tagline */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.webp"
              alt="Logo Busr Mebel"
              width={44}
              height={44}
              className="rounded-md"
            />
            <p className="font-serif text-2xl font-medium">{siteConfig.name}</p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">{siteConfig.tagline}.</p>
          <div className="mt-6">
            <a
              href={siteConfig.catalogPdfUrl}
              download="katalog-busr-mebel.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-strong"
            >
              📄 Unduh E-Katalog (PDF) →
            </a>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div>
          <h2 className="font-serif text-xl font-medium text-foreground">Navigasi</h2>
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

        {/* Kategori Produk */}
        <div>
          <h2 className="font-serif text-xl font-medium text-foreground">Kategori Furnitur</h2>
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

        {/* Kontak & Lokasi */}
        <div>
          <h2 className="font-serif text-xl font-medium text-foreground">Hubungi Kami</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="hover:text-accent-strong transition-colors"
              >
                WhatsApp: {siteConfig.waDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-accent-strong transition-colors">
                Email: {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.instagram} {...external} className="hover:text-accent-strong transition-colors">
                Instagram: @busrmebel
              </a>
            </li>
            <li>
              <a href={siteConfig.tiktok} {...external} className="hover:text-accent-strong transition-colors">
                TikTok: @busrmebel
              </a>
            </li>
            <li>
              <a href={siteConfig.youtube} {...external} className="hover:text-accent-strong transition-colors">
                YouTube: @busrmebel1904
              </a>
            </li>
            <li className="pt-1 text-xs leading-relaxed">
              <span>{siteConfig.address}</span>
              <div className="mt-1">
                <a
                  href={siteConfig.mapsUrl}
                  {...external}
                  className="text-accent hover:underline inline-flex items-center gap-1"
                >
                  Lihat di Google Maps →
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Hak cipta dilindungi.</p>
          <p>Website katalog & etalase resmi. Pemesanan dan kustomisasi dilayani via WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
