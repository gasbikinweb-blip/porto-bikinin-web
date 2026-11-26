import Link from 'next/link';
import Image from 'next/image';
import { ArrowIcon, CheckIcon, PlusIcon } from '@/components/icons';
import { Marquee } from '@/components/Marquee';
import { QuoteCarousel } from '@/components/QuoteCarousel';
import { RoomSelector } from '@/components/RoomSelector';
import { OrderSteps } from '@/components/OrderSteps';
import { Placeholder } from '@/components/Placeholder';
import { ProjectStories } from '@/components/ProjectStories';
import { HeroRotator } from '@/components/HeroRotator';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getAllProducts, getCategories } from '@/data/products';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SurveyComposer } from '@/components/SurveyComposer';
import { quotes } from '@/data/quotes';
import { getRooms } from '@/data/rooms';
import { siteConfig } from '@/lib/config';

const highlights = [
  'Multiplek 18 mm dengan finishing HPL original TACO',
  'Desain, warna, dan ukuran bebas custom',
  'Survei & konsultasi gratis, ada desain 3D sebelum produksi',
];

const faqs = [
  {
    q: 'Apakah desain, warna, dan ukuran bisa custom?',
    a: 'Bisa. Semua furnitur dibuat sesuai ukuran ruang Anda. Warna dan motif HPL bebas pilih, dan Anda boleh kirim foto referensi lewat WhatsApp.',
  },
  {
    q: 'Apakah survei dan konsultasi berbayar?',
    a: 'Gratis. Tim kami datang mengukur lokasi dan memberi saran model yang cocok tanpa biaya.',
  },
  {
    q: 'Pakai bahan apa?',
    a: 'Standar kami multiplek 18 mm dengan finishing HPL original TACO: kuat, tahan lembap, dan mudah dibersihkan.',
  },
  {
    q: 'Melayani daerah mana saja?',
    a: 'Kami berbasis di Bandung dan melayani Bandung Raya. Untuk lokasi di luar itu, tanyakan dulu lewat WhatsApp.',
  },
  {
    q: 'Bagaimana cara mengetahui harga?',
    a: 'Harga dihitung per meter dan menyesuaikan model serta aksesori. Setelah survei, Anda mendapat penawaran lengkap sebelum produksi.',
  },
];

export default function HomePage() {
  const categories = getCategories();
  const rooms = getRooms();

  return (
    <>
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
              eyebrow="Nadira Furniture"
              title="Dibuat Pas, Dipasang Rapi"
              description={`${siteConfig.name} mengerjakan interior custom di Bandung sejak 2021: kitchen set, lemari, backdrop TV, meja rias, kamar set, sampai partisi. Semua dibuat sesuai ukuran dan dipasang langsung di rumah Anda.`}
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
              Jadwalkan survei gratis
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="reveal reveal-curtain relative mt-12 aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/projects/kitchen-set-minibar-kisi/01.webp"
                alt="Kitchen set dengan minibar kisi kayu dan lampu gantung"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="absolute inset-0 transition-transform duration-700 hover:scale-105 object-cover"
              />
            </div>
            <div className="reveal reveal-curtain relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/projects/lemari-putih-display-arch/01.webp"
                alt="Lemari putih dengan display lengkung berlampu"
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
            src="/projects/kitchen-set-putih-marmer/01.webp"
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
          src="/projects/kitchen-set-kayu-island/01.webp"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/85" />
        <h2 id="judul-kategori" className="sr-only">
          Kategori layanan
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
          {['HPL TACO', 'Multiplek 18 mm', 'Lampu LED', 'Desain 3D', 'Custom Size'].map((t) => (
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
            description="Klik ruangan, lalu pilih karyanya untuk melihat foto dan detail bahan."
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
            eyebrow="Portofolio"
            title="Karya Nadira Furniture"
            description="Hasil pengerjaan asli di rumah pelanggan. Klik karya untuk melihat foto lengkap, lalu tanya model serupa via WhatsApp."
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
            'Interior Custom',
            'Made in Bandung',
            'Survei Gratis',
            'Kitchen • Lemari • Backdrop TV',
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
              eyebrow="Video • Instagram"
              title="Lihat Hasilnya Lebih Dekat"
              description="Video asli hasil pemasangan di rumah pelanggan. Klik video untuk menonton layar penuh."
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
            <SectionHeading id="judul-faq" eyebrow="Pertanyaan umum" title="Seputar Layanan" />
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
              src="/projects/lemari-kaca-walk-in/02.webp"
              alt="Lemari kaca walk-in putih"
              fill
              sizes="50vw"
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              {[
                'Dapur',
                'Ruang Keluarga',
                'Kamar Tidur',
                'Kamar Anak',
                'Kolong Tangga',
                'Ruang Kerja',
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
            title="Siap Mewujudkan Interior Impian?"
            description="Semua pertanyaan dan pemesanan kami layani lewat WhatsApp. Survei dan konsultasi gratis untuk area Bandung Raya."
            align="center"
          />
          <div className="reveal mt-10 flex flex-wrap justify-center gap-3 text-sm">
            <WhatsAppButton>Chat {siteConfig.waDisplay}</WhatsAppButton>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-line px-6 py-3 transition-colors hover:border-accent"
            >
              Instagram {siteConfig.instagramHandle}
            </a>
          </div>
          <SurveyComposer />
        </div>
      </section>
    </>
  );
}
