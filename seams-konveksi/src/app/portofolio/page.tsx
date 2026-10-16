import { PortfolioGallery } from '@/components/PortfolioGallery';
import { CtaBand, PageHeader, container } from '@/components/ui';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';
import { generalMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'Portofolio',
  description:
    'Galeri hasil jahitan Seams Konveksi: abaya, khimar, gamis, dan busana muslimah lainnya. Lihat kualitas jahitan sebelum konsultasi.',
  path: '/portofolio',
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portofolio"
        title="Hasil jahitan Seams Konveksi"
        intro="Lihat sendiri kerapian jahitan kami. Gunakan filter untuk melihat per kategori, dan klik foto untuk memperbesar."
      />
      <section className={`${container} py-14`}>
        <PortfolioGallery projects={projects} />
        <p className="mt-8 text-xs text-muted">
          Foto berlabel &quot;Ilustrasi&quot; adalah contoh tampilan, bukan hasil produksi nyata.
        </p>
      </section>
      <CtaBand message={generalMessage} />
    </>
  );
}
