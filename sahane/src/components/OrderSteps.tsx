import { orderSteps } from '@/data/site';
import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';

export function OrderSteps() {
  return (
    <section aria-labelledby="cara-pesan" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="cara-pesan"
          eyebrow="Cara Pemesanan"
          title="Mudah, cukup lewat WhatsApp"
          description="Sebagian besar koleksi dibuat dengan sistem Pre-Order: PO dibuka dalam periode terbatas, lalu diproduksi dan dikirim setelah periode ditutup."
          align="center"
        />
        <ol data-stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {orderSteps.map((s, i) => (
            <li key={s.title} className="reveal rounded-2xl bg-background p-6">
              <span className="font-serif text-4xl text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <WhatsAppButton>Chat Admin Sekarang</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
