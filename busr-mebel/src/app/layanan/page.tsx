import type { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppInquiryBuilder } from '@/components/WhatsAppInquiryBuilder';
import { CheckIcon, WhatsAppIcon } from '@/components/icons';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export const metadata: Metadata = {
  title: 'Layanan Pengadaan & Custom Furniture',
  description:
    'Layanan produksi custom furniture, konsultasi tata ruang, pengiriman nusantara, dan perakitan langsung di lokasi proyek.',
  alternates: { canonical: '/layanan' },
  openGraph: {
    type: 'website',
    url: '/layanan',
    title: `Layanan Pengadaan & Custom Furniture | ${siteConfig.name}`,
    description:
      'Solusi lengkap furnitur kantor, hotel, kafe, dan rumah tinggal dari workshop kami di Jepara.',
    images: [
      {
        url: '/products/meja-kerja-eksekutif-volo/og.jpg',
        width: 600,
        height: 750,
        alt: 'Layanan Busr Mebel',
      },
    ],
  },
};

const services = [
  {
    title: 'Custom Furniture & Proyek Khusus',
    description:
      'Pembuatan furnitur sesuai spesifikasi ukuran denah, pilihan material (kayu jati solid perhutani, plywood lapis HPL, metal frame), dan finishing kustom.',
    features: [
      'Penyesuaian dimensi PxLxT per millimeter',
      'Pilihan finishing doff, satin, polyurethane, atau rustic noir',
      'Kombinasi material modern: marmer/granit tile, stainless, beludru, anyaman',
    ],
  },
  {
    title: 'Konsultasi Desain & Tata Ruang',
    description:
      'Membantu Anda, tim arsitek, atau interior designer dalam memilih proporsi mebel yang tepat agar ruangan optimal dan harmonis.',
    features: [
      'Konsultasi kebutuhan fungsional dan kapasitas duduk',
      'Rekomendasi palet warna material kayu & kain pelapis',
      'Pratinjau visualisasi konsep sebelum naik proses produksi',
    ],
  },
  {
    title: 'Pengiriman Aman Terproteksi',
    description:
      'Sistem logistik terstandarisasi untuk memastikan furnitur sampai tanpa cacat di seluruh kota di Indonesia.',
    features: [
      'Pengemasan berlapis: foam sheet, kardus tebal, dan packing kayu palet',
      'Kerjasama dengan ekspedisi spesialis kargo mebel berpengalaman',
      'Jaminan penanganan ekstra untuk produk kaca, granit, dan ukiran',
    ],
  },
  {
    title: 'Perakitan & Instalasi di Lokasi',
    description:
      'Tim perakit profesional siap membantu instalasi dan penempatan langsung di gedung kantor atau rumah Anda.',
    features: [
      'Teknisi berpengalaman dari Jepara',
      'Penyetelan pintu lemari, rel laci, dan sambungan knock-down yang presisi',
      'Pembersihan sisa kemasan setelah proses instalasi selesai',
    ],
  },
];

// Tahapan & Estimasi Waktu Produksi (Tandai TODO untuk verifikasi)
const productionSteps = [
  {
    step: '01',
    title: 'Konsultasi & Penentuan Spesifikasi',
    duration: '1 – 3 Hari Kerja',
    desc: 'Kirimkan foto ruangan, ukuran yang diinginkan, atau pilih model dari katalog Busr Mebel via WhatsApp.',
  },
  {
    step: '02',
    title: 'Penawaran Resmi & SPK',
    duration: '1 – 2 Hari Kerja',
    desc: 'Kami menyusun rincian penawaran harga transparan beserta spesifikasi material dan tenggat produksi.',
  },
  {
    step: '03',
    title: 'Proses Fabrikasi di Workshop',
    duration: '2 – 4 Minggu', // TODO: verifikasi kapasitas antrean bengkel
    desc: 'Pemilihan kayu oven, pemotongan presisi, penyambungan konstruksi tangguh, dan penghalusan bertahap.',
  },
  {
    step: '04',
    title: 'Finishing & Quality Control Ketat',
    duration: '4 – 7 Hari',
    desc: 'Pelapisan warna akhir, pengeringan optimal, pemasangan hardware fitting laci/engsel, dan uji goyang.',
  },
  {
    step: '05',
    title: 'Pengiriman & Instalasi di Lokasi',
    duration: '2 – 7 Hari (Tergantung Kota Tujuan)',
    desc: 'Furnitur dikirim menggunakan armada khusus mebel dan dirakit langsung di lokasi oleh tim teknisi.',
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Layanan Kami"
        title="Solusi Terpadu Pengadaan Furnitur"
        description="Dari sketsa ide hingga perakitan presisi di ruangan Anda. Kami melayani kebutuhan perkantoran, kafe, hotel, dan residensial di seluruh Indonesia."
        align="center"
      />

      {/* Grid 4 Layanan */}
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {services.map((s, idx) => (
          <div
            key={s.title}
            className="reveal rounded-3xl border border-line bg-surface p-8 sm:p-10 flex flex-col justify-between shadow-sm"
          >
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-widest">
                Layanan 0{idx + 1}
              </span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-foreground font-medium">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>

              <ul className="mt-6 space-y-2.5 border-t border-line/60 pt-6 text-sm text-foreground/85">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckIcon className="size-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4">
              <a
                href={buildWhatsAppLink(
                  `Halo Busr Mebel, saya ingin berkonsultasi mengenai layanan "${s.title}". Mohon informasi tata cara dan persyaratannya.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent-strong"
              >
                <WhatsAppIcon className="size-3.5" />
                Konsultasi Layanan Ini via WhatsApp →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tahapan & Estimasi Waktu Produksi */}
      <section aria-labelledby="judul-tahapan" className="mt-24 rounded-3xl border border-line bg-surface p-8 sm:p-12">
        <SectionHeading
          id="judul-tahapan"
          eyebrow="Alur Kerja & Timeline"
          title="Tahapan & Estimasi Waktu Produksi"
          description="Transparan sejak awal agar jadwal penyelesaian proyek Anda selalu tepat waktu."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {productionSteps.map((item) => (
            <div
              key={item.step}
              className="relative rounded-2xl border border-line/60 bg-surface-2 p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-accent/40">{item.step}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-xs font-medium text-accent-strong">{item.duration}</p>
                <p className="mt-3 text-xs leading-relaxed text-muted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pembuat Pesan WhatsApp Interaktif */}
      <div className="mt-24 max-w-4xl mx-auto">
        <WhatsAppInquiryBuilder />
      </div>
    </div>
  );
}
