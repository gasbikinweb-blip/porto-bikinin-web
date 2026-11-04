import Image from 'next/image';
import { Catalog } from '@/components/Catalog';
import { HeroSlider, type HeroSlide } from '@/components/HeroSlider';
import { WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { categories } from '@/data/categories';
import { faqs } from '@/data/faq';
import manifest from '@/data/images.generated.json';
import { getProduct, priceLabel, products, type Product } from '@/data/products';
import { advantages, orderSteps, site } from '@/data/site';
import { buildWhatsAppLink, config, generalMessage } from '@/lib/config';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

const eyebrow = 'text-[11px] font-medium tracking-[0.32em] text-muted uppercase';
const btnDark =
  'inline-flex min-h-12 items-center justify-center gap-3 bg-ink px-7 text-[11px] font-semibold tracking-[0.25em] whitespace-nowrap text-white uppercase transition-colors hover:bg-accent';
const btnLine =
  'inline-flex min-h-12 items-center justify-center gap-2 border border-foreground/25 px-7 text-[11px] font-semibold tracking-[0.25em] whitespace-nowrap uppercase transition-colors hover:border-foreground';
const textLink =
  'group inline-flex min-h-11 items-center gap-2 border-b border-foreground text-[11px] font-semibold tracking-[0.25em] uppercase';
const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

const photo = (slug: string) => getProduct(slug)?.images[0];

const heroSlides: HeroSlide[] = [
  { slug: 'sofa-l-natural', caption: 'Sofa L Natural' },
  { slug: 'sofa-modular-walnut', caption: 'Sofa Modular Walnut' },
  { slug: 'dipan-rotan-natural', caption: 'Dipan Rotan Natural' },
].flatMap(({ slug, caption }) => {
  const img = photo(slug);
  return img ? [{ src: img.src, alt: img.alt, caption }] : [];
});

const picks = [
  'kursi-santai-rattan',
  'sofa-modular-walnut',
  'buffet-rotan-jati-mahogany',
  'meja-makan-bulat-natural',
]
  .map((slug) => getProduct(slug))
  .filter((p): p is Product => Boolean(p));

const g = manifest.gallery;
const origin = [
  {
    no: '01',
    label: 'Material',
    title: 'Kayu jati pilihan',
    text: 'Sebagian besar produk kami memakai kayu jati, dengan finishing natural, walnut, hingga hitam.',
    image: g[1],
    alt: 'Meja kayu dalam proses finishing di workshop',
  },
  {
    no: '02',
    label: 'Kriya',
    title: 'Dikerjakan di Jepara',
    text: 'Dibuat di Jepara, kota yang dikenal dengan keahlian mebelnya.',
    image: g[0],
    alt: 'Pengrajin merakit rangka kursi kayu di workshop',
  },
  {
    no: '03',
    label: 'Terpasang',
    title: 'Sampai ke ruang Anda',
    text: 'Dari rumah hingga kafe, furnitur kami dibuat untuk dipakai sehari-hari.',
    image: g[5],
    alt: 'Kursi dan meja kayu terpasang di sebuah kafe',
  },
];

export default function HomePage() {
  const roomPhoto = photo('set-meja-makan-bench');
  const ctaPhoto = photo('sofa-l-walnut');
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

      {/* Hero */}
      <section
        id="beranda"
        className="grid lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="flex flex-col justify-center bg-surface px-5 py-14 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
          <p className={`animate-in ${eyebrow}`} style={delay(100)}>
            Furnitur kayu · {site.city}
          </p>
          <h1 className="mt-6 font-serif text-[3.2rem] leading-[0.98] tracking-tight sm:text-7xl xl:text-8xl">
            <span className="hero-line" style={delay(200)}>
              <span>Kayu jati</span>
            </span>{' '}
            <span className="hero-line" style={delay(340)}>
              <span>
                <em className="text-accent">untuk rumah.</em>
              </span>
            </span>
          </h1>
          <p className="animate-in mt-7 max-w-md leading-relaxed text-muted" style={delay(520)}>
            Sofa, kursi, meja, lemari, dan tempat tidur buatan {site.name} dari {site.city}. Pilih
            dari katalog, lalu pesan langsung lewat WhatsApp.
          </p>
          <div className="animate-in mt-10 flex flex-col gap-3 sm:flex-row" style={delay(680)}>
            <a href="#katalog" className={btnDark}>
              Lihat Katalog <span aria-hidden="true">→</span>
            </a>
            <a href={buildWhatsAppLink(generalMessage)} {...external} className={btnLine}>
              <WhatsAppIcon className="size-4" />
              Chat WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </div>
        <div
          className="animate-in relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto"
          style={delay(150)}
        >
          <HeroSlider slides={heroSlides} />
        </div>
      </section>

      {/* Strip kategori */}
      <nav aria-label="Kategori produk" className="border-b border-line">
        <ul className="no-scrollbar mx-auto flex max-w-7xl overflow-x-auto px-2 sm:px-4 lg:justify-between">
          {categories.map((c) => {
            const cover = photo(c.coverProduct);
            return (
              <li key={c.slug} className="shrink-0 border-r border-line last:border-r-0 lg:flex-1">
                <a
                  href={`#kategori-${c.slug}`}
                  className="group flex items-center gap-4 px-4 py-5 sm:px-6"
                >
                  <span className="relative size-12 shrink-0 overflow-hidden bg-surface sm:size-14">
                    {cover && (
                      <Image
                        src={cover.thumb}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </span>
                  <span className="text-sm whitespace-nowrap transition-colors group-hover:text-accent">
                    {c.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Koleksi pilihan */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.75fr_2fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <p className={eyebrow}>Koleksi pilihan</p>
            <h2 className="mt-5 font-serif text-5xl leading-none sm:text-6xl">
              Kayu &amp;
              <br />
              <em className="text-accent">Rotan</em>
            </h2>
            <p className="mt-6 max-w-xs leading-relaxed text-muted">
              Beberapa karya dari katalog kami. Buka detailnya, lalu tanyakan langsung lewat
              WhatsApp.
            </p>
            <a href="#katalog" className={`mt-6 ${textLink}`}>
              Semua produk <span aria-hidden="true">→</span>
            </a>
          </div>
          <ul data-stagger className="grid grid-cols-2 gap-3 sm:gap-5">
            {picks.map((p, i) => {
              const img = p.images[0];
              return (
                <li key={p.slug} className={`reveal ${i % 2 ? 'sm:mt-14' : ''}`}>
                  <a href={`#produk-${p.slug}`} className="group block bg-surface p-2 sm:p-3">
                    <span className="relative block aspect-[4/5] overflow-hidden">
                      {img && (
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, 50vw"
                          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                        />
                      )}
                    </span>
                    <span className="flex items-center justify-between gap-3 px-1 pt-4 pb-2">
                      <span>
                        <span className="block font-serif text-xl leading-tight">{p.name}</span>
                        <span className="mt-1 block text-xs text-muted">{priceLabel(p)}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Mosaik asal-usul */}
      <section aria-label="Dari material hingga terpasang" className="bg-surface">
        <div className="grid md:grid-cols-3">
          {origin.map((o, i) => (
            <article
              key={o.no}
              className={`group flex flex-col ${i === 1 ? 'md:flex-col-reverse' : ''}`}
            >
              <div className="reveal reveal-curtain relative aspect-[4/3] overflow-hidden md:aspect-square">
                {o.image && (
                  <Image
                    src={o.image.src}
                    alt={o.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                )}
              </div>
              <div className="reveal flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
                <p className="font-serif text-sm text-accent">
                  {o.no}
                  <span className="ml-2 text-[11px] tracking-[0.3em] text-muted uppercase">
                    {o.label}
                  </span>
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight">{o.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{o.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Keunggulan */}
      <section id="keunggulan" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <h2 className="reveal border-l-2 border-accent pl-5 font-serif text-3xl sm:text-4xl">
            Mengapa memilih {site.name}?
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:items-center">
            <div className="reveal reveal-zoom">
              <p className="font-serif text-[7rem] leading-none tracking-tight sm:text-[9rem]">
                {products.length}
              </p>
              <p className="mt-2 max-w-[12rem] text-sm leading-snug text-muted">
                produk di katalog kami
              </p>
            </div>
            <ul data-stagger className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {advantages.map((a, i) => (
                <li key={a.title} className="reveal flex gap-5">
                  <span className="font-serif text-2xl text-accent tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="font-medium">{a.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ruang */}
      <section className="grid bg-surface lg:grid-cols-2">
        <div className="reveal reveal-curtain relative aspect-[4/3] lg:aspect-auto lg:min-h-[38rem]">
          {roomPhoto && (
            <Image
              src={roomPhoto.src}
              alt={roomPhoto.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-center overflow-hidden px-5 py-16 sm:px-12 lg:px-20">
          <div className="reveal reveal-right">
            <p className={eyebrow}>Untuk setiap ruang</p>
            <h2 className="mt-5 font-serif text-5xl leading-[1.02] sm:text-6xl">
              Temukan untuk
              <br />
              <em className="text-accent">ruang Anda</em>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Dari ruang tamu, ruang makan, hingga kamar tidur. Lihat koleksi kami per kategori.
            </p>
            <a href="#katalog" className={`mt-6 ${textLink}`}>
              Jelajahi katalog <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <Catalog />

      {/* Di balik layar */}
      <section id="galeri" className="overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="reveal reveal-left">
            <p className="text-[11px] font-medium tracking-[0.32em] text-white/60 uppercase">
              Di balik layar
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl">
              Proses di workshop kami.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/70">
              Dari merakit rangka hingga menjahit jok. Lihat keseharian kami di Instagram{' '}
              {site.instagramHandle}.
            </p>
            <a
              href={site.instagram}
              {...external}
              className="mt-9 inline-flex min-h-12 items-center bg-white px-7 text-[11px] font-semibold tracking-[0.25em] text-ink uppercase transition-colors hover:bg-accent hover:text-white"
            >
              Lihat Instagram<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <div className="grid grid-cols-[1fr_0.8fr] items-end gap-4">
            {g[2] && (
              <div className="reveal relative aspect-[4/5] overflow-hidden">
                <Image
                  src={g[2].src}
                  alt="Proses menjahit jok dengan mesin jahit"
                  fill
                  sizes="(min-width: 1024px) 30vw, 55vw"
                  className="object-cover"
                />
              </div>
            )}
            {g[3] && (
              <div
                className="reveal relative aspect-[9/14] overflow-hidden"
                style={{ '--reveal-delay': '150ms' } as React.CSSProperties}
              >
                <Image
                  src={g[3].src}
                  alt="Pengrajin memasang panel rotan pada kursi"
                  fill
                  sizes="(min-width: 1024px) 25vw, 45vw"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cara pesan */}
      <section id="cara-pesan" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className={eyebrow}>Cara pesan</p>
              <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Empat langkah, tanpa ribet</h2>
            </div>
            <a href={buildWhatsAppLink(generalMessage)} {...external} className={btnDark}>
              <WhatsAppIcon className="size-4" />
              Mulai Chat<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <ol data-stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {orderSteps.map((s, i) => (
              <li key={s.title} className="reveal border-t border-foreground/25 pt-5">
                <span className="font-serif text-3xl text-accent">0{i + 1}</span>
                <h3 className="mt-3 font-medium">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_2fr]">
          <div className="reveal">
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Pertanyaan yang sering diajukan
            </h2>
          </div>
          <div className="reveal border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-6 py-6 font-medium sm:text-lg">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-xl text-muted transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="reveal mx-auto grid max-w-7xl overflow-hidden bg-surface lg:grid-cols-[1.4fr_1fr]">
          <div className="px-6 py-14 sm:px-12 lg:px-16">
            <p className={eyebrow}>Kontak</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Yuk, ngobrol dengan kami.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Ceritakan produk yang Anda cari. Tanyakan harga, ukuran, dan pengiriman lewat
              WhatsApp.
            </p>
            <a href={buildWhatsAppLink(generalMessage)} {...external} className={`mt-8 ${btnDark}`}>
              <WhatsAppIcon className="size-4" />
              Chat WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
            <dl className="mt-10 grid gap-6 border-t border-foreground/15 pt-8 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted">WhatsApp</dt>
                <dd className="mt-2 flex flex-col">
                  <a
                    href={buildWhatsAppLink(generalMessage)}
                    {...external}
                    className="py-1 underline underline-offset-4"
                  >
                    {site.whatsappDisplay[0]}
                    <span className="sr-only"> (tab baru)</span>
                  </a>
                  <a
                    href={buildWhatsAppLink(generalMessage, site.whatsappSecond)}
                    {...external}
                    className="py-1 underline underline-offset-4"
                  >
                    {site.whatsappDisplay[1]}
                    <span className="sr-only"> (tab baru)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Lokasi</dt>
                <dd className="mt-2">
                  <address className="not-italic">{site.address}</address>
                  <a
                    href={site.mapsUrl}
                    {...external}
                    className="mt-1 inline-block py-1 underline underline-offset-4"
                  >
                    Buka di Google Maps<span className="sr-only"> (tab baru)</span>
                  </a>
                  {site.hours && <p className="mt-1 text-muted">{site.hours}</p>}
                </dd>
              </div>
              <div>
                <dt className="text-muted">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={site.instagram}
                    {...external}
                    className="inline-block py-1 underline underline-offset-4"
                  >
                    {site.instagramHandle}
                    <span className="sr-only"> (tab baru)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="relative min-h-64">
            {ctaPhoto && (
              <Image
                src={ctaPhoto.src}
                alt={ctaPhoto.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
