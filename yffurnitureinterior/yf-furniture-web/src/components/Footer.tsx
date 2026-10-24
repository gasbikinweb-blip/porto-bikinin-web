import Link from 'next/link';
import { fullAddress, site } from '@/data/site';
import { activeCategories } from '@/lib/catalog';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { navLinks } from './nav-links';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">{site.tagline}.</p>
        </div>

        <div>
          <h2 className="font-bold">Menu</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-wood">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold">Kategori</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {activeCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/katalog/${c.slug}`} className="hover:text-wood">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold">Workshop</h2>
          <address className="mt-3 space-y-2 text-sm text-muted not-italic">
            <p>{fullAddress}</p>
            <p>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className="hover:text-wood">
                WhatsApp {site.waDisplay}
              </a>
            </p>
            <p className="flex gap-4">
              <a href={site.instagram} {...external} className="hover:text-wood">
                Instagram
              </a>
              <a href={site.threads} {...external} className="hover:text-wood">
                Threads
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {site.name}. Konsultasi & pemesanan melalui WhatsApp.
        </p>
      </div>
    </footer>
  );
}
