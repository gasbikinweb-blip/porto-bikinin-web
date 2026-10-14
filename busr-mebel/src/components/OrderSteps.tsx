import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';

const steps = [
  {
    step: '01',
    title: 'Konsultasi & Desain',
    text: 'Pilih model dari katalog atau kirim gambar referensi & ukuran denah Anda langsung via WhatsApp.',
  },
  {
    step: '02',
    title: 'Penawaran & Kesepakatan',
    text: 'Kami susun rincian estimasi biaya transparan, opsi material kayu/HPL/kain, dan tenggat pengerjaan.',
  },
  {
    step: '03',
    title: 'Produksi & Finishing Presisi',
    text: 'Dikerjakan langsung di workshop Jepara oleh perajin berpengalaman dengan pengawasan mutu ketat.',
  },
  {
    step: '04',
    title: 'Pengiriman & Perakitan di Tempat',
    text: 'Furnitur dikirim terproteksi packing kayu dan dirakit langsung di lokasi kantor atau rumah Anda.',
  },
] as const;

export function OrderSteps() {
  return (
    <section aria-labelledby="cara-pesan" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            id="cara-pesan"
            eyebrow="Cara pesan"
            title="Empat langkah, tanpa ribet"
            description="Semua dilayani lewat WhatsApp, dari konsultasi sampai furnitur terpasang."
          />
          <div className="reveal shrink-0">
            <WhatsAppButton>Mulai Konsultasi</WhatsAppButton>
          </div>
        </div>
        <ol data-stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s) => (
            <li key={s.title} className="reveal border-t border-foreground/80 pt-6">
              <span className="font-serif text-4xl text-teak">{s.step}</span>
              <h3 className="mt-4 text-base font-medium">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
