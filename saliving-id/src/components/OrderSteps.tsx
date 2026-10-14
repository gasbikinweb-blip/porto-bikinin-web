import { consultMessage } from '@/lib/whatsapp';
import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';

// TODO: verifikasi alur kerja dengan SA Living (mis. DP, lama pengerjaan)
const steps = [
  {
    title: 'Chat WhatsApp',
    text: 'Ceritakan kebutuhan Anda: ruangan, produk yang diminati, dan lokasi rumah.',
  },
  {
    title: 'Ukur & konsultasi gratis',
    text: 'Tim kami datang mengukur dan membawa contoh motif, warna, serta bahan.',
  },
  {
    title: 'Pilih & terima penawaran',
    text: 'Tentukan pilihan Anda, lalu kami kirim rincian harga sesuai ukuran ruangan.',
  },
  {
    title: 'Dipasang rapi',
    text: 'Pemasangan oleh tim SA Living sesuai jadwal yang disepakati.',
  },
] as const;

export function OrderSteps() {
  return (
    <section aria-labelledby="cara-kerja" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="cara-kerja"
          eyebrow="Cara kerja"
          title="Dari Chat Sampai Terpasang"
          description="Tanpa formulir dan tanpa transaksi online. Semua diatur lewat WhatsApp."
          align="center"
        />
        <ol data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="reveal relative rounded-2xl border border-line bg-background p-7"
            >
              <span className="font-serif text-4xl text-accent italic">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="reveal mt-12 text-center">
          <WhatsAppButton message={consultMessage()}>Minta Ukur & Konsultasi Gratis</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
