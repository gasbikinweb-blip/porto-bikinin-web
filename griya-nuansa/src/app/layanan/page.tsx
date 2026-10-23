import Image from 'next/image';
import Link from 'next/link';
import { Container, PageHeader } from '@/components/ui';
import { WaMessageBuilder } from '@/components/WaMessageBuilder';
import { getProjectsByService } from '@/data/projects';
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
        title={
          <>
            Satu studio, <em>dari desain hingga pengerjaan</em>
          </>
        }
        intro="Pilih layanan yang Anda butuhkan, atau kombinasikan beberapa sekaligus."
      />
      <Container>
        <ul className="divide-y divide-line border-y border-line">
          {services.map((s, i) => {
            const sample = getProjectsByService(s.slug)[0];
            return (
              <li key={s.slug}>
                <Link
                  href={`/layanan/${s.slug}/`}
                  className="group grid items-center gap-6 py-10 md:grid-cols-12"
                >
                  <span className="font-serif text-xl text-muted md:col-span-1">0{i + 1}</span>
                  <div className="md:col-span-6">
                    <h2 className="font-serif text-4xl group-hover:text-sage md:text-5xl">
                      {s.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-muted">{s.short}</p>
                  </div>
                  <div className="relative hidden aspect-[4/3] overflow-hidden bg-surface md:col-span-4 md:col-start-9 md:block">
                    {sample && (
                      <Image
                        src={sample.cover.thumb}
                        alt={sample.cover.alt}
                        fill
                        sizes="33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
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
