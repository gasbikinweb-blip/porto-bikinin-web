import Link from 'next/link';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { Logo } from './Logo';
import { navLinks } from './nav-links';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const link = 'transition-colors hover:text-accent-ink';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo className="h-11" />
          <p className="mt-4 font-serif text-lg italic">{site.tagline}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Interior Design &amp; Build Studio di Jakarta, melayani {site.areaServed}.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl">Menu</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Layanan</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/#layanan" className={link}>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Kontak</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className={link}>
                WhatsApp {site.waDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
            </li>
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} {...external} className={link}>
                  {s.label} {s.handle}
                </a>
              </li>
            ))}
            <li>
              {site.address.city}, {site.address.region}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {site.name}. Konsultasi dilayani melalui WhatsApp.
        </p>
      </div>
    </footer>
  );
}
