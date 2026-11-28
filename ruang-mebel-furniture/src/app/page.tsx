import Link from 'next/link';
import Image from 'next/image';
import { ArrowIcon, CheckIcon, InstagramIcon, PlusIcon } from '@/components/icons';
import { Marquee } from '@/components/Marquee';
import { QuoteCarousel } from '@/components/QuoteCarousel';
import { RoomSelector } from '@/components/RoomSelector';
import { OrderSteps } from '@/components/OrderSteps';
import { Placeholder } from '@/components/Placeholder';
import { ProjectStories } from '@/components/ProjectStories';
import { HeroRotator } from '@/components/HeroRotator';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getAllProducts, getCategories } from '@/data/products';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SurveyComposer } from '@/components/SurveyComposer';
import { quotes } from '@/data/quotes';
import { getRooms } from '@/data/rooms';
import { siteConfig } from '@/lib/config';

const highlights = [
  '100% kayu jati solid, dikerjakan tangan pengrajin Jepara',
  'Ukuran, model, dan warna finishing bisa custom',
  'Dikemas aman dan dikirim ke seluruh Indonesia',
];

const faqs = [
  {
    q: 'Apakah ukuran, model, dan warna bisa custom?',
    a: 'Bisa. Semua produk dibuat per pesanan, jadi ukuran, model, dan warna finishing bisa disesuaikan. Anda juga boleh kirim foto referensi lewat WhatsApp.',
  },
  {
    q: 'Apakah bisa kirim ke luar Jawa?',
    a: 'Bisa. Kami mengirim ke seluruh Indonesia. Furnitur dikemas aman, dan ongkos kirim dihitung sesuai kota tujuan.',
  },
  {
    q: 'Pakai bahan apa?',
    a: 'Mayoritas produk memakai kayu jati solid, sebagian dikombinasi anyaman rotan, besi, atau stainless. Rincian bahan ada di detail tiap produk.',
  },
  {
    q: 'Berapa lama pengerjaannya?',
    a: 'Bergantung model dan jumlah pesanan. Estimasi waktu produksi kami sampaikan saat konfirmasi lewat WhatsApp.',
  },
  {
    q: 'Bagaimana cara mengetahui harga?',
    a: 'Sebagian produk sudah mencantumkan harga. Untuk ukuran custom atau produk tanpa harga, tekan tombol WhatsApp di detail produk untuk penawaran.',
  },
];

export default function HomePage() {
  const categories = getCategories();
  const rooms = getRooms();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FurnitureStore',
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          telephone: `+${siteConfig.waNumber}`,
          email: siteConfig.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Bulak Baru RT 01/RW 01, Bulakbaru',
            addressLocality: 'Jepara',
            addressRegion: 'Jawa Tengah',
            postalCode: '59463',
            addressCountry: 'ID',
          },
          sameAs: [siteConfig.instagram, siteConfig.tiktok, siteConfig.threads, siteConfig.facebook],
        }}
      />
      {/* ---------- Hero ---------- */}
      <section className="theme-dark relative isolate -mt-16 overflow-hidden sm:-mt-20">
        <HeroRotator />
      </section>

      {/* ---------- Intro ---------- */}
      <section id="tentang" aria-labelledby="judul-intro" className="scroll-mt-20 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="judul-intro"
              eyebrow="Ruang Mebel"
              title="Jati Solid, Dibuat dengan Tangan"
              description={`${siteConfig.name} membuat furnitur kayu jati di workshop Jepara: nakas, bufet & credenza, meja TV, meja tamu, sampai meja makan. Gaya minimalis, retro, dan Scandinavian yang awet dipakai bertahun-tahun.`}
            />
            <ul data-stagger className="mt-8 space-y-4">
              {highlights.map((h) => (
                <li key={h} className="reveal reveal-left flex gap-3 text-foreground/90">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                  {h}
                </li>
              ))}
            </ul>
            <Link
              href="/#kontak"
              className="reveal group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent-strong"
            >
              Pesan via WhatsApp
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="reveal reveal-curtain relative mt-12 aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/projects/bufet-kinzy/02.webp"
                alt="Bufet jati 3 laci dengan anyaman rotan"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="absolute inset-0 transition-transform duration-700 hover:scale-105 object-cover"
              />
            </div>
            <div className="reveal reveal-curtain relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/projects/nakas-jati-mid-century/03.webp"
                alt="Nakas jati mid-century dengan laci terbuka"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="absolute inset-0 transition-transform duration-700 hover:scale-105 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Kutipan inspiratif (tampil bila data diisi) ---------- */}
      {quotes.length > 0 && (
        <section aria-label="Kutipan inspiratif" className="relative isolate overflow-hidden py-28">
          <Image
            src="/projects/sideboard-rotterdam/02.webp"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 -z-10 opacity-30 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-page via-page/80 to-page" />
          <div className="reveal reveal-blur px-4 pt-10 sm:px-6">
            <QuoteCarousel quotes={quotes} />
          </div>
        </section>
      )}

      {/* ---------- Kategori (marquee besar) ---------- */}
      <section aria-labelledby="judul-kategori" className="relative isolate overflow-hidden py-20">
        <Image
          src="/projects/bufet-tv-anyaman-rotan/02.webp"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/85" />
        <h2 id="judul-kategori" className="sr-only">
          Kategori produk
        </h2>
        <Marquee duration="35s">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/?kategori=${c.slug}#portofolio`}
              className="group flex items-center gap-8 px-8 font-serif text-5xl whitespace-nowrap text-foreground/90 transition-colors hover:text-accent-strong sm:text-7xl"
            >
              {c.name}
              <span aria-hidden="true" className="text-3xl text-accent">
                ✦
              </span>
            </Link>
          ))}
        </Marquee>
        <Marquee duration="45s" className="mt-6 [&_.marquee-track]:[animation-direction:reverse]">
          {['Kayu Jati Solid', 'Anyaman Rotan', 'Handmade Jepara', 'Custom Size', 'Kirim Se-Indonesia'].map((t) => (
            <span
              key={t}
              className="flex items-center gap-8 px-8 font-serif text-3xl whitespace-nowrap text-foreground/40 italic sm:text-5xl"
            >
              {t}
              <span aria-hidden="true" className="text-xl text-sage">
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------- Room select ("pilih karakter") ---------- */}
      <section
        id="layanan"
        aria-labelledby="judul-ruang"
        className="relative scroll-mt-20 overflow-hidden bg-surface py-24"
      >
        {/* Cahaya latar dekoratif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-ruang"
            eyebrow="Room select"
            title="Pilih Ruang, Temukan Karaktermu"
            description="Klik ruangan, lalu pilih furniturnya untuk melihat foto dan detail bahan."
            align="center"
          />
          <div className="reveal reveal-blur mt-12">
            {rooms.length > 0 ? (
              <RoomSelector rooms={rooms} />
            ) : (
              <Placeholder
                label="Pilih ruang (isi src/data/rooms.ts)"
                className="aspect-[16/7] rounded-3xl"
              />
            )}
          </div>
        </div>
      </section>

      {/* ---------- Portofolio (semua karya) ---------- */}
      <section id="portofolio" aria-labelledby="judul-portofolio" className="scroll-mt-20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-portofolio"
            eyebrow="Katalog"
            title="Semua Koleksi Ruang Mebel"
            description="71 model furnitur kayu jati. Pilih kategori atau cari nama produk, klik untuk melihat semua foto, lalu pesan via WhatsApp."
            align="center"
          />
          <div className="mt-12">
            <ProductCatalog products={getAllProducts()} categories={getCategories()} />
          </div>
        </div>
      </section>

      {/* ---------- Pita tagline ---------- */}
      <div className="bg-accent py-5 text-background">
        <Marquee duration="30s">
          {[
            'Furnitur Jati Solid',
            'Handmade in Jepara',
            'Bisa Custom Ukuran',
            'Nakas • Bufet • Meja TV • Meja Tamu',
          ].map((t) => (
            <span
              key={t}
              className="flex items-center gap-8 px-8 font-serif text-2xl whitespace-nowrap sm:text-3xl"
            >
              {t}
              <span aria-hidden="true">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ---------- Our Project & Delivered (sorotan IG) ---------- */}
      <section aria-labelledby="judul-story" className="border-t border-line py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="judul-story"
              eyebrow="Video produk"
              title="Lihat Detailnya Lebih Dekat"
              description="Semua video produk dari Instagram kami. Geser untuk melihat lainnya, klik video untuk menonton layar penuh."
            />
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent"
            >
              Lihat lainnya di Instagram
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <div className="mt-10">
            <ProjectStories />
          </div>
        </div>
      </section>

      <OrderSteps />

      {/* ---------- FAQ ---------- */}
      <section aria-labelledby="judul-faq" className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="judul-faq" eyebrow="Pertanyaan umum" title="Seputar Pemesanan" />
            <div data-stagger className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map((f, i) => (
                <details key={f.q} className="reveal reveal-left group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg transition-colors group-open:text-accent-strong [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="reveal reveal-right theme-dark relative hidden aspect-[4/5] overflow-hidden rounded-3xl lg:block">
            <Image
              src="/projects/credenza-merry/01.webp"
              alt="Credenza laci kayu jati warna gelap di ruang tamu"
              fill
              sizes="50vw"
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              {[
                'Kamar Tidur',
                'Ruang Keluarga',
                'Ruang Tamu',
                'Ruang Makan',
                'Kafe',
                'Kantor',
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-foreground/40 px-3 py-1 text-xs backdrop-blur"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Kontak ---------- */}
      <section id="kontak" aria-labelledby="judul-kontak" className="scroll-mt-20 border-t border-line bg-surface/40 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            id="judul-kontak"
            eyebrow="Kontak"
            title="Siap Pesan Furnitur Impian?"
            description="Semua pertanyaan dan pemesanan kami layani lewat WhatsApp. Kirim ke seluruh Indonesia dari workshop kami di Jepara."
            align="center"
          />
          <div className="reveal mt-10 flex flex-wrap justify-center gap-3 text-sm">
            <WhatsAppButton>Chat {siteConfig.waDisplay}</WhatsAppButton>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 whitespace-nowrap transition-colors hover:border-accent"
            >
              <InstagramIcon className="size-4" />
              <span className="hidden min-[400px]:inline">{siteConfig.instagramHandle}</span>
              <span className="min-[400px]:hidden">Instagram</span>
            </a>
          </div>
          <SurveyComposer />
        </div>
      </section>
    </>
  );
}
