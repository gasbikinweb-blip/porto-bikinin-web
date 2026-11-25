import type { Metadata } from 'next';
import Image from 'next/image';
import { OrderSteps } from '@/components/OrderSteps';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: `Mengenal ${siteConfig.name}.`,
  alternates: { canonical: '/tentang' },
};

const values = [
  {
    title: 'Bahan Standar Kuat',
    text: 'Multiplek 18 mm dengan finishing HPL original TACO, dengan pilihan warna dan motif yang sangat banyak.',
  },
  {
    title: 'Bisa Custom',
    text: 'Desain, warna, dan ukuran dibuat sesuai ruang Anda, termasuk sudut sulit seperti kolong tangga.',
  },
  {
    title: 'Survei Gratis',
    text: 'Kami datang mengukur, memberi saran, dan membuatkan desain 3D sebelum produksi dimulai.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading as="h1" eyebrow="Tentang kami" title="Interior Custom dari Bandung" />
          <div className="reveal mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              {siteConfig.name} adalah jasa interior custom di Bandung yang aktif sejak 2021. Kami
              mengerjakan kitchen set, lemari, backdrop TV, meja rias, kamar set, partisi, dan
              furnitur untuk sudut-sudut rumah yang sulit.
            </p>
            <p>
              Prosesnya sederhana: survei, sepakati model, desain 3D, lalu pengerjaan dan pemasangan
              oleh tim kami sendiri. Hasilnya interior yang pas ukurannya, rapi, dan awet dipakai
              sehari-hari.
            </p>
          </div>
        </div>
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/projects/backdrop-tv-marmer-led/01.webp"
            alt="Backdrop TV motif marmer dengan rak display berlampu"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section aria-label="Nilai kami" className="border-t border-line py-20">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="reveal rounded-2xl bg-surface p-8">
              <h2 className="font-serif text-2xl text-accent-strong">{v.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <OrderSteps />
    </>
  );
}
