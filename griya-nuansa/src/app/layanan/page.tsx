import { Container, PageHeader } from '@/components/ui';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { ServiceCard } from '@/components/ServiceCard';
import { getProject } from '@/data/projects';
import { services } from '@/data/services';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Layanan',
  description:
    'Layanan Griya Nuansa: desain arsitektur, desain interior, kitchen set dan furnitur custom, renovasi rumah, serta property management di Serpong, Tangerang Selatan, dan Jabodetabek.',
  path: '/layanan/',
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Layanan"
        image={getProject('mitra-inti-pranata-office')?.cover}
        title={
          <>
            Satu studio, <em>dari desain hingga pengerjaan</em>
          </>
        }
        intro="Pilih layanan yang Anda butuhkan, atau kombinasikan beberapa sekaligus."
      />
      <Container className="py-16 md:py-24">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <ServiceCard service={s} index={i} />
            </li>
          ))}
        </ul>
        <section className="mt-24" aria-labelledby="buat-pesan">
          <h2 id="buat-pesan" className="font-serif text-4xl md:text-5xl">
            Susun pesan konsultasi
          </h2>
          <p className="mt-3 mb-10 max-w-2xl text-muted">
            Pilih kebutuhan Anda, kami siapkan pesan WhatsApp-nya. Tidak ada data yang disimpan.
          </p>
          <WaMessageBuilder />
        </section>
      </Container>
    </>
  );
}
