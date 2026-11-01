import Image from 'next/image';
import { Bottle } from '@/components/Bottle';
import { Beans, Leaf, Wave } from '@/components/decor';
import { WhatsAppIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { OrderBuilder } from '@/components/OrderBuilder';
import { benefits, type Benefit } from '@/data/benefits';
import { faq } from '@/data/faq';
import { gallery, heroImage } from '@/data/gallery';
import { orderSteps, storageInfo } from '@/data/site';
import { variants } from '@/data/variants';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, formatRupiah, generalMessage, variantMessage } from '@/lib/whatsapp';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

// Ikon klaim brand
function BenefitIcon({ name }: { name: Benefit['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'size-7',
  };
  switch (name) {
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Z" />
          <path d="M5 19 13 11" />
        </svg>
      );
    case 'nosweet':
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M4 4l16 16" />
        </svg>
      );
    case 'bean':
      return (
        <svg {...common}>
          <ellipse cx="9" cy="13" rx="4.5" ry="3.2" transform="rotate(-25 9 13)" />
          <ellipse cx="16" cy="9" rx="4" ry="2.8" transform="rotate(20 16 9)" />
        </svg>
      );
    case 'truck':
      return (
        <svg {...common}>
          <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
          <circle cx="7" cy="17.5" r="1.8" />
          <circle cx="17" cy="17.5" r="1.8" />
        </svg>
      );
  }
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div data-reveal className="mx-auto max-w-2xl text-center">
      <p className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-accent uppercase">
        <Leaf className="size-4 text-bean" /> {eyebrow}
      </p>
      <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
  );
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: `+${siteConfig.waNumber}`,
    areaServed: 'Daerah Istimewa Yogyakarta',
    address: { '@type': 'PostalAddress', addressLocality: 'Yogyakarta', addressCountry: 'ID' },
    sameAs: [siteConfig.instagram, siteConfig.threads],
    // Sengaja tanpa harga/rating: belum ada data asli
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* 1. Hero */}
      <section id="beranda" className="relative overflow-hidden bg-surface-2">
        <Leaf className="absolute -top-4 -left-6 size-28 -rotate-12 text-bean/60" />
        <Leaf className="absolute right-4 bottom-16 size-16 rotate-45 text-bean/50" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-12 pb-8 md:grid-cols-[1.15fr_1fr] md:pt-20">
          <div>
            <p className="animate-rise inline-flex items-center gap-2 rounded-full bg-[#f5c542] px-4 py-2 text-sm font-extrabold text-[#3d2e00]">
              {/* TODO: konfirmasi syarat free ongkir */}
              🚚 Free Ongkir se-Jogja
            </p>
            <h1
              style={{ ['--delay' as string]: '120ms' }}
              className="animate-rise mt-5 font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl"
            >
              Sari Kacang Ijo Segar, <span className="text-accent">Tanpa Pengawet</span>
            </h1>
            <p
              style={{ ['--delay' as string]: '240ms' }}
              className="animate-rise mt-4 max-w-lg text-lg text-muted"
            >
              Minuman kacang hijau khas Jogja dari Heyda, tanpa pemanis buatan. Ada 4 varian buat
              seisi rumah, cocok juga jadi oleh-oleh khas Jogja, Kak.
            </p>
            <div
              style={{ ['--delay' as string]: '360ms' }}
              className="animate-rise mt-7 flex flex-wrap gap-3"
            >
              <a
                href={buildWhatsAppLink(generalMessage)}
                {...ext}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-bold text-white hover:bg-accent-strong"
              >
                <WhatsAppIcon className="size-5" /> Pesan via WhatsApp
              </a>
              <a
                href="#varian"
                className="inline-flex min-h-12 items-center rounded-full border-2 border-accent px-6 font-bold text-accent hover:bg-background"
              >
                Lihat Varian
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <li>✓ Tanpa pengawet</li>
              <li>✓ Tanpa pemanis buatan</li>
              <li>✓ Asli {siteConfig.city}</li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-sm py-4 md:max-w-md">
            <div className="absolute inset-6 rounded-[3rem] bg-bean/50 blur-2xl" />
            <figure className="animate-float relative overflow-hidden rounded-[2.5rem] border-4 border-white shadow-2xl">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                priority
                sizes="(min-width: 768px) 448px, 90vw"
                className="h-auto w-full"
              />
              <figcaption className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">
                Ilustrasi
              </figcaption>
            </figure>
            <Beans className="absolute -bottom-2 -left-4 w-28" />
            <Leaf className="absolute -top-2 -right-3 size-14 rotate-45 text-[#5f9a3a]" />
          </div>
        </div>
        <Wave className="text-background" />
      </section>

      {/* 2. Varian */}
      <section id="varian" className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <SectionTitle
          eyebrow="4 Varian"
          title="Pilih Varian Favorit Kakak"
          text="Satu rasa kacang ijo, empat varian sesuai kebutuhan keluarga."
        />
        {/* TODO: konfirmasi perbedaan komposisi varian */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {variants.map((v, i) => (
            <li
              key={v.slug}
              data-reveal
              className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
              style={{ borderTop: `6px solid ${v.accentColor}`, ['--i' as string]: i }}
            >
              <div
                className="relative flex justify-center px-4 pt-6 pb-3"
                style={{ background: `${v.accentColor}14` }}
              >
                {v.image ? (
                  <>
                    <Image
                      src={v.image.src}
                      alt={v.image.alt}
                      width={v.image.width}
                      height={v.image.height}
                      sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 90vw"
                      className="h-52 w-auto object-contain"
                    />
                    {v.image.kind === 'ilustrasi' && (
                      <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold">
                        Ilustrasi
                      </span>
                    )}
                  </>
                ) : (
                  <Bottle color={v.accentColor} label={v.shortName} className="w-28" placeholder />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-sm font-bold" style={{ color: v.accentColor }}>
                  <span
                    className="rounded-full px-2 py-0.5 text-white"
                    style={{ background: v.accentColor }}
                  >
                    {v.shortName}
                  </span>
                </p>
                <h3 className="mt-3 font-serif text-xl">{v.name}</h3>
                <p className="mt-1 text-sm font-semibold">{v.forWho}</p>
                <p className="mt-2 flex-1 text-sm text-muted">{v.description}</p>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="text-muted">Ukuran</dt>
                    <dd className="font-bold">{v.size ?? 'Segera diinfokan'}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Harga</dt>
                    <dd className="font-bold">
                      {v.price !== undefined ? formatRupiah(v.price) : 'Tanya via WA'}
                    </dd>
                  </div>
                </dl>
                <a
                  href={buildWhatsAppLink(variantMessage(v.name))}
                  {...ext}
                  aria-label={`Pesan varian ${v.shortName} via WhatsApp (tab baru)`}
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-bold text-white hover:bg-accent-strong"
                >
                  <WhatsAppIcon className="size-4" /> Pesan Varian Ini
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Kenapa Heyda */}
      <section id="kenapa" className="bg-accent-strong text-white">
        <Wave className="text-background" flip />
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold tracking-widest text-bean uppercase">Kenapa Heyda</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Simpel, Segar, Apa Adanya</h2>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <li
                key={b.title}
                data-reveal
                style={{ ['--i' as string]: i }}
                className="rounded-3xl bg-white/10 p-6"
              >
                <span className="grid size-14 place-items-center rounded-2xl bg-bean text-accent-strong">
                  <BenefitIcon name={b.icon} />
                </span>
                <h3 className="mt-4 font-serif text-xl">{b.title}</h3>
                <p className="mt-2 text-sm text-white/85">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <Wave className="text-background" />
      </section>

      {/* 4. Cara pesan */}
      <section id="cara-pesan" className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <SectionTitle eyebrow="Cara Pesan" title="Pesan Semudah Chat Teman" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ ['--i' as string]: i }}
              className="relative rounded-3xl bg-surface p-6"
            >
              <span className="grid size-11 place-items-center rounded-full bg-accent font-serif text-lg text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 font-serif text-lg">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Penyusun pesanan */}
      <section id="pesan" className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle
            eyebrow="Pesan Sekarang"
            title="Susun Pesanan Kakak"
            text="Atur jumlah per varian, lalu kirim pesannya ke WhatsApp admin. Tidak ada data yang disimpan di website ini."
          />
          <div data-reveal className="mt-10">
            <OrderBuilder />
          </div>
        </div>
      </section>

      {/* 6. Penyimpanan & oleh-oleh */}
      <section id="simpan" className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <SectionTitle
          eyebrow="Oleh-oleh Khas Jogja"
          title="Simpan & Bawa Pulang"
          text="Tanpa pengawet, jadi perlu sedikit perhatian saat menyimpan."
        />
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {storageInfo.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ ['--i' as string]: i }}
              className="rounded-3xl border border-line p-6"
            >
              <h3 className="font-serif text-lg">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Galeri poster dari feed Heyda */}
      <section id="galeri" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:pb-20">
        <SectionTitle
          eyebrow="Dari Feed Heyda"
          title="Intip Postingan Kami"
          text="Info varian dan promo terbaru juga ada di Instagram & Threads Heyda."
        />
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((g, i) => (
            <li key={g.src} data-reveal style={{ ['--i' as string]: i }}>
              <a
                href={g.src}
                {...ext}
                aria-label={`${g.alt} (gambar ukuran penuh, tab baru)`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-surface shadow-md"
              >
                <Image
                  src={g.thumb}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 270px, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold">
                  Ilustrasi
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center">
          <a
            href={siteConfig.instagram}
            {...ext}
            className="inline-flex min-h-11 items-center rounded-full border-2 border-accent px-6 font-bold text-accent hover:bg-surface-2"
          >
            Ikuti {siteConfig.igHandle}
          </a>
        </p>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="bg-surface-2 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SectionTitle eyebrow="FAQ" title="Yang Sering Ditanyakan" />
          <div className="mt-10 space-y-3">
            {faq.map((f, i) => (
              <details
                key={f.q}
                data-reveal
                style={{ ['--i' as string]: i }}
                className="group rounded-2xl bg-background p-1"
              >
                <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-xl px-4 py-3 font-bold">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-2xl text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-4 pb-4 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
