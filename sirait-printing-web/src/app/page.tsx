import Image from 'next/image';
import { Calculator } from '@/components/Calculator';
import { Gallery } from '@/components/Gallery';
import { VideoGrid } from '@/components/VideoGrid';
import { LineIcon, WhatsAppIcon, iconPaths } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { OrderForm } from '@/components/OrderForm';
import { faq } from '@/data/faq';
import { gallery, storePhoto } from '@/data/gallery';
import {
  PRICE_UPDATED_AT,
  calcRules,
  formatRupiah,
  getPrice,
  priceGroups,
  prices,
  type PriceGroup,
} from '@/data/prices';
import { services } from '@/data/services';
import { videos } from '@/data/videos';
import { fullAddress, hoursText, site } from '@/data/site';
import { config } from '@/lib/config';
import { buildWhatsAppLink, defaultMessage, serviceMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
const waLink = buildWhatsAppLink(defaultMessage);
const normal = getPrice('print-75');
const promo = getPrice('print-promo');
const hero = gallery[0];

const updatedAt = new Date(`${PRICE_UPDATED_AT}T00:00:00`).toLocaleDateString('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// Structured data LocalBusiness (dirender tanpa dangerouslySetInnerHTML, lihat JsonLd.tsx)
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  description: site.description,
  url: config.siteUrl,
  image: new URL('/images/og.jpg', config.siteUrl).href,
  telephone: `+${config.waNumber}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: 'ID',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: site.hours.open.replace('.', ':'),
    closes: site.hours.close.replace('.', ':'),
  },
  sameAs: [site.instagram, site.threads],
};

const steps = [
  {
    title: 'Kirim file via WhatsApp',
    text: 'Kirim file proposal/skripsi kamu. PDF lebih aman supaya tata letak tidak bergeser.',
  },
  {
    title: 'Sebutkan rangkap & jilid',
    text: 'Tulis jumlah rangkap, hitam putih/warna, dan mau jilid biasa atau lux.',
  },
  { title: 'Admin konfirmasi', text: 'Admin kasih tahu total biaya dan kira-kira kapan selesai.' },
  {
    title: 'Ambil atau diantar',
    text: 'Ambil langsung di toko, atau minta diantar untuk pesanan tertentu.', // TODO: konfirmasi syarat antar & ongkir
  },
];

const perks = [
  { icon: iconPaths.palette, text: 'Warna = hitam putih, sama harga' },
  { icon: iconPaths.bolt, text: 'Cepat & rapi' },
  { icon: iconPaths.truck, text: 'Bisa diantar' },
];

const groups = Object.keys(priceGroups) as PriceGroup[];

function SectionTitle({
  id,
  kicker,
  title,
  text,
}: {
  id: string;
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="inline-block -rotate-1 rounded-md bg-yellow px-2.5 py-1 text-xs font-extrabold tracking-wide text-ink uppercase">
        {kicker}
      </p>
      <h2 id={id} className="mt-3 font-display text-section font-extrabold tracking-tight">
        {title}
      </h2>
      {text && <p className="mt-3 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusiness} />

      {/* ---------- Hero ---------- */}
      <section id="beranda" aria-labelledby="judul" className="overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1.5 text-sm font-semibold">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#1f9e4f] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-[#1f9e4f]" />
              </span>
              Buka {hoursText.toLowerCase()}
            </p>
            <h1 id="judul" className="mt-5 font-display text-hero font-extrabold tracking-tight">
              Print Skripsi Mulai {/* Harga + satuan tidak boleh terpisah baris */}
              <span className="whitespace-nowrap">
                <span className="relative inline-block">
                  <span className="relative z-10 text-red">{formatRupiah(promo.price ?? 0)}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.35em] -rotate-1 bg-yellow"
                  />
                </span>
                <span className="text-[0.45em] text-muted">/lembar</span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Hitam putih atau warna <strong className="text-ink">sama harganya</strong>:{' '}
              {formatRupiah(normal.price ?? 0)}/lembar, dan {formatRupiah(promo.price ?? 0)} untuk
              sempro/semhas/sidang minimal {calcRules.promoMinCopies} rangkap. Buka sampai malam,
              dekat kampus.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                {...external}
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-red px-7 text-base font-bold text-white shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 hover:bg-red-strong"
              >
                <WhatsAppIcon className="size-5" />
                Kirim File via WhatsApp
                <span className="sr-only"> (tab baru)</span>
              </a>
              <a
                href="#lokasi"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border-2 border-ink bg-background px-7 text-base font-bold transition-colors hover:bg-ink hover:text-white"
              >
                <LineIcon d={iconPaths.pin} className="size-5" />
                Lihat Lokasi
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {perks.map((p) => (
                <li key={p.text} className="flex items-center gap-2">
                  <LineIcon d={p.icon} className="size-5 text-red" />
                  {p.text}
                </li>
              ))}
            </ul>
          </div>

          {hero && (
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-square rotate-2 overflow-hidden rounded-[2rem] border-4 border-ink bg-surface-2 shadow-[8px_8px_0_var(--red)]">
                <Image
                  src={hero.src}
                  alt={hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-2 -rotate-6 rounded-2xl border-4 border-ink bg-yellow px-4 py-3 text-ink shadow-[4px_4px_0_var(--ink)] sm:-left-6">
                <p className="text-xs font-bold uppercase">Jilid lux mulai</p>
                <p className="font-display text-2xl font-extrabold">
                  {formatRupiah(getPrice('lux-10').price ?? 0)}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Layanan ---------- */}
      <section id="layanan" aria-labelledby="judul-layanan" className="bg-surface py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* Kiri: judul + ajakan */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-extrabold tracking-[0.2em] text-red uppercase">
              Layanan Sirait Printing
            </p>
            <h2
              id="judul-layanan"
              className="mt-4 font-display text-section font-extrabold tracking-tight"
            >
              Semua kebutuhan tugas akhir, di satu tempat
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
              Dari print proposal sampai jilid lux untuk sidang. Kirim file sekali, sisanya kami
              yang urus.
            </p>
            <a
              href={waLink}
              {...external}
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-red px-6 font-bold text-white transition-colors hover:bg-red-strong"
            >
              <WhatsAppIcon className="size-5" />
              Tanya Layanan via WA
              <span className="sr-only"> (tab baru)</span>
            </a>
          </div>

          {/* Kanan: grid bergaris */}
          <ul className="grid overflow-hidden rounded-3xl border border-line bg-background sm:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.id}
                className={`border-line ${i > 0 ? 'border-t' : ''} ${i === 1 ? 'sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''}`}
              >
                <a
                  href={buildWhatsAppLink(serviceMessage(s.name.toLowerCase()))}
                  {...external}
                  className="group flex h-full flex-col p-6 transition-colors hover:bg-yellow-soft sm:p-7"
                >
                  <LineIcon d={s.icon} className="size-7 text-red" />
                  <h3 className="mt-5 font-display text-xl font-bold">{s.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                  <span className="mt-4 text-sm font-bold text-red opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    Tanya via WA →
                  </span>
                  <span className="sr-only"> (tanya {s.name} via WhatsApp, tab baru)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Harga ---------- */}
      <section id="harga" aria-labelledby="judul-harga" className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            id="judul-harga"
            kicker="Daftar harga"
            title="Harga jelas, nggak bikin dompet nangis"
            text="Harga print proposal, skripsi, dan tesis sama untuk hitam putih maupun warna."
          />

          {/* Harga utama dibuat besar */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[normal, promo].map((p, i) => (
              <div
                key={p.id}
                className={`rounded-3xl border-4 border-ink p-6 sm:p-8 ${i === 1 ? 'bg-yellow shadow-[6px_6px_0_var(--red)]' : 'bg-background shadow-[6px_6px_0_var(--ink)]'}`}
              >
                <p className="font-bold">{p.label}</p>
                <p className="mt-2 font-display text-price font-extrabold text-red">
                  {formatRupiah(p.price ?? 0)}
                  <span className="ml-1 text-lg font-bold text-ink">
                    /{p.unit.replace('per ', '')}
                  </span>
                </p>
                {p.note && <p className="mt-2 text-sm font-semibold">{p.note}</p>}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {groups.map((g) => (
              <div key={g} className="rounded-2xl border border-line bg-background p-5">
                <h3 className="font-display text-lg font-bold">{priceGroups[g]}</h3>
                <table className="mt-2 w-full text-sm">
                  <caption className="sr-only">Harga {priceGroups[g]}</caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">Layanan</th>
                      <th scope="col">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prices
                      .filter((p) => p.group === g)
                      .map((p) => (
                        <tr key={p.id} className="border-t border-line first:border-0">
                          <th scope="row" className="py-3 pr-3 text-left align-top font-semibold">
                            {p.label}
                            {p.note && (
                              <span className="block text-xs font-normal text-muted">{p.note}</span>
                            )}
                          </th>
                          <td className="py-3 text-right align-top whitespace-nowrap">
                            {p.price === null ? (
                              <span className="text-muted">Tanya admin</span>
                            ) : (
                              <>
                                {p.from && <span className="block text-xs text-muted">mulai</span>}
                                <span className="font-display text-lg font-extrabold">
                                  {formatRupiah(p.price)}
                                </span>
                                <span className="block text-xs text-muted">{p.unit}</span>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl bg-yellow-soft px-4 py-3 text-sm">
            <strong>Harga dapat berubah, konfirmasi via WhatsApp.</strong> Terakhir diperbarui{' '}
            {updatedAt}.
          </p>
        </div>
      </section>

      {/* ---------- Kalkulator ---------- */}
      <section
        id="hitung"
        aria-labelledby="judul-hitung"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <SectionTitle
          id="judul-hitung"
          kicker="Hitung biaya"
          title="Hitung dulu, biar nggak kaget"
          text="Isi jumlah halaman dan rangkap, pilih jilidnya. Estimasi langsung muncul, lalu kirim rinciannya ke admin."
        />
        <div className="mt-10">
          <Calculator />
        </div>
      </section>

      {/* ---------- Cara order ---------- */}
      <section
        id="cara-order"
        aria-labelledby="judul-order"
        className="bg-red py-16 text-white sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="inline-block -rotate-1 rounded-md bg-yellow px-2.5 py-1 text-xs font-extrabold tracking-wide text-ink uppercase">
            Cara order
          </p>
          <h2
            id="judul-order"
            className="mt-3 font-display text-section font-extrabold tracking-tight"
          >
            Cuma 4 langkah, semua lewat WA
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white p-5 text-ink">
                <span className="grid size-11 place-items-center rounded-full bg-ink font-display text-lg font-extrabold text-yellow">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>

          <div id="format-order" className="mt-14 scroll-mt-20">
            <h3 className="font-display text-2xl font-extrabold sm:text-3xl">
              Biar cepat, isi format order ini
            </h3>
            <p className="mt-2 max-w-2xl text-white/85">
              Isi nama, link file, dan jam ambil. Pesan WhatsApp-nya tersusun otomatis, tinggal
              kirim.
            </p>
            <div className="mt-6">
              <OrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Galeri ---------- */}
      <section
        id="galeri"
        aria-labelledby="judul-galeri"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <SectionTitle
          id="judul-galeri"
          kicker="Galeri"
          title="Hasil jilid & suasana toko"
          text="Presisi, mulus, dan rapi. Putar videonya atau klik foto untuk memperbesar."
        />
        <h3 className="mt-10 font-display text-xl font-bold">Video dari toko</h3>
        <p className="mt-1 text-sm text-muted">Klik untuk putar · tanpa suara</p>
        <div className="mt-4">
          <VideoGrid videos={videos} />
        </div>
        <h3 className="mt-12 font-display text-xl font-bold">Foto hasil kerja</h3>
        <div className="mt-4">
          <Gallery images={gallery} />
        </div>
      </section>

      {/* ---------- Lokasi ---------- */}
      <section id="lokasi" aria-labelledby="judul-lokasi" className="bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle
              id="judul-lokasi"
              kicker="Lokasi & jam buka"
              title="Mampir ke Jl. Durung"
            />
            <dl className="mt-8 grid gap-4">
              <div className="flex gap-4 rounded-2xl bg-background p-5">
                <LineIcon d={iconPaths.pin} className="size-7 shrink-0 text-red" />
                <div>
                  <dt className="font-bold">Alamat</dt>
                  <dd className="mt-1 leading-relaxed text-muted">
                    <address className="not-italic">{fullAddress}</address>
                    {site.address.landmark}
                  </dd>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl bg-background p-5">
                <LineIcon d={iconPaths.clock} className="size-7 shrink-0 text-red" />
                <div>
                  <dt className="font-bold">Jam buka</dt>
                  <dd className="mt-1 text-muted">{hoursText}</dd>
                </div>
              </div>
            </dl>
          </div>
          <div className="overflow-hidden rounded-3xl border-4 border-ink bg-background shadow-[6px_6px_0_var(--ink)]">
            <div className="relative aspect-[4/3] border-b-4 border-ink bg-surface-2">
              <Image
                src={storePhoto.src}
                alt={storePhoto.alt}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-display text-2xl font-extrabold">Patokan gampang:</p>
              <p className="mt-2 text-lg leading-relaxed text-muted">
                Pas di depan <strong className="text-ink">SD-SMP Pahlawan</strong> Jl. Durung,
                setelah Gereja Katolik. <strong className="text-ink">{site.address.nearby}</strong>.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={site.mapsUrl}
                  {...external}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 font-bold text-white transition-colors hover:bg-red"
                >
                  <LineIcon d={iconPaths.pin} className="size-5" />
                  Buka Google Maps
                  <span className="sr-only"> (tab baru)</span>
                </a>
                <a
                  href={buildWhatsAppLink('Halo Sirait Printing, saya mau tanya arah ke toko.')}
                  {...external}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-ink px-6 font-bold transition-colors hover:bg-ink hover:text-white"
                >
                  <WhatsAppIcon className="size-5" />
                  Tanya arah via WA
                  <span className="sr-only"> (tab baru)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section
        id="faq"
        aria-labelledby="judul-faq"
        className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20"
      >
        <SectionTitle id="judul-faq" kicker="FAQ" title="Yang sering ditanyain" />
        {/* Akordeon native: aksesibel & jalan tanpa JavaScript */}
        <div className="mt-8 space-y-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border-2 border-line bg-background open:border-red"
            >
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-bold">
                {item.question}
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-yellow text-xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
