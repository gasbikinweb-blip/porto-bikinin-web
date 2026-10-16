// Landing page satu halaman: semua section ada di sini dan dinavigasi lewat anchor
import Image from 'next/image';
import { ClockIcon, InstagramIcon, PinIcon, TikTokIcon } from '@/components/icons';
import { HeroSlider } from '@/components/HeroSlider';
import { JsonLd } from '@/components/JsonLd';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { ServicesShowcase } from '@/components/ServicesShowcase';
import { WaLink } from '@/components/WaLink';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { faqs } from '@/data/faq';
import { portfolio } from '@/data/portfolio';
import { catalog, services } from '@/data/services';
import { site } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { generalMessage, itemMessage, promoMessage } from '@/lib/whatsapp';

const steps = [
  { title: 'Konsultasi', text: 'Kirim desain, ukuran, dan kebutuhan Anda lewat WhatsApp.' },
  { title: 'Penawaran harga', text: 'Kami kirim estimasi harga, bahan, dan waktu pengerjaan.' },
  { title: 'Pembayaran', text: `DP atau lunas via transfer ${site.bank}.` },
  { title: 'Produksi', text: 'Cutting laser, UV print, dan perakitan di workshop kami.' },
  {
    title: 'Kirim / ambil',
    text: 'Dikirim via ekspedisi ke seluruh Indonesia atau ambil di workshop.',
  },
] as const;

// TODO: verifikasi spesifikasi & kapasitas mesin
const capacities = [
  { value: 'Laser CO₂', label: 'Cutting & grafir akrilik hingga 10 mm' },
  { value: 'UV Flatbed', label: 'Cetak full color langsung di akrilik' },
  { value: 'Fiber Laser', label: 'Potong plat galvanis, stainless, besi' },
] as const;

function SectionTitle({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  const sub = dark ? 'text-silver' : 'text-steel';
  return (
    <div className="max-w-2xl">
      <p className={`text-xs font-bold tracking-[0.2em] uppercase ${sub}`}>{eyebrow}</p>
      <h2 id={id} className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {intro && <p className={`mt-3 ${sub}`}>{intro}</p>}
    </div>
  );
}

export default function HomePage() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: site.description,
    url: siteConfig.url,
    image: new URL('/og.jpg', siteConfig.url).href,
    telephone: `+${siteConfig.waNumber}`,
    sameAs: [site.instagram, site.tiktok],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: 'Indonesia',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={faqLd} />

      <HeroSlider />

      <ServicesShowcase services={services} />

      {/* ---------- Promo ---------- */}
      <section aria-labelledby="promo" className="bg-paper-2">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="relative aspect-4/5 w-40 shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/portfolio/promo-neon-box-umkm/01.webp"
                alt="Brosur promo neon box akrilik bulat dan kotak untuk UMKM"
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="inline-block rounded bg-ink px-2 py-1 text-xs font-bold tracking-wide text-paper uppercase">
                Promo UMKM
              </p>
              <h2 id="promo" className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Paket Neon Box UMKM Mulai Rp 400.000
              </h2>
              {/* TODO: verifikasi detail & masa berlaku promo */}
              <p className="mt-2 text-steel">
                Neon box akrilik bulat atau kotak, gratis tempat QRIS ukuran A6. Branding tidak
                harus mahal.
              </p>
            </div>
          </div>
          <WaLink message={promoMessage} variant="dark">
            Ambil Promo
          </WaLink>
        </div>
      </section>

      {/* ---------- Katalog ---------- */}
      <section aria-labelledby="katalog" className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
        <SectionTitle
          id="katalog"
          eyebrow="Katalog produk"
          title="Produk akrilik custom"
          intro="Ukuran, warna, dan desain bisa disesuaikan. Klik tombol untuk tanya harga langsung."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.map((c) => (
            <li key={c.id} className="flex flex-col overflow-hidden rounded-lg border border-line">
              <div className="relative aspect-4/5 bg-paper-2">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-bold">{c.name}</h3>
                <p className="mt-2 flex-1 text-sm text-steel">{c.description}</p>
                <p className="mt-3 text-sm font-semibold">
                  {c.priceNote ?? 'Harga sesuai ukuran & desain'}
                </p>
                <WaLink message={itemMessage(c.name)} variant="dark" className="mt-4">
                  Tanya Harga
                </WaLink>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Portofolio ---------- */}
      <section aria-labelledby="portofolio" className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <SectionTitle
            id="portofolio"
            eyebrow="Portofolio"
            title="Hasil kerja nyata"
            intro="Klik foto untuk melihat detail. Gunakan tombol panah keyboard untuk berpindah foto."
          />
          <div className="mt-8">
            <PortfolioGallery items={portfolio} />
          </div>
        </div>
      </section>

      {/* ---------- Cara pemesanan ---------- */}
      <section aria-labelledby="cara-pesan" className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <SectionTitle id="cara-pesan" eyebrow="Cara pemesanan" title="5 langkah mudah" dark />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-lg border border-line-dark bg-ink-2 p-5">
                <span className="text-3xl font-extrabold text-silver" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-silver">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Tentang ---------- */}
      <section aria-labelledby="tentang" className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle id="tentang" eyebrow="Tentang kami" title={siteConfig.name} />
            {/* TODO: lengkapi tahun berdiri & cerita singkat */}
            <div className="mt-5 space-y-4 text-steel">
              <p>
                {siteConfig.name} ({site.handle}) adalah bengkel custom akrilik di Surabaya yang
                fokus pada branding UMKM dan korporat: dari neon box toko, letter signage lobi, sign
                ruangan kantor, sampai merchandise dan display produk.
              </p>
              <p>
                Setiap pesanan dikerjakan di workshop sendiri dengan mesin cutting laser dan UV
                printing, sehingga kualitas, presisi, dan jadwal produksi bisa kami kontrol penuh.
              </p>
            </div>
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {capacities.map((c) => (
                <div key={c.value} className="rounded-lg border border-line p-4">
                  <dt className="font-bold">{c.value}</dt>
                  <dd className="mt-1 text-sm text-steel">{c.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <figure>
            <div className="relative aspect-4/5 overflow-hidden rounded-lg border border-line">
              <Image
                src="/klien/partner.webp"
                alt="Logo klien dan partner: PLN, Kementerian Agama, De Heus, Suweger, Telkomsel, Azarine, Jete, dan lainnya"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-sm text-steel">
              Sebagian klien &amp; partner yang pernah bekerja sama dengan kami.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section aria-labelledby="faq" className="border-t border-line bg-paper-2">
        <div className="mx-auto max-w-3xl px-4 py-16 lg:py-24">
          <SectionTitle id="faq" eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
          {/* <details>/<summary>: akordeon aksesibel bawaan HTML, tanpa JavaScript */}
          <div className="mt-8 divide-y divide-line rounded-lg border border-line bg-paper">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-xl text-steel transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-steel">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Kontak ---------- */}
      <section aria-labelledby="kontak" className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              id="kontak"
              eyebrow="Kontak"
              title="Konsultasi gratis via WhatsApp"
              intro="Ceritakan kebutuhan Anda, kami bantu pilih bahan, ukuran, dan desain yang pas."
            />
            <ul className="mt-8 space-y-5">
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 size-5 shrink-0 text-steel" />
                <div>
                  <p className="font-semibold">Workshop</p>
                  <address className="text-steel not-italic">
                    {site.address.street}, {site.address.city}, Jawa Timur
                  </address>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold underline underline-offset-4"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-steel" />
                <div>
                  <p className="font-semibold">Jam buka</p>
                  <dl className="text-steel">
                    {site.hours.map((h) => (
                      <div key={h.day} className="flex flex-wrap gap-x-2">
                        <dt>{h.day}:</dt>
                        <dd>{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
              <li className="flex gap-3">
                <InstagramIcon className="mt-0.5 size-5 shrink-0 text-steel" />
                <div>
                  <p className="font-semibold">Instagram</p>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-steel underline underline-offset-4 hover:text-ink"
                  >
                    {site.handle}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <TikTokIcon className="mt-0.5 size-5 shrink-0 text-steel" />
                <div>
                  <p className="font-semibold">TikTok</p>
                  <a
                    href={site.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-steel underline underline-offset-4 hover:text-ink"
                  >
                    @hap.project.surabaya
                  </a>
                </div>
              </li>
            </ul>
            <WaLink message={generalMessage} className="mt-8">
              Chat {site.waDisplay}
            </WaLink>
            <p className="mt-6 rounded-lg border border-line bg-paper-2 p-4 text-sm text-steel">
              <strong className="text-ink">Penting:</strong> pembayaran hanya via transfer ke{' '}
              {site.bank}.
            </p>
          </div>
          <div className="rounded-lg border border-line p-6 shadow-sm">
            <h3 className="text-xl font-bold">Susun pesan order</h3>
            <div className="mt-4">
              <WaMessageBuilder />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
