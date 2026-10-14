import type { Metadata } from 'next';
import { PhotoGallery } from '@/components/PhotoGallery';
import { SectionHeading } from '@/components/SectionHeading';
import { VideoCard } from '@/components/VideoCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { projectPhotos, projectVideos } from '@/data/projects';
import { consultMessage } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Hasil Pasang',
  description:
    'Galeri foto dan video hasil pemasangan wallpaper, gorden, lantai SPC, dan kasa nyamuk magnet oleh SA Living di Batam.',
  alternates: { canonical: '/hasil-pasang' },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Hasil pasang"
          title="Galeri Pemasangan"
          description="Foto dan video asli dari konten SA Living. Klik foto untuk memperbesar."
          align="center"
        />
        <div className="mt-12">
          <PhotoGallery photos={projectPhotos} />
        </div>
      </section>

      <section aria-labelledby="judul-video" className="border-t border-line bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-video"
            eyebrow="Video"
            title="Lihat Prosesnya"
            description="Video hanya dimuat saat Anda menekan tombol putar, jadi hemat kuota."
          />
          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {projectVideos.map((v) => (
              <li key={v.id} className="reveal">
                <VideoCard id={v.id} title={v.title} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="reveal mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-3xl sm:text-4xl">
            Ingin hasil seperti ini di rumah Anda?
          </h2>
          <WhatsAppButton message={consultMessage()} className="mt-8">
            Minta Ukur & Konsultasi Gratis
          </WhatsAppButton>
        </div>
      </section>
    </>
  );
}
