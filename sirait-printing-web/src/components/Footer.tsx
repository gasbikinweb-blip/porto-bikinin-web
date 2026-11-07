import { fullAddress, hoursText, site } from '@/data/site';
import { buildWhatsAppLink, defaultMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const link = 'inline-flex min-h-11 items-center hover:text-yellow';

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <span className="inline-block rounded-xl bg-white px-3 py-2 text-ink">
            <Logo />
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
            {site.taglines.join(' · ')}. Print, jilid, dan fotocopy untuk mahasiswa di Medan.
          </p>
        </div>
        <div className="text-sm">
          <h2 className="font-display text-base font-bold">Alamat & jam</h2>
          <address className="mt-2 leading-relaxed text-white/75 not-italic">
            {fullAddress}
            <br />
            {site.address.landmark}
          </address>
          <p className="mt-2 text-white/75">{hoursText}</p>
        </div>
        <div className="text-sm">
          <h2 className="font-display text-base font-bold">Kontak</h2>
          <ul className="mt-1 text-white/75">
            <li>
              <a href={buildWhatsAppLink(defaultMessage)} {...external} className={link}>
                WhatsApp {site.waDisplay}
              </a>
            </li>
            <li>
              <a href={site.instagram} {...external} className={link}>
                Instagram @sirait_printing
              </a>
            </li>
            <li>
              <a href={site.threads} {...external} className={link}>
                Threads @sirait_printing
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {site.name}. Semua pemesanan via WhatsApp.
      </p>
    </footer>
  );
}
