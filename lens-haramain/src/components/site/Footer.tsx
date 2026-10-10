import type { Content } from '@/content/types';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { Logo } from './Logo';

export function Footer({ t }: { t: Content }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-xs font-serif text-2xl leading-snug">{t.footer.tagline}</p>
          <p className="mt-4 text-sm text-muted">{t.footer.base}</p>
        </div>

        <nav aria-label={t.footer.nav} className="md:col-span-3">
          <h2 className="eyebrow text-muted">{t.footer.nav}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {t.nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-line">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-8 md:col-span-4">
          <div>
            <h2 className="eyebrow text-muted">{t.footer.contact}</h2>
            <a
              href={buildWhatsAppLink(t.wa.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-5 inline-block font-serif text-3xl"
            >
              {siteConfig.waDisplay}
              <span className="sr-only"> WhatsApp {t.wa.newTab}</span>
            </a>
          </div>
          <div>
            <h2 className="eyebrow text-muted">{t.footer.follow}</h2>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-5 inline-block text-sm"
            >
              Instagram {siteConfig.instagramHandle}
              <span className="sr-only"> {t.wa.newTab}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6 lg:px-10">
          © {year} {t.footer.rights} {siteConfig.name}.
        </p>
      </div>
    </footer>
  );
}
