import { ServiceCard } from '@/components/ServiceCard';
import { Container, PageHeader } from '@/components/ui';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { getProject } from '@/data/projects';
import { services } from '@/data/services';
import type { Lang } from '@/i18n';

export const servicesCopy = {
  id: {
    metaTitle: 'Layanan',
    metaDesc:
      'Layanan Griya Nuansa: desain arsitektur, desain interior, kitchen set dan furnitur custom, renovasi rumah, serta property management di Serpong, Tangerang Selatan, dan Jabodetabek.',
    eyebrow: 'Layanan',
    title: (
      <>
        Satu studio, <em>dari desain hingga pengerjaan</em>
      </>
    ),
    intro: 'Pilih layanan yang Anda butuhkan, atau kombinasikan beberapa sekaligus.',
    builderTitle: 'Susun pesan konsultasi',
    builderText:
      'Pilih kebutuhan Anda, kami siapkan pesan WhatsApp-nya. Tidak ada data yang disimpan.',
  },
  en: {
    metaTitle: 'Services',
    metaDesc:
      'Griya Nuansa services: architectural design, interior design, kitchen sets and custom furniture, home renovation, and property management in Serpong, South Tangerang, and Greater Jakarta.',
    eyebrow: 'Services',
    title: (
      <>
        One studio, <em>from design to build</em>
      </>
    ),
    intro: 'Choose the service you need, or combine several at once.',
    builderTitle: 'Compose your consultation message',
    builderText: "Pick what you need and we'll prepare the WhatsApp message. Nothing is stored.",
  },
};

export function ServicesView({ lang }: { lang: Lang }) {
  const c = servicesCopy[lang];
  return (
    <>
      <PageHeader
        eyebrow={c.eyebrow}
        image={getProject('mitra-inti-pranata-office', lang)?.cover}
        title={c.title}
        intro={c.intro}
      />
      <Container className="py-16 md:py-24">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <ServiceCard lang={lang} service={s} index={i} />
            </li>
          ))}
        </ul>
        <section className="mt-24" aria-labelledby="buat-pesan">
          <h2 id="buat-pesan" className="font-serif text-4xl md:text-5xl">
            {c.builderTitle}
          </h2>
          <p className="mt-3 mb-10 max-w-2xl text-muted">{c.builderText}</p>
          <WaMessageBuilder />
        </section>
      </Container>
    </>
  );
}
