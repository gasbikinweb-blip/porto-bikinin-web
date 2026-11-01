import Image from 'next/image';
import { CategoryGrid } from '@/components/CategoryGrid';
import { BagIcon, CheckIcon, WhatsAppIcon } from '@/components/icons';
import { ProductSection } from '@/components/ProductSection';
import { TileCalculator } from '@/components/TileCalculator';
import { brands } from '@/data/brands';
import { faqs } from '@/data/faq';
import { products } from '@/data/products';
import { reviews } from '@/data/reviews';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const sourceLabel = {
  shopee: 'Ulasan pembeli di Shopee',
  tokopedia: 'Ulasan pembeli di Tokopedia',
  pelanggan: 'Pelanggan toko',
} as const;
const btnRed =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-red px-6 font-bold text-white hover:bg-red-strong';
const btnOutline =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-ink bg-white px-6 font-bold hover:bg-ink hover:text-white';

// Foto hero: 4 produk dengan motif paling jelas
const heroIds = [
  'keramik-40x40-fremont',
  'granit-lantai-ruangan-60x60-montero',
  'keramik-teras-40x40-rocky-series',
  'keramik-dinding-subway-bevel-putih-10x20',
];
const heroProducts = heroIds.flatMap((id) => products.find((p) => p.id === id) ?? []);

function SectionTitle({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-bold tracking-wide text-red uppercase">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {intro && <p className="mt-2 text-muted">{intro}</p>}
    </div>
  );
}

export default function Home() {
  const shopeeStore = config.shopeeStoreUrl;
  return (
    <>
      {/* Hero */}
      <section id="beranda" className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <p className="inline-flex rounded-full bg-red-soft px-3 py-1 text-sm font-bold text-red-strong">
              {site.tagline}
            </p>
            <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-5xl">
              Keramik, Granit &amp; Sanitary Harga Distributor di Jakarta Timur
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
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 shadow-sm"
                >
                  <CheckIcon className="size-4 text-red" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {heroProducts.map((p, i) => (
              <div
                key={p.id}
                className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-sm"
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
      <section id="kategori" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionTitle
          eyebrow="Kategori"
          title="Cari apa hari ini?"
          intro="Pilih kategori untuk langsung melihat produknya."
        />
        <div className="mt-6">
          <CategoryGrid />
        </div>
      </section>

      {/* Produk pilihan */}
      <section id="produk" className="bg-surface py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Produk pilihan"
            title="Keramik & bahan bangunan dengan harga jelas"
            intro="Harga dapat berubah, stok dan harga terbaru konfirmasi via WA."
          />
          <div className="mt-6">
            <ProductSection />
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-xl font-extrabold">Ini sebagian produk kami.</p>
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
      <section id="hitung" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionTitle
          eyebrow="Hitung kebutuhan"
          title="Butuh berapa dus keramik?"
          intro="Masukkan ukuran ruangan, pilih keramik, dan kami hitungkan jumlah dusnya."
        />
        <div className="mt-6">
          <TileCalculator />
        </div>
      </section>

      {/* Merek */}
      <section id="merek" className="border-y border-line bg-surface py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-extrabold">Merek yang tersedia</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {brands.map((b) => (
              <li
                key={b}
                className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-bold"
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
      <section id="ulasan" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <SectionTitle eyebrow="Ulasan" title="Kata pelanggan kami" />
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
              <li key={r.id} className="rounded-xl border border-line p-5">
                <p className="text-red" aria-label={`Rating ${r.rating} dari 5`}>
                  {'★'.repeat(r.rating)}
                  <span className="text-line">{'★'.repeat(5 - r.rating)}</span>
                </p>
                <blockquote className="mt-2">“{r.text}”</blockquote>
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

      {/* Toko */}
      <section id="toko" className="bg-ink py-12 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-wide text-white/70 uppercase">
              Kunjungi toko kami
            </p>
            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-white px-6 font-bold hover:bg-white hover:text-ink"
              >
                <WhatsAppIcon />
                Chat WhatsApp<span className="sr-only"> (tab baru)</span>
              </a>
            </div>
          </div>
          <dl className="grid gap-4 rounded-xl bg-white/5 p-5 sm:p-6">
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
      <section id="faq" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionTitle eyebrow="FAQ" title="Pertanyaan yang sering ditanyakan" />
        <div className="mt-6 divide-y divide-line border-y border-line">
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
