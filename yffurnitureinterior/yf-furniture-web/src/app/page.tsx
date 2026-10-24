import Image from 'next/image';
import Link from 'next/link';
import { CategoryCards } from '@/components/CategoryCards';
import { CheckIcon } from '@/components/icons';
import { OrderSteps } from '@/components/OrderSteps';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppBuilder } from '@/components/WhatsAppBuilder';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WorkGrid } from '@/components/WorkGrid';
import { site } from '@/data/site';
import { featuredWorks, getWork, works } from '@/data/works';
import { JsonLd } from '@/components/JsonLd';
import { categoryNames } from '@/lib/catalog';
import { config } from '@/lib/config';

const hero = getWork('backdrop-tv-led-full-plafon');

// Structured data LocalBusiness (dirender tanpa dangerouslySetInnerHTML, lihat JsonLd.tsx)
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: site.name,
  description: site.description,
  url: config.siteUrl,
  image: new URL(hero.cover.src, config.siteUrl).href,
  telephone: `+${config.waNumber}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: `${site.address.district}, ${site.address.city}`,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'ID',
  },
  areaServed: site.serviceAreas.slice(0, -1),
  sameAs: [site.instagram, site.threads],
};

const advantages = [
  {
    title: 'Ukuran custom sesuai ruangan',
    text: 'Dibuat by order, pas dengan ukuran ruangan Anda.',
  },
  { title: 'Bebas pilih model & warna', text: 'Tersedia berbagai motif dan warna finishing.' },
  {
    title: 'Dikerjakan langsung oleh workshop',
    text: 'Diproduksi sendiri di workshop kami di Boyolali.',
  },
  {
    // Sumber: caption Instagram. TODO: konfirmasi pemilik sebelum rilis
    title: 'Bahan plywood & blockboard, finishing HPL',
    text: 'Bukan MDF atau particle board, sesuai keterangan workshop.',
  },
  {
    title: 'Free desain & cek lokasi',
    text: `Untuk area ${site.freeSurveyAreas}. Siap kirim ke luar kota.`, // TODO: konfirmasi
  },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusiness} />
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pt-8 pb-14 sm:px-6 md:grid-cols-2 md:gap-12 md:pt-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-wood-strong">
            <span className="size-1.5 rounded-full bg-brand-red" aria-hidden="true" />
            Workshop furnitur & interior · Boyolali
          </p>
          <h1 className="mt-4 text-4xl leading-[1.1] font-extrabold tracking-tight sm:text-5xl">
            Furnitur Custom Sesuai Ukuran dan Selera Anda
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted">
            Kitchen set, backdrop TV, lemari, meja belajar, hingga interior ruangan. Dibuat langsung
            oleh workshop kami di Boyolali dan siap kirim ke luar kota.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton />
            <Link
              href="/katalog"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 font-semibold hover:border-wood"
            >
              Lihat Katalog
            </Link>
          </div>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 text-sm">
            <div>
              <dt className="text-muted">Karya di katalog</dt>
              <dd className="text-2xl font-extrabold">{works.length}</dd>
            </div>
            <div>
              <dt className="text-muted">Postingan IG</dt>
              <dd className="text-2xl font-extrabold">{site.instagramPosts}</dd>
            </div>
            <div>
              <dt className="text-muted">Lokasi</dt>
              <dd className="text-base leading-tight font-bold">Ampel, Boyolali</dd>
            </div>
          </dl>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface md:order-last">
          <Image
            src={hero.cover.src}
            alt={hero.cover.alt}
            fill
            priority
            sizes="(min-width: 768px) 540px, 100vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold">
            {hero.title}
          </span>
        </div>
      </section>

      {/* Kategori */}
      <section aria-labelledby="kategori" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <SectionHeading
          id="kategori"
          eyebrow="Kategori"
          title="Mau dibuatkan apa?"
          description="Pilih kategori untuk melihat contoh hasil karya kami."
        />
        <div className="mt-8">
          <CategoryCards />
        </div>
      </section>

      {/* Karya terbaru */}
      <section aria-labelledby="karya" className="bg-surface/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="karya" eyebrow="Portofolio" title="Karya terbaru" />
            <Link href="/katalog" className="font-semibold text-wood underline underline-offset-4">
              Lihat semua karya
            </Link>
          </div>
          <div className="mt-8">
            <WorkGrid
              works={featuredWorks.slice(0, 6)}
              categoryNames={categoryNames}
              headingLevel="h3"
            />
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section aria-labelledby="keunggulan" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading id="keunggulan" eyebrow="Kenapa YF" title="Kenapa pesan di YF Furniture?" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <li key={a.title} className="flex gap-3 rounded-2xl border border-line bg-white p-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-wood/10 text-wood">
                <CheckIcon />
              </span>
              <div>
                <h3 className="font-bold">{a.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <OrderSteps />

      {/* Pembuat pesan WA */}
      <section aria-labelledby="buat-pesan" className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <SectionHeading
          id="buat-pesan"
          eyebrow="Pesan cepat"
          title="Susun pesan WhatsApp Anda"
          description="Pilih jenis furnitur dan isi perkiraan ukuran. Kami susun pesannya, Anda tinggal kirim."
          align="center"
        />
        <div className="mt-8">
          <WhatsAppBuilder />
        </div>
      </section>
    </>
  );
}
