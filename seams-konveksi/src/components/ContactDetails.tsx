import { site } from '@/data/site';
import { generalMessage } from '@/lib/whatsapp';
import { WhatsAppButton } from './ui';

// Info kontak: WA, Instagram, email, alamat, jam kerja, area layanan (peta ada di MapEmbed)
export function ContactDetails() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  const link = 'font-semibold text-plum underline-offset-4 hover:underline';

  return (
    <div>
      <WhatsAppButton message={generalMessage} label={`Chat WhatsApp ${site.waDisplay}`} />
      <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Instagram</dt>
          <dd>
            <a href={site.instagramUrl} {...ext} className={link}>
              @{site.instagramHandle}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Email</dt>
          <dd>
            <a href={`mailto:${site.email}`} className={link}>
              {site.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Alamat</dt>
          <dd>
            <address className="not-italic">{site.address}</address>
          </dd>
        </div>
        <div>
          <dt className="text-muted">Jam kerja</dt>
          <dd>
            <ul>
              {site.hours.map((h) => (
                <li key={h.day}>
                  {h.day}: {h.time}
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-muted">Area layanan & pengiriman</dt>
          <dd>{site.serviceArea}</dd>
        </div>
      </dl>
    </div>
  );
}
