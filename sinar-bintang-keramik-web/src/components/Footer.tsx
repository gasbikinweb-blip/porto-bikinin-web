import { site } from '@/data/site';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { Logo } from './Logo';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const link = 'inline-flex min-h-11 items-center hover:text-red';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-muted">{site.address}</p>
          <p className="mt-1 text-muted">Telp. {site.phone}</p>
          <p className="mt-1 text-muted">
            {site.hours} · {site.closed}
          </p>
        </div>
        <div>
          <h2 className="font-bold">Belanja</h2>
          <ul className="mt-2">
            <li>
              <a href={buildWhatsAppLink(generalMessage)} {...external} className={link}>
                WhatsApp {site.waDisplay}
              </a>
            </li>
            <li>
              <a href={config.shopeeStoreUrl} {...external} className={link}>
                Toko Shopee
              </a>
            </li>
            <li>
              <a href={site.tokopedia} {...external} className={link}>
                Tokopedia
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Ikuti kami</h2>
          <ul className="mt-2">
            <li>
              <a href={site.instagram} {...external} className={link}>
                Instagram {site.handle}
              </a>
            </li>
            <li>
              <a href={site.threads} {...external} className={link}>
                Threads {site.handle}
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} {...external} className={link}>
                Google Maps
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line px-4 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}. Harga & stok dapat berubah sewaktu-waktu.
      </p>
    </footer>
  );
}
