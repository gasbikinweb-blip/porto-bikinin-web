import Image from 'next/image';
import {
  ArrowIcon,
  AtIcon,
  CalendarIcon,
  ChatIcon,
  InstagramIcon,
  PinIcon,
  SparkleIcon,
  StarIcon,
  WhatsAppIcon,
} from '@/components/icons';
import { ConsultBuilder } from '@/components/ConsultBuilder';
import { InspirationRail } from '@/components/InspirationRail';
import { Services } from '@/components/Services';
import { WeddingQuotes } from '@/components/WeddingQuotes';
import { JsonLd } from '@/components/JsonLd';
import { Portfolio } from '@/components/Portfolio';
import { faqs, steps } from '@/data/content';
import { HeroVideos } from '@/components/HeroVideos';
import { events, getEvent } from '@/data/events';
import { site } from '@/data/site';
import { buildWhatsAppLink, config, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const pick = (slug: string, i: number) => getEvent(slug)?.images[i];

// Statistik dihitung dari data, bukan ditulis manual
const stats = [
  { value: events.length, label: 'Acara di portofolio' },
  { value: events.reduce((n, e) => n + e.images.length, 0), label: 'Foto dokumentasi' },
  { value: new Set(events.map((e) => e.type)).size, label: 'Jenis acara' },
];

// Ikon untuk tiap langkah booking (urutan sama dengan steps)
const stepIcons = [ChatIcon, PinIcon, SparkleIcon, CalendarIcon, StarIcon];
const bookingImage = pick('shinta-aufar', 0);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: site.name,
          description: site.description,
          url: config.siteUrl,
          image: `${config.siteUrl}/images/og.jpg`,
          telephone: `+${config.waNumber}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Manukan Sari I',
            addressLocality: 'Surabaya',
            postalCode: '60185',
            addressCountry: 'ID',
          },
          sameAs: [site.instagram, site.threads, site.tiktok],
        }}
      />

      {/* Hero */}
      <section
        id="beranda"
        className="relative flex min-h-dvh flex-col justify-end overflow-hidden bg-night text-white"
      >
        <HeroVideos />
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-40 pb-10 sm:px-8 sm:pb-14">
          <h1
            className="animate-in max-w-3xl font-sans text-5xl leading-[1.05] font-light tracking-tight sm:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: '120ms' }}
          >
            <span className="text-white/60">Dekorasi yang </span>
            <span className="font-normal">Bercerita</span>
            <br />
            <span className="text-white/60">di Hari </span>
            <span className="font-normal">Bahagia</span>
          </h1>
          <p
            className="animate-in mt-6 max-w-md leading-relaxed text-white/85 sm:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            Dekorasi wedding, akad, engagement, dan ulang tahun di Surabaya, dari yang intimate
            sampai megah.
          </p>
          <div className="animate-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: '360ms' }}>
            <a
              href={buildWhatsAppLink(generalMessage)}
              {...external}
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-white px-6 text-night shadow-sm transition hover:bg-gold-light"
            >
              <WhatsAppIcon className="size-5" />
              Konsultasi Sekarang<span className="sr-only"> (tab baru)</span>
            </a>
            <a
              href="#portofolio"
              className="inline-flex min-h-12 items-center gap-2 rounded-md px-4 text-white/90 transition hover:text-white"
            >
              Lihat Portofolio
              <ArrowIcon />
            </a>
          </div>

          <div
            className="animate-in mt-20 grid gap-8 lg:mt-28 lg:grid-cols-[1fr_auto] lg:items-end"
            style={{ animationDelay: '480ms' }}
          >
            <p className="max-w-md leading-relaxed text-white/85">
              Backdrop bunga, pelaminan, dan meja akad yang disusun mengikuti ruang, warna, dan
              cerita setiap pasangan.
            </p>
            <dl className="grid grid-cols-3 gap-6 sm:gap-14">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <dd className="text-4xl font-light sm:text-5xl">{s.value}</dd>
                  <dt className="mt-1 text-xs text-white/75 sm:text-sm">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Services />

      <Portfolio />

      <InspirationRail />

      {/* Cara booking */}
      <section id="cara-booking" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow">Cara Booking</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              Cara kami <em className="text-gold-text">bekerja</em>
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">
              Prosesnya kami buat sederhana dan jelas, dari obrolan pertama sampai dekorasi
              dibongkar setelah acara.
            </p>
            <div data-anim="zoom" className="reveal relative mt-10 max-w-md pt-10 pr-10">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-night">
                {bookingImage && (
                  <Image
                    src={bookingImage.thumb}
                    alt={bookingImage.alt}
                    fill
                    sizes="(min-width: 1024px) 28rem, 90vw"
                    className="object-cover"
                  />
                )}
              </div>
              <a
                href="#konsultasi"
                className="absolute top-0 right-0 grid size-32 place-items-center rounded-full border-8 border-ivory bg-ink p-4 text-center text-sm leading-snug text-paper transition hover:bg-gold-text sm:size-36"
              >
                Mulai konsultasi
              </a>
            </div>
          </div>

          <ol data-stagger className="self-center">
            {steps.map((s, i) => {
              const Icon = stepIcons[i] ?? ChatIcon;
              return (
                <li
                  key={s.title}
                  className="reveal flex gap-5 border-b border-line py-7 first:pt-0"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-paper">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl leading-tight">
                      <span className="sr-only">Langkah {i + 1}: </span>
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <WeddingQuotes />

      <ConsultBuilder />

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <p className="eyebrow">FAQ</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              Yang sering <em className="text-gold-text">ditanyakan</em>
            </h2>
          </div>
          <div data-stagger className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="reveal group py-2">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 font-serif text-2xl">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-2xl text-gold transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="border-t border-line bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="reveal text-center">
            <p className="font-script text-4xl text-gold-text">Sampai jumpa di hari bahagia</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">
              Mari wujudkan dekorasi impian Anda
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            <div
              data-anim="left"
              className="reveal flex flex-col gap-6 rounded-3xl border border-line bg-ivory p-6 sm:p-8"
            >
              <div>
                <p className="text-xs tracking-[0.2em] text-muted uppercase">WhatsApp</p>
                <p className="mt-2 font-serif text-3xl">{site.whatsappDisplay}</p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-muted uppercase">Studio</p>
                <address className="mt-2 leading-relaxed not-italic">{site.address}</address>
                <a
                  href={site.mapsUrl}
                  {...external}
                  className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-gold-text underline underline-offset-4"
                >
                  <PinIcon className="size-4" />
                  Petunjuk arah<span className="sr-only"> (tab baru)</span>
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-muted uppercase">Area layanan</p>
                <p className="mt-2 leading-relaxed">{site.serviceArea}</p>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-6">
                <a
                  href={buildWhatsAppLink(generalMessage)}
                  {...external}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm text-paper transition hover:bg-gold-text"
                >
                  <WhatsAppIcon className="size-5" />
                  Konsultasi via WhatsApp<span className="sr-only"> (tab baru)</span>
                </a>
                <a
                  href={site.instagram}
                  {...external}
                  aria-label="Instagram (tab baru)"
                  className="grid size-12 place-items-center rounded-full border border-line hover:border-ink"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={site.threads}
                  {...external}
                  aria-label="Threads (tab baru)"
                  className="grid size-12 place-items-center rounded-full border border-line hover:border-ink"
                >
                  <AtIcon />
                </a>
              </div>
            </div>

            <div
              data-anim="right"
              className="reveal relative min-h-80 overflow-hidden rounded-3xl border border-line bg-ivory lg:min-h-[28rem]"
            >
              <iframe
                src={site.mapsEmbed}
                title="Peta lokasi studio YMI Decoration di Google Maps"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full border-0 grayscale-[35%] sepia-[15%]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
