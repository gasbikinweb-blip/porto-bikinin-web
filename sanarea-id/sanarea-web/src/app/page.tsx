import Image from 'next/image';
import { Catalog } from '@/components/Catalog';
import { FeaturedCollection } from '@/components/FeaturedCollection';
import { HeroShowcase } from '@/components/HeroShowcase';
import { JsonLd } from '@/components/JsonLd';
import { StoreSlideshow } from '@/components/StoreSlideshow';
import { StoreStatus } from '@/components/StoreStatus';
import { faqs } from '@/data/faq';
import { img } from '@/data/images';
import { moments } from '@/data/moments';
import { getProduct } from '@/data/products';
import { activePromos } from '@/data/promos';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const printed = getProduct('printed-shawl-marble')!;
const printedDetail = img(
  'produk/printed-swatch',
  'Detail motif marmer Printed Shawl dalam lima warna',
);
const story = img(
  'editorial/naleea-duo',
  'Dua model memakai Naleea Khiban Rayon warna pink lembut',
);
const storePhotos = [
  img('toko/lokasi-1', 'Tampak depan toko SANARÉA dengan etalase kaca dan papan sambutan'),
  img(
    'toko/lokasi-2',
    'Etalase kaca SANARÉA bertuliskan jam buka Senin sampai Minggu 11.00 sampai 21.00',
  ),
  img('toko/lokasi-3', 'Logo SANARÉA A Modest Soul Essentials di kaca etalase toko'),
  img('toko/lokasi-4', 'Toko SANARÉA Blok D10 di siang hari'),
];

function Heading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-caps mt-4 text-3xl sm:text-4xl">{title}</h2>
      {text && <p className="mt-5 leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

const steps = [
  { t: 'Pilih produk & warna', d: 'Buka detail produk, pilih warna dan jumlah yang Kakak mau.' },
  {
    t: 'Kirim pesanan',
    d: 'Tekan "Pesan via WhatsApp", atau datang langsung ke toko kami di Cianjur.',
  },
  // TODO: konfirmasi metode pembayaran & pengiriman
  { t: 'Konfirmasi', d: 'Admin akan mengonfirmasi stok, total, pembayaran, dan pengiriman.' },
];

export default function Home() {
  const promos = activePromos();
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ClothingStore',
          name: site.name,
          slogan: site.tagline,
          description: site.description,
          url: siteConfig.url,
          image: new URL('/og.jpg', siteConfig.url).href,
          telephone: `+${siteConfig.waNumber}`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.addressDetail.street,
            addressLocality: site.addressDetail.city,
            addressRegion: site.addressDetail.region,
            addressCountry: site.addressDetail.country,
          },
          openingHours: 'Mo-Su 11:00-21:00',
          sameAs: [site.instagram, site.threads],
        }}
      />

      <HeroShowcase product={printed} detail={printedDetail} />

      {/* Koleksi */}
      <section id="koleksi" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <Heading
          eyebrow="Collection"
          title="Lini Produk"
          text="Dari pashmina motif sampai bandana instan, pilih lini favorit Kakak."
        />
        <div className="mt-16">
          <FeaturedCollection />
        </div>
      </section>

      {/* Promo (hanya tampil di rentang tanggal) */}
      {promos.length > 0 && (
        <section id="sale" className="bg-ink py-14 text-center text-background">
          {promos.map((p) => (
            <p key={p.id} className="display-caps text-2xl">
              {p.title}
            </p>
          ))}
        </section>
      )}

      {/* Katalog */}
      <section id="katalog" className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
          <div className="reveal max-w-xl">
            <p className="eyebrow">Koleksi</p>
            <h2 className="mt-3 font-serif text-4xl font-light sm:text-5xl">
              Semua koleksi Sanaréa
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Pilih kategori atau warna favorit, lalu klik produk untuk lihat detail dan memesan.
            </p>
          </div>
          <div className="mt-10">
            <Catalog />
          </div>
        </div>
      </section>

      {/* Cerita brand */}
      <section
        id="tentang"
        className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-24 sm:px-8 sm:py-32 md:grid-cols-2 md:gap-20"
      >
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface shadow-[0_30px_60px_-35px_rgb(30_28_26/0.45)]">
          <Image
            src={story.src}
            alt={story.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="reveal">
          <p className="eyebrow">Our Story</p>
          <h2 className="display-caps mt-4 text-3xl leading-snug sm:text-4xl">
            Where elegance meets modesty
          </h2>
          {/* Ditulis ulang dari caption IG (pembukaan toko & koleksi). TODO: cerita & tahun berdiri dari pemilik */}
          <div className="mt-8 space-y-5 leading-relaxed text-muted">
            <p>
              SANARÉA lahir dari keinginan sederhana: menghadirkan hijab yang tenang, lembut, dan
              mudah dipadukan. Setiap koleksi dibuat untuk menumbuhkan rasa percaya diri dalam
              keseharian.
            </p>
            <p>
              Kami memilih bahan seperti viscose dan rayon premium yang ringan, adem, dan jatuh
              dengan anggun, lalu menghadirkannya dalam palet warna earth tone dan pastel yang tak
              lekang waktu.
            </p>
            <p>
              Pertengahan 2026, kami membuka rumah pertama kami di Cianjur. Kakak bisa datang,
              menyentuh kainnya, dan memilih warna secara langsung.
            </p>
          </div>
        </div>
      </section>

      {/* Moments */}
      <section id="moments" className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
          <Heading
            eyebrow="Sanaréa Moments"
            title="Sampai Jumpa di Booth"
            text="Sesekali kami hadir di Car Free Day dan event di Cianjur."
          />
          <ul data-stagger className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {moments.map((m) => (
              <li key={m.src} className="reveal">
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-surface">
                    <Image
                      src={m.thumb}
                      alt={m.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="eyebrow mt-3">{m.label}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Toko */}
      <section
        id="toko"
        className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-24 sm:px-8 sm:py-32 md:grid-cols-2 md:gap-20"
      >
        <div className="reveal md:order-2">
          <p className="eyebrow">Visit Our Store</p>
          <h2 className="display-caps mt-4 text-3xl sm:text-4xl">Kunjungi Toko</h2>
          <div className="mt-6">
            <StoreStatus />
          </div>
          <dl className="mt-8 space-y-6">
            <div>
              <dt className="eyebrow">Alamat</dt>
              <dd className="mt-2 font-serif text-xl font-light">{site.address}</dd>
            </div>
            <div>
              <dt className="eyebrow">Jam buka</dt>
              <dd className="mt-2 font-serif text-xl font-light">{site.hoursText}</dd>
            </div>
          </dl>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={site.mapsUrl} {...external} className="btn btn-solid">
              Buka Google Maps<span className="sr-only"> (tab baru)</span>
            </a>
            <a href={buildWhatsAppLink(generalMessage)} {...external} className="btn btn-line">
              Chat WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        </div>
        <div className="reveal">
          <StoreSlideshow images={storePhotos} />
        </div>
      </section>

      {/* Cara order */}
      <section id="cara-order" className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-8">
          <Heading eyebrow="How to Order" title="Cara Order" />
          <ol data-stagger className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.t} className="reveal text-center">
                <span className="font-serif text-4xl font-light text-rose-ink">0{i + 1}</span>
                <h3 className="mt-3 text-sm tracking-[0.2em] uppercase">{s.t}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto w-full max-w-3xl px-4 py-24 sm:px-8 sm:py-32">
        <Heading eyebrow="FAQ" title="Pertanyaan" />
        <div className="reveal mt-12 divide-y divide-line border-y border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-lg font-light">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-xl text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
