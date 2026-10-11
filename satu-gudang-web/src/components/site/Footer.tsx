import { InstagramIcon, ThreadsIcon, WhatsAppIcon } from '@/components/ui/icons';
import { ExternalLink } from '@/components/ui/ExternalLink';
import type { SiteContent } from '@/content/types';
import { serviceIds } from '@/data/services';
import { siteConfig } from '@/lib/config';
import { waLink } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { navItems, sectionIds } from './nav';

export function Footer({ content }: { content: SiteContent }) {
  const { footer, services, nav, common } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark border-t border-line bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo name={siteConfig.name} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{footer.blurb}</p>
          <p className="mt-4 font-serif text-lg italic">{common.tagline}</p>
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-accent-text uppercase">
            {footer.servicesTitle}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {serviceIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${sectionIds.services}`}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {services.items[id].title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-accent-text uppercase">
            {footer.exploreTitle}
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[...navItems(nav), { href: `#${sectionIds.contact}`, label: nav.contact }].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted transition-colors hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-bold tracking-[0.18em] text-accent-text uppercase">
            {footer.contactTitle}
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <ExternalLink
                href={waLink(content.wa.general)}
                className="inline-flex items-center gap-2 hover:text-accent-text"
              >
                <WhatsAppIcon className="size-4" /> {siteConfig.waDisplay}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={siteConfig.instagram}
                className="inline-flex items-center gap-2 hover:text-accent-text"
              >
                <InstagramIcon className="size-4" /> Instagram {siteConfig.socialHandle}
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={siteConfig.threads}
                className="inline-flex items-center gap-2 hover:text-accent-text"
              >
                <ThreadsIcon className="size-4" /> Threads {siteConfig.socialHandle}
              </ExternalLink>
            </li>
            <li className="text-muted">
              {content.contact.areaLabel}: {content.contact.area}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6">
          © {year} {siteConfig.legalName}. {footer.rights}
        </p>
      </div>
    </footer>
  );
}
