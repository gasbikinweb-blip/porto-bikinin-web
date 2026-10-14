import type { Metadata } from 'next';
import Image from 'next/image';
import { OrderSteps } from '@/components/OrderSteps';
import { SectionHeading } from '@/components/SectionHeading';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: `Mengenal ${siteConfig.name}, toko dan jasa pemasangan wallpaper, gorden, lantai SPC, dan kasa nyamuk magnet di Batam.`,
  alternates: { canonical: '/tentang' },
};

// TODO: verifikasi dengan data asli (cerita, tahun berdiri, jumlah tim/proyek)
const audiences = [
  {
    title: 'Rumah & apartemen',
    text: 'Kamar tidur, ruang keluarga, hingga ruang tamu yang ingin tampil baru.',
  },
  {
    title: 'Ruko, kantor & kafe',
    text: 'Dinding aksen, gorden ruang rapat, dan lantai yang tahan lalu-lalang.',
  },
  {
    title: 'Kontraktor & desainer',
    text: 'Pasokan bahan dan tim pasang untuk proyek interior Anda.',
  },
];

const store = [
  {
    src: '/toko/02.webp',
    alt: 'Showroom SA Living dengan contoh lantai SPC dan buku sampel gorden',
  },
  { src: '/toko/03.webp', alt: 'Rak buku sampel wallpaper dan lantai di dalam toko SA Living' },
  {
    src: '/toko/04.webp',
    alt: 'Deretan ruko Nagoya Thamrin City tempat toko SA Living berada',
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
            title="Toko Home Decor di Jantung Nagoya, Batam"
          />
          <div data-stagger className="mt-6 space-y-4 leading-relaxed text-muted">
            <p className="reveal">
              {siteConfig.name} adalah toko sekaligus jasa pemasangan wallpaper dinding, gorden,
              lantai SPC, dan kasa nyamuk magnet di Batam. Di toko kami, Anda bisa melihat dan
              menyentuh contoh bahan secara langsung sebelum memutuskan.
            </p>
            <p className="reveal">
              Kami percaya hasil akhir yang rapi berawal dari ukuran yang tepat. Karena itu tim kami
              datang mengukur dan berkonsultasi gratis, lalu mengerjakan pemasangan sampai selesai.
            </p>
            {siteConfig.foundedYear && (
              <p className="reveal">Melayani pelanggan Batam sejak {siteConfig.foundedYear}.</p>
            )}
          </div>
        </div>
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-2">
          <Image
            src="/toko/01.webp"
            alt="Pintu depan toko SA Living dengan daftar layanan: blinds, curtain, SPC flooring, wallpaper"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      <section aria-labelledby="judul-klien" className="border-t border-line py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            id="judul-klien"
            eyebrow="Siapa yang kami layani"
            title="Untuk Rumah hingga Proyek"
          />
          <ul data-stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {audiences.map((a) => (
              <li key={a.title} className="reveal rounded-2xl border border-line bg-surface p-7">
                <h3 className="font-serif text-xl">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="judul-toko" className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 id="judul-toko" className="reveal font-serif text-3xl sm:text-4xl">
            Intip toko kami
          </h2>
          <ul data-stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {store.map((s, i) => (
              <li
                key={s.src}
                className={`reveal relative overflow-hidden rounded-2xl bg-surface-2 ${i === 2 ? 'col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[3/4]' : 'aspect-[3/4]'}`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <OrderSteps />
    </>
  );
}
