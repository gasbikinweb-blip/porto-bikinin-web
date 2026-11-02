import { SocialIcons } from '@/components/icons';
import { Container, PageHeader } from '@/components/ui';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { ExternalLink, WhatsAppButton } from '@/components/WhatsApp';
import { getProject, getProjects } from '@/data/projects';
import { site } from '@/data/site';
import type { Lang } from '@/i18n';
import { ui } from '@/i18n/ui';

export const contactCopy = {
  id: {
    metaTitle: 'Kontak',
    metaDesc:
      'Hubungi Griya Nuansa via WhatsApp untuk konsultasi desain arsitektur dan interior di Serpong, Tangerang Selatan, dan Jabodetabek.',
    eyebrow: 'Kontak',
    title: (
      <>
        Pintu kami <em>selalu terbuka</em>
      </>
    ),
    intro: 'Semua konsultasi dan permintaan penawaran dilayani lewat WhatsApp.',
    form: 'Formulir konsultasi',
    address: 'Alamat',
    maps: 'Buka di Google Maps',
    email: 'Email',
    hours: 'Jam operasional',
    area: 'Area layanan',
    downloads: 'Unduhan',
  },
  en: {
    metaTitle: 'Contact',
    metaDesc:
      'Contact Griya Nuansa via WhatsApp for architecture and interior design consultations in Serpong, South Tangerang, and Greater Jakarta.',
    eyebrow: 'Contact',
    title: (
      <>
        Our door is <em>always open</em>
      </>
    ),
    intro: 'All consultations and quotation requests are handled via WhatsApp.',
    form: 'Consultation form',
    address: 'Address',
    maps: 'Open in Google Maps',
    email: 'Email',
    hours: 'Opening hours',
    area: 'Service area',
    downloads: 'Downloads',
  },
};

const label = 'text-sm font-semibold';
const link = 'underline-offset-4 hover:underline';

export function ContactView({ lang }: { lang: Lang }) {
  const c = contactCopy[lang];
  // TODO: pilih foto untuk halaman Kontak
  const img = getProject('kj-house', lang)?.cover ?? getProjects(lang)[0]?.cover;

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} image={img} title={c.title} intro={c.intro} />

      {/* Pembuat pesan + info kontak */}
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <WaMessageBuilder title={c.form} />
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <h2 className="font-serif text-4xl font-light">{site.name}</h2>
          <dl className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
            <div>
              <dt className={`${label} text-fg`}>{c.address}</dt>
              <dd>
                <address className="not-italic">{site.address}</address>
                <ExternalLink
                  lang={lang}
                  href={site.mapsUrl}
                  className={`mt-1 inline-block underline ${link}`}
                >
                  {c.maps}
                </ExternalLink>
              </dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>{c.email}</dt>
              {/* TODO: verifikasi alamat email resmi */}
              <dd>
                <a href={`mailto:${site.email}`} className={link}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>WhatsApp</dt>
              <dd className="mt-2 flex flex-col items-start gap-2">
                {site.whatsapp.map((w) => (
                  <WhatsAppButton
                    key={w.number}
                    lang={lang}
                    number={w.number}
                    message={ui[lang].defaultWa}
                    variant="outline"
                    className="!px-5 !py-2.5"
                  >
                    {w.label}
                  </WhatsAppButton>
                ))}
              </dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>{c.hours}</dt>
              <dd className="italic">{site.hours[lang]}</dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>{c.area}</dt>
              <dd>{site.serviceArea.join(', ')}</dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>{c.downloads}</dt>
              {/* TODO: letakkan PDF asli di public/files/ */}
              <dd className="flex flex-col">
                <a href={site.downloads.companyProfile} download className={link}>
                  Company Profile (PDF)
                </a>
                <a href={site.downloads.pricelist} download className={link}>
                  Pricelist (PDF)
                </a>
              </dd>
            </div>
          </dl>
          <SocialIcons lang={lang} tone="dark" className="mt-8" />
        </div>
      </Container>
    </>
  );
}
