import Image from 'next/image';
import { Calculator } from '@/components/Calculator';
import { FaqList } from '@/components/FaqList';
import { Gallery } from '@/components/Gallery';
import { VideoShowcase } from '@/components/VideoShowcase';
import { HeroCarousel, type HeroCard } from '@/components/HeroCarousel';
import { ArrowIcon, PerkIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { OrderSteps } from '@/components/OrderSteps';
import { ProductCollection } from '@/components/ProductCollection';
import { SectionHeading } from '@/components/SectionHeading';
import { SocialLinks } from '@/components/SocialLinks';
import { WaButton } from '@/components/WaButton';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { faqs } from '@/data/faq';
import { guides } from '@/data/guides';
import { products, typeLabels } from '@/data/products';
import { gallery, videos, type GalleryItem } from '@/data/projects';
import { company, otherProducts, perks, sizes } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import { buildWhatsAppLink, defaultQuoteMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  description:
    'Produsen roster beton minimalis dan bata tempel langsung dari pabrik. Puluhan motif, ukuran 20×20 dan 15×30 cm, gratis ongkir Jabodetabek, bisa COD. Tanya harga via WhatsApp.',
  path: '/',
});

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

const img = (id: string): GalleryItem => {
  const g = gallery.find((x) => x.id === id);
  if (!g) throw new Error(`Foto "${id}" tidak ditemukan`);
  return g;
};

const heroCards: HeroCard[] = [
  ['pemasangan-roster-terakota-area-duduk', 'Area duduk', 'Roster terakota'],
  ['pemasangan-roster-putih-teras', 'Dinding teras', 'Roster putih'],
  ['pemasangan-roster-krem-kafe', 'Kafe & resto', 'Roster krem'],
  ['pemasangan-roster-terakota-pagar', 'Pagar atas', 'Roster terakota'],
  ['pemasangan-roster-sirip-terakota', 'Dinding aksen', 'Roster sirip'],
].map(([id, title, note]) => {
  const g = img(id!);
  return { id: g.id, src: g.thumb, alt: g.alt, title: title!, note: note! };
});

const rosterCount = products.filter((p) => p.type !== 'bata').length;
const bataCount = products.filter((p) => p.type === 'bata').length;
const motifNames = products
  .filter((p) => p.type !== 'bata')
  .map((p) => p.name.replace('Roster ', ''));
const thumbs = [
  'roster-segitiga-tiga-warna',
  'roster-lingkaran-putih',
  'roster-sirip-krem-abu',
  'roster-bintang-putih-abu',
].map(img);

// Website satu halaman (landing page): semua konten berupa section dengan anchor id
export default function HomePage() {
  const roster = img('roster-motif-lengkung-abu');
  const bata = img('bata-tempel-bevel-putih-abu');
  const bannerA = img('pemasangan-bata-tempel-dinding');
  const bannerB = img('roster-sirip-terakota');

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-10 pb-16 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-16 lg:pb-24">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-medium text-ink shadow-sm">
              <span className="grid size-7 place-items-center rounded-full bg-gold-soft">
                <span className="size-2.5 rounded-full bg-gold" />
              </span>
              Produsen roster beton, langsung dari pabrik
            </p>
            <h1 className="mt-6 font-display text-[2.5rem] leading-[1.08] font-bold tracking-tight text-ink sm:text-[3.4rem]">
              Roster beton minimalis <span className="text-brand">untuk dinding yang bernapas</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-muted">
              Udara dan cahaya masuk, pandangan dari luar tersaring. Pilih dari {rosterCount} motif
              roster serta bata tempel, dikirim ke lokasi proyek Anda di Jabodetabek.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <WaButton>Minta Penawaran</WaButton>
              <a
                href="#produk"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline underline-offset-4 hover:text-brand"
              >
                Lihat semua produk <ArrowIcon />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <ul className="flex -space-x-3" aria-hidden="true">
                {thumbs.map((t) => (
                  <li
                    key={t.id}
                    className="relative size-11 overflow-hidden rounded-full border-2 border-surface bg-white"
                  >
                    <Image src={t.thumb} alt="" fill sizes="44px" className="object-cover" />
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-snug">
                <span className="block font-display text-base font-bold text-ink">
                  {sizes.length} pilihan ukuran
                </span>
                <span className="text-muted">{sizes.join(' · ')}</span>
              </p>
            </div>
          </div>
          <div className="min-w-0">
            <HeroCarousel cards={heroCards} />
          </div>
        </div>
      </section>

      {/* ============ Keunggulan layanan ============ */}
      <section aria-label="Keunggulan layanan" className="border-b border-line">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6" data-stagger>
          {perks.map((p) => (
            <li key={p.title} className="reveal flex items-center gap-4">
              <PerkIcon name={p.icon} className="size-11 shrink-0 text-brand" />
              <div>
                <h2 className="font-display text-base font-bold text-ink">{p.title}</h2>
                <p className="text-sm text-muted">{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ Kategori (bento) ============ */}
      <section
        aria-label="Kategori produk"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <a
            href="#produk"
            className="reveal reveal-left group relative flex min-h-[26rem] overflow-hidden rounded-3xl bg-surface p-7 sm:p-9 lg:row-span-2"
          >
            <div className="relative z-10 max-w-[13rem]">
              <p className="inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-ink">
                <span className="font-bold text-gold-ink">{rosterCount}</span> motif
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-ink">Roster Beton</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Ventilasi dekoratif untuk fasad, pagar, dan partisi.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {motifNames.slice(0, 8).map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div className="absolute inset-y-0 right-0 w-[58%]">
              <Image
                src={roster.src}
                alt={roster.alt}
                fill
                sizes="(min-width: 1024px) 320px, 58vw"
                className="object-cover object-left mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </a>

          <a
            href="#produk"
            className="reveal reveal-right group relative flex min-h-60 overflow-hidden rounded-3xl bg-surface p-7 sm:p-9"
          >
            <div className="relative z-10 max-w-[12rem]">
              <p className="inline-block rounded-full bg-white px-3 py-1 text-sm font-medium text-ink">
                <span className="font-bold text-gold-ink">{bataCount}</span> jenis
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-ink">Bata Tempel</h2>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                <li>Bata tempel bevel</li>
                <li>Bata tempel terakota</li>
                <li>Stok siap kirim</li>
              </ul>
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2">
              <Image
                src={bata.thumb}
                alt={bata.alt}
                fill
                sizes="(min-width: 1024px) 280px, 50vw"
                className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </a>

          <div className="reveal reveal-right rounded-3xl bg-night p-7 text-white sm:p-9">
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
              Produk lainnya
            </p>
            <ul className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {otherProducts.map((o) => (
                <li key={o.title}>
                  <h3 className="font-display text-lg font-bold">{o.title}</h3>
                  <p className="text-sm text-white/70">{o.description}</p>
                </li>
              ))}
            </ul>
            <WaButton
              variant="light"
              className="mt-6 min-h-11 py-2 text-sm"
              message={`Halo ${siteConfig.name}, saya ingin menanyakan wall panel / lisplang beton / produk lainnya.`}
            >
              Tanya produk lain
            </WaButton>
          </div>
        </div>
      </section>

      {/* ============ Koleksi produk ============ */}
      <section id="produk" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6 sm:pb-28">
        <SectionHeading
          eyebrow="Produk kami"
          title="Koleksi"
          highlight="motif roster"
          align="center"
        />
        <div className="mt-8">
          <ProductCollection products={products} labels={typeLabels} />
        </div>
      </section>

      {/* ============ Banner partai besar ============ */}
      <section aria-label="Pesanan partai besar" className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <div className="reveal reveal-left flex flex-col justify-center rounded-3xl bg-surface p-8 sm:p-12">
            <p className="text-sm font-medium text-gold-ink">Untuk kontraktor & developer</p>
            <h2 className="mt-3 font-display text-3xl leading-tight font-bold text-ink sm:text-[2.6rem]">
              Pesan partai besar, <span className="text-brand">harga bisa dibicarakan</span>
            </h2>
            <p className="mt-4 max-w-md text-muted">
              Kirim gambar kerja atau perkiraan luas dinding. Kami hitung kebutuhan roster dan
              ongkos kirimnya, lalu kirim penawaran tertulis.
            </p>
            <div className="mt-7">
              <WaButton
                message={`Halo ${siteConfig.name}, saya ingin penawaran roster untuk partai besar / proyek.`}
              >
                Minta Harga Proyek
              </WaButton>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[bannerA, bannerB].map((b) => (
              <div
                key={b.id}
                className="reveal reveal-mask parallax relative aspect-[3/4] overflow-hidden rounded-3xl bg-surface lg:aspect-auto"
              >
                <Image
                  src={b.thumb}
                  alt={b.alt}
                  fill
                  sizes="(min-width: 1024px) 240px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Galeri ============ */}
      <section
        id="galeri"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
      >
        <SectionHeading
          eyebrow="Galeri"
          title="Roster di dinding"
          highlight="sungguhan"
          description="Foto produk dan contoh pemasangan. Klik foto untuk melihat lebih besar."
        />
        <div className="mt-10">
          <Gallery items={gallery} />
        </div>
      </section>

      {/* ============ Video ============ */}
      <section
        id="video"
        aria-labelledby="video-judul"
        className="scroll-mt-20 overflow-hidden bg-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="reveal inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft px-4 py-1.5 text-xs font-semibold text-gold-ink">
              <span aria-hidden="true" className="size-2 rounded-full bg-gold" />
              Video asli dengan audio • {videos.length} video
            </p>
            <h2
              id="video-judul"
              className="reveal mt-5 font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance text-ink sm:text-5xl"
            >
              Lihat langsung <span className="text-brand">dari lapangan</span>
            </h2>
            <p className="reveal mt-4 text-muted">
              Klik kartu untuk memutar video pemasangan dan stok di pabrik kami, lengkap dengan
              suara aslinya.
            </p>
          </div>
          <div className="mt-8">
            <VideoShowcase videos={videos} />
          </div>
        </div>
      </section>

      {/* ============ Panduan + kalkulator ============ */}
      <section id="panduan" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHeading
            eyebrow="Panduan"
            title="Roster mana yang cocok"
            highlight="untuk bangunan Anda?"
            description="Titik awal memilih motif sesuai kebutuhan. Kami bantu konfirmasi lewat WhatsApp."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-stagger>
            {guides.map((g) => (
              <article key={g.id} className="reveal rounded-2xl bg-white p-7">
                <h3 className="font-display text-lg font-bold text-ink">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.need}</p>
                <p className="mt-4 border-t border-line pt-4 text-sm text-ink">
                  <span className="font-semibold">Rekomendasi: </span>
                  {g.recommendation}
                </p>
              </article>
            ))}
          </div>
          <div className="reveal reveal-zoom mx-auto mt-16 max-w-3xl">
            <h3 className="mb-6 text-center font-display text-2xl font-bold text-ink">
              Estimasi kebutuhan roster
            </h3>
            <Calculator
              products={products.map(({ slug, name, piecesPerM2 }) => ({
                slug,
                name,
                piecesPerM2,
              }))}
              siteName={siteConfig.name}
            />
          </div>
        </div>
      </section>

      <OrderSteps />

      {/* ============ FAQ ============ */}
      <section id="faq" className="scroll-mt-20 bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang"
            highlight="sering diajukan"
            align="center"
          />
          <div className="reveal reveal-zoom mt-10">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      {/* ============ Kontak + pembuat pesan WA ============ */}
      <section
        id="kontak"
        className="mx-auto grid w-full max-w-6xl scroll-mt-20 gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.2fr]"
      >
        <div>
          <SectionHeading
            eyebrow="Kontak"
            title="Hubungi"
            highlight="kami"
            description="Cara tercepat mendapatkan harga dan penawaran adalah lewat WhatsApp."
          />
          <dl className="mt-8 grid gap-5">
            <div>
              <dt className="font-display font-bold text-ink">WhatsApp</dt>
              <dd>
                <a
                  href={buildWhatsAppLink(defaultQuoteMessage)}
                  {...ext}
                  className="text-brand hover:underline"
                >
                  {company.waDisplay} <span className="sr-only">(tab baru)</span>
                </a>
              </dd>
            </div>
            {company.address && (
              <div>
                <dt className="font-display font-bold text-ink">Alamat</dt>
                <dd className="text-muted">
                  {company.address}{' '}
                  {/* Sengaja tanpa embed iframe Google Maps (privasi & CSP); cukup link keluar */}
                  {company.mapsUrl && (
                    <a
                      href={company.mapsUrl}
                      {...ext}
                      className="font-semibold text-brand hover:underline"
                    >
                      Buka peta <span className="sr-only">(tab baru)</span>
                    </a>
                  )}
                </dd>
              </div>
            )}
            {company.hours.length > 0 && (
              <div>
                <dt className="font-display font-bold text-ink">Jam kerja</dt>
                <dd>
                  <ul className="text-muted">
                    {company.hours.map((h) => (
                      <li key={h.day}>
                        {h.day}: {h.time}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            <div>
              <dt className="font-display font-bold text-ink">Area pengiriman</dt>
              <dd className="text-muted">{company.serviceAreas.join(' · ')}</dd>
            </div>
          </dl>
          <div className="mt-8">
            <p className="mb-3 font-display font-bold text-ink">Ikuti & belanja di</p>
            <SocialLinks withLabel />
          </div>
        </div>
        <div className="reveal reveal-right rounded-3xl bg-surface p-6 sm:p-8">
          <h3 className="mb-6 font-display text-2xl font-bold text-ink">Susun pesan penawaran</h3>
          <WaMessageBuilder productNames={products.map((p) => p.name)} siteName={siteConfig.name} />
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        }}
      />
    </>
  );
}
