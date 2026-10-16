import Image from 'next/image';
import { JsonLd } from '@/components/JsonLd';
import { MessageBuilder } from '@/components/MessageBuilder';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { VideoGrid } from '@/components/VideoGrid';
import {
  CatalogDownload,
  ProcessSteps,
  ProductCard,
  SlotInfo,
  StatsRow,
} from '@/components/sections';
import { CtaBand, SectionHeading, TextLink, WhatsAppButton, container } from '@/components/ui';
import { products } from '@/data/products';
import { projects } from '@/data/projects';
import { advantages, site } from '@/data/site';
import { videos } from '@/data/videos';
import { config } from '@/lib/config';
import { generalMessage } from '@/lib/whatsapp';

export default function HomePage() {
  // TODO: ganti hero dengan foto abaya/khimar terbaik hasil produksi Seams
  const hero = products[0]!.image;

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

      {/* Hero */}
      <section className="overflow-hidden">
        <div className={`${container} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2`}>
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-plum uppercase">
              Jasa konveksi busana muslimah
            </p>
            <h1 className="font-serif text-4xl leading-[1.1] sm:text-6xl">{site.tagline}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Jasa CMT abaya, khimar, dan gamis dari sampel sampai packing. Jahitan rapi, alur
              jelas, dan progres dikabarkan lewat WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton message={generalMessage} />
              <TextLink href="/portofolio">Lihat hasil jahitan</TextLink>
            </div>
            <div className="mt-8">
              <SlotInfo />
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-surface">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="(min-width: 1024px) 448px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section aria-labelledby="keunggulan" className="bg-surface py-16 sm:py-20">
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
          <div className="mt-10">
            <StatsRow />
          </div>
        </div>
      </section>

      {/* Kategori produk */}
      <section aria-labelledby="kategori" className="py-16 sm:py-20">
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

      {/* Cuplikan portofolio */}
      <section aria-labelledby="portofolio" className="bg-surface py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            id="portofolio"
            eyebrow="Portofolio"
            title="Lihat hasil jahitan kami lebih dulu"
            intro="Cuplikan hasil produksi. Klik foto untuk melihat lebih besar."
          />
          <PortfolioGallery projects={projects.slice(0, 6)} showFilter={false} />
          <div className="mt-8">
            <TextLink href="/portofolio">Lihat semua portofolio</TextLink>
          </div>
        </div>
      </section>

      {/* Video di balik produksi */}
      <section aria-labelledby="produksi" className="py-16 sm:py-20">
        <div className={container}>
          <SectionHeading
            id="produksi"
            eyebrow="Di balik produksi"
            title="Workshop kami sedang bekerja"
            intro="Potongan video dari Instagram @seams.konveksi: proses potong, jahit, pasang kancing, sampai pesanan ribuan pcs siap dikirim."
          />
          <VideoGrid items={videos.slice(0, 4)} />
          <div className="mt-8">
            <TextLink href="/portofolio#video">Lihat semua video produksi</TextLink>
          </div>
        </div>
      </section>

      {/* Alur produksi */}
      <section aria-labelledby="alur" className="bg-surface py-16 sm:py-20">
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
      <section aria-label="Minta penawaran" className="py-16 sm:py-20">
        <div className={`${container} grid gap-6`}>
          <MessageBuilder />
          <CatalogDownload />
        </div>
      </section>

      <CtaBand message={generalMessage} />
    </>
  );
}
