import type { Metadata } from 'next';
import Image from 'next/image';
import { OrderSteps } from '@/components/OrderSteps';
import { SectionHeading } from '@/components/SectionHeading';
import { site } from '@/data/site';
import { getWork } from '@/data/works';

const description =
  'Tentang YF Furniture & Interior, workshop furniture custom di Ampel, Boyolali yang melayani kitchen set, backdrop TV, lemari, dan interior untuk Boyolali, Salatiga, Solo, Semarang.';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description,
  alternates: { canonical: '/tentang' },
  openGraph: { title: 'Tentang YF Furniture & Interior', description, url: '/tentang' },
};

const photo = getWork('wardrobe-walk-in-meja-rias-led');

export default function TentangPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-2">
        <div>
          <SectionHeading
            as="h1"
            eyebrow="Tentang kami"
            title="Workshop furnitur custom dari Boyolali"
          />
          {/* TODO: ganti dengan cerita asli (tahun berdiri, nama pemilik, perjalanan usaha) */}
          <div className="mt-5 space-y-4 leading-relaxed text-muted">
            <p>
              {site.name} adalah workshop pembuatan furnitur dan interior custom di Selodoko, Ampel,
              Boyolali. Kami mengerjakan pesanan by order: kitchen set, TV wall panel dan backdrop,
              lemari dan wardrobe, meja belajar, meja kasir, kamar set, hingga interior kantor dan
              ruang usaha.
            </p>
            <p>
              Setiap pesanan dibuat menyesuaikan ukuran ruangan, model, warna, dan budget Anda.
              Hasil karya kami rutin dibagikan di Instagram @yffurnitureinterior.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface">
          <Image
            src={photo.cover.src}
            alt={photo.cover.alt}
            fill
            sizes="(min-width: 768px) 540px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section aria-labelledby="area" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <SectionHeading id="area" eyebrow="Area layanan" title="Melayani Boyolali dan sekitarnya" />
        {/* TODO: konfirmasi area layanan & jasa pasang */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {site.serviceAreas.map((a) => (
            <li
              key={a}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium"
            >
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          Free desain dan cek lokasi untuk area {site.freeSurveyAreas}. Untuk luar kota, pesanan
          dapat dikirim lewat ekspedisi kargo.
        </p>
      </section>

      <OrderSteps />
    </>
  );
}
