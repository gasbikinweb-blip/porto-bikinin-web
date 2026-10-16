import { PortfolioGallery } from '@/components/PortfolioGallery';
import { VideoGrid } from '@/components/VideoGrid';
import { CtaBand, PageHeader, container } from '@/components/ui';
import { projects } from '@/data/projects';
import { videos } from '@/data/videos';
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
      <section aria-labelledby="video" className="scroll-mt-20 bg-surface py-14">
        <div className={container}>
          <h2 id="video" className="font-serif text-3xl sm:text-4xl">
            Video proses produksi
          </h2>
          <p className="mt-3 mb-8 max-w-2xl text-muted">
            Suasana workshop Seams: potong kain, jahit, pasang kancing, finishing, sampai pesanan
            besar siap dikirim.
          </p>
          <VideoGrid items={videos} />
        </div>
      </section>
      <CtaBand message={generalMessage} />
    </>
  );
}
