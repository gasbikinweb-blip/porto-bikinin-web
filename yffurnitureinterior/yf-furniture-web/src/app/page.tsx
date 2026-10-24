import Image from 'next/image';
import { CatalogTabs } from '@/components/CatalogTabs';
import { FeaturedWorks } from '@/components/FeaturedWorks';
import { HeroShowcase } from '@/components/HeroShowcase';
import { WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { ProcessCards, type ProcessStep } from '@/components/ProcessCards';
import { WhatsAppBuilder } from '@/components/WhatsAppBuilder';
import { faq } from '@/data/faq';
import { fullAddress, site } from '@/data/site';
import { getWork, works } from '@/data/works';
import { activeCategories, categoryNames } from '@/lib/catalog';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const waLink = buildWhatsAppLink(generalMessage);

const heroWorks = [
  'backdrop-tv-led-full-plafon',
  'kitchen-set-abu-top-marmer',
  'wardrobe-walk-in-meja-rias-led',
  'set-kamar-backdrop-tv-panel-daun',
].map(getWork);

// Structured data LocalBusiness (dirender tanpa dangerouslySetInnerHTML, lihat JsonLd.tsx)
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: site.name,
  description: site.description,
  url: config.siteUrl,
  image: new URL(getWork('backdrop-tv-led-full-plafon').cover.src, config.siteUrl).href,
  logo: new URL('/brand/logo-512.png', config.siteUrl).href,
  telephone: `+${config.waNumber}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: `${site.address.district}, ${site.address.city}`,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'ID',
  },
  areaServed: site.serviceAreas.slice(0, -1),
  sameAs: [site.instagram, site.threads],
};

const processSteps: ProcessStep[] = [
  {
    title: 'Ukuran Custom',
    label: 'Langkah pertama',
    subtitle: 'Dibuat pas dengan ruangan',
    text: 'Kirim ukuran dan contoh model. Setiap furnitur dibuat by order sesuai ruang Anda.',
    work: getWork('kitchen-set-abu-top-marmer'),
  },
  {
    title: 'Produksi Workshop',
    label: 'Dikerjakan sendiri',
    subtitle: 'Langsung di Boyolali',
    text: 'Diproduksi sendiri di workshop kami di Selodoko, Ampel, tanpa perantara.',
    work: getWork('ranjang-tingkat-anak-lemari'),
  },
  {
    title: 'Kirim ke Lokasi',
    label: 'Sampai di tempat',
    subtitle: 'Siap kirim ke luar kota',
    text: 'Pesanan dikirim ke lokasi Anda, termasuk luar kota lewat ekspedisi kargo.', // TODO: konfirmasi jasa pasang
    work: getWork('backdrop-ruang-pelayanan-kantor-desa'),
  },
];

// Mengapa: 3 kartu foto + 3 baris link
const reasonCards = [
  {
    title: 'Ukuran & Model Custom',
    text: 'Dimensi, warna, dan motif finishing disesuaikan dengan ruang Anda.',
    work: getWork('wardrobe-walk-in-meja-rias-led'),
    icon: 'M3 17 17 3l4 4L7 21H3v-4Zm11-11 4 4',
  },
  {
    title: 'Langsung dari Workshop',
    text: 'Dikerjakan sendiri oleh tim kami di Boyolali, tanpa perantara.',
    work: getWork('meja-tv-minimalis-kayu-putih'),
    icon: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6',
  },
  {
    // Sumber: caption Instagram. TODO: konfirmasi pemilik sebelum rilis
    title: 'Plywood & HPL',
    text: 'Bahan plywood melamin & blockboard, bukan MDF/particle board, finishing HPL.',
    work: getWork('kitchen-set-abu-top-marmer'),
    icon: 'M4 7l8-4 8 4-8 4-8-4Zm0 5 8 4 8-4M4 17l8 4 8-4',
  },
];

const reasonLinks = [
  {
    title: 'Free Desain & Cek Lokasi',
    href: '#kontak',
    icon: 'M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  },
  {
    title: 'Langkah Pemesanan',
    href: '#cara-pesan',
    icon: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01',
  },
  { title: 'Lihat Katalog', href: '#katalog', icon: 'M4 20h16M6 16V8l6-4 6 4v8' },
];

const steps = [
  {
    title: 'Kirim ukuran & contoh',
    text: 'Kirim ukuran ruangan dan foto model yang Anda suka lewat WhatsApp.',
  },
  {
    title: 'Diskusi desain & harga',
    text: 'Kami bantu tentukan model, warna, dan detail, lalu kirim penawaran harga.',
  },
  {
    title: 'Produksi di workshop',
    text: 'Setelah sepakat, furnitur dikerjakan di workshop kami di Boyolali.',
  },
  { title: 'Kirim / pasang', text: 'Pesanan dikirim ke lokasi Anda, termasuk luar kota.' }, // TODO: konfirmasi jasa pasang
];

// Bento karya pilihan: kategori pertama tampil sebagai kartu besar
const featuredGroups = ['interior-ruangan', 'rak-kabinet', 'tv-panel-backdrop'].flatMap((slug) => {
  const c = activeCategories.find((x) => x.slug === slug);
  if (!c) return [];
  const items = works.filter((w) => w.category === slug && w.status === 'selesai');
  return [{ slug, name: c.name, description: c.description, works: items }];
});

const inspiration = getWork('kamar-set-pink-estetik');
const inspirationImage = inspiration.images[3] ?? inspiration.cover;
const igPosts = works.filter((w) => w.status === 'selesai' && w.instagramUrl).slice(0, 4);
const aboutPhotos = [
  'set-kamar-backdrop-tv-panel-daun',
  'meja-tv-minimalis-kayu-putih',
  'meja-barbershop-hitam',
  'meja-credenza-laci-putih',
].map(getWork);

const btnDark =
  'inline-flex min-h-13 items-center justify-center gap-2 bg-foreground px-7 text-xs whitespace-nowrap font-semibold tracking-[0.18em] text-background uppercase transition-colors hover:bg-wood-strong';

// Judul section bergaya editorial: label kecil + judul serif dengan kata aksen miring
function Heading({
  id,
  eyebrow,
  title,
  accent,
  light = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
  light?: boolean;
}) {
  return (
    <div>
      <p className={`eyebrow ${light ? 'text-white/70!' : ''}`}>{eyebrow}</p>
      <h2 id={id} className="mt-4 font-serif text-display-2">
        {title}
        {accent && (
          <>
            <br />
            <em className={light ? 'text-brand-gold' : 'text-wood'}>{accent}</em>
          </>
        )}
      </h2>
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusiness} />

      <HeroShowcase works={heroWorks} categoryNames={categoryNames} />

      {/* ---------- Strip kategori ---------- */}
      <nav aria-label="Kategori" className="border-y border-line bg-surface">
        <ul className="mx-auto flex max-w-7xl gap-x-8 gap-y-2 overflow-x-auto [scrollbar-width:none] px-5 py-5 sm:flex-wrap sm:justify-center sm:px-6">
          {activeCategories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <a
                href={`#katalog-${c.slug}`}
                className="font-serif text-xl whitespace-nowrap text-foreground/80 hover:text-wood sm:text-2xl"
              >
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- Karya pilihan ---------- */}
      <section
        aria-labelledby="pilihan"
        className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-20"
      >
        <h2 id="pilihan" className="sr-only">
          Karya pilihan per kategori
        </h2>
        <FeaturedWorks groups={featuredGroups} categoryNames={categoryNames} />
      </section>

      {/* ---------- Tentang (gelap) ---------- */}
      <section
        id="tentang"
        aria-labelledby="judul-tentang"
        className="bg-ink py-20 text-white sm:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-2">
          <div>
            <Heading
              id="judul-tentang"
              eyebrow="Tentang kami"
              title="Dikerjakan langsung"
              accent="di workshop Boyolali."
              light
            />
            {/* TODO: ganti dengan cerita asli (tahun berdiri, nama pemilik, perjalanan usaha) */}
            <div className="mt-8 max-w-lg space-y-4 leading-relaxed text-white/75">
              <p>
                {site.name} adalah workshop pembuatan furnitur dan interior custom di Selodoko,
                Ampel, Boyolali. Kami mengerjakan pesanan by order: kitchen set, TV wall panel,
                lemari dan wardrobe, meja belajar, meja kasir, kamar set, hingga interior kantor dan
                ruang usaha.
              </p>
              <p>Setiap pesanan menyesuaikan ukuran ruangan, model, warna, dan budget Anda.</p>
            </div>
            <p className="eyebrow mt-10 text-white/60!">Area layanan</p>
            {/* TODO: konfirmasi area layanan */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {site.serviceAreas.map((a) => (
                <li key={a} className="border border-white/25 px-4 py-2 text-sm">
                  {a}
                </li>
              ))}
            </ul>
            <a
              href={waLink}
              {...external}
              className="mt-10 inline-flex min-h-13 items-center gap-2 bg-white px-7 text-xs font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:bg-brand-gold"
            >
              <WhatsAppIcon className="size-4" />
              Konsultasi gratis
              <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {aboutPhotos.map((w, i) => (
              <div
                key={w.slug}
                className={`relative aspect-[3/4] overflow-hidden ${i % 2 === 1 ? 'mt-10' : ''}`}
              >
                <Image
                  src={w.cover.thumb}
                  alt={w.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Proses ---------- */}
      <section aria-labelledby="proses" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <ProcessCards steps={processSteps} categoryNames={categoryNames} />
        </div>
      </section>

      {/* ---------- Mengapa ---------- */}
      <section
        aria-labelledby="mengapa"
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-28"
      >
        <p className="flex items-center gap-2 text-sm text-muted">
          <span className="size-1.5 rounded-full bg-brand-red" aria-hidden="true" /> Kenapa YF
        </p>
        <div className="mt-3 grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <h2 id="mengapa" className="max-w-2xl font-serif text-title">
            Mengapa memilih YF Furniture? Tiga hal yang kami pegang di setiap pesanan
          </h2>
          <p className="text-sm leading-relaxed text-muted">
            {works.length} karya terdokumentasi di katalog ini dan {site.instagramPosts} postingan
            di Instagram. Setiap pesanan kami kerjakan dengan ukuran dan detail yang Anda tentukan.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-[3fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-3">
            {reasonCards.map((r) => (
              <li key={r.title}>
                <a
                  href={`#katalog-${r.work.category}`}
                  className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-5 text-white"
                >
                  <Image
                    src={r.work.cover.thumb}
                    alt={r.work.cover.alt}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <span className="grid size-10 place-items-center rounded-full border border-white/40 backdrop-blur-sm">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden="true"
                    >
                      <path d={r.icon} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="mt-4 flex items-end justify-between gap-3">
                    <span>
                      <span className="block text-lg font-semibold">{r.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-white/75">
                        {r.text}
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-lg">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="grid gap-4">
            {reasonLinks.map((l) => (
              <li key={l.title}>
                <a
                  href={l.href}
                  className="flex h-full min-h-24 items-start justify-between gap-4 rounded-2xl bg-surface p-5 transition-colors hover:bg-surface-2"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-background">
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                      >
                        <path d={l.icon} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-lg leading-tight font-medium">{l.title}</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Inspirasi ---------- */}
      <section aria-labelledby="inspirasi" className="grid bg-surface lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[34rem]">
          <Image
            src={inspirationImage.src}
            alt={inspirationImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-20">
          <Heading
            id="inspirasi"
            eyebrow="Inspirasi ruang"
            title="Satu ruangan,"
            accent="satu konsep utuh."
          />
          <p className="mt-6 max-w-md leading-relaxed text-muted">
            Tidak hanya satu perabot. Kami juga mengerjakan interior satu ruangan: kamar tidur,
            ruang keluarga, hingga ruang pelayanan kantor, dengan warna dan detail yang senada.
          </p>
          <a
            href="#katalog-interior-ruangan"
            className="mt-8 inline-flex min-h-8 w-fit items-center gap-2 border-b border-foreground pb-1 text-xs font-semibold tracking-[0.18em] uppercase hover:border-wood hover:text-wood"
          >
            Lihat interior ruangan →
          </a>
        </div>
      </section>

      {/* ---------- Katalog ---------- */}
      <section
        id="katalog"
        aria-labelledby="judul-katalog"
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-28"
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow text-wood!">Katalog</p>
          <h2 id="judul-katalog" className="mt-4 font-serif text-display-2">
            Jelajahi per Kategori
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Semua karya bisa dibuat ulang dengan ukuran dan warna pilihan Anda. Klik karya untuk
            detail, lalu tanyakan langsung via WhatsApp.
          </p>
        </div>
        <div className="mt-10">
          <CatalogTabs
            works={works}
            tabs={activeCategories.map(({ slug, name, count }) => ({ slug, name, count }))}
            categoryNames={categoryNames}
          />
        </div>
      </section>

      {/* ---------- Ikuti kami ---------- */}
      <section
        aria-labelledby="ikuti"
        className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-28"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <Heading
              id="ikuti"
              eyebrow="Ikuti kami"
              title="Karya terbaru,"
              accent="setiap minggu."
            />
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Lihat hasil karya baru, proses pengerjaan, dan detail finishing di akun resmi kami.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { label: 'Instagram', href: site.instagram },
              { label: 'Threads', href: site.threads },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  {...external}
                  className="flex items-center justify-between border border-line px-5 py-5 transition-colors hover:border-foreground"
                >
                  <span>
                    <span className="eyebrow block">{s.label}</span>
                    <span className="mt-1 block font-serif text-xl">@yffurnitureinterior</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (membuka tab baru)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {igPosts.map((w) => (
            <li key={w.slug}>
              <a
                href={w.instagramUrl}
                {...external}
                className="group relative block aspect-square overflow-hidden bg-surface"
              >
                <Image
                  src={w.cover.thumb}
                  alt={w.cover.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 text-[11px] font-semibold tracking-[0.2em] text-white uppercase">
                  Lihat di Instagram
                </span>
                <span className="sr-only"> (membuka tab baru)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Cara pesan ---------- */}
      <section id="cara-pesan" aria-labelledby="judul-cara" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <Heading
              id="judul-cara"
              eyebrow="Cara pesan"
              title="Empat langkah,"
              accent="tanpa ribet."
            />
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Semua dilayani lewat WhatsApp, dari konsultasi sampai furnitur tiba di tempat Anda.
            </p>
            <a href={waLink} {...external} className={`mt-8 ${btnDark}`}>
              <WhatsAppIcon className="size-4" />
              Mulai konsultasi
              <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
            </a>
          </div>
          <ol className="grid gap-px bg-line sm:grid-cols-2">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-surface p-6 sm:p-8">
                <span className="font-serif text-4xl text-wood">{pad(i + 1)}</span>
                <h3 className="mt-4 font-serif text-display-3">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section
        id="faq"
        aria-labelledby="judul-faq"
        className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_1.6fr]"
      >
        <div>
          <p className="eyebrow">FAQ</p>
          <h2 id="judul-faq" className="mt-4 font-serif text-display-2">
            Pertanyaan yang sering diajukan
          </h2>
        </div>
        {/* Akordeon native: aksesibel & jalan tanpa JavaScript */}
        <div className="border-t border-line">
          {faq.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl sm:text-2xl">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-2xl text-wood transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Kontak / CTA ---------- */}
      <section id="kontak" aria-labelledby="judul-kontak" className="px-5 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 bg-ink p-6 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <Heading
              id="judul-kontak"
              eyebrow="Mulai proyek Anda"
              title="Konsultasi &"
              accent="tanya harga, gratis."
              light
            />
            <p className="mt-6 max-w-md leading-relaxed text-white/75">
              Ceritakan kebutuhan Anda: jenis furnitur, ukuran, dan warna. Kami balas dengan
              penawaran harga lewat WhatsApp.
            </p>
            <dl className="mt-10 grid gap-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-white/60!">WhatsApp</dt>
                <dd className="mt-2 font-serif text-2xl">
                  <a href={waLink} {...external} className="hover:text-brand-gold">
                    {site.waDisplay}
                    <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-white/60!">Jam kerja</dt>
                {/* TODO: konfirmasi jam kerja */}
                {site.hours.map((h) => (
                  <dd key={h.day} className="mt-2 text-white/80">
                    {h.day}: {h.time}
                  </dd>
                ))}
              </div>
              <div className="sm:col-span-2">
                <dt className="eyebrow text-white/60!">Alamat workshop</dt>
                <dd className="mt-2 leading-relaxed text-white/80">
                  <address className="not-italic">{fullAddress}</address>
                  <a
                    href={site.mapsUrl}
                    {...external}
                    className="mt-2 inline-block border-b border-white/40 pt-1.5 pb-1 text-xs font-semibold tracking-[0.18em] uppercase hover:border-brand-gold hover:text-brand-gold"
                  >
                    Buka di Google Maps ↗<span className="sr-only"> (tab baru)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="text-foreground">
            <WhatsAppBuilder />
          </div>
        </div>
      </section>
    </>
  );
}
