import { MessageBuilder } from '@/components/MessageBuilder';
import { PageHeader, WhatsAppButton, container } from '@/components/ui';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import { generalMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'Kontak',
  description:
    'Hubungi Seams Konveksi lewat WhatsApp untuk konsultasi dan penawaran jasa konveksi abaya dan khimar.',
  path: '/kontak',
});

export default function ContactPage() {
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  const link = 'font-semibold text-plum underline-offset-4 hover:underline';

  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Konsultasi & minta penawaran"
        intro="Cara tercepat menghubungi kami adalah lewat WhatsApp. Ceritakan desain, jumlah, dan target waktu Anda."
      />
      <section className={`${container} grid gap-10 py-14 lg:grid-cols-[1fr_1.3fr]`}>
        <div>
          <WhatsAppButton message={generalMessage} label={`Chat WhatsApp ${site.waDisplay}`} />
          <dl className="mt-8 space-y-5 text-sm">
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
                {/* Sengaja tanpa embed iframe peta: cukup link keluar */}
                {site.mapsUrl && (
                  <a href={site.mapsUrl} {...ext} className={`${link} mt-1 inline-block`}>
                    Buka di Google Maps
                  </a>
                )}
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
            <div>
              <dt className="text-muted">Area layanan & pengiriman</dt>
              <dd>{site.serviceArea}</dd>
            </div>
          </dl>
        </div>
        <MessageBuilder />
      </section>
    </>
  );
}
