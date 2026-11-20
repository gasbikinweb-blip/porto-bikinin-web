import { site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { ClockIcon, InstagramIcon, PinIcon, ThreadsIcon, WhatsAppIcon } from './icons';
import { Logo } from './Logo';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const link = 'inline-flex min-h-11 items-center gap-3 transition-colors hover:text-ink';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 text-sm text-muted sm:px-8 md:grid-cols-3">
        <div>
          <Logo className="text-ink" />
          <p className="mt-3 font-serif text-base italic">{site.tagline}</p>
          <p className="mt-2 max-w-xs leading-relaxed">{site.taglineLong}</p>
        </div>
        <div>
          <p className="eyebrow">Store</p>
          <a
            href={site.mapsUrl}
            {...external}
            className="mt-3 flex items-start gap-3 hover:text-ink"
          >
            <PinIcon className="mt-0.5 size-4 shrink-0" />
            <span>
              {site.address}
              <span className="sr-only"> (buka Google Maps, tab baru)</span>
            </span>
          </a>
          <p className="mt-3 flex items-start gap-3">
            <ClockIcon className="mt-0.5 size-4 shrink-0" />
            {site.hoursText}
          </p>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-1">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className={link}>
                <WhatsAppIcon className="size-4" />
                WhatsApp +62 895-4013-92031<span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={site.instagram} {...external} className={link}>
                <InstagramIcon className="size-4" />
                Instagram {site.handle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={site.threads} {...external} className={link}>
                <ThreadsIcon className="size-4" />
                Threads {site.handle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-4 py-6 text-center text-[0.65rem] tracking-[0.25em] text-muted uppercase">
        © {new Date().getFullYear()} Sanaréa · Cianjur
      </p>
    </footer>
  );
}
