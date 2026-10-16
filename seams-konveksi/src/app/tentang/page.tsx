import { StatsRow } from '@/components/sections';
import { CtaBand, PageHeader, container } from '@/components/ui';
import { principles, site } from '@/data/site';
import { config } from '@/lib/config';
import { pageMetadata } from '@/lib/metadata';
import { generalMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'Tentang Kami',
  description:
    'Profil Seams Konveksi, konveksi busana muslimah dengan spesialisasi abaya dan khimar, serta prinsip kerja kami.',
  path: '/tentang',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Tentang"
        title={`Mengenal ${config.siteName}`}
        intro="Konveksi busana muslimah yang fokus pada abaya dan khimar, untuk brand yang peduli pada kerapian jahitan."
      />

      <section className={`${container} grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr]`}>
        <div className="space-y-4 text-muted">
          {/* TODO: ganti dengan cerita asli Seams (bisa disalin dari caption Instagram) */}
          <p>
            {config.siteName} adalah jasa konveksi (CMT) di {site.city} yang mengerjakan busana
            muslimah, terutama abaya dan khimar, untuk brand fashion muslim, butik, reseller, dan
            komunitas.
          </p>
          <p>
            Kami percaya produk yang baik dimulai dari sampel yang disepakati bersama. Karena itu
            setiap pesanan melewati tahap sampel, produksi, dan quality control sebelum dikemas dan
            dikirim.
          </p>
          <p>
            {/* TODO: cerita pengalaman, tahun berdiri, dan pemilik */}
            Dikelola oleh {site.owner}
            {site.foundedYear ? `, berdiri sejak ${site.foundedYear}` : ''}.
          </p>
        </div>
        <StatsRow />
      </section>

      <section aria-labelledby="prinsip" className="bg-surface py-14">
        <div className={container}>
          <h2 id="prinsip" className="mb-8 font-serif text-3xl">
            Prinsip kerja kami
          </h2>
          <ul data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <li key={p.title} className="reveal rounded-xl border border-line bg-background p-6">
                <h3 className="font-serif text-2xl text-plum">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand message={generalMessage} />
    </>
  );
}
