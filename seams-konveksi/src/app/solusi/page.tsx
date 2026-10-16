import { CheckList } from '@/components/sections';
import { CtaBand, PageHeader, WhatsAppButton, container } from '@/components/ui';
import { solutions } from '@/data/solutions';
import { pageMetadata } from '@/lib/metadata';
import { generalMessage, solutionMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'Solusi per Kebutuhan',
  description:
    'Layanan maklon abaya dan khimar untuk brand baru, brand yang sudah berjalan, butik, reseller, dan seragam komunitas.',
  path: '/solusi',
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solusi"
        title="Layanan yang menyesuaikan tahap bisnis Anda"
        intro="Baru merintis brand atau sudah rutin produksi, alur kerja kami bisa disesuaikan dengan kebutuhan Anda."
      />
      <section className={`${container} grid gap-6 py-14 md:grid-cols-2`}>
        {solutions.map((s) => (
          <article
            key={s.id}
            id={s.id}
            className="reveal flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <h2 className="font-serif text-2xl sm:text-3xl">{s.clientType}</h2>
            <p className="mt-3 text-muted">{s.problem}</p>
            <p className="mt-3">{s.approach}</p>
            <h3 className="mt-6 mb-3 text-sm font-semibold">Rekomendasi layanan</h3>
            <CheckList items={s.recommended} />
            <WhatsAppButton
              message={solutionMessage(s.clientType.toLowerCase())}
              label="Konsultasikan kebutuhan ini"
              variant="outline"
              className="mt-6 self-start"
            />
          </article>
        ))}
      </section>
      <CtaBand message={generalMessage} />
    </>
  );
}
