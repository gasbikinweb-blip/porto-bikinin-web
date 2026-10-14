import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowIcon,
  BoxIcon,
  HomeIcon,
  PinIcon,
  PlusIcon,
  RulerIcon,
  SwatchIcon,
  ToolIcon,
} from '@/components/icons';
import { HeroSlider, type HeroSlide } from '@/components/HeroSlider';
import { OrderSteps } from '@/components/OrderSteps';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getCategories, getFeaturedProducts } from '@/data/products';
import { projectPhotos } from '@/data/projects';
import { fullAddress, siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { consultMessage } from '@/lib/whatsapp';

// Keunggulan: hanya klaim umum yang terlihat dari konten Instagram.
// TODO: verifikasi dengan data asli (terutama "tim sendiri" dan cakupan "gratis ukur")
const benefits = [
  {
    icon: RulerIcon,
    title: 'Gratis ukur & konsultasi',
    text: 'Tim kami datang ke lokasi untuk mengukur dan membantu memilih bahan yang tepat.',
  },
  {
    icon: BoxIcon,
    title: 'Banyak yang ready stock',
    text: 'Wallpaper vinyl dan berbagai pilihan lainnya tersedia langsung di toko.',
  },
  {
    icon: SwatchIcon,
    title: 'Pilihan motif beragam',
    text: 'Dari warna polos, tekstur linen, motif Korea, hingga mural custom sesuai dinding.',
  },
  {
    icon: ToolIcon,
    title: 'Dipasang rapi',
    text: 'Pemasangan dikerjakan tim SA Living, dari wallpaper hingga lantai SPC.',
  },
  {
    icon: HomeIcon,
    title: 'Satu tempat, satu tim',
    text: 'Wallpaper, gorden, lantai, dan kasa nyamuk dalam satu kali konsultasi.',
  },
  {
    icon: PinIcon,
    title: 'Toko jelas di Batam',
    text: 'Lihat dan pegang contoh bahannya langsung di Nagoya Thamrin City.',
  },
] as const;

// TODO: verifikasi jawaban FAQ dengan SA Living
const faqs = [
  {
    q: 'Apakah ukur dan konsultasi benar-benar gratis?',
    a: 'Ya. Hubungi kami lewat WhatsApp untuk mengatur jadwal survei. Tim kami akan mengukur dan memberi saran bahan tanpa biaya.',
  },
  {
    q: 'Berapa harga wallpaper dinding?',
    a: `Wallpaper ready stock mulai ${formatPrice(160000, 'roll').replace('Mulai ', '')}. Satu roll berukuran 53 cm × 10 m dan cukup untuk sekitar 5 m² dinding. Harga akhir tergantung motif dan luas dinding.`,
  },
  {
    q: 'Bagaimana dengan harga gorden dan lantai SPC?',
    a: 'Harga gorden dan lantai SPC dihitung dari ukuran jendela atau luas ruangan, serta jenis bahan yang dipilih. Penawaran lengkap kami kirim setelah pengukuran.',
  },
  {
    q: 'Bisakah melihat contoh bahan dulu?',
    a: `Bisa. Silakan datang ke toko kami di ${siteConfig.address.street}, atau tim kami membawa contoh bahan saat survei.`,
  },
  {
    q: 'Apakah melayani ruko, kantor, dan kafe?',
    a: 'Ya. Selain rumah dan apartemen, kami juga melayani ruko, kantor, kafe, kontraktor, dan desainer interior.',
  },
];

// Slide hero: satu per kategori. Foto besar dari hasil pasang, foto kecil dari katalog
const heroSlides: readonly HeroSlide[] = [
  {
    title: 'Wallpaper Dinding',
    text: 'Ready stock mulai Rp160 ribu/roll, motif Korea, hingga mural custom.', // TODO: verifikasi harga
    href: '/produk?kategori=wallpaper',
    image: '/products/wallpaper-custom-mural/02.webp',
    imageAlt: 'Kamar dengan wallpaper custom bergambar pemandangan hasil pasang SA Living',
    thumb: '/products/wallpaper-vinyl-ready-stock/01.webp',
  },
  {
    title: 'Gorden Blackout & Vitrase',
    text: 'Dijahit sesuai ukuran jendela, lipit rapi dari plafon hingga lantai.',
    href: '/produk?kategori=gorden',
    image: '/hasil-pasang/03.webp',
    imageAlt: 'Gorden blackout abu-abu terpasang di ruangan',
    thumb: '/products/gorden-dimout-motif/01.webp',
  },
  {
    title: 'Lantai SPC Motif Kayu',
    text: 'Tahan air dan dipasang langsung di atas keramik lama, tanpa bongkar.',
    href: '/produk?kategori=lantai-spc',
    image: '/products/lantai-spc-5mm/02.webp',
    imageAlt: 'Kamar dengan lantai SPC motif kayu dan wallpaper custom',
    thumb: '/products/lantai-spc-5mm/01.webp',
  },
  {
    title: 'Kasa Nyamuk Magnet',
    text: 'Pintu dan jendela tetap terbuka, nyamuk tetap di luar.',
    href: '/produk?kategori=kasa-nyamuk',
    image: '/products/gorden-pintu/03.webp',
    imageAlt: 'Pintu rumah dengan tirai terpasang rapi',
    thumb: '/products/kasa-nyamuk-magnet/02.webp',
  },
];

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as React.CSSProperties;

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getCategories();

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="px-3 pt-2 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <HeroSlider slides={heroSlides}>
            <div>
              <p className="animate-in text-xs text-foreground/75 sm:text-sm" style={delay(100)}>
                {siteConfig.tagline} · Gratis ukur & konsultasi
              </p>
              <h1
                className="animate-in mt-4 text-[2.1rem] leading-[1.15] font-light tracking-tight sm:text-5xl lg:text-[3.1rem]"
                style={delay(250)}
              >
                Wallpaper & Gorden Rapi untuk{' '}
                <strong className="font-semibold">Rumah Impian di Batam</strong>.
              </h1>
              <p
                className="animate-in mt-5 max-w-sm text-sm leading-relaxed text-foreground/75"
                style={delay(400)}
              >
                Pilih motif di toko, kami ukur gratis, tim SA Living pasang rapi. Juga lantai SPC
                dan kasa nyamuk magnet.
              </p>
            </div>
            <div className="animate-in flex flex-wrap items-center gap-4" style={delay(550)}>
              <Link
                href="/produk"
                className="group grid size-28 place-items-center rounded-full bg-white/15 text-center text-xs leading-tight backdrop-blur-md transition-colors hover:bg-white/25"
              >
                <span>
                  <ArrowIcon className="mx-auto mb-1.5 size-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                  Lihat
                  <br />
                  katalog
                </span>
              </Link>
              <WhatsAppButton message={consultMessage()} className="py-3.5">
                Minta Ukur & Konsultasi Gratis
              </WhatsAppButton>
            </div>
          </HeroSlider>

          {/* Strip bawah hero */}
          <div className="grid items-center gap-6 py-8 md:grid-cols-[auto_1fr] md:gap-10">
            <div className="flex items-center gap-5">
              <Link href="/hasil-pasang" className="group flex shrink-0 items-center">
                <span className="relative size-16 overflow-hidden rounded-full bg-surface-2">
                  <Image src="/video/hero.webp" alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span className="-ml-4 grid size-16 place-items-center rounded-full bg-foreground text-background transition-colors group-hover:bg-accent">
                  <ArrowIcon className="size-5 -rotate-45" />
                </span>
                <span className="sr-only">Lihat hasil pasang</span>
              </Link>
              <p className="max-w-56 border-l border-line pl-5 text-sm leading-snug text-muted">
                Lihat hasil pasang wallpaper, gorden, dan lantai di rumah pelanggan.
              </p>
            </div>
            <div className="flex items-center gap-5 md:justify-end">
              <span aria-hidden="true" className="hidden h-px w-16 bg-line lg:block" />
              <span
                aria-hidden="true"
                className="block aspect-[285/240] h-14 shrink-0 bg-accent [mask-image:url(/brand/logo-mask.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              />
              <p className="max-w-md font-serif text-xl leading-snug sm:text-2xl">
                Satu toko untuk dinding, jendela, dan lantai rumah Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Kategori ---------- */}
      <section id="produk-layanan" aria-labelledby="judul-kategori" className="scroll-mt-24 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-kategori"
            eyebrow="Produk & layanan"
            title="Semua untuk Dinding, Jendela, dan Lantai"
            description="Empat kebutuhan utama rumah Anda, ditangani satu tim dari ukur sampai pasang."
          />
          <ul data-stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <li key={c.slug} className="reveal">
                <Link
                  href={`/produk?kategori=${c.slug}`}
                  className="group theme-dark relative block aspect-[3/4] overflow-hidden rounded-2xl bg-surface-2"
                >
                  <Image
                    src={c.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-6">
                    <span className="block font-serif text-2xl">{c.name}</span>
                    <span className="mt-1 block text-sm text-foreground/80">{c.short}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong">
                      Lihat koleksi
                      <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Keunggulan ---------- */}
      <section aria-labelledby="judul-keunggulan" className="bg-surface py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              id="judul-keunggulan"
              eyebrow="Kenapa SA Living"
              title="Lebih Tenang dari Pilih Bahan sampai Pasang"
              description="Kami membantu sejak awal, supaya hasil akhirnya pas dengan ruangan dan anggaran Anda."
            />
            <div className="reveal mt-8">
              <WhatsAppButton message={consultMessage()}>Jadwalkan Ukur Gratis</WhatsAppButton>
            </div>
          </div>
          <ul
            data-stagger
            className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
          >
            {benefits.map((b) => (
              <li key={b.title} className="reveal bg-background p-7">
                <b.icon className="size-7 text-accent" />
                <h3 className="mt-5 font-serif text-xl">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Hasil pasang ---------- */}
      <section aria-labelledby="judul-hasil" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              id="judul-hasil"
              eyebrow="Hasil pasang"
              title="Bukti Kerja di Rumah Pelanggan"
              description="Foto asli dari pemasangan tim SA Living. Video prosesnya ada di galeri."
            />
            <Link
              href="/hasil-pasang"
              className="reveal group inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent"
            >
              Lihat semua hasil
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ul data-stagger className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {projectPhotos.slice(0, 7).map((p, i) => (
              <li
                key={p.src}
                className={`reveal relative overflow-hidden rounded-2xl bg-surface-2 ${i === 0 ? 'row-span-2' : ''} ${i === 0 ? 'aspect-[9/16] lg:aspect-auto' : 'aspect-[4/5]'}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-xs font-medium text-white sm:text-sm">
                  {p.caption}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <OrderSteps />

      {/* ---------- Produk unggulan ---------- */}
      <section aria-labelledby="judul-unggulan" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading id="judul-unggulan" eyebrow="Katalog" title="Pilihan Favorit" />
            <Link
              href="/produk"
              className="reveal group inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent"
            >
              Lihat semua produk
              <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          <ul data-stagger className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 4).map((p) => (
              <li key={p.slug} className="reveal">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section aria-labelledby="judul-faq" className="border-t border-line py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading id="judul-faq" eyebrow="Pertanyaan umum" title="Sering Ditanyakan" />
          <div data-stagger className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f, i) => (
              <details key={f.q} className="reveal group py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg transition-colors group-open:text-accent-strong [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <PlusIcon className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 pr-8 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Lokasi + CTA penutup ---------- */}
      <section aria-labelledby="judul-cta" className="px-4 pb-24 sm:px-6">
        <div className="theme-dark reveal relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-background lg:grid-cols-2">
          <div className="relative min-h-72 lg:min-h-full">
            <Image
              src="/toko/01.webp"
              alt="Tampak depan toko SA Living di Nagoya Thamrin City, Batam"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-8 sm:p-12 lg:p-16">
            <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
              Mulai dari sini
            </p>
            <h2 id="judul-cta" className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Siap mempercantik ruangan Anda?
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Kirim pesan sekarang, tim kami atur jadwal ukur gratis. Atau mampir ke toko untuk
              melihat contoh bahannya langsung.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex gap-3">
                <dt>
                  <PinIcon className="size-5 text-accent" />
                  <span className="sr-only">Alamat</span>
                </dt>
                <dd>
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-line underline-offset-4 hover:text-accent-strong"
                  >
                    {fullAddress}
                    <span className="sr-only"> (buka Google Maps di tab baru)</span>
                  </a>
                </dd>
              </div>
              {siteConfig.hours.map((h) => (
                <div key={h.day} className="flex gap-3 text-muted">
                  <dt className="w-28 shrink-0 pl-8">{h.day}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <WhatsAppButton message={consultMessage()} className="mt-10 w-full sm:w-auto">
              Minta Ukur & Konsultasi Gratis
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
