import Image from 'next/image';
import { FacebookIcon, InstagramIcon, ThreadsIcon, WhatsAppIcon } from './icons';
import { categories } from '@/data/categories';
import { navLinks } from '@/data/nav';
import { site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const socials = [
  { label: 'Instagram', href: site.instagram, Icon: InstagramIcon },
  { label: 'Threads', href: site.threads, Icon: ThreadsIcon },
  { label: 'Facebook', href: site.facebook, Icon: FacebookIcon },
  { label: 'WhatsApp', href: buildWhatsAppLink(generalMessage), Icon: WhatsAppIcon },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <a href="#beranda" aria-label="DMS Jepara Furniture, ke beranda" className="inline-block">
            <Image
              src="/brand/logo-light.png"
              alt="DMS Furniture"
              width={488}
              height={182}
              className="h-14 w-auto"
            />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Workshop furnitur custom bergaya luxury dan klasik dari {site.city}. Konsultasi desain
            gratis lewat WhatsApp.
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...external}
                  aria-label={`${label} ${site.name} (tab baru)`}
                  className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Menu footer">
          <h2 className="font-serif text-xl">Menu</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-serif text-xl">Kategori</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <a href="#katalog" className="hover:text-white">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Hubungi Kami</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="hover:text-white"
              >
                WhatsApp {site.whatsappDisplay}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={site.instagram} {...external} className="hover:text-white">
                Instagram {site.instagramHandle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} {...external} className="hover:text-white">
                {site.address}
                <span className="sr-only"> (Google Maps, tab baru)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/60 sm:px-6">
          © {new Date().getFullYear()} {site.name}. Pemesanan dilayani melalui WhatsApp.
        </p>
      </div>
    </footer>
  );
}
