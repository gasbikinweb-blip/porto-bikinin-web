import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';

const steps = [
  {
    title: 'Kirim ukuran & contoh model',
    text: 'Kirim ukuran ruangan dan foto contoh model yang Anda suka lewat WhatsApp.',
  },
  {
    title: 'Diskusi desain & harga',
    text: 'Kami bantu tentukan model, warna, dan detail, lalu sampaikan penawaran harga.',
  },
  {
    title: 'Produksi di workshop',
    text: 'Setelah sepakat, furnitur dikerjakan langsung di workshop kami di Boyolali.',
  },
  {
    title: 'Kirim / pasang',
    text: 'Pesanan dikirim ke lokasi Anda, termasuk luar kota.', // TODO: konfirmasi jasa pasang
  },
] as const;

export function OrderSteps() {
  return (
    <section aria-labelledby="cara-pesan" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="cara-pesan"
          eyebrow="Cara pesan"
          title="4 langkah mudah lewat WhatsApp"
          align="center"
        />
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-background p-6">
              <span className="grid size-10 place-items-center rounded-full bg-wood text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <WhatsAppButton />
        </div>
      </div>
    </section>
  );
}
