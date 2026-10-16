import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { MessageBuilder } from '@/components/MessageBuilder';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { VideoGrid } from '@/components/VideoGrid';
import { CatalogDownload, ProcessSteps, ProductCard, SlotInfo } from '@/components/sections';
import { CtaBand, SectionHeading, TextLink, WhatsAppButton, container } from '@/components/ui';
import { products } from '@/data/products';
import { projects } from '@/data/projects';
import { advantages, site, stats } from '@/data/site';
import { videos } from '@/data/videos';
import { config } from '@/lib/config';
import { generalMessage, productMessage } from '@/lib/whatsapp';

// Foto unggulan dari brief klien (4 foto abaya tie-dye)
const photo = (id: string) => {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`Foto portofolio "${id}" tidak ditemukan`);
  return p;
};

// Poin detail koleksi yang terlihat jelas di foto
const lookbookPoints = [
  'Kerah V yang bersih dan simetris',
  'Lengan panjang dengan sambungan bahu rapi',
  'Jatuh kain lebar dan flowy',
  'Satu model, lima pilihan warna',
];

export default function HomePage() {
  const main = photo('abaya-mauve-manekin');
  const rack = photo('abaya-lima-warna-rak');
  const detail = photo('abaya-detail-kursi');
  const sofa = photo('abaya-plum-sofa');

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: config.siteName,
          description: site.description,
          url: config.siteUrl,
          image: new URL('/og.jpg', config.siteUrl).href,
          email: site.email,
          sameAs: [site.instagramUrl],
          // TODO: tambahkan "address" (PostalAddress) setelah alamat asli tersedia
        }}
      />

      {/* Hero: teks + kolase foto hasil produksi */}
      <section className="overflow-hidden">
        <div
          className={`${container} grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14`}
        >
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-plum uppercase">
              Spesialis abaya & khimar
            </p>
            <h1 className="font-serif text-4xl leading-[1.08] sm:text-6xl">{site.tagline}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Jasa CMT abaya dan khimar dari sampel sampai packing. Jahitan rapi, alur jelas, dan
              progres dikabarkan lewat WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton message={generalMessage} />
              <TextLink href="#koleksi">Lihat hasil jahitan</TextLink>
            </div>
            <div className="mt-8">
              <SlotInfo />
            </div>
          </div>

          <div className="grid h-[440px] grid-cols-[1.35fr_1fr] grid-rows-2 gap-3 sm:h-[560px] sm:gap-4">
            <figure className="relative row-span-2 overflow-hidden rounded-[1.75rem] bg-surface">
              <Image
                src={main.src}
                alt={main.alt}
                fill
                priority
                sizes="(min-width: 1024px) 330px, 55vw"
                className="object-cover object-top"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold">
                Hasil produksi Seams
              </figcaption>
            </figure>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-surface">
              <Image
                src={rack.thumb ?? rack.src}
                alt={rack.alt}
                fill
                sizes="(min-width: 1024px) 245px, 40vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-surface">
              <Image
                src={detail.thumb ?? detail.src}
                alt={detail.alt}
                fill
                sizes="(min-width: 1024px) 245px, 40vw"
                className="object-cover object-[50%_45%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook: koleksi abaya tie-dye */}
      <section
        id="koleksi"
        aria-labelledby="koleksi-judul"
        className="scroll-mt-16 bg-surface py-16 sm:py-24"
      >
        <div className={`${container} grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16`}>
          <div className="reveal relative aspect-square overflow-hidden rounded-[2rem]">
            <Image
              src={sofa.src}
              alt={sofa.alt}
              fill
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-cover"
            />
          </div>
          <div className="reveal">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-plum uppercase">
              Hasil jahitan kami
            </p>
            <h2 id="koleksi-judul" className="font-serif text-3xl leading-tight sm:text-5xl">
              Abaya tie-dye, dijahit sesuai sampel
            </h2>
            <p className="mt-5 text-muted">
              Salah satu produksi abaya untuk brand klien. Detail kecil seperti kerah, sambungan
              lengan, dan jatuh kain kami jaga supaya setiap pcs sama rapinya dengan sampel yang
              disetujui.
            </p>
            <ol className="mt-8 space-y-3">
              {lookbookPoints.map((point, i) => (
                <li key={point} className="flex items-baseline gap-4 border-b border-line pb-3">
                  <span className="font-serif text-xl text-plum">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton
                message={productMessage('abaya')}
                label="Produksi abaya seperti ini"
              />
              <TextLink href="/portofolio">Lihat portofolio</TextLink>
            </div>
          </div>
        </div>

        <div className={`${container} mt-14`}>
          <h3 className="mb-5 text-sm font-semibold tracking-[0.2em] text-muted uppercase">
            Klik untuk melihat lebih dekat
          </h3>
          <PortfolioGallery projects={projects} showFilter={false} />
        </div>
      </section>

      {/* Bukti pengalaman: angka + video produksi */}
      <section aria-labelledby="pengalaman" className="bg-plum py-16 text-background sm:py-24">
        <div className={container}>
          <div className="reveal mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-mauve uppercase">
              Di balik produksi
            </p>
            <h2 id="pengalaman" className="font-serif text-3xl leading-tight sm:text-5xl">
              Terbiasa menangani pesanan besar
            </h2>
            <p className="mt-4 text-background/80">
              Dari memotong kain berlapis-lapis sampai mengejar deadline ribuan pcs, inilah suasana
              workshop kami sehari-hari.
            </p>
          </div>

          <dl data-stagger className="mb-14 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="reveal flex flex-col-reverse border-t border-background/25 pt-4"
              >
                <dt className="mt-1 text-sm text-background/75">{s.label}</dt>
                <dd className="font-serif text-4xl sm:text-5xl">{s.value ?? '—'}</dd>
              </div>
            ))}
          </dl>

          <VideoGrid items={videos.slice(0, 4)} onDark />
          <div className="mt-10">
            <Link
              href="/portofolio#video"
              className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Lihat semua video produksi →
            </Link>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section aria-labelledby="keunggulan" className="py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            id="keunggulan"
            eyebrow="Kenapa Seams"
            title="Mitra produksi yang fokus pada busana muslimah"
          />
          <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a) => (
              <li key={a.title} className="reveal rounded-xl border border-line bg-background p-6">
                <h3 className="font-serif text-xl">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kategori produk */}
      <section aria-labelledby="kategori" className="bg-surface py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            id="kategori"
            eyebrow="Produk"
            title="Yang bisa kami jahitkan untuk brand Anda"
          />
          <div data-stagger className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {products.map((p) => (
              <div key={p.slug} className="reveal">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alur produksi */}
      <section aria-labelledby="alur" className="py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            id="alur"
            eyebrow="Alur produksi CMT"
            title="Dari konsultasi sampai barang dikirim"
          />
          <ProcessSteps />
        </div>
      </section>

      {/* Pembuat pesan WA + katalog */}
      <section aria-label="Minta penawaran" className="bg-surface py-16 sm:py-20">
        <div className={`${container} grid gap-6`}>
          <MessageBuilder />
          <CatalogDownload />
        </div>
      </section>

      <CtaBand message={generalMessage} />
    </>
  );
}
