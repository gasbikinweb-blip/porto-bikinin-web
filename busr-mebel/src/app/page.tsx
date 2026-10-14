import Image from 'next/image';
import Link from 'next/link';
import { AutoVideo } from '@/components/AutoVideo';
import { FeaturedShowcase } from '@/components/FeaturedShowcase';
import { HeroSlider, type HeroSlide } from '@/components/HeroSlider';
import { ArrowIcon, PlusIcon, WhatsAppIcon } from '@/components/icons';
import { OrderSteps } from '@/components/OrderSteps';
import { PieceGrid } from '@/components/PieceGrid';
import { getAllProducts, getCategories, getProductBySlug, type Product } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, catalogQuoteMessage, generalMessage } from '@/lib/whatsapp';

// FAQ Aksesibel (details/summary) dengan jawaban yang perlu verifikasi ditandai // TODO
const faqs = [
  {
    q: 'Berapa lama estimasi waktu produksi untuk custom furniture?',
    a: 'Untuk produk ready-stock yang memerlukan finishing ulang membutuhkan waktu sekitar 3–7 hari kerja. Sedangkan untuk pesanan custom sesuai desain dan dimensi ruangan memerlukan waktu produksi sekitar 2–4 minggu tergantung pada tingkat kerumitan dan antrean workshop.', // TODO: sesuaikan estimasi lead time bengkel
  },
  {
    q: 'Apakah kayu jati yang digunakan tahan terhadap rayap dan kelembapan?',
    a: 'Ya. Kayu jati (teak wood) memiliki kadar minyak alami tinggi yang secara inheren tahan terhadap serangan hama kayu dan jamur. Proses pengeringan oven (kiln dried) semakin menyempurnakan ketahanan terhadap kelembapan udara ruangan ber-AC maupun semi-outdoor.',
  },
  {
    q: 'Bagaimana proses survei ruangan dan konsultasi desain?',
    a: 'Anda dapat mengirimkan denah ruangan (layout CAD/PDF), foto ruangan eksisting, atau sketsa kasar via WhatsApp. Tim kami akan memberikan masukan proporsi furnitur, pilihan material, serta visualisasi 3D konsep jika diperlukan.',
  },
  {
    q: 'Bagaimana prosedur klaim garansi atau kerusakan saat pengiriman?',
    a: 'Semua pengiriman kami lengkapi dengan asuransi kargo dan packing kayu. Jika saat diterima terdapat cacat akibat pengiriman atau cacat konstruksi, cukup kirimkan dokumentasi foto/video unboxing via WhatsApp dan tim kami akan segera memproses penggantian atau perbaikan teknis.', // TODO: cantumkan SLA respon komplain
  },
  {
    q: 'Apakah Busr Mebel melayani pengiriman dan perakitan ke luar pulau Jawa?',
    a: 'Ya, kami melayani pengiriman ke seluruh wilayah Indonesia (Sumatera, Bali, Kalimantan, Sulawesi, hingga Papua) melalui mitra ekspedisi kargo tepercaya. Untuk proyek volume tertentu, kami juga dapat mengirimkan tim teknisi perakit langsung ke lokasi.',
  },
];

// Kategori untuk strip navigasi cepat di bawah hero
const categoryThumbs: Record<string, string> = {
  'sofa-lounge': '/products/sofa-modular-aera-curve/01.webp',
  'kursi-ergonomis': '/products/kursi-makan-solenne-curve/01.webp',
  'meja-meeting': '/products/meja-makan-jati-peanut/01.webp',
  'meja-kerja': '/products/meja-kerja-jati-teak-desk/01.webp',
  'lemari-penyimpanan': '/products/rak-jati-bersiluet/01.webp',
  'custom-furniture': '/products/dipan-tempat-tidur-jati-bedframe/01.webp',
};

const heroSlides: HeroSlide[] = [
  {
    src: '/editorial/hero-lounge.webp',
    alt: 'Lounge chair jati dengan ottoman dan meja samping buatan Busr Mebel',
    caption: 'Lounge Chair & Ottoman, rangka jati solid',
  },
  {
    src: '/editorial/hero-chair.webp',
    alt: 'Lounge chair modern berlapis kulit sintetis warna taupe',
    caption: 'Lounge chair modern untuk ruang kerja santai',
  },
  {
    src: '/editorial/hero-rocking.webp',
    alt: 'Kursi goyang kayu jati klasik dengan dudukan anyaman',
    caption: 'Kursi goyang jati, sambungan purus tradisional',
  },
];

const pickSlugs = [
  'kursi-santai-lounge-chair-ottoman',
  'sofa-modular-aera-curve',
  'rak-jati-bersiluet',
  'meja-kopi-the-kuro-low',
];

const origin = [
  {
    no: '01',
    eyebrow: 'Material',
    title: 'Kayu Perhutani pilihan',
    text: 'Kami memakai kayu dari Perhutani: serat indah, kuat, dan awet untuk dipakai bertahun-tahun.',
    image: '/editorial/material-logs.webp',
    alt: 'Tumpukan kayu jati gelondongan Perhutani di halaman workshop',
  },
  {
    no: '02',
    eyebrow: 'Kriya',
    title: 'Dikerjakan tangan pengrajin',
    text: 'Dipotong, diserut, dan disambung oleh pengrajin Jepara dengan teknik turun-temurun.',
    image: '/editorial/craft-saw.webp',
    alt: 'Pengrajin Busr Mebel memotong papan kayu di workshop',
  },
  {
    no: '03',
    eyebrow: 'Showroom',
    title: 'Kunjungi showroom Jepara',
    text: 'Lihat dan coba langsung koleksi minimalis hingga klasik di showroom kami.',
    image: '/editorial/showroom.webp',
    alt: 'Deretan kursi kayu dan jok di showroom Busr Mebel Jepara',
  },
];

const reasons = [
  { title: 'Custom ukuran & finishing', text: 'Dimensi, warna, dan kain disesuaikan dengan ruang Anda.' },
  { title: 'Langsung dari workshop', text: 'Tanpa perantara, harga lebih wajar untuk unit maupun proyek.' },
  { title: 'Kirim ke seluruh Indonesia', text: 'Dikemas aman dengan kardus tebal dan palet kayu.' },
  { title: 'Konsultasi via WhatsApp', text: 'Kirim foto ruangan atau referensi, kami bantu pilihkan.' },
];

export default function HomePage() {
  const products = getAllProducts();
  const categories = getCategories();
  const picks = pickSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center bg-surface px-5 py-14 sm:px-10 lg:px-16 lg:py-20 xl:px-24">
          <p
            className="animate-in text-[11px] font-medium tracking-[0.32em] text-muted uppercase"
            style={{ '--delay': '100ms' } as React.CSSProperties}
          >
            Furnitur kayu solid · Jepara
          </p>
          <h1 className="mt-6 font-serif text-[3.2rem] leading-[0.95] font-normal tracking-tight sm:text-7xl xl:text-8xl">
            <span className="hero-line" style={{ '--delay': '200ms' } as React.CSSProperties}>
              <span>Dibuat untuk</span>
            </span>{' '}
            <span className="hero-line" style={{ '--delay': '340ms' } as React.CSSProperties}>
              <span>
                <em className="text-teak">Ditinggali.</em>
              </span>
            </span>
          </h1>
          <p
            className="animate-in mt-7 max-w-md text-base leading-relaxed text-muted"
            style={{ '--delay': '520ms' } as React.CSSProperties}
          >
            Furnitur jati dari workshop kami di Jepara, siap pakai maupun custom ukuran untuk
            rumah, kantor, kafe, dan hotel.
          </p>
          <div
            className="animate-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ '--delay': '680ms' } as React.CSSProperties}
          >
            <Link
              href="/produk"
              className="group inline-flex items-center justify-center gap-3 whitespace-nowrap bg-foreground px-7 py-4 text-[11px] font-semibold tracking-[0.25em] text-background uppercase transition-colors hover:bg-accent"
            >
              Lihat Koleksi
              <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={buildWhatsAppLink(catalogQuoteMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap border border-foreground/25 px-7 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors hover:border-foreground"
            >
              <WhatsAppIcon className="size-4" />
              Minta Penawaran
            </a>
          </div>
        </div>
        <div className="animate-in relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto" style={{ '--delay': '150ms' } as React.CSSProperties}>
          <HeroSlider slides={heroSlides} />
        </div>
      </section>

      {/* ---------- Strip kategori ---------- */}
      <nav aria-label="Kategori produk" className="border-b border-line bg-background">
        <ul className="no-scrollbar mx-auto flex max-w-7xl overflow-x-auto px-2 sm:px-4 lg:justify-between">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0 border-r border-line last:border-r-0">
              <Link
                href={`/produk?kategori=${c.slug}`}
                className="group flex items-center gap-4 px-4 py-5 sm:px-6"
              >
                <span className="relative size-12 shrink-0 overflow-hidden bg-surface sm:size-14">
                  <Image
                    src={categoryThumbs[c.slug] ?? '/products/rak-jati-bersiluet/01.webp'}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
                <span className="text-sm whitespace-nowrap transition-colors group-hover:text-teak">
                  {c.name.split(' & ')[0]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- Koleksi pilihan ---------- */}
      <section aria-labelledby="judul-pilihan" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.75fr_2fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-32 lg:self-start">
            <p className="text-[11px] font-medium tracking-[0.32em] text-muted uppercase">Koleksi pilihan</p>
            <h2 id="judul-pilihan" className="mt-5 font-serif text-5xl leading-[1] sm:text-6xl">
              Klasik
              <br />
              Modern
            </h2>
            <p className="mt-6 max-w-xs leading-relaxed text-muted">
              Bentuk yang tak lekang waktu dan material yang jujur. Dirancang untuk dipakai
              bertahun-tahun.
            </p>
            <Link
              href="/produk"
              className="group mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[11px] font-semibold tracking-[0.25em] uppercase"
            >
              Semua produk
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <PieceGrid products={picks} />
        </div>
      </section>

      {/* ---------- Dari hutan ke ruang Anda (mosaik) ---------- */}
      <section aria-labelledby="judul-asal" className="bg-surface">
        <h2 id="judul-asal" className="sr-only">
          Dari material hingga showroom
        </h2>
        <div className="grid md:grid-cols-3">
          {origin.map((o, i) => (
            <article key={o.no} className={`group flex flex-col ${i === 1 ? 'md:flex-col-reverse' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden md:aspect-square">
                <Image
                  src={o.image}
                  alt={o.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="reveal flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
                <p className="font-serif text-sm text-teak">
                  {o.no} <span className="ml-2 text-[11px] tracking-[0.3em] text-muted uppercase">{o.eyebrow}</span>
                </p>
                <h3 className="mt-4 font-serif text-3xl leading-tight">{o.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{o.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Mengapa Busr ---------- */}
      <section aria-labelledby="judul-alasan" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="reveal border-l-2 border-teak pl-5">
            <h2 id="judul-alasan" className="font-serif text-3xl sm:text-4xl">
              Mengapa memilih Busr Mebel?
            </h2>
          </div>
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:items-center">
            <div className="reveal">
              <p className="font-serif text-[7rem] leading-none tracking-tight text-foreground sm:text-[9rem]">
                {products.length}
                <span className="text-teak">+</span>
              </p>
              <p className="mt-2 max-w-[12rem] text-sm leading-snug text-muted">
                model furnitur siap dipesan di katalog kami
              </p>
            </div>
            <ul data-stagger className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {reasons.map((r, i) => (
                <li key={r.title} className="reveal flex gap-5">
                  <span className="font-serif text-2xl text-teak tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-medium">{r.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Ruang yang menginspirasi ---------- */}
      <section aria-labelledby="judul-ruang" className="grid bg-surface lg:grid-cols-2">
        <div className="reveal reveal-curtain relative aspect-[4/3] lg:aspect-auto lg:min-h-[38rem]">
          <Image
            src="/editorial/dining-table.webp"
            alt="Meja makan panjang kayu jati solid dengan kaki panel"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-20">
          <div className="reveal">
            <p className="text-[11px] font-medium tracking-[0.32em] text-muted uppercase">Inspirasi ruang</p>
            <h2 id="judul-ruang" className="mt-5 font-serif text-5xl leading-[1.02] sm:text-6xl">
              Ruang yang
              <br />
              Menginspirasi
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Dari ruang makan keluarga hingga kantor direksi. Lihat bagaimana koleksi kami dipadukan
              untuk tiap karakter ruang.
            </p>
            <Link
              href="/inspirasi"
              className="group mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-[11px] font-semibold tracking-[0.25em] uppercase"
            >
              Lihat inspirasi
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Etalase produk ---------- */}
      <section aria-labelledby="judul-unggulan" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-[11px] font-medium tracking-[0.32em] text-muted uppercase">Katalog</p>
              <h2 id="judul-unggulan" className="mt-4 font-serif text-4xl sm:text-5xl">
                Jelajahi per kategori
              </h2>
            </div>
            <Link
              href="/produk"
              className="group inline-flex items-center gap-2 self-start border-b border-foreground pb-1 text-[11px] font-semibold tracking-[0.25em] uppercase sm:self-auto"
            >
              {products.length} produk
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="reveal mt-10">
            <FeaturedShowcase products={products} categories={categories} />
          </div>
        </div>
      </section>

      {/* ---------- Workshop (video) ---------- */}
      <section aria-labelledby="judul-kriya" className="bg-foreground py-20 text-background sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <p className="text-[11px] font-medium tracking-[0.32em] text-background/60 uppercase">Di balik layar</p>
            <h2 id="judul-kriya" className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl">
              Setiap sambungan dikerjakan tangan.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-background/70">
              Dari menyerut papan hingga menjahit jok, setiap tahap dikerjakan pengrajin kami di
              workshop Jepara.
            </p>
            <a
              href={buildWhatsAppLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-3 bg-background px-7 py-4 text-[11px] font-semibold tracking-[0.25em] text-foreground uppercase transition-colors hover:bg-teak hover:text-white"
            >
              <WhatsAppIcon className="size-4" />
              Konsultasi Gratis
            </a>
          </div>
          <div className="grid grid-cols-[1fr_0.8fr] items-end gap-4">
            <div className="reveal relative aspect-[4/5] overflow-hidden">
              <AutoVideo
                src="/media/workshop-2.mp4"
                poster="/editorial/craft-planing.webp"
                label="Video pengrajin Busr Mebel memeriksa sambungan kayu"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
            <div className="reveal relative aspect-[9/16] overflow-hidden" style={{ '--reveal-delay': '150ms' } as React.CSSProperties}>
              <AutoVideo
                src="/media/workshop-1.mp4"
                poster="/editorial/craft-saw.webp"
                label="Video pengrajin Busr Mebel menjahit jok kursi"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <OrderSteps />

      {/* ---------- FAQ ---------- */}
      <section aria-labelledby="judul-faq" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_2fr]">
          <div className="reveal">
            <p className="text-[11px] font-medium tracking-[0.32em] text-muted uppercase">FAQ</p>
            <h2 id="judul-faq" className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Pertanyaan yang sering diajukan
            </h2>
          </div>
          <div className="border-t border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-base font-medium sm:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <PlusIcon className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA penawaran ---------- */}
      <section aria-labelledby="judul-cta" className="px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="reveal mx-auto grid max-w-7xl overflow-hidden bg-surface lg:grid-cols-[1.4fr_1fr]">
          <div className="px-6 py-14 sm:px-12 lg:px-16">
            <p className="text-[11px] font-medium tracking-[0.32em] text-muted uppercase">Mulai proyek Anda</p>
            <h2 id="judul-cta" className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
              Minta penawaran harga, gratis.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Ceritakan kebutuhan Anda: model, ukuran, dan jumlah. Kami balas dengan rincian harga
              dan estimasi waktu produksi.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink(catalogQuoteMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 whitespace-nowrap bg-foreground px-7 py-4 text-[11px] font-semibold tracking-[0.25em] text-background uppercase transition-colors hover:bg-accent"
              >
                <WhatsAppIcon className="size-4" />
                Chat WhatsApp
              </a>
              <a
                href={siteConfig.catalogPdfUrl}
                download="katalog-busr-mebel.pdf"
                className="inline-flex items-center justify-center border border-foreground/25 px-7 py-4 text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors hover:border-foreground"
              >
                Unduh Katalog PDF
              </a>
            </div>
          </div>
          <div className="relative min-h-64">
            <Image
              src="/editorial/sofa.webp"
              alt="Sofa kain abu muda berangka kayu dengan meja samping jati"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
