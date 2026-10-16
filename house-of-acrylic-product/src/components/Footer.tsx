import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { navLinks } from './nav-links';

export function Footer() {
  return (
    <footer className="bg-ink text-silver">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="font-bold text-paper uppercase">{siteConfig.name}</p>
          <p className="mt-2 text-sm">
            Cutting laser, letter signage, neon box, dan UV printing akrilik custom di Surabaya.
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <address className="text-sm not-italic">
          {site.address.street}, {site.address.city}
          <br />
          WA {site.waDisplay}
          <br />
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-paper"
          >
            Instagram {site.handle}
          </a>
        </address>
      </div>
      <p className="border-t border-line-dark py-5 text-center text-xs">
        © {new Date().getFullYear()} {siteConfig.name}. Pembayaran hanya via transfer {site.bank}.
      </p>
    </footer>
  );
}
