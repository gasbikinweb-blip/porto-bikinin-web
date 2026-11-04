import Image from 'next/image';
import { Catalog } from '@/components/Catalog';
import { WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { faqs } from '@/data/faq';
import manifest from '@/data/images.generated.json';
import { getProduct } from '@/data/products';
import { advantages, orderSteps, site } from '@/data/site';
import { buildWhatsAppLink, config, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const galleryAlts = [
  'Pengrajin merakit rangka kursi kayu di workshop',
  'Meja kayu dalam proses finishing di workshop',
  'Proses menjahit jok dengan mesin jahit',
  'Pengrajin memasang panel rotan pada kursi',
  'Rangka kursi kayu dan rotan dalam proses pengerjaan',
  'Kursi dan meja kayu terpasang di sebuah kafe',
];

const eyebrow = 'text-xs font-medium tracking-[0.25em] text-muted uppercase';
const heading = 'mt-3 font-serif text-4xl sm:text-5xl';

export default function HomePage() {
  const hero = getProduct('sofa-l-natural')?.images[0];
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FurnitureStore',
          name: site.name,
          description: site.description,
          url: config.siteUrl,
          telephone: `+${config.waNumber}`,
          address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'ID' },
          sameAs: [site.instagram],
        }}
      />

      <section id="beranda" className="grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-2">
        <div className="flex items-center bg-surface px-4 py-16 sm:px-6 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          <div className="max-w-lg">
            <p className={eyebrow}>Furnitur kayu · {site.city}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-7xl">
              Kayu jati untuk <em className="text-accent">rumah Anda.</em>
            </h1>
            <p className="mt-6 leading-relaxed text-muted">
              Sofa, kursi, meja, lemari, dan tempat tidur buatan Abika Furniture dari Jepara. Pilih
              dari katalog, lalu pesan langsung lewat WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#katalog"
                className="inline-flex min-h-12 items-center bg-ink px-6 text-sm font-medium text-white hover:bg-accent"
              >
                Lihat Katalog
              </a>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="inline-flex min-h-12 items-center gap-2 border border-foreground px-6 text-sm font-medium hover:bg-foreground hover:text-background"
              >
                <WhatsAppIcon className="size-4" />
                Pesan via WhatsApp<span className="sr-only"> (tab baru)</span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative aspect-square lg:aspect-auto">
          <div className="absolute inset-4 overflow-hidden sm:inset-6">
            {hero && (
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <Catalog />

      <section id="keunggulan" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className={`reveal ${eyebrow}`}>Keunggulan</p>
        <h2 className={`reveal ${heading}`}>Mengapa memilih Abika?</h2>
        <ul data-stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a, i) => (
            <li key={a.title} className="reveal border-t border-foreground pt-5">
              <span className="font-serif text-lg text-accent italic">0{i + 1}</span>
              <h3 className="mt-2 font-serif text-2xl">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="cara-pesan" className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="reveal font-serif text-4xl sm:text-5xl">Empat langkah, tanpa ribet</h2>
          <ol data-stagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {orderSteps.map((s, i) => (
              <li key={s.title} className="reveal">
                <span className="font-serif text-4xl italic text-white/70">{i + 1}</span>
                <h3 className="mt-2 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="galeri" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <p className={`reveal ${eyebrow}`}>Di balik layar</p>
        <h2 className={`reveal ${heading}`}>Proses di workshop kami</h2>
        <ul data-stagger className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {manifest.gallery.map((g, i) => (
            <li key={g.src} className="reveal bg-surface p-2 sm:p-3">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={g.src}
                  alt={galleryAlts[i] ?? 'Proses produksi Abika Furniture'}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="bg-surface py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="reveal font-serif text-4xl sm:text-5xl">
            Pertanyaan yang sering diajukan
          </h2>
          <div className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-serif text-xl">
                  {f.q}
                  <span aria-hidden="true" className="transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="reveal font-serif text-4xl sm:text-5xl">Yuk, ngobrol dengan kami</h2>
        <dl className="mt-8 grid gap-8 sm:grid-cols-3">
          <div>
            <dt className={eyebrow}>WhatsApp</dt>
            <dd className="mt-2 flex flex-col gap-1">
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="underline underline-offset-4"
              >
                {site.whatsappDisplay[0]}
                <span className="sr-only"> (tab baru)</span>
              </a>
              <a
                href={buildWhatsAppLink(generalMessage, site.whatsappSecond)}
                {...external}
                className="underline underline-offset-4"
              >
                {site.whatsappDisplay[1]}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className={eyebrow}>Lokasi</dt>
            <dd className="mt-2">
              <address className="not-italic">{site.address}</address>
              <a href={site.mapsUrl} {...external} className="underline underline-offset-4">
                Buka di Google Maps<span className="sr-only"> (tab baru)</span>
              </a>
              {site.hours && <p className="mt-1 text-muted">{site.hours}</p>}
            </dd>
          </div>
          <div>
            <dt className={eyebrow}>Instagram</dt>
            <dd className="mt-2">
              <a href={site.instagram} {...external} className="underline underline-offset-4">
                {site.instagramHandle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
