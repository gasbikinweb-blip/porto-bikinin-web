import Image from 'next/image';
import { ArrowIcon, PinIcon, WhatsAppIcon, InstagramIcon, AtIcon } from '@/components/icons';
import { ConsultBuilder } from '@/components/ConsultBuilder';
import { JsonLd } from '@/components/JsonLd';
import { Portfolio } from '@/components/Portfolio';
import { faqs, services, steps } from '@/data/content';
import { events, getEvent, hero } from '@/data/events';
import { site } from '@/data/site';
import { buildWhatsAppLink, config, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const pick = (slug: string, i: number) => getEvent(slug)?.images[i];

// Moodboard detail dekorasi
const moods = [
  { img: pick('berlin-aziz', 2), label: 'Meja akad', span: 'lg:col-span-2 lg:row-span-2' },
  { img: pick('shinta-aufar', 2), label: 'Galeri foto', span: '' },
  { img: pick('putri-luthfi', 1), label: 'Bunga kuning & anggrek', span: 'lg:row-span-2' },
  { img: pick('della-adil', 7), label: 'Detail lorong', span: '' },
  { img: pick('dita-iqbal', 1), label: 'Kursi pasangan', span: 'lg:col-span-2' },
  { img: pick('della-adil', 0), label: 'Pintu masuk', span: '' },
];

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
        className="relative flex min-h-dvh items-end overflow-hidden bg-night text-white"
      >
        <Image
          src={hero.src}
          alt="Backdrop pelaminan tirai biru royal dan oranye dengan untaian bunga oranye dan rangkaian bunga biru kuning"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover"
        />
        <div aria-hidden="true" className="hero-shade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pt-32 pb-16 sm:px-8 sm:pb-24">
          <p className="animate-in font-script text-3xl text-gold-light sm:text-4xl">
            event decoration
          </p>
          <h1
            className="animate-in mt-2 max-w-4xl font-serif text-5xl leading-[1.02] sm:text-7xl lg:text-8xl"
            style={{ animationDelay: '120ms' }}
          >
            Dekorasi yang Menceritakan <em className="text-gold-light">Hari Bahagia</em> Anda
          </h1>
          <p
            className="animate-in mt-6 max-w-xl text-lg leading-relaxed text-white/85"
            style={{ animationDelay: '240ms' }}
          >
            Dekorasi wedding, akad, engagement, dan ulang tahun di Surabaya, dari yang intimate
            sampai megah.
          </p>
          <div
            className="animate-in mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ animationDelay: '360ms' }}
          >
            <a
              href="#portofolio"
              className="inline-flex min-h-13 items-center justify-center gap-3 bg-white px-8 text-sm tracking-[0.18em] text-ink uppercase transition hover:bg-gold-light"
            >
              Lihat Portofolio
              <ArrowIcon />
            </a>
            <a
              href={buildWhatsAppLink(generalMessage)}
              {...external}
              className="inline-flex min-h-13 items-center justify-center gap-3 border border-white/70 px-8 text-sm tracking-[0.18em] uppercase transition hover:bg-white hover:text-ink"
            >
              <WhatsAppIcon className="size-5" />
              Konsultasi via WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <dl
            className="animate-in mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/20 pt-6 text-sm"
            style={{ animationDelay: '480ms' }}
          >
            <div className="flex items-baseline gap-2">
              <dt className="sr-only">Acara di portofolio</dt>
              <dd className="font-serif text-3xl">{events.length}</dd>
              <span className="text-white/75">acara di portofolio</span>
            </div>
            <div className="flex items-center gap-2 text-white/75">
              <PinIcon className="size-4" />
              {site.city} &amp; sekitarnya
            </div>
          </dl>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="reveal grid gap-6 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="eyebrow">Layanan</p>
              <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
                Untuk setiap
                <br />
                <em className="text-gold-text">momen berharga</em>
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-muted lg:justify-self-end">
              Dari meja akad yang khidmat sampai pelaminan penuh bunga, setiap dekorasi kami susun
              mengikuti ruang, warna, dan cerita Anda.
            </p>
          </div>
          <ul
            data-stagger
            className="no-scrollbar -mx-4 mt-14 flex snap-x gap-5 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0"
          >
            {services.map((s, i) => {
              const img = pick(...s.image);
              return (
                <li
                  key={s.type}
                  className="reveal w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-auto"
                >
                  <div className="group relative aspect-[3/4] overflow-hidden bg-night">
                    {img && (
                      <Image
                        src={img.thumb}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 20vw, 72vw"
                        className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                    )}
                    <span className="absolute top-4 left-4 font-serif text-lg text-white drop-shadow">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Portfolio />

      {/* Inspirasi */}
      <section id="inspirasi" className="on-dark bg-night py-20 text-night-text sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Tema &amp; Inspirasi</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              Keindahan ada di <em className="text-gold-light">detailnya</em>
            </h2>
          </div>
          <ul
            data-stagger
            className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4"
          >
            {moods.map(
              (m) =>
                m.img && (
                  <li
                    key={m.img.src}
                    className={`reveal relative aspect-[4/5] overflow-hidden lg:aspect-auto ${m.span}`}
                  >
                    <Image
                      src={m.img.thumb}
                      alt={m.img.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-4 pt-10 text-xs tracking-[0.2em] uppercase">
                      {m.label}
                    </span>
                  </li>
                ),
            )}
          </ul>
        </div>
      </section>

      {/* Cara booking */}
      <section id="cara-booking" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Cara Booking</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
              Lima langkah <em className="text-gold-text">menuju hari H</em>
            </h2>
          </div>
          <ol
            data-stagger
            className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8"
          >
            {steps.map((s, i) => (
              <li key={s.title} className="reveal">
                <span className="font-serif text-5xl text-gold">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-2">
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
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-8">
          <p className="font-script text-4xl text-gold-text">Sampai jumpa di hari bahagia</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl">
            Mari wujudkan dekorasi impian Anda
          </h2>
          <a
            href={buildWhatsAppLink(generalMessage)}
            {...external}
            className="mt-10 inline-flex min-h-14 items-center gap-3 bg-ink px-10 text-sm tracking-[0.18em] text-paper uppercase transition hover:bg-gold-text"
          >
            <WhatsAppIcon className="size-5" />
            Konsultasi via WhatsApp<span className="sr-only"> (tab baru)</span>
          </a>
          <dl className="mx-auto mt-16 grid max-w-4xl gap-10 border-t border-line pt-12 text-left sm:grid-cols-3">
            <div>
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">WhatsApp</dt>
              <dd className="mt-2 font-serif text-2xl">{site.whatsappDisplay}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">Studio</dt>
              <dd className="mt-2">
                <address className="not-italic leading-relaxed">{site.address}</address>
                <a
                  href={site.mapsUrl}
                  {...external}
                  className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm text-gold-text underline underline-offset-4"
                >
                  <PinIcon className="size-4" />
                  Buka di Google Maps<span className="sr-only"> (tab baru)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.2em] text-muted uppercase">Area layanan</dt>
              <dd className="mt-2 leading-relaxed">{site.serviceArea}</dd>
              <dd className="mt-3 flex gap-2">
                <a
                  href={site.instagram}
                  {...external}
                  aria-label="Instagram (tab baru)"
                  className="grid size-11 place-items-center border border-line hover:border-ink"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={site.threads}
                  {...external}
                  aria-label="Threads (tab baru)"
                  className="grid size-11 place-items-center border border-line hover:border-ink"
                >
                  <AtIcon />
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
