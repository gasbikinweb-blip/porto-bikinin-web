import { mapsUrl, siteConfig } from '@/lib/config';
import { Logo } from './Logo';
import { navLinks } from './nav-links';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-20 sm:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-sm text-muted">{siteConfig.description}</p>
          <div className="mt-5">
            <SocialLinks />
          </div>
        </div>
        <nav aria-label="Menu footer">
          <h2 className="text-sm font-semibold">Menu</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold">Kontak</h2>
          <address className="mt-3 space-y-2 text-sm text-muted not-italic">
            <p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                {siteConfig.address}
              </a>
            </p>
            <p>WhatsApp: {siteConfig.waDisplay}</p>
            <p>{siteConfig.hours.map((h) => `${h.day}: ${h.time}`).join(' · ')}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {siteConfig.name}.
        </p>
      </div>
    </footer>
  );
}
