import Image from 'next/image';
import { CategoryGrid } from '@/components/CategoryGrid';
import { BagIcon, CheckIcon, WhatsAppIcon } from '@/components/icons';
import { ProductSection } from '@/components/ProductSection';
import { TileCalculator } from '@/components/TileCalculator';
import { VideoGallery } from '@/components/VideoGallery';
import { brands } from '@/data/brands';
import { faqs } from '@/data/faq';
import { products } from '@/data/products';
import { reviews } from '@/data/reviews';
import { site } from '@/data/site';
import { storeVideos } from '@/data/videos';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const sourceLabel = {
  shopee: 'Ulasan pembeli di Shopee',
  tokopedia: 'Ulasan pembeli di Tokopedia',
  pelanggan: 'Pelanggan toko',
} as const;
const btnRed =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-red px-6 font-bold text-white transition-colors hover:bg-red-strong';
const btnOutline =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-foreground px-6 font-bold transition-colors hover:bg-foreground hover:text-background';

// Foto hero: 4 produk dengan motif paling jelas
const heroIds = [
  'keramik-40x40-fremont',
  'granit-lantai-ruangan-60x60-montero',
  'keramik-teras-40x40-rocky-series',
  'keramik-dinding-subway-bevel-putih-10x20',
];
const corners = [
  'rounded-tl-[1.25rem]',
  'rounded-tr-[1.25rem]',
  'rounded-bl-[1.25rem]',
  'rounded-br-[1.25rem]',
];
const heroProducts = heroIds.flatMap((id) => products.find((p) => p.id === id) ?? []);

function SectionTitle({
  no,
  eyebrow,
  title,
  intro,
}: {
  no: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="reveal max-w-2xl">
      <p className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-red uppercase">
        <span className="tabular-nums">{no}</span>
        <span aria-hidden="true" className="h-px w-8 bg-red/60" />
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-heading font-bold">{title}</h2>
      {intro && <p className="mt-3 text-lg text-muted">{intro}</p>}
    </div>
  );
}

export default function Home() {
  const shopeeStore = config.shopeeStoreUrl;
  return (
    <>
      {/* Hero */}
      <section
        id="beranda"
        className="tile-grid relative overflow-hidden border-b border-line bg-surface"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="animate-fade inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold">
              <span aria-hidden="true" className="size-2 rounded-full bg-red" />
              {site.tagline}
            </p>
            <h1 className="font-display mt-5 text-display font-bold text-balance">
              Keramik, Granit &amp; Sanitary <span className="text-red">Harga Distributor</span> di
              Jakarta Timur
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {/* TODO: konfirmasi tahun berdiri */}
              Toko offline sejak {site.since}, delivery ke seluruh Jabodetabek. Tanya stok dan harga
              terbaru langsung via WhatsApp, atau lihat katalog lengkap di Shopee.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={buildWhatsAppLink(generalMessage)} {...external} className={btnRed}>
                <WhatsAppIcon />
                Chat WhatsApp<span className="sr-only"> (tab baru)</span>
              </a>
              <a href={shopeeStore} {...external} className={btnOutline}>
                <BagIcon />
                Lihat Katalog Lengkap di Shopee<span className="sr-only"> (tab baru)</span>
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
              {[`Sejak ${site.since}`, 'Toko Offline', 'Delivery Jabodetabek'].map((b) => (
                <li
                  key={b}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-2"
                >
                  <CheckIcon className="size-4 text-red" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {/* Susunan foto seperti petak keramik dengan nat */}
          <div className="grid grid-cols-2 gap-1.5 rounded-3xl bg-line p-1.5 shadow-[0_30px_60px_-35px_rgb(0_0_0/0.5)] lg:rotate-[-2deg]">
            {heroProducts.map((p, i) => (
              <div
                key={p.id}
                className={`reveal relative aspect-square overflow-hidden bg-card ${corners[i]}`}
                style={{ '--delay': `${i * 90}ms` } as React.CSSProperties}
              >
                <Image
                  src={i === 0 ? p.image.src : p.image.thumb}
                  alt={p.image.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 260px, 45vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section id="kategori" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionTitle
          no="01"
          eyebrow="Kategori"
          title="Cari apa hari ini?"
          intro="Pilih kategori untuk langsung melihat produknya."
        />
        <div className="reveal mt-8">
          <CategoryGrid />
        </div>
      </section>

      {/* Produk pilihan */}
      <section id="produk" className="bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            no="02"
            eyebrow="Produk pilihan"
            title="Keramik & bahan bangunan dengan harga jelas"
            intro="Harga dapat berubah, stok dan harga terbaru konfirmasi via WA."
          />
          <div className="mt-6">
            <ProductSection />
          </div>
          <div className="reveal mt-12 flex flex-col items-start gap-4 rounded-3xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-2xl font-bold">Ini sebagian produk kami.</p>
              <p className="mt-1 text-white/80">
                Lihat katalog lengkap di toko Shopee, atau tanya tipe lain yang belum ada via
                WhatsApp.
              </p>
            </div>
            <a href={shopeeStore} {...external} className={`${btnRed} shrink-0`}>
              <BagIcon />
              Buka Toko Shopee<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Kalkulator */}
      <section id="hitung" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionTitle
          no="03"
          eyebrow="Hitung kebutuhan"
          title="Butuh berapa dus keramik?"
          intro="Masukkan ukuran ruangan, pilih keramik, dan kami hitungkan jumlah dusnya."
        />
        <div className="reveal mt-8">
          <TileCalculator />
        </div>
      </section>

      {/* Merek */}
      <section id="merek" className="border-y border-line bg-surface py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold">Merek yang tersedia</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {brands.map((b) => (
              <li
                key={b}
                className="rounded-full border border-line bg-card px-4 py-2 text-sm font-bold transition-colors hover:border-red hover:text-red"
              >
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            Merek lain bisa dicarikan, tanyakan via WhatsApp.
          </p>
        </div>
      </section>

      {/* Ulasan */}
      <section id="ulasan" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionTitle no="04" eyebrow="Ulasan" title="Kata pelanggan kami" />
        {/* Ulasan asli dari highlight Testimoni IG. TODO: konfirmasi izin pemilik */}
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {reviews.map((r) =>
            r.isPlaceholder ? (
              <li
                key={r.id}
                className="grid min-h-40 place-items-center rounded-xl border-2 border-dashed border-line p-6 text-center text-sm text-muted"
              >
                {r.text}
              </li>
            ) : (
              <li
                key={r.id}
                className="reveal flex flex-col rounded-2xl border border-line bg-card p-6"
              >
                <p className="text-red" aria-label={`Rating ${r.rating} dari 5`}>
                  {'★'.repeat(r.rating)}
                  <span className="text-line">{'★'.repeat(5 - r.rating)}</span>
                </p>
                <blockquote className="mt-3 flex-1 leading-relaxed">“{r.text}”</blockquote>
                <p className="mt-3 text-sm font-semibold">{r.buyer}</p>
                <p className="text-xs text-muted">
                  {r.product} · {sourceLabel[r.source]}
                </p>
              </li>
            ),
          )}
        </ul>
        <a href={shopeeStore} {...external} className={`${btnOutline} mt-6`}>
          Lihat semua ulasan di Shopee<span className="sr-only"> (tab baru)</span>
        </a>
      </section>

      {/* Video toko (dari Instagram toko) */}
      <section id="video" className="bg-surface py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            no="05"
            eyebrow="Video"
            title="Lihat langsung toko kami"
            intro="Bukan foto katalog saja: ini suasana toko dan produk aslinya, langsung dari Instagram kami."
          />
          <VideoGallery videos={storeVideos} />
          <a href={site.instagram} {...external} className={`${btnOutline} mt-4`}>
            Video lainnya di Instagram<span className="sr-only"> (tab baru)</span>
          </a>
        </div>
      </section>

      {/* Toko */}
      <section id="toko" className="bg-ink py-16 text-white lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-wide text-white/70 uppercase">
              Kunjungi toko kami
            </p>
            <h2 className="font-display mt-3 text-heading font-bold">
              Lihat langsung motifnya di toko
            </h2>
            <p className="mt-3 text-white/80">
              Datang dan pilih keramik secara langsung, atau pesan dari rumah dan kami antar.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={site.mapsUrl} {...external} className={btnRed}>
                Petunjuk Arah (Google Maps)<span className="sr-only"> (tab baru)</span>
              </a>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white px-6 font-bold transition-colors hover:bg-white hover:text-ink"
              >
                <WhatsAppIcon />
                Chat WhatsApp<span className="sr-only"> (tab baru)</span>
              </a>
            </div>
          </div>
          <dl className="reveal grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div>
              <dt className="text-sm text-white/70">Alamat</dt>

              <dd className="font-semibold">{site.address}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/70">Jam buka</dt>
              <dd className="font-semibold">
                {site.hours} <span className="font-normal text-white/80">({site.closed})</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/70">Area delivery</dt>
              <dd className="font-semibold">{site.deliveryArea}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/70">WhatsApp</dt>
              <dd className="font-semibold">{site.waDisplay}</dd>
            </div>
            <div>
              <dt className="text-sm text-white/70">Telepon</dt>
              <dd className="font-semibold">{site.phone}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <SectionTitle no="06" eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" />
        <div className="reveal mt-8 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-xl text-red transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-4 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
