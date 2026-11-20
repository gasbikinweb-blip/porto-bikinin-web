import { site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const link = 'inline-flex min-h-11 items-center hover:text-ink';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 text-sm text-muted sm:px-8 md:grid-cols-3">
        <div>
          <Logo className="text-ink" />
          <p className="mt-3 font-serif text-base italic">{site.tagline}</p>
        </div>
        <div>
          <p className="eyebrow">Store</p>
          <p className="mt-3">{site.address}</p>
          <p className="mt-1">{site.hoursText}</p>
        </div>
        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-1">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className={link}>
                WhatsApp<span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={site.instagram} {...external} className={link}>
                Instagram {site.handle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={site.threads} {...external} className={link}>
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
