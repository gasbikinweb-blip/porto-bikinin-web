import { shippingInfo } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';
import { WhatsAppButton } from './WhatsAppButton';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

// Footer sekaligus section Kontak (#kontak)
export function Footer() {
  return (
    <footer id="kontak" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{siteConfig.tagline}.</p>
          <WhatsAppButton className="mt-6">Chat Admin</WhatsAppButton>
        </div>

        <div>
          <h2 className="font-serif text-xl">Kontak</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="hover:text-foreground"
              >
                WhatsApp Pre-Order: {siteConfig.waDisplay}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Sosial Media</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href={siteConfig.instagram} {...external} className="hover:text-foreground">
                Instagram {siteConfig.instagramHandle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a href={siteConfig.threads} {...external} className="hover:text-foreground">
                Threads {siteConfig.instagramHandle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-xl">Pengiriman</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {shippingInfo.notes.slice(0, 2).map((n) => (
              <li key={n}>{n}</li>
            ))}
            <li>{shippingInfo.couriers.join(' · ')}</li>
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
