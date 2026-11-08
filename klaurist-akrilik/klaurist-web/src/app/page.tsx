import { About } from '@/components/About';
import { Catalog } from '@/components/Catalog';
import { Pricelist } from '@/components/Pricelist';
import { FlowerSprig, Sparkle } from '@/components/decor';
import { Hero } from '@/components/Hero';
import { WhatsAppIcon } from '@/components/icons';
import { InstagramIcon, ThreadsIcon } from '@/components/social-icons';
import { JsonLd } from '@/components/JsonLd';
import { OrderForm } from '@/components/OrderForm';
import { Showcase } from '@/components/Showcase';
import { SectionTitle } from '@/components/SectionTitle';
import { faq } from '@/data/faq';
import { site, steps } from '@/data/site';
import { config } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: site.name,
    description: site.description,
    url: config.siteUrl,
    telephone: `+${config.waNumber}`,
    areaServed: site.city,
    address: { '@type': 'PostalAddress', addressLocality: 'Yogyakarta', addressCountry: 'ID' },
    sameAs: [site.instagram, site.threads],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <About />
      <Catalog>
        <Showcase />
      </Catalog>
      <Pricelist />

      <OrderForm />

      {/* Cara pesan */}
      <section aria-labelledby="judul-cara" id="cara-pesan" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle id="judul-cara" eyebrow="Gampang kok" title="Cara Pesan" />
          <ol data-stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal relative rounded-[1.75rem] bg-blush-soft p-6">
                <span className="font-script text-5xl text-rose">{i + 1}</span>
                <h3 className="mt-1 font-serif text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="judul-faq" id="faq" className="bg-sage-soft py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle id="judul-faq" eyebrow="FAQ" title="Yang Sering Ditanyakan" />
          <div className="mt-10 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="reveal group rounded-2xl bg-ivory">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-5 py-3 font-medium">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-2xl text-rose transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section
        aria-labelledby="judul-kontak"
        id="kontak"
        className="relative overflow-hidden py-16 sm:py-24"
      >
        <FlowerSprig className="absolute -left-4 bottom-0 hidden w-28 text-plum/40 sm:block" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionTitle
            id="judul-kontak"
            eyebrow="Kontak"
            title="Yuk, Ngobrol Dulu"
            text={`Melayani area ${site.serviceArea}.`}
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={buildWhatsAppLink(generalMessage)}
              {...external}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-rose px-6 font-medium text-on-rose hover:bg-rose-strong"
            >
              <WhatsAppIcon className="size-5" /> {site.waDisplay}
              <span className="sr-only"> (WhatsApp, tab baru)</span>
            </a>
            <a
              href={site.instagram}
              {...external}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-rose px-6 font-medium text-rose hover:bg-blush-soft"
            >
              <InstagramIcon className="size-5" /> Instagram
              <span className="sr-only"> (tab baru)</span>
            </a>
            <a
              href={site.threads}
              {...external}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-rose px-6 font-medium text-rose hover:bg-blush-soft"
            >
              <ThreadsIcon className="size-5" /> Threads<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
          <Sparkle className="mx-auto mt-10 size-5 text-rose" />
        </div>
      </section>
    </>
  );
}
