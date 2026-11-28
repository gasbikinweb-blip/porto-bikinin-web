import Link from 'next/link';
import { getCategories } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { FacebookIcon, InstagramIcon, MailIcon, ThreadsIcon, TikTokIcon, WhatsAppIcon } from './icons';
import { Logo } from './Logo';
import { navLinks } from './nav-links';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const socials = [
  { label: 'WhatsApp', href: buildWhatsAppLink(generalMessage), Icon: WhatsAppIcon },
  { label: 'Instagram', href: siteConfig.instagram, Icon: InstagramIcon },
  { label: 'TikTok', href: siteConfig.tiktok, Icon: TikTokIcon },
  { label: 'Threads', href: siteConfig.threads, Icon: ThreadsIcon },
  { label: 'Facebook', href: siteConfig.facebook, Icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Link href="/" aria-label="Ruang Mebel, ke beranda" className="inline-block text-foreground">
            <Logo className="h-14" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-muted">{siteConfig.description}</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...external}
                  aria-label={`${label} ${siteConfig.name} (tab baru)`}
                  className="grid size-10 place-items-center rounded-full border border-line text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-background"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Menu</h2>
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

        <div>
          <h2 className="font-serif text-xl">Kategori</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {getCategories().map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/?kategori=${c.slug}#portofolio`}
                  className="transition-colors hover:text-accent-strong"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Hubungi Kami</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className="inline-flex items-center gap-2.5 hover:text-accent-strong">
                <WhatsAppIcon className="size-4 text-accent" />
                {siteConfig.waDisplay}
              </a>
            </li>
            <li>
              <a href={siteConfig.instagram} {...external} className="inline-flex items-center gap-2.5 hover:text-accent-strong">
                <InstagramIcon className="size-4 text-accent" />
                {siteConfig.instagramHandle}
              </a>
            </li>
            <li>
              <a href={siteConfig.tiktok} {...external} className="inline-flex items-center gap-2.5 hover:text-accent-strong">
                <TikTokIcon className="size-4 text-accent" />
                TikTok {siteConfig.tiktokHandle}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2.5 break-all hover:text-accent-strong">
                <MailIcon className="size-4 shrink-0 text-accent" />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={siteConfig.mapsUrl} {...external} className="flex items-start gap-2.5 hover:text-accent-strong">
              <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
              <span>Workshop: {siteConfig.address}</span>
              <span className="sr-only"> (Google Maps, tab baru)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Semua pemesanan dilayani melalui WhatsApp.
        </p>
      </div>
    </footer>
  );
}
