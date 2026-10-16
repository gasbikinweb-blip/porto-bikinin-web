import Link from 'next/link';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { navLinks } from './nav-links';
import { container } from './ui';

export function Footer() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  return (
    <footer className="border-t border-line bg-surface">
      <div className={`${container} grid gap-10 py-14 sm:grid-cols-3`}>
        <div>
          <Logo className="h-16" />
          <p className="mt-3 text-sm text-muted">
            Jasa konveksi abaya dan khimar (CMT) untuk brand busana muslimah, dari sampel sampai
            packing.
          </p>
        </div>
        <nav aria-label="Tautan footer">
          <p className="mb-3 text-sm font-semibold">Halaman</p>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-plum">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm text-muted">
          <p className="mb-3 font-semibold text-foreground">Kontak</p>
          <ul className="space-y-2">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...ext} className="hover:text-plum">
                WhatsApp {site.waDisplay}
              </a>
            </li>
            <li>
              <a href={site.instagramUrl} {...ext} className="hover:text-plum">
                Instagram @{site.instagramHandle}
              </a>
            </li>
            <li>{site.city}</li>
          </ul>
        </div>
      </div>
      <p className={`${container} border-t border-line py-6 text-xs text-muted`}>
        © {new Date().getFullYear()} {config.siteName}. Seluruh foto adalah milik {config.siteName}.
      </p>
    </footer>
  );
}
