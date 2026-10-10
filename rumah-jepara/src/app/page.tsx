import Image from 'next/image';
import Link from 'next/link';
import { ArrowIcon, CheckIcon, PlusIcon } from '@/components/icons';
import { Marquee } from '@/components/Marquee';
import { QuoteCarousel } from '@/components/QuoteCarousel';
import { RoomSelector } from '@/components/RoomSelector';
import { OrderSteps } from '@/components/OrderSteps';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getCategories, getFeaturedProducts } from '@/data/products';
import { quotes } from '@/data/quotes';
import { getRooms } from '@/data/rooms';
import { siteConfig } from '@/lib/config';

const highlights = [
  'Kayu jati grade A pilihan, kering oven dan tahan lama',
  'Dikerjakan tangan oleh pengrajin berpengalaman di Jepara',
  'Bisa custom ukuran, desain, dan finishing (walnut impra, natural, marmer)',
];

const faqs = [
  {
    q: 'Apakah bisa memesan desain custom?',
    a: 'Bisa. Kirimkan foto referensi atau ukuran ruangan lewat WhatsApp, tim kami akan membantu menyesuaikan desain, ukuran, dan finishing.',
  },
  {
    q: 'Apakah melayani pengadaan untuk cafe, resto, atau villa?',
    a: 'Ya, kami siap mengerjakan proyek dalam jumlah besar. Hubungi kami untuk konsultasi kebutuhan dan jadwal produksi.',
  },
  {
    q: 'Berapa lama waktu pengerjaan?',
    // TODO: sesuaikan dengan estimasi asli
    a: 'Tergantung model dan jumlah pesanan. Estimasi waktu produksi akan kami informasikan saat konsultasi.',
  },
  {
    q: 'Apakah bisa kirim ke luar kota?',
    a: 'Bisa. Kami melayani pengiriman ke seluruh Indonesia dengan pengemasan yang aman. Ongkos kirim dihitung sesuai tujuan.',
  },
  {
    q: 'Bagaimana cara mengetahui harga?',
    a: 'Harga menyesuaikan ukuran, bahan, dan finishing. Tekan tombol WhatsApp di halaman produk untuk mendapatkan penawaran.',
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getCategories();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="theme-dark relative isolate -mt-16 flex min-h-[100svh] items-center overflow-hidden sm:-mt-20">
        {/* Gambar sebagai poster & cadangan; video di atasnya (disembunyikan bila reduced motion) */}
        <Image
          src="/products/rattan-buffet-cabinet/01.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns -z-20 object-cover"
        />
        <video
          className="absolute inset-0 -z-20 size-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/40 to-page" />

        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 text-center sm:px-6">
          <p
            className="animate-in text-xs font-semibold tracking-[0.35em] text-accent-strong uppercase"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            Luxury • Custom • Classic & Modern
          </p>
          <h1
            className="animate-in mx-auto mt-5 max-w-4xl font-serif text-5xl leading-[1.05] font-medium sm:text-7xl lg:text-8xl"
            style={{ '--delay': '250ms' } as React.CSSProperties}
          >
            Wujudkan Rumah Impian, Satu Karya Jati Sekaligus
          </h1>
          <p
            className="animate-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg"
            style={{ '--delay': '450ms' } as React.CSSProperties}
          >
            Mebel kayu jati grade A buatan tangan pengrajin Jepara. Klasik, modern, hingga custom,
            siap untuk rumah, cafe, resto, dan villa.
          </p>
          <div
            className="animate-in mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ '--delay': '650ms' } as React.CSSProperties}
          >
            <Link
              href="/produk"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-semibold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              Lihat Katalog
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <WhatsAppButton variant="outline" />
          </div>
        </div>

        <a
          href="#intro"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
          aria-label="Gulir ke bawah"
        >
          <span className="flex h-10 w-6 justify-center rounded-full border border-foreground/40 pt-2">
            <span className="animate-scroll-dot block size-1.5 rounded-full bg-foreground" />
          </span>
        </a>
      </section>

      {/* ---------- Intro ---------- */}
      <section id="intro" aria-labelledby="judul-intro" className="py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              id="judul-intro"
              eyebrow="Furnishing your dreams"
              title="Kayu Jati Pilihan, Dikerjakan dengan Hati"
              description={`${siteConfig.name} menghadirkan mebel jati berkualitas dari Jepara, kota ukir yang terkenal dengan keahlian kayunya. Setiap produk dibuat satu per satu agar tahan dipakai bertahun-tahun.`}
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
              href="/tentang"
              className="reveal group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-accent-strong"
            >
              Kenali kami lebih dekat
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="reveal reveal-curtain relative mt-12 aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/products/rope-lounge-chair/02.webp"
                alt="Rope Lounge Chair dengan rangka jati dan anyaman tali"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="reveal reveal-curtain relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/products/kursi-rotan-lengkung/01.webp"
                alt="Dua kursi rotan lengkung berangka jati di taman"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Kutipan inspiratif ---------- */}
      <section aria-label="Kutipan inspiratif" className="relative isolate overflow-hidden py-28">
        <Image
          src="/products/rope-lounge-chair/06.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-page via-page/80 to-page" />
        <div className="reveal reveal-blur px-4 pt-10 sm:px-6">
          <QuoteCarousel quotes={quotes} />
        </div>
      </section>

      {/* ---------- Kategori (marquee besar) ---------- */}
      <section aria-labelledby="judul-kategori" className="relative isolate overflow-hidden py-20">
        <Image
          src="/products/hygge-teak-bed/01.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/85" />
        <h2 id="judul-kategori" className="sr-only">
          Kategori produk
        </h2>
        <Marquee duration="35s">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/produk?kategori=${c.slug}`}
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
          {['Kayu Jati Grade A', 'Walnut Impra', 'Kombinasi Marmer', 'Anyaman Rotan', 'Custom'].map(
            (t) => (
              <span
                key={t}
                className="flex items-center gap-8 px-8 font-serif text-3xl whitespace-nowrap text-foreground/40 italic sm:text-5xl"
              >
                {t}
                <span aria-hidden="true" className="text-xl text-sage">
                  ✦
                </span>
              </span>
            ),
          )}
        </Marquee>
      </section>

      {/* ---------- Room select ("pilih karakter") ---------- */}
      <section aria-labelledby="judul-ruang" className="relative overflow-hidden bg-surface py-24">
        {/* Cahaya latar dekoratif */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-ruang"
            eyebrow="Room select"
            title="Pilih Ruang, Pilih Karaktermu"
            description="Klik ruangan, lalu pilih furnitur favoritmu. Lihat bagaimana setiap karya jati menghidupkan ruangan."
            align="center"
          />
          <div className="reveal reveal-blur mt-12">
            <RoomSelector rooms={getRooms()} />
          </div>
        </div>
      </section>

      {/* ---------- Produk unggulan ---------- */}
      <section aria-labelledby="judul-unggulan" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading id="judul-unggulan" eyebrow="Koleksi pilihan" title="Produk Unggulan" />
            <Link
              href="/produk"
              className="reveal group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent"
            >
              Lihat semua produk
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ul data-stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug} className="reveal reveal-zoom">
                <ProductCard
                  product={p}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Pita tagline ---------- */}
      <div className="bg-accent py-5 text-background">
        <Marquee duration="30s">
          {[
            'Luxury',
            'Custom',
            'Classic & Modern',
            'Siap Proyek Cafe • Resto • Villa',
            'Kayu Jati Grade A',
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

      {/* ---------- Proyek ---------- */}
      <section aria-labelledby="judul-proyek" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <SectionHeading
              id="judul-proyek"
              eyebrow="Ready for project"
              title="Untuk Cafe, Resto & Villa"
            />
            <p className="reveal leading-relaxed text-muted">
              Dari satu set kursi hingga ratusan unit, kami mengerjakan pengadaan furnitur proyek
              dengan kualitas yang konsisten, desain yang bisa disesuaikan dengan konsep ruang, dan
              jadwal yang jelas.
            </p>
          </div>
          <div className="reveal reveal-zoom theme-dark relative mt-12 aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/9]">
            <Image
              src="/products/woven-armchair/01.webp"
              alt="Woven Armchair jati di meja makan restoran"
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="object-cover"
            />
            <video
              className="absolute inset-0 size-full object-cover motion-reduce:hidden"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            >
              <source src="/video/showcase.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            {/* Hotspot dekoratif seperti katalog interior */}
            {[
              ['top-[30%] left-[20%]', 'Kursi'],
              ['top-[55%] left-[60%]', 'Meja'],
              ['top-[40%] right-[15%]', 'Custom'],
            ].map(([pos, label]) => (
              <span
                key={label}
                className={`group absolute hidden sm:flex ${pos} items-center gap-2`}
              >
                <span className="grid size-9 place-items-center rounded-full bg-accent text-background shadow-lg ring-4 ring-accent/30 transition-transform duration-300 group-hover:rotate-90">
                  <PlusIcon className="size-4" />
                </span>
                <span className="rounded-full bg-background/80 px-3 py-1 text-xs opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  {label}
                </span>
              </span>
            ))}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <p className="max-w-md font-serif text-2xl sm:text-3xl">
                Konsultasikan kebutuhan proyek Anda, gratis.
              </p>
              <WhatsAppButton
                message={`Halo ${siteConfig.name}, saya ingin konsultasi pengadaan furnitur untuk proyek (cafe/resto/villa).`}
              >
                Konsultasi Proyek
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <OrderSteps />

      {/* ---------- FAQ ---------- */}
      <section aria-labelledby="judul-faq" className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="judul-faq" eyebrow="Pertanyaan umum" title="Produk & Layanan" />
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
              src="/products/hygge-teak-bed/03.webp"
              alt="Sandaran kepala Hygge Teak Bed dari kayu jati"
              fill
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              {['Ruang Tamu', 'Kamar Tidur', 'Ruang Makan', 'Cafe', 'Resto', 'Villa'].map((t) => (
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

      {/* ---------- CTA penutup ---------- */}
      <section aria-labelledby="judul-cta" className="relative isolate overflow-hidden py-28">
        <Image
          src="/products/rattan-buffet-cabinet/02.webp"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/80" />
        <div className="reveal reveal-blur mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            {siteConfig.tagline}
          </p>
          <h2 id="judul-cta" className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
            Siap Menghadirkan Kehangatan Jati di Rumah Anda?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Ceritakan kebutuhan Anda. Kami bantu pilihkan model, ukuran, dan finishing yang paling
            pas.
          </p>
          <WhatsAppButton className="mt-10">Chat via WhatsApp</WhatsAppButton>
        </div>
      </section>
    </>
  );
}
