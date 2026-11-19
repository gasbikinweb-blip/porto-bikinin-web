import { categories } from '@/data/catalog-meta';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { navLinks } from './nav-links';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {siteConfig.tagline}. {siteConfig.legalName}, Probolinggo.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold">Menu</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold">Kategori</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {categories.map((c) => (
              <li key={c.id}>
                <a href="#katalog" className="hover:text-accent">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold">Hubungi Kami</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...ext} className="hover:text-accent">
                WhatsApp {siteConfig.waDisplay}
              </a>
            </li>
            <li>
              <a href={siteConfig.shopeeStoreUrl} {...ext} className="hover:text-accent">
                Shopee haraanjaproject
              </a>
            </li>
            <li>
              <a href={siteConfig.instagram} {...ext} className="hover:text-accent">
                Instagram @haraanjaproject_souvenir
              </a>
            </li>
            <li>{siteConfig.address}</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {siteConfig.legalName}. Pemesanan dilayani via WhatsApp &amp;
        Shopee.
      </p>
    </footer>
  );
}
