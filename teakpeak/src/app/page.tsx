import Link from 'next/link';
import Image from 'next/image';
import { ArrowIcon, CheckIcon, PlusIcon } from '@/components/icons';
import { Marquee } from '@/components/Marquee';
import { QuoteCarousel } from '@/components/QuoteCarousel';
import { RoomSelector } from '@/components/RoomSelector';
import { OrderSteps } from '@/components/OrderSteps';
import { Placeholder } from '@/components/Placeholder';
import { ProjectStories } from '@/components/ProjectStories';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getCategories, getFeaturedProducts } from '@/data/products';
import { quotes } from '@/data/quotes';
import { getRooms } from '@/data/rooms';
import { siteConfig } from '@/lib/config';

const highlights = [
  'Kayu jati solid dan jati daur ulang pilihan',
  'Ukuran, warna, dan finishing bisa custom',
  'Melayani rumah, villa, kafe, hingga restoran',
];

const faqs = [
  {
    q: 'Apakah ukuran dan warna bisa custom?',
    a: 'Bisa. Hampir semua produk bisa disesuaikan ukuran, warna, kain, dan finishing-nya. Kirim kebutuhan atau foto referensi lewat WhatsApp.',
  },
  {
    q: 'Bisa buat furnitur dari foto Pinterest?',
    a: 'Bisa. Kami pernah membuat kursi makan custom dari gambar referensi Pinterest kiriman pelanggan.',
  },
  {
    q: 'Melayani pesanan untuk kafe dan restoran?',
    a: 'Ya. Kami mengerjakan kursi dan meja restoran custom dalam jumlah banyak, dirancang kuat untuk pemakaian padat.',
  },
  {
    q: 'Apakah bisa dikirim ke luar Jepara?',
    a: 'Bisa. Pesanan dikemas aman lalu dikirim dan dipasang di lokasi, contohnya ke Depok dan Bogor. Ongkos kirim dikonfirmasi saat pemesanan.',
  },
  {
    q: 'Bagaimana cara mengetahui harga?',
    a: 'Harga menyesuaikan ukuran, material, dan finishing. Tekan tombol WhatsApp di halaman produk untuk mendapatkan penawaran.',
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getCategories();
  const rooms = getRooms();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="theme-dark relative isolate -mt-16 flex min-h-[100svh] items-center overflow-hidden sm:-mt-20">
        {/* Gambar sebagai poster & cadangan; video di atasnya (disembunyikan bila reduced motion) */}
        <Image
          src="/scenes/living-void.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/40 to-page" />

        <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-20 text-center sm:px-6">
          <p
            className="animate-in text-xs font-semibold tracking-[0.35em] text-accent-strong uppercase"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            Timeless • Custom • Crafted in Jepara
          </p>
          <h1
            className="animate-in mx-auto mt-5 max-w-4xl font-serif text-4xl leading-[1.1] font-medium tracking-tight sm:text-6xl lg:text-7xl"
            style={{ '--delay': '250ms' } as React.CSSProperties}
          >
            Timeless Strength, Crafted in Jepara
          </h1>
          <p
            className="animate-in mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg"
            style={{ '--delay': '450ms' } as React.CSSProperties}
          >
            Furnitur kayu jati solid buatan pengrajin Jepara. Ukuran, warna, dan finishing bisa
            custom untuk rumah, villa, kafe, dan restoran.
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
              eyebrow="Teakpeak Furniture"
              title="Designed to Gather, Built to Last"
              description={`${siteConfig.name} membuat furnitur kayu solid dengan garis bersih dan proporsi yang tenang. Setiap karya diselesaikan dengan tangan agar hangat dipakai dan awet bertahun-tahun.`}
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
                src="/products/verla-arm-chair/01.webp"
                alt="Verla Arm Chair dengan rangka jati dan sandaran rotan"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="absolute inset-0 transition-transform duration-700 hover:scale-105 object-cover"
              />
            </div>
            <div className="reveal reveal-curtain relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/products/o-chair/01.webp"
                alt="O Chair dari kayu jati solid"
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
            src="/products/alder-lounge-chair/02.webp"
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
          src="/products/round-dining-table/02.webp"
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
          {['Solid Teak', 'Rattan', 'Upholstery', 'Reclaimed Teak', 'Custom Size'].map((t) => (
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
            title="Pilih Ruang, Temukan Karaktermu"
            description="Klik ruangan, lalu pilih furniturnya untuk melihat detail bahan dan ukuran."
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
            {featured.length === 0 &&
              [1, 2, 3].map((n) => (
                <li key={n} className="reveal reveal-zoom">
                  <Placeholder label="Produk" className="aspect-[4/5] rounded-2xl" />
                </li>
              ))}
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
            'Timeless Furniture',
            'Crafted in Jepara',
            'Custom Order',
            'Home • Villa • Restaurant',
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
              eyebrow="Custom project"
              title="Untuk Rumah, Villa & Restoran"
            />
            <p className="reveal leading-relaxed text-muted">
              Dari satu kursi hingga satu set restoran lengkap. Pesanan custom kami kirim dan pasang
              sampai ke lokasi, seperti proyek di Depok dan Bogor, Jawa Barat.
            </p>
          </div>
          <div className="reveal reveal-zoom theme-dark relative mt-12 aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[16/9]">
            <Image
              src="/scenes/restaurant-set.webp"
              alt="Set meja bundar dan kursi makan kayu solid custom untuk restoran"
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            {/* Hotspot dekoratif seperti katalog interior */}
            {[
              ['top-[30%] left-[20%]', 'Meja bundar'],
              ['top-[55%] left-[60%]', 'Kursi makan'],
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
                Konsultasikan furnitur custom untuk ruang Anda.
              </p>
              <WhatsAppButton
                message={`Halo ${siteConfig.name}, saya ingin konsultasi untuk proyek.`}
              >
                Konsultasi Proyek
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Our Project & Delivered (sorotan IG) ---------- */}
      <section aria-labelledby="judul-story" className="border-t border-line py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="judul-story"
              eyebrow="Our project • Production • Delivered"
              title="Dari Workshop sampai ke Rumah Anda"
              description="Dokumentasi asli dari workshop Jepara: proses produksi, hasil terpasang, sampai pengiriman ke pelanggan."
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
              src="/products/kyoto-bed/01.webp"
              alt="Kyoto Bed kayu solid dengan panel anyam"
              fill
              sizes="50vw"
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              {['Ruang Keluarga', 'Ruang Makan', 'Kamar Tidur', 'Kafe', 'Restoran', 'Villa'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-foreground/40 px-3 py-1 text-xs backdrop-blur"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA penutup ---------- */}
      <section aria-labelledby="judul-cta" className="relative isolate overflow-hidden py-28">
        <Image
          src="/scenes/terrace-set.webp"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-background/80" />
        <div className="reveal reveal-blur mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold tracking-[0.3em] text-accent uppercase">
            {siteConfig.tagline}
          </p>
          <h2 id="judul-cta" className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
            Siap Menghadirkan Furnitur Jati yang Timeless?
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
