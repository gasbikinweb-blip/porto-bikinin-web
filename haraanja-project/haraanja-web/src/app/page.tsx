// Halaman satu-satunya: semua section dengan anchor
import Image from 'next/image';
import { Catalog } from '@/components/Catalog';
import { CheckIcon, ChevronIcon, ShopIcon, WhatsAppIcon } from '@/components/icons';
import { CategoryCards, HeroSeasonCard, SeasonalShowcase } from '@/components/Home';
import { Gallery, OccasionCards } from '@/components/Interactive';
import { JsonLd } from '@/components/JsonLd';
import { OrderBuilder } from '@/components/OrderBuilder';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { faqs, steps } from '@/data/content';
import { products } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
const packaging = products.filter((p) => p.isPackaging);
const btn =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition';

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Store',
          name: siteConfig.name,
          legalName: siteConfig.legalName,
          description: siteConfig.description,
          url: siteConfig.url,
          telephone: `+${siteConfig.waNumber}`,
          image: new URL('/images/galeri/mangkok-daun.webp', siteConfig.url).href,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Pahlawan Timur',
            addressLocality: 'Kota Probolinggo',
            addressRegion: 'Jawa Timur',
            addressCountry: 'ID',
          },
          areaServed: 'ID',
          sameAs: [siteConfig.instagram, siteConfig.shopeeStoreUrl, siteConfig.tiktok],
        }}
      />

      {/* ---------- Hero ---------- */}
      <section id="beranda" className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-10 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:pt-14">
          <div>
            <p className="animate-in flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-gold uppercase">
              <span aria-hidden="true" className="h-px w-8 bg-gold" /> Souvenir Custom Probolinggo
            </p>
            <h1
              className="animate-in mt-5 font-serif text-5xl leading-[0.98] font-bold tracking-tight uppercase sm:text-6xl xl:text-7xl"
              style={{ '--delay': '120ms' } as React.CSSProperties}
            >
              Custom.
              <br />
              Berkesan.
              <br />
              <span className="text-accent">Penuh Makna.</span>
              <span className="sr-only"> Souvenir pernikahan dan hajatan Haraanja Project</span>
            </h1>
            <p
              className="animate-in mt-6 max-w-md text-lg leading-relaxed text-muted"
              style={{ '--delay': '240ms' } as React.CSSProperties}
            >
              Souvenir pernikahan, khitan, hajatan, hingga haji &amp; umroh, lengkap dengan box
              custom nama. Dikirim ke seluruh Indonesia.
            </p>
            <div
              className="animate-in mt-8 flex flex-wrap gap-3"
              style={{ '--delay': '360ms' } as React.CSSProperties}
            >
              <a
                href="#katalog"
                className={`${btn} bg-accent text-background hover:bg-accent-strong`}
              >
                Lihat Katalog <ChevronIcon className="size-4" />
              </a>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...ext}
                className={`${btn} border border-line bg-surface hover:border-accent hover:text-accent`}
              >
                <WhatsAppIcon className="size-5" /> Konsultasi
                <span className="sr-only"> (tab baru)</span>
              </a>
            </div>
            <a
              href={siteConfig.shopeeStoreUrl}
              {...ext}
              className="animate-in mt-8 inline-flex items-center gap-3 text-sm"
              style={{ '--delay': '480ms' } as React.CSSProperties}
            >
              <span className="grid size-11 place-items-center rounded-full bg-[#ee4d2d] text-white">
                <ShopIcon className="size-5" />
              </span>
              <span>
                <span className="block font-semibold">Toko Shopee Aktif</span>
                <span className="text-muted">Bisa pesan satuan atau grosir</span>
              </span>
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>

          <div
            className="animate-in relative"
            style={{ '--delay': '200ms' } as React.CSSProperties}
          >
            <div className="relative mr-0 aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2 sm:aspect-[5/5] lg:mr-10">
              <Image
                src="/images/galeri/mangkok-daun.webp"
                alt="Souvenir mangkok daun kaca dengan box custom bermotif floral"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <HeroSeasonCard />
            <ul className="absolute right-3 bottom-4 w-56 divide-y divide-line rounded-2xl border border-line bg-surface/95 p-3 text-sm shadow-lg backdrop-blur sm:right-0 sm:w-60">
              {[
                ['Bisa Custom Nama', 'Sablon nama & box custom'],
                ['Kirim Seluruh Indonesia', 'Packing aman, bisa bubblewrap'],
              ].map(([t, d]) => (
                <li key={t} className="flex items-center gap-3 py-2">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-gold">
                    <CheckIcon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="text-xs text-muted">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Kategori ---------- */}
      <nav aria-label="Kategori souvenir" className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6">
        <CategoryCards />
      </nav>

      <SeasonalShowcase />

      {/* ---------- Momen ---------- */}
      <section
        id="momen"
        aria-labelledby="judul-momen"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6"
      >
        <div className="flex items-end justify-between gap-4">
          <h2
            id="judul-momen"
            className="text-sm font-semibold tracking-[0.18em] uppercase sm:text-base"
          >
            Pilih Berdasarkan Momen
          </h2>
          <a
            href="#katalog"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-gold uppercase hover:text-accent"
          >
            Lihat Semua <ChevronIcon className="size-4" />
          </a>
        </div>
        <OccasionCards />
      </section>

      {/* ---------- Katalog ---------- */}
      <section
        id="katalog"
        aria-labelledby="judul-katalog"
        className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6"
      >
        <SectionHeading
          id="judul-katalog"
          eyebrow="Katalog"
          title="Souvenir Pilihan"
          description="Tumbler, gelas, mangkok, handuk, hingga termos. Klik produk untuk lihat detail dan varian."
        />
        <div className="mt-8">
          <Catalog />
        </div>
      </section>

      {/* ---------- Kemasan ---------- */}
      <section
        id="kemasan"
        aria-labelledby="judul-kemasan"
        className="scroll-mt-20 bg-surface-2 py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-kemasan"
            eyebrow="Kemasan"
            title="Box & Paper Bag Custom"
            description="Kemasan bisa dipadukan dengan souvenir dan dicetak nama atau motif sesuai tema. Pesanan di atas 600 pcs sudah mendapat custom box sesuai tema; di bawah itu memakai motif yang tersedia."
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {packaging.map((p) => (
              <li key={p.slug}>
                <ProductCard p={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Hasil custom ---------- */}
      <section
        id="hasil-custom"
        aria-labelledby="judul-hasil"
        className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6"
      >
        <SectionHeading
          id="judul-hasil"
          eyebrow="Hasil custom"
          title="Pesanan Nyata dari Pelanggan"
          description="Foto asli souvenir dan box custom yang sudah kami kerjakan untuk berbagai acara."
          align="center"
        />
        <Gallery />
        <p className="mt-8 text-center">
          <a
            href={siteConfig.instagram}
            {...ext}
            className="font-semibold text-accent underline underline-offset-4"
          >
            Lihat lebih banyak di Instagram @haraanjaproject_souvenir
            <span className="sr-only"> (tab baru)</span>
          </a>
        </p>
      </section>

      {/* ---------- Pesan ---------- */}
      <section id="pesan" aria-labelledby="judul-pesan" className="scroll-mt-20 bg-surface-2 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-pesan"
            eyebrow="Pesan souvenir"
            title="Susun Pesananmu"
            description="Isi rincian souvenir, kemasan, dan acara. Pesan WhatsApp akan tersusun otomatis, data tidak disimpan di website."
          />
          <div className="mt-10">
            <OrderBuilder />
          </div>
        </div>
      </section>

      {/* ---------- Cara pesan ---------- */}
      <section
        id="cara-pesan"
        aria-labelledby="judul-cara"
        className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6"
      >
        <SectionHeading id="judul-cara" eyebrow="Mudah & aman" title="Cara Pesan" align="center" />
        <ol data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="reveal rounded-2xl border border-line bg-surface p-5">
              <span className="grid size-10 place-items-center rounded-full bg-accent font-serif text-xl font-semibold text-background">
                {i + 1}
              </span>
              <h3 className="mt-3 font-serif text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" aria-labelledby="judul-faq" className="scroll-mt-20 bg-surface-2 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            id="judul-faq"
            eyebrow="Tanya jawab"
            title="Pertanyaan yang Sering Ditanyakan"
            align="center"
          />
          <div className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface">
            {faqs.map((f, i) => (
              <details key={f.q} className="group px-5" open={i === 0}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-2xl text-gold transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Kontak ---------- */}
      <section
        id="kontak"
        aria-labelledby="judul-kontak"
        className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6"
      >
        <div className="grid gap-8 rounded-3xl border border-gold/40 bg-surface p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="font-script text-3xl text-gold">Yuk ngobrol</p>
            <h2 id="judul-kontak" className="font-serif text-4xl font-semibold">
              Hubungi Kami
            </h2>
            <p className="mt-3 text-muted">
              Konsultasi souvenir gratis, Kak. Kami bantu pilihkan souvenir dan kemasan sesuai
              budget dan tema acara.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...ext}
                className={`${btn} bg-[#1f7a46] text-white hover:brightness-110`}
              >
                <WhatsAppIcon className="size-5" /> {siteConfig.waDisplay}
                <span className="sr-only"> (tab baru)</span>
              </a>
              <a
                href={siteConfig.shopeeStoreUrl}
                {...ext}
                className={`${btn} bg-[#ee4d2d] text-white hover:brightness-110`}
              >
                <ShopIcon className="size-5" /> Toko Shopee
                <span className="sr-only"> (tab baru)</span>
              </a>
            </div>
          </div>
          <dl className="grid gap-4 text-sm">
            <div>
              <dt className="font-semibold">Alamat</dt>
              <dd className="mt-1 text-muted">{siteConfig.address}</dd>
              <dd>
                <a
                  href={siteConfig.mapsUrl}
                  {...ext}
                  className="mt-1 inline-flex min-h-11 items-center font-semibold text-accent underline"
                >
                  Buka di Google Maps<span className="sr-only"> (tab baru)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Jam operasional</dt>
              {siteConfig.hours.map((h) => (
                <dd key={h.day} className="mt-1 text-muted">
                  {h.day}: {h.time}
                </dd>
              ))}
            </div>
            <div>
              <dt className="font-semibold">Media sosial</dt>
              <dd className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                {[
                  ['Instagram', siteConfig.instagram],
                  ['Threads', siteConfig.threads],
                  ['TikTok', siteConfig.tiktok],
                  ['Undangan @haraanjaproject_invitation', siteConfig.invitation],
                ].map(([l, h]) => (
                  <a
                    key={l}
                    href={h}
                    {...ext}
                    className="inline-flex min-h-11 items-center text-accent underline"
                  >
                    {l}
                    <span className="sr-only"> (tab baru)</span>
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
