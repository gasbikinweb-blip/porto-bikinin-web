import { CatalogFilter } from '@/components/CatalogFilter';
import { FeaturedSplit } from '@/components/FeaturedSplit';
import { ShopeeIcon, WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { ProductShowcase } from '@/components/ProductShowcase';
import { ProfitCalculator } from '@/components/ProfitCalculator';
import { QuoteBanner, type QuoteSlide } from '@/components/QuoteBanner';
import { VideoGrid } from '@/components/VideoGrid';
import { categories } from '@/data/categories';
import { faq } from '@/data/faq';
import { allColors, featuredProducts, formatRupiah, getProduct, products } from '@/data/products';
import { activePromos } from '@/data/promos';
import {
  joinSteps,
  resellerPerks,
  resellerTerms,
  wholesaleFrom,
  wholesaleTable,
} from '@/data/reseller';
import { site } from '@/data/site';
import { videos } from '@/data/videos';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage, resellerMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const promos = activePromos();
const img = (slug: string, i: number) => getProduct(slug)?.images[i];

// Foto besar untuk panel "Yang lagi banyak dicari"
const featureImage = img('mayra-twotone-instant', 0) ?? products[0]?.images[0];

// Quotes hijab (suara brand, tanpa mengatasnamakan tokoh). TODO: minta persetujuan teks ke pemilik
const quoteSlides: QuoteSlide[] = [
  {
    image: img('naima-plain-hijab-syari', 1),
    quote: 'Hijab yang nyaman bikin langkah terasa lebih ringan.',
    sub: 'Naima Plain Syar’i',
  },
  {
    image: img('syaima-khiban-voal-miracle', 0),
    quote: 'Menutup aurat bukan berarti menutup gaya.',
    sub: 'Syaima Khiban',
  },
  {
    image: img('naima-plain-hijab-syari', 3),
    quote: 'Sederhana, rapi, dan tetap jadi diri sendiri.',
    sub: 'Naima Plain Syar’i',
  },
  {
    image: img('nazira-pashmina-rayon', 1),
    quote: 'Warna boleh berbeda, niat baiknya tetap sama.',
    sub: 'Nazira Pashmina',
  },
].flatMap((s) => (s.image ? [{ ...s, image: s.image }] : []));

const marquee = [
  'Khimar instan premium',
  'Khiban voal',
  'Hijab instan rayon',
  'Pashmina flowy',
  'Grosir hijab Bandung',
  'Open reseller',
];

// JSON-LD Organization (dirender tanpa dangerouslySetInnerHTML, lihat JsonLd.tsx)
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  description: site.description,
  url: config.siteUrl,
  sameAs: [site.instagram, site.tiktok, config.shopeeUrl],
};

function SectionHead({
  id,
  eyebrow,
  title,
  text,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
}) {
  return (
    <div data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 font-serif text-section">
        {title}
      </h2>
      {text && <p className="mt-3 max-w-xl text-muted">{text}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={organization} />

      <ProductShowcase products={products} />

      {/* Pita kata kunci */}
      <div className="overflow-hidden border-y border-line bg-surface py-4" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-10 font-serif text-xl italic">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              {t} <span className="text-rose">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Promo aktif (otomatis hilang setelah tanggal berakhir) */}
      {promos.map((p) => (
        <section
          key={p.id}
          aria-label="Promo"
          className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6"
        >
          <div className="flex flex-col items-start gap-4 rounded-[1.75rem] bg-rose-soft p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-2xl">{p.title}</p>
              <p className="mt-1 text-sm">
                {p.text}
                {p.viaWhatsApp ? ' Khusus order via WhatsApp.' : ''}
              </p>
            </div>
            <a
              href={buildWhatsAppLink(`Halo Farwa, saya mau ambil promo ${p.title}, Kak.`)}
              {...external}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-mocha px-5 text-sm font-bold text-background"
            >
              <WhatsAppIcon className="size-4" />
              Ambil promo
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </section>
      ))}

      {featureImage && (
        <FeaturedSplit
          products={featuredProducts.concat(products.filter((p) => !p.featured))}
          feature={featureImage}
        />
      )}

      <QuoteBanner slides={quoteSlides} />

      {/* Semua koleksi */}
      <section id="koleksi" aria-labelledby="judul-koleksi" className="bg-surface/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            id="judul-koleksi"
            eyebrow="Koleksi"
            title="Semua koleksi Farwa"
            text="Pilih kategori atau warna favorit, klik produk untuk lihat detail. Harga yang tertera adalah harga eceran di Shopee."
          />
          <div className="mt-8">
            <CatalogFilter products={products} categories={categories} colors={allColors} />
          </div>
        </div>
      </section>

      {/* Video */}
      <section
        id="video"
        aria-labelledby="judul-video"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
      >
        <SectionHead
          id="judul-video"
          eyebrow="Video"
          title={
            <>
              Lihat langsung <em className="text-rose">jatuhnya kain</em>
            </>
          }
          text="Tutorial pakai dan detail bahan. Klik untuk putar, tanpa suara."
        />
        <div data-reveal className="mt-8">
          <VideoGrid videos={videos} />
        </div>
      </section>

      {/* Dua cara belanja */}
      <section
        aria-labelledby="cara-belanja"
        className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6"
      >
        <SectionHead id="cara-belanja" eyebrow="Cara belanja" title="Dua jalur, pilih yang pas" />
        <div data-reveal-group className="mt-8 grid gap-4 md:grid-cols-2">
          <div data-reveal className="rounded-[2rem] border border-line p-7">
            <p className="text-sm font-bold text-shopee-text">Beli eceran</p>
            <h3 className="mt-2 font-serif text-title">Checkout di Shopee</h3>
            <ol className="mt-4 space-y-2 text-sm text-muted">
              <li>1. Pilih produk & warna di koleksi</li>
              <li>2. Klik “Beli di Shopee”</li>
              <li>3. Bayar & lacak paket di aplikasi Shopee</li>
            </ol>
            <a
              href={config.shopeeUrl}
              {...external}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-shopee px-6 font-bold text-white hover:bg-shopee-strong"
            >
              <ShopeeIcon />
              Buka Toko Shopee
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <div data-reveal className="rounded-[2rem] bg-sage-soft p-7">
            <p className="text-sm font-bold">Beli banyak / jualan lagi</p>
            <h3 className="mt-2 font-serif text-title">Grosir via WhatsApp</h3>
            <ol className="mt-4 space-y-2 text-sm">
              <li>1. Pilih model & jumlah (boleh mix)</li>
              <li>2. Chat admin, dapat harga grosir</li>
              <li>3. Bayar & barang dikirim dari Bandung</li>
            </ol>
            <a
              href={buildWhatsAppLink(resellerMessage)}
              {...external}
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-mocha px-6 font-bold text-background hover:bg-mocha-strong"
            >
              <WhatsAppIcon />
              Tanya Harga Grosir
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Reseller */}
      <section
        id="reseller"
        aria-labelledby="judul-reseller"
        className="bg-panel py-16 text-on-panel"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal>
            <p className="eyebrow text-on-panel/70!">Open reseller & dropship</p>
            <h2 id="judul-reseller" className="mt-3 font-serif text-section">
              Boleh banget loh, <em>jadi reseller</em> Farwa!
            </h2>
            <p className="mt-3 max-w-xl text-on-panel/80">
              Ambil harga grosir, jual lagi dengan harga Kakak sendiri. Cocok untuk mulai usaha
              hijab dari rumah.
            </p>
          </div>
          <ul data-reveal-group className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {resellerPerks.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                className="rounded-[1.75rem] border border-on-panel/20 p-6"
              >
                <span className="font-serif text-3xl text-on-panel/60 italic">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl">{p.title}</h3>
                <p className="mt-1.5 text-sm text-on-panel/80">{p.text}</p>
              </li>
            ))}
          </ul>
          <ol data-reveal-group className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {joinSteps.map((s, i) => (
              <li key={s.title} data-reveal className="flex gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-on-panel font-bold text-panel">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="block text-sm text-on-panel/75">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <a
            href={buildWhatsAppLink(resellerMessage)}
            {...external}
            className="mt-10 inline-flex min-h-13 items-center gap-2 rounded-full bg-on-panel px-7 font-bold text-panel hover:bg-on-panel/85"
          >
            <WhatsAppIcon />
            Daftar Reseller
            <span className="sr-only"> (tab baru)</span>
          </a>
        </div>
      </section>

      {/* Kalkulator cuan + harga grosir */}
      <section aria-labelledby="judul-cuan" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div id="hitung-cuan" className="scroll-mt-24">
          <SectionHead
            id="judul-cuan"
            eyebrow="Simulasi"
            title="Hitung cuanmu dulu, Kak"
            text="Isi harga beli, harga jual, dan target penjualan. Dihitung di browser saja, tidak ada data yang dikirim."
          />
        </div>
        <div data-reveal className="mt-8">
          <ProfitCalculator />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div data-reveal>
            <h3 className="font-serif text-title">Harga grosir</h3>
            {/* TODO: semua angka dari caption Instagram, verifikasi admin */}
            {wholesaleTable.map((row) => (
              <div
                key={row.product}
                className="mt-5 overflow-hidden rounded-[1.5rem] border border-line"
              >
                <table className="w-full text-sm">
                  <caption className="bg-surface px-5 py-3 text-left font-semibold">
                    {row.product}
                    {row.note && (
                      <span className="block text-xs font-normal text-muted">{row.note}</span>
                    )}
                  </caption>
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Jumlah
                      </th>
                      <th scope="col" className="px-5 py-3 text-right font-semibold">
                        Harga / pcs
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.tiers.map((t) => (
                      <tr key={t.minQty} className="border-b border-line last:border-0">
                        <td className="px-5 py-3">≥ {t.minQty} pcs</td>
                        <td className="px-5 py-3 text-right font-semibold">
                          {formatRupiah(t.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <ul className="mt-4 space-y-2 text-sm">
              {wholesaleFrom.map((w) => (
                <li
                  key={w.product}
                  className="flex flex-wrap justify-between gap-2 rounded-2xl bg-surface px-5 py-3"
                >
                  <span>{w.product}</span>
                  <span className="font-semibold">
                    mulai {formatRupiah(w.from)}
                    {w.minQty ? ` (min. ${w.minQty} pcs)` : ''}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-[2rem] bg-sage-soft p-7">
            <h3 className="font-serif text-title">Syarat singkat</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {resellerTerms.map((t) => (
                <li key={t} className="flex gap-2">
                  <span aria-hidden="true">✦</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="judul-faq" className="bg-surface/60 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHead id="judul-faq" eyebrow="FAQ" title="Yang sering ditanyakan" />
          {/* Akordeon native: aksesibel & jalan tanpa JavaScript */}
          <div data-reveal className="mt-8 divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-rose-soft transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang & kontak */}
      <section
        id="kontak"
        aria-labelledby="judul-kontak"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
      >
        <div
          data-reveal
          className="grid gap-8 rounded-[2.25rem] border border-line p-8 sm:p-12 md:grid-cols-[1.3fr_1fr]"
        >
          <div>
            <p className="eyebrow">Tentang & kontak</p>
            <h2 id="judul-kontak" className="mt-3 font-serif text-section">
              {site.tagline}, <em className="text-rose">dari {site.city}.</em>
            </h2>
            {/* TODO: cerita brand asli & konfirmasi hubungan dengan @bohoutfit */}
            <p className="mt-4 max-w-lg leading-relaxed text-muted">
              Farwa Hijab hadir untuk Kakak yang ingin tampil rapi dan syar’i dengan hijab
              berkualitas tanpa biaya besar. Bagian dari {site.parentBrand}, melayani eceran lewat
              Shopee dan grosir lewat WhatsApp.
            </p>
          </div>
          <ul className="space-y-3 self-center text-sm">
            <li>
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...external}
                className="flex min-h-12 items-center gap-3 rounded-full bg-mocha px-5 font-bold text-background hover:bg-mocha-strong"
              >
                <WhatsAppIcon className="size-5" />
                WhatsApp {site.waDisplay}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a
                href={config.shopeeUrl}
                {...external}
                className="flex min-h-12 items-center gap-3 rounded-full bg-shopee px-5 font-bold text-white hover:bg-shopee-strong"
              >
                <ShopeeIcon className="size-5" />
                Toko Shopee Farwaheejab
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                {...external}
                className="flex min-h-12 items-center gap-3 rounded-full border border-line px-5 font-semibold hover:border-mocha"
              >
                Instagram {site.handle}
                <span className="sr-only"> (tab baru)</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
