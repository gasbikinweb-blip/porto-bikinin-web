import type { Metadata } from 'next';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WorkGrid } from '@/components/WorkGrid';
import { works } from '@/data/works';
import { activeCategories, categoryNames } from '@/lib/catalog';

const description =
  'Katalog hasil karya YF Furniture & Interior: kitchen set, backdrop TV, lemari, meja belajar anak, meja kasir, dan interior ruangan custom dari workshop di Boyolali.';

export const metadata: Metadata = {
  title: 'Katalog Karya',
  description,
  alternates: { canonical: '/katalog' },
  openGraph: { title: 'Katalog Karya YF Furniture & Interior', description, url: '/katalog' },
};

export default function KatalogPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="Katalog"
        title="Hasil karya kami"
        description="Semua furnitur dibuat custom. Tekan foto untuk melihat galeri, atau pesan model serupa lewat WhatsApp."
      />
      <div className="mt-8">
        <CategoryFilter categories={activeCategories} total={works.length} />
      </div>
      <div className="mt-6">
        <WorkGrid works={works} categoryNames={categoryNames} />
      </div>
      <div className="mt-14 rounded-3xl bg-surface p-6 text-center sm:p-10">
        <h2 className="text-2xl font-extrabold">Tidak menemukan model yang dicari?</h2>
        <p className="mt-2 text-muted">
          Kirim foto contoh dan ukuran ruangan, kami buatkan sesuai keinginan.
        </p>
        <WhatsAppButton className="mt-5" />
      </div>
    </div>
  );
}
