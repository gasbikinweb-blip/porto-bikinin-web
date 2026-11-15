// Section statis halaman utama (server component)
import Image from 'next/image';
import { ArrowIcon, CheckIcon, PinIcon, ServiceIcon, WhatsAppIcon } from './icons';
import { Socials } from './Socials';
import { advantages } from '@/data/advantages';
import { faqs } from '@/data/faq';
import { processSteps } from '@/data/process';
import { projects } from '@/data/projects';
import { activePromos } from '@/data/promos';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage, serviceMessage } from '@/lib/whatsapp';

const btnPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-6 font-bold text-accent-ink transition hover:brightness-95';

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="reveal max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-4 leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

export function Hero() {
  const hero = projects.find((p) => p.slug === 'hotel-kemang')!.cover;
  const total = projects.length;
  return (
    <section id="beranda" className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:pt-14 lg:pb-24">
        <div>
          <p className="animate-in inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-bold text-muted">
            <span className="grid size-5 place-items-center rounded-full bg-accent text-accent-ink">
              <CheckIcon className="size-3" />
            </span>
            Free konsultasi &amp; survei · {site.area}
          </p>
          <h1
            className="animate-in mt-6 font-display text-4xl leading-[1.05] font-black sm:text-5xl xl:text-6xl"
            style={{ '--delay': '120ms' } as React.CSSProperties}
          >
            <span className="text-accent-text">Wujudkan Rumah Impian</span> dengan Jasa Bangun &amp;
            Renovasi Terpercaya
          </h1>
          <p
            className="animate-in mt-6 max-w-xl text-lg leading-relaxed text-muted"
            style={{ '--delay': '240ms' } as React.CSSProperties}
          >
            {site.tagline}. Dari desain sampai finishing, dikerjakan tim AKAA yang berkantor di
            Cibubur.
          </p>
          <div
            className="animate-in mt-8 flex flex-wrap gap-3"
            style={{ '--delay': '360ms' } as React.CSSProperties}
          >
            <a href="#konsultasi" className={`${btnPrimary} rounded-full`}>
              Konsultasi Gratis <ArrowIcon className="size-5" />
            </a>
            <a
              href="#proyek"
              className="inline-flex min-h-12 items-center rounded-full border border-line bg-surface px-6 font-bold hover:border-foreground"
            >
              Lihat Proyek
            </a>
          </div>
          <dl
            className="animate-in mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6"
            style={{ '--delay': '480ms' } as React.CSSProperties}
          >
            {[
              [`${total}+`, 'Proyek terdokumentasi'],
              ['5', 'Layanan'],
              ['Rp0', 'Biaya survei'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-black">{v}</dd>
                <dd className="text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="animate-in relative aspect-[4/3.6] lg:aspect-[4/4.2]"
          style={{ '--delay': '200ms' } as React.CSSProperties}
        >
          {/* Bingkai foto dengan sudut kiri atas terpotong diagonal */}
          <div className="hero-shape absolute inset-0 overflow-hidden bg-surface-2">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 640px, 100vw"
              className="animate-ken-burns object-cover"
            />
          </div>
          <div className="absolute bottom-4 left-4 rounded-xl border border-line bg-surface/95 px-4 py-3 shadow-xl backdrop-blur sm:bottom-6 sm:-left-6">
            <p className="text-xs font-bold tracking-widest text-accent-text uppercase">
              Kantor kami
            </p>
            <p className="mt-0.5 text-sm font-semibold">Kota Wisata, Cibubur</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PromoBanner() {
  const promo = activePromos()[0];
  if (!promo) return null;
  const end = new Date(`${promo.endDate}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <section id="promo" aria-labelledby="judul-promo" className="bg-accent text-accent-ink">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase">Promo berlaku s.d. {end}</p>
          <h2 id="judul-promo" className="font-display text-3xl font-black uppercase">
            {promo.title}
          </h2>
          <p className="mt-1 text-sm">{promo.terms.join(' · ')}</p>
        </div>
        <a
          href="#konsultasi"
          className="inline-flex min-h-12 items-center rounded-md bg-night px-6 font-bold text-white"
        >
          Klaim promo
        </a>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="layanan" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <Heading
        eyebrow="Layanan"
        title="Satu tim untuk rumah impian Anda"
        text="Bangun baru, renovasi, interior, taman, sampai suplai material untuk kawasan Jabodetabek."
      />
      <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li
            key={s.id}
            className="reveal flex flex-col rounded-lg border border-line bg-surface p-6"
          >
            <span className="grid size-12 place-items-center rounded-md bg-accent text-accent-ink">
              <ServiceIcon name={s.icon} className="size-6" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold uppercase">{s.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-accent-text" /> {p}
                </li>
              ))}
            </ul>
            <a
              href={buildWhatsAppLink(serviceMessage(s.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-bold text-accent-text hover:underline"
            >
              Konsultasikan <ArrowIcon className="size-4" />
              <span className="sr-only"> layanan {s.name} via WhatsApp (tab baru)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Ikon garis untuk tiap keunggulan (urutan sama dengan data advantages)
const advIcons = [
  'M4 5h16v11H8l-4 4V5Zm4 5h8M8 13h5',
  'M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'M7 3h7l5 5v13H7V3Zm7 0v5h5M10 12h6M10 16h6',
  'M4 20V10m6 10V4m6 16v-7m4 7H3',
];

export function Advantages() {
  return (
    <section id="keunggulan" className="bg-surface-2/50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="reveal rounded-3xl bg-accent p-8 text-accent-ink shadow-xl sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">Kenapa AKAA</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] font-black uppercase sm:text-5xl">
            Bangun rumah tanpa perlu drama
          </h2>
          <p className="mt-4 leading-relaxed opacity-85">
            Semua dimulai dengan obrolan santai, lalu survei dan RAB yang jelas sebelum satu bata
            pun dipasang.
          </p>
          <a
            href="#konsultasi"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-6 font-bold text-night shadow hover:brightness-95"
          >
            Mulai Konsultasi <ArrowIcon className="size-5" />
          </a>
        </div>

        <div>
          <h3 className="reveal font-display text-3xl font-extrabold uppercase sm:text-4xl">
            Yang Anda dapatkan
          </h3>
          <ul data-stagger className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {advantages.map((a, i) => (
              <li key={a.title} className="reveal flex gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border-2 border-accent text-accent-text">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={advIcons[i]} />
                  </svg>
                </span>
                <div>
                  <h4 className="font-display text-lg font-extrabold uppercase">{a.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Ikon garis tiap langkah cara kerja (urutan sama dengan processSteps)
const stepIcons = [
  'M4 5h16v11H8l-4 4V5Zm4 5h8M8 13h5',
  'M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  'M7 3h7l5 5v13H7V3Zm7 0v5h5M10 12h6M10 16h6',
  'm3 12 4-4 5 3 5-4 4 4M7 8v9m10-10v10M3 12v5h18v-5',
  'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6',
  'M4 11 12 4l8 7M6 9.5V20h12V9.5M9.5 15l2 2 3.5-4',
];

export function Process() {
  return (
    <section id="cara-kerja" className="relative overflow-hidden bg-night text-white">
      {/* Foto kanan (desktop): menempel ke tepi layar, teks tetap sejajar container/logo */}
      <div className="absolute inset-y-0 right-0 hidden w-[36%] lg:block">
        <Image
          src="/images/proyek/renovasi-rumah-office/01.webp"
          alt="Tukang AKAA mengerjakan dinding lantai atas proyek renovasi rumah"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-night via-transparent to-transparent"
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="lg:w-[60%]">
          <div className="reveal">
            <p className="eyebrow !text-accent">Cara Kerja</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] font-extrabold uppercase sm:text-5xl">
              Dari obrolan sampai serah terima
            </h2>
          </div>
          <ol data-stagger className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s, i) => (
              <li key={s.title} className="reveal">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-9 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={stepIcons[i]} />
                </svg>
                <h3 className="mt-4 font-display text-lg font-extrabold uppercase">
                  <span className="text-accent">{String(i + 1).padStart(2, '0')}.</span> {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
          <a
            href="#konsultasi"
            className="reveal mt-12 inline-flex min-h-11 items-center gap-2 font-bold text-accent hover:underline"
          >
            Mulai dari langkah pertama <ArrowIcon className="size-4" />
          </a>
        </div>
      </div>
      {/* Foto bawah (HP/tablet) */}
      <div className="relative h-72 lg:hidden">
        <Image
          src="/images/proyek/renovasi-rumah-office/01.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-night via-transparent to-transparent"
        />
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-surface-2/50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.6fr]">
        <Heading eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" />
        <div data-stagger className="divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="reveal group">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 font-bold">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-2xl text-accent-text transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="kontak" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="reveal grid gap-8 rounded-lg border border-line bg-surface p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Kontak</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase">
            Mampir atau chat kami
          </h2>
          <p className="mt-4 text-muted">
            Melayani {site.area}: {site.areaDetail.join(', ')}.
          </p>
          <Socials className="mt-6" />
        </div>
        <dl className="grid gap-5 text-sm">
          <div>
            <dt className="font-bold">Kantor</dt>
            <dd className="mt-1 text-muted">{site.office}</dd>
            <dd>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 font-bold text-accent-text hover:underline"
              >
                <PinIcon className="size-5" /> Buka di Google Maps
                <span className="sr-only"> (tab baru)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href={buildWhatsAppLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-wa px-5 font-bold text-white"
              >
                <WhatsAppIcon className="size-5" /> {siteConfig.waDisplay}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold">Jam operasional</dt>
            <dd className="mt-1 text-muted">
              {site.hours ?? 'Hubungi kami via WhatsApp untuk jadwal temu.'}
            </dd>
          </div>
          <div>
            <dt className="font-bold">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-11 items-center font-semibold text-accent-text hover:underline"
              >
                {site.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>
      <div className="reveal mt-6 overflow-hidden rounded-lg border border-line bg-surface-2">
        <iframe
          src={site.mapsEmbed}
          title={`Peta lokasi kantor AKAA: ${site.office}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="block h-72 w-full border-0 sm:h-96"
        />
      </div>
    </section>
  );
}
