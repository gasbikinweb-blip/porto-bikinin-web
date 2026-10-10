import type { Metadata } from 'next';
import Image from 'next/image';
import { OrderSteps } from '@/components/OrderSteps';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: `Mengenal ${siteConfig.name}, pengrajin mebel kayu jati grade A dari Jepara.`,
  alternates: { canonical: '/tentang' },
};

const values = [
  {
    title: 'Material Terbaik',
    text: 'Kayu jati grade A dengan pilihan finishing walnut impra, natural, hingga kombinasi marmer.',
  },
  {
    title: 'Klasik, Modern & Custom',
    text: 'Dari desain ukir klasik hingga minimalis modern, semuanya bisa disesuaikan dengan ruang Anda.',
  },
  {
    title: 'Siap Proyek',
    text: 'Berpengalaman melayani pengadaan furnitur untuk cafe, restoran, dan villa.',
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
            title={`Furnishing your dreams, one piece at a time`}
          />
          {/* TODO: ganti dengan cerita asli usaha */}
          <div className="reveal mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              {siteConfig.name} adalah usaha furnitur dan mebel asal Jepara yang menyediakan
              berbagai produk kayu jati berkualitas dengan desain klasik, modern, hingga custom.
            </p>
            <p>
              Kami percaya furnitur bukan sekadar perabot, melainkan bagian dari cerita sebuah
              rumah. Karena itu setiap produk kami kerjakan dengan teliti oleh pengrajin lokal,
              menjaga warisan keahlian kayu Jepara.
            </p>
          </div>
        </div>
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/products/kursi-makan-jati-sandaran-tinggi/02.webp"
            alt="Deretan kursi makan jati di depan rumah joglo Jepara"
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
