import type { Metadata } from 'next';
import Image from 'next/image';
import { OrderSteps } from '@/components/OrderSteps';
import { SectionHeading } from '@/components/SectionHeading';
import { CheckIcon, WhatsAppIcon } from '@/components/icons';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Tentang Kami & Workshop Furnitur Jepara',
  description:
    'Profil Busr Mebel: produsen furnitur kayu jati solid, kantor, dan custom interior berstandar tinggi langsung dari sentra mebel Jepara.',
  alternates: { canonical: '/tentang' },
  openGraph: {
    type: 'website',
    url: '/tentang',
    title: `Tentang Kami | ${siteConfig.name}`,
    description:
      'Mengenal workshop furnitur, komitmen kualitas, dan keahlian kriya Busr Mebel.',
    images: [
      {
        url: '/products/rak-jati-bersiluet/og.jpg',
        width: 600,
        height: 750,
        alt: 'Workshop Busr Mebel',
      },
    ],
  },
};

// Keunggulan & Komitmen Kualitas
const qualityCommitments = [
  {
    title: 'Kayu Pilihan & Kiln-Dried (Oven)',
    text: 'Menggunakan kayu jati solid dan kayu keras pilihan dengan proses oven (kiln dried) terukur untuk meminimalkan risiko muai-susut dan retak di kemudian hari.',
  },
  {
    title: 'Konstruksi Sambungan Tradisional Kokoh',
    text: 'Mengadopsi teknik sambungan purus mortise-and-tenon serta penguat struktur internal presisi. Konstruksi awet puluhan tahun, tanpa derit, dan tahan beban berat.',
  },
  {
    title: 'Finishing Bertahap Ramah Lingkungan',
    text: 'Aplikasi amplas bertingkat hingga pori tertutup sempurna, disempurnakan pelapis polyurethane / melamine satin yang tahan noda cairan dan panas cangkir kopi.',
  },
  {
    title: 'Layanan Custom Tanpa Perantara',
    text: 'Berkomunikasi langsung dengan workshop produksi kami di Jepara. Bebas menentukan dimensi, jenis kain, dan material tanpa mark-up perantara bertingkat.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro Profil */}
      <section className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            as="h1"
            eyebrow="Tentang Busr Mebel"
            title="Keahlian Kriya Kayu & Presisi Modern"
          />
          <div className="reveal mt-6 space-y-4 leading-relaxed text-muted text-base">
            <p>
              Berakar dari tradisi pertukangan kayu legendaris di Kabupaten Jepara, Jawa Tengah,{' '}
              <strong className="text-foreground font-semibold">{siteConfig.name}</strong> hadir
              sebagai mitra terpercaya untuk pengadaan furnitur siap pakai maupun pesanan custom berstandar tinggi.
            </p>
            <p>
              Kami menggabungkan keindahan alami urat kayu jati solid dengan kepraktisan material
              kontemporer seperti granit tile, rangka besi tubular, dan kain pelapis premium.
              Setiap rancangan dikerjakan untuk memenuhi tuntutan ruang kerja modern yang fungsional,
              elegan, dan tahan lama.
            </p>
            <p>
              Mulai dari kebutuhan satu unit meja direktur hingga pengadaan ratusan kursi untuk kafe,
              restoran, dan gedung perkantoran, tim perajin kami siap merealisasikan visi interior Anda
              dengan ketelitian tinggi.
            </p>

            <div className="pt-4">
              <a
                href={buildWhatsAppLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-strong"
              >
                <WhatsAppIcon className="size-4" />
                Hubungi & Diskusikan Kebutuhan Anda
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface-2">
            <Image
              src="/products/rak-jati-bersiluet/02.webp"
              alt="Detail sambungan kayu jati dan laci buatan Busr Mebel"
              fill
              priority
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[4/5] mt-8 overflow-hidden rounded-2xl bg-surface-2">
            <Image
              src="/products/meja-kerja-eksekutif-volo/02.webp"
              alt="Detail sudut meja kerja eksekutif kombinasi granit dan jati"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Workshop & Kapasitas Produksi */}
      <section aria-label="Workshop dan Produksi" className="border-t border-line bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Workshop Kami"
            title="Dikerjakan oleh Perajin Jepara Berpengalaman"
            description="Semua tahapan dari pemilihan balok kayu, pengeringan, pembentukan pola, perakitan hingga pengecatan akhir diawasi langsung di workshop kami."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <h3 className="font-serif text-xl font-medium text-foreground">Seleksi Material Ketat</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Hanya menggunakan kayu jati berkualitas dengan kadar air terkontrol. Material pendukung
                seperti busa royal foam, rel laci soft-close, dan rangka metal dipilih dari grade terbaik.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <h3 className="font-serif text-xl font-medium text-foreground">Kustomisasi Fleksibel</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Bisa menyesuaikan dimensi panjang, lebar, dan tinggi hingga ke milimeter terkecil
                agar furnitur pas sempurna dengan denah ruangan yang tersedia.
              </p>
            </div>
            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <h3 className="font-serif text-xl font-medium text-foreground">Pengiriman Nusantara</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Pengiriman terjamin dengan armada ekspedisi khusus mebel yang dilengkapi asuransi
                dan layanan perakitan di tempat untuk area Jabodetabek dan kota-kota besar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Komitmen Kualitas */}
      <section aria-label="Komitmen Kualitas" className="border-t border-line py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Komitmen Kualitas"
            title="Standar Mutu yang Kami Jaga"
            align="center"
          />
          <ul data-stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {qualityCommitments.map((c) => (
              <li key={c.title} className="reveal rounded-2xl border border-line bg-surface p-6">
                <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center text-accent-strong mb-4">
                  <CheckIcon className="size-4" />
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground">{c.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <OrderSteps />
    </>
  );
}
