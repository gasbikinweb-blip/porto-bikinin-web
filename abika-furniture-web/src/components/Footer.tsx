import Image from 'next/image';
import { categories } from '@/data/categories';
import { site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const heading = 'text-[11px] font-medium tracking-[0.25em] text-white/60 uppercase';
const link = 'inline-block py-1.5 transition-colors hover:text-white';

const nav = [
  { href: '/#tentang', label: 'Tentang' },
  { href: '/#keunggulan', label: 'Keunggulan' },
  { href: '/#katalog', label: 'Katalog' },
  { href: '/#galeri', label: 'Galeri' },
  { href: '/#cara-pesan', label: 'Cara Pesan' },
  { href: '/#faq', label: 'FAQ' },
];

export function Footer() {
  return (
    <footer className="bg-ink text-sm text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-16 pb-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          {/* Latar hitam logo menyatu dengan footer lewat mode screen */}
          <Image
            src="/images/logo.webp"
            alt={site.name}
            width={820}
            height={120}
            className="-ml-4 h-10 w-auto mix-blend-screen"
          />
          <p className="mt-4 max-w-xs leading-relaxed text-white/70">
            Brand furnitur lokal dari {site.city}. Pemesanan dilayani melalui WhatsApp.
          </p>
        </div>

        <nav aria-label="Menu footer">
          <h2 className={heading}>Navigasi</h2>
          <ul className="mt-4">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className={link}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Kategori footer">
          <h2 className={heading}>Kategori</h2>
          <ul className="mt-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <a href={`/#kategori-${c.slug}`} className={link}>
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Hubungi kami</h2>
          <ul className="mt-4">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className={link}>
                WhatsApp {site.whatsappDisplay[0]}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink(generalMessage, site.whatsappSecond)}
                {...external}
                className={link}
              >
                WhatsApp {site.whatsappDisplay[1]}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={site.instagram} {...external} className={link}>
                Instagram {site.instagramHandle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} {...external} className={link}>
                {site.address}
                <span className="sr-only"> (Google Maps, tab baru)</span>
              </a>
            </li>
          </ul>
          {site.hours && <p className="mt-2 text-white/70">{site.hours}</p>}
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-5 py-6 pr-24 text-xs text-white/70 sm:px-6 sm:pr-24">
          © {new Date().getFullYear()} {site.name}, {site.city}.
        </p>
      </div>
    </footer>
  );
}
