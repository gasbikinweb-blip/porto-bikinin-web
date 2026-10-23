import Image from 'next/image';
import { SocialIcons } from '@/components/icons';
import { Container } from '@/components/ui';
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
      {/* Hero terang: judul besar menimpa foto */}
      <div className="hero-light px-2 pt-2 md:px-3 md:pt-3">
        <section className="relative overflow-hidden rounded-[1.75rem] bg-surface pt-28 pb-12 md:rounded-[2.25rem] md:pt-32 md:pb-20">
          {/* Label vertikal di sisi kiri (dekoratif) */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-6 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
          >
            <span className="text-xs tracking-wider text-muted [writing-mode:vertical-rl] rotate-180">
              Sapa kami
            </span>
            <span className="h-12 w-px bg-fg" />
            <span className="h-1.5 w-1.5 rounded-full bg-fg" />
          </div>

          <Container className="relative">
            <div className="relative md:ml-[30%]">
              {/* Blok terang di belakang foto */}
              <div className="absolute top-[12%] -left-[12%] hidden h-[90%] w-[45%] rounded-2xl bg-bg md:block" />
              {img && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] md:aspect-[16/9]">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority
                    sizes="(min-width: 768px) 65vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            {/* mix-blend-difference: teks berubah warna saat menimpa foto */}
            <h1 className="fade-up relative mt-8 font-serif text-6xl leading-[0.95] font-light text-white mix-blend-difference md:absolute md:top-[22%] md:left-[8%] md:mt-0 md:text-8xl lg:text-9xl">
              Pintu kami
              <br />
              selalu terbuka!
            </h1>
          </Container>
        </section>
      </div>

      {/* Pembuat pesan + info kontak */}
      <Container className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
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
