import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { MessageBuilder } from '@/components/MessageBuilder';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { VideoGrid } from '@/components/VideoGrid';
import { ContactDetails } from '@/components/ContactDetails';
import { MapEmbed } from '@/components/MapEmbed';
import { CatalogDownload, FaqList, ProcessSteps, SlotInfo } from '@/components/sections';
import { CircleBadge } from '@/components/CircleBadge';
import { ChevronIcon } from '@/components/icons';
import { SectionHeading, WhatsAppButton, container } from '@/components/ui';
import { faqs } from '@/data/faq';
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
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Lapangan Merah 1 No. 30, Srengseng Sawah',
            addressLocality: 'Jagakarsa, Jakarta Selatan',
            addressRegion: 'DKI Jakarta',
            postalCode: '12640',
            addressCountry: 'ID',
          },
        }}
      />

      {/* Hero: judul di tengah + deretan foto dengan tepi atas & bawah melengkung */}
      <section data-nav="" className="overflow-hidden pt-10 pb-12 sm:pt-16">
        <div className={`${container} relative z-10 text-center`}>
          <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-[1.1] sm:text-6xl">
            {site.tagline}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted sm:text-lg">
            Jasa CMT abaya dan khimar untuk brand fashion muslim, butik, dan reseller. Dari sampel
            sampai packing, dengan jahitan rapi dan alur yang jelas.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppButton message={generalMessage} />
          </div>
        </div>

        <div className="relative mt-10 sm:mt-14">
          <div className="grid h-[300px] grid-cols-3 gap-2 sm:h-[460px] sm:gap-3 lg:grid-cols-4">
            {[detail, main, rack, sofa].map((p, i) => (
              <div
                key={p.id}
                className={`relative overflow-hidden bg-surface ${i === 3 ? 'hidden lg:block' : ''}`}
              >
                <Image
                  src={i === 1 ? p.src : (p.thumb ?? p.src)}
                  alt={p.alt}
                  fill
                  priority={i < 3}
                  sizes="(min-width: 1024px) 25vw, 34vw"
                  className={`object-cover ${i === 3 ? 'object-center' : 'object-[50%_30%]'}`}
                />
              </div>
            ))}
          </div>
          {/* Lengkungan: elips warna latar yang "menggigit" tepi atas & bawah foto */}
          <div
            aria-hidden="true"
            className="absolute -top-[60px] left-[-15%] h-[120px] w-[130%] rounded-[50%] bg-background sm:-top-[110px] sm:h-[220px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-[60px] left-[-15%] h-[120px] w-[130%] rounded-[50%] bg-background sm:-bottom-[110px] sm:h-[220px]"
          />
        </div>

        <div
          className={`${container} relative z-10 mt-2 grid items-center gap-6 sm:-mt-6 sm:grid-cols-3`}
        >
          <div className="order-2 flex justify-center sm:order-1 sm:justify-start">
            <SlotInfo />
          </div>
          <Link
            href="/#koleksi"
            className="group order-1 flex flex-col items-center gap-2 text-sm font-medium sm:order-2"
          >
            Lihat hasil jahitan
            <span className="grid size-10 place-items-center rounded-full border border-foreground transition-colors group-hover:border-plum group-hover:bg-plum group-hover:text-background">
              <ChevronIcon className="size-4 rotate-90" />
            </span>
          </Link>
          <div className="order-3 hidden justify-end sm:flex">
            <CircleBadge />
          </div>
        </div>
      </section>

      {/* Lookbook: koleksi abaya tie-dye */}
      <section
        id="koleksi"
        data-nav="#koleksi"
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

      {/* Bukti pengalaman: angka + semua video produksi */}
      <section
        id="pengalaman"
        data-nav="#pengalaman"
        aria-labelledby="pengalaman-judul"
        className="scroll-mt-16 bg-plum py-16 text-background sm:py-24"
      >
        <div className={container}>
          <div className="reveal mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-mauve uppercase">
              Di balik produksi
            </p>
            <h2 id="pengalaman-judul" className="font-serif text-3xl leading-tight sm:text-5xl">
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
        </div>
        <VideoGrid items={videos} onDark />
      </section>

      {/* Layanan: abaya & khimar + keunggulan */}
      <section
        id="layanan"
        data-nav="#layanan"
        aria-labelledby="layanan-judul"
        className="scroll-mt-16 py-16 sm:py-24"
      >
        <div className={container}>
          <SectionHeading
            id="layanan-judul"
            eyebrow="Layanan"
            title="Fokus kami: abaya dan khimar"
            intro="Kami memilih fokus pada dua produk ini supaya detail potongan, jahitan, dan finishing-nya benar-benar terjaga."
          />
          <div className="grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2">
            {products.map((p) => (
              <article key={p.slug} className="reveal flex flex-col bg-background p-6 sm:p-10">
                <h3 className="font-serif text-4xl text-plum">{p.name}</h3>
                <p className="mt-4 text-muted">{p.description}</p>
                <p className="mt-6 text-sm font-semibold">Cocok untuk</p>
                <p className="mt-1 text-sm text-muted">{p.suitableFor.join(' · ')}</p>
                <WhatsAppButton
                  message={productMessage(p.name.toLowerCase())}
                  label={`Tanya produksi ${p.name.toLowerCase()}`}
                  variant="outline"
                  className="mt-8 self-start"
                />
              </article>
            ))}
          </div>

          <ul data-stagger className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {advantages.map((a, i) => (
              <li key={a.title} className="reveal border-t border-line pt-5">
                <span className="font-serif text-lg text-plum">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 font-serif text-2xl">{a.title}</h3>
                <p className="mt-2 text-sm text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Alur produksi */}
      <section
        id="alur"
        data-nav="#alur"
        aria-labelledby="alur-judul"
        className="scroll-mt-16 bg-surface py-16 sm:py-24"
      >
        <div className={container}>
          <SectionHeading
            id="alur-judul"
            eyebrow="Alur produksi CMT"
            title="Dari konsultasi sampai barang dikirim"
          />
          <ProcessSteps />
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        data-nav="#faq"
        aria-labelledby="faq-judul"
        className="scroll-mt-16 py-16 sm:py-24"
      >
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.6fr]`}>
          <SectionHeading
            id="faq-judul"
            eyebrow="FAQ"
            title="Pertanyaan yang sering diajukan"
            intro="Belum menemukan jawabannya? Tanyakan langsung lewat WhatsApp."
          />
          <FaqList items={faqs} />
        </div>
      </section>

      {/* Kontak + pembuat pesan WA */}
      <section
        id="kontak"
        data-nav="#kontak"
        aria-labelledby="kontak-judul"
        className="scroll-mt-16 bg-surface py-16 sm:py-24"
      >
        <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.3fr]`}>
          <div>
            <SectionHeading
              id="kontak-judul"
              eyebrow="Kontak"
              title="Konsultasi & minta penawaran"
              intro="Cara tercepat menghubungi kami adalah lewat WhatsApp. Ceritakan desain, jumlah, dan target waktu Anda."
            />
            <ContactDetails />
          </div>
          <div className="grid gap-6">
            <MessageBuilder />
            <CatalogDownload />
          </div>
        </div>
        <div className={`${container} mt-10`}>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
