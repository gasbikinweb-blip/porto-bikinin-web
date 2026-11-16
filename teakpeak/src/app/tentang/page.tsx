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

// TODO: isi nilai/keunggulan klien
const values = [
  {
    title: 'Kayu Solid Pilihan',
    text: 'Jati solid, jati daur ulang, rotan, dan upholstery dengan pilihan finishing natural, mocca, bleaching, hingga black rustic.',
  },
  {
    title: 'Bisa Custom',
    text: 'Ukuran, warna, kain, dan finishing bisa disesuaikan, bahkan dari foto referensi yang Anda kirim.',
  },
  {
    title: 'Siap Proyek',
    text: 'Melayani rumah, villa, kafe, dan restoran, dari satu unit hingga satu set lengkap, sampai terpasang di lokasi.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            as="h1"
            eyebrow="Tentang kami"
            title="Timeless Furniture, Crafted in Jepara"
          />
          {/* TODO: ganti dengan cerita asli usaha */}
          <div className="reveal mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              {siteConfig.name} adalah produsen furnitur kayu solid dari Jepara. Kami membuat kursi,
              sofa, meja, tempat tidur, dan penyimpanan dengan desain bersih dan proporsi yang
              tenang, untuk rumah maupun proyek hospitality.
            </p>
            <p>
              Prosesnya dimulai dari kayu gelondongan, dipotong, diamplas, lalu diberi warna dengan
              teliti oleh tim produksi kami. Hasilnya furnitur yang hangat dipakai dan awet
              bertahun-tahun.
            </p>
          </div>
        </div>
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/products/arden-lounge-chair/01.webp"
            alt="Arden Lounge Chair berangka jati dengan dudukan empuk"
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
