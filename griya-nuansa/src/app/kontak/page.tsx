import { SocialIcons } from '@/components/icons';
import { Container, PageHeader } from '@/components/ui';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { WhatsAppButton } from '@/components/WhatsApp';
import { getProject, projects } from '@/data/projects';
import { defaultWaMessage, site } from '@/data/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Kontak',
  description:
    'Hubungi Griya Nuansa via WhatsApp untuk konsultasi desain arsitektur dan interior di Serpong, Tangerang Selatan, dan Jabodetabek.',
  path: '/kontak/',
});

const label = 'text-sm font-semibold';
const link = 'underline-offset-4 hover:underline';

export default function ContactPage() {
  const img = getProject('kj-house')?.cover ?? projects[0]?.cover; // TODO: pilih foto untuk halaman Kontak

  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        image={img}
        title={
          <>
            Pintu kami <em>selalu terbuka</em>
          </>
        }
        intro="Semua konsultasi dan permintaan penawaran dilayani lewat WhatsApp."
      />

      {/* Pembuat pesan + info kontak */}
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <WaMessageBuilder title="Formulir konsultasi" />
        </div>

        <div className="md:col-span-4 md:col-start-9">
          <h2 className="font-serif text-4xl font-light">{site.name}</h2>
          <dl className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
            <div>
              <dt className={`${label} text-fg`}>Alamat</dt>
              <dd>
                <address className="not-italic">{site.address}</address>
              </dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>Email</dt>
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
                    number={w.number}
                    message={defaultWaMessage}
                    variant="outline"
                    className="!px-5 !py-2.5"
                  >
                    {w.label}
                  </WhatsAppButton>
                ))}
              </dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>Jam kerja</dt>
              <dd className="italic">{site.hours}</dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>Area layanan</dt>
              <dd>{site.serviceArea.join(', ')}</dd>
            </div>
            <div>
              <dt className={`${label} text-fg`}>Unduhan</dt>
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
          <SocialIcons tone="dark" className="mt-8" />
        </div>
      </Container>
    </>
  );
}
