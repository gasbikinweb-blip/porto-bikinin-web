import Image from 'next/image';
import { WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { MenuOrder } from '@/components/MenuOrder';
import { faqs } from '@/data/faq';
import { getItem } from '@/data/menu';
import { activeSeasonal } from '@/data/seasonal';
import { orderSteps, site } from '@/data/site';
import { testimonials } from '@/data/testimonials';
import { buildWhatsAppLink, config, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const heading = 'reveal font-serif text-4xl text-accent sm:text-5xl';

export default function HomePage() {
  const hero = getItem('tampah-kue-jajanan-pasar')?.images[1];
  const season = activeSeasonal();
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Bakery',
          name: site.name,
          description: site.description,
          url: config.siteUrl,
          telephone: `+${config.waNumber}`,
          foundingDate: String(site.since),
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Cipete, Jakarta Selatan',
            addressCountry: 'ID',
          },
          sameAs: [site.instagram, site.threads],
        }}
      />

      <section id="beranda" className="bg-blush">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <h1 className="animate-in font-serif text-5xl leading-[1.05] text-accent sm:text-6xl">
              Jajanan Pasar & Snack Box untuk Setiap Acara
            </h1>
            <p
              className="animate-in mt-5 max-w-lg text-lg leading-relaxed"
              style={{ animationDelay: '120ms' }}
            >
              Tampah, snack besek, nasi tumpeng, dan hantaran cantik dari ICH. Pilih menunya, lalu
              pesan lewat WhatsApp ya, Kak.
            </p>
            <div
              className="animate-in mt-7 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: '240ms' }}
            >
              <a
                href="#menu"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-7 font-bold text-white hover:bg-accent-strong"
              >
                Lihat Menu
              </a>
              <a
                href="#pesan-acara"
                className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-accent bg-white px-7 font-bold text-accent"
              >
                Pesan untuk Acara
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2 text-sm font-semibold">
              {[`Sejak ${site.since}`, 'Cipete, Jakarta Selatan', 'Pesan untuk Acara'].map((b) => (
                <li key={b} className="rounded-full bg-white px-4 py-2 text-leaf">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-in relative aspect-square overflow-hidden rounded-[2rem] border-8 border-white shadow-lg">
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

      {season && (
        <section id="musiman" className="bg-leaf px-4 py-6 text-white sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl">{season.title}</h2>
              <p className="text-sm">{season.description}</p>
            </div>
            <a
              href={`#menu-${season.itemSlugs[0]}`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-white px-6 font-bold text-leaf"
            >
              Lihat pilihan
            </a>
          </div>
        </section>
      )}

      <MenuOrder />

      <section id="cara-pesan" className="bg-blush py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className={heading}>Cara pesan</h2>
          <ol data-stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {orderSteps.map((s, i) => (
              <li key={s.title} className="reveal rounded-2xl bg-white p-5">
                <span className="grid size-10 place-items-center rounded-full bg-accent font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="testimoni" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className={heading}>Testimoni</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {testimonials.map((t) =>
            t.isPlaceholder ? (
              <li
                key={t.id}
                className="rounded-2xl border-2 border-dashed border-line p-6 text-muted"
              >
                {t.text}
              </li>
            ) : (
              <li key={t.id} className="rounded-2xl bg-white p-6">
                <blockquote>{t.text}</blockquote>
                <p className="mt-3 text-sm font-bold">
                  {t.name}
                  {t.event && `, ${t.event}`}
                </p>
              </li>
            ),
          )}
        </ul>
      </section>

      <section id="faq" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className={heading}>Pertanyaan yang sering ditanya</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-3">
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-bold">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-xl text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-1 pb-2 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className={heading}>Yuk, ngobrol dengan admin</h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="font-bold">WhatsApp</dt>
            <dd className="mt-1">
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="inline-flex min-h-11 items-center gap-2 underline"
              >
                <WhatsAppIcon className="size-4" />
                {site.whatsappDisplay}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold">Lokasi</dt>
            <dd className="mt-1">
              <address className="not-italic">{site.address}</address>
              <a
                href={site.mapsUrl}
                {...external}
                className="inline-flex min-h-11 items-center underline"
              >
                Buka di Google Maps<span className="sr-only"> (tab baru)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold">Jam buka dan area antar</dt>
            <dd className="mt-1">
              {site.hours}
              <br />
              {site.deliveryArea}
            </dd>
          </div>
          <div>
            <dt className="font-bold">Media sosial</dt>
            <dd className="mt-1 flex flex-col">
              <a
                href={site.instagram}
                {...external}
                className="inline-flex min-h-11 items-center underline"
              >
                Instagram<span className="sr-only"> (tab baru)</span>
              </a>
              <a
                href={site.threads}
                {...external}
                className="inline-flex min-h-11 items-center underline"
              >
                Threads<span className="sr-only"> (tab baru)</span>
              </a>
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
