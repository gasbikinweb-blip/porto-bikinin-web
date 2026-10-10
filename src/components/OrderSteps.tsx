import { SectionHeading } from './SectionHeading';
import { WhatsAppButton } from './WhatsAppButton';

const steps = [
  {
    title: 'Pilih produk',
    text: 'Jelajahi katalog dan temukan furnitur yang cocok untuk ruangan Anda.',
  },
  {
    title: 'Chat via WhatsApp',
    text: 'Tekan tombol "Tanya via WhatsApp". Pesan berisi nama produk sudah terisi otomatis.',
  },
  {
    title: 'Diskusi & pesan',
    text: 'Konsultasikan ukuran, finishing, harga, dan pengiriman langsung dengan tim kami.',
  },
] as const;

export function OrderSteps() {
  return (
    <section aria-labelledby="cara-pesan" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="cara-pesan"
          eyebrow="Mudah & personal"
          title="Cara Pemesanan"
          description="Tanpa keranjang, tanpa formulir. Cukup tiga langkah lewat WhatsApp."
          align="center"
        />
        <ol data-stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="reveal reveal-zoom group relative overflow-hidden rounded-2xl border border-line bg-background p-8 transition-colors duration-500 hover:border-accent/60"
            >
              <span
                aria-hidden="true"
                className="absolute -top-6 -right-2 font-serif text-[120px] leading-none text-foreground/5 transition-colors duration-500 group-hover:text-accent/15"
              >
                {i + 1}
              </span>
              <span className="grid size-12 place-items-center rounded-full bg-accent/15 font-serif text-xl text-accent-strong">
                {i + 1}
              </span>
              <h3 className="mt-6 font-serif text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="reveal mt-12 text-center">
          <WhatsAppButton>Mulai Chat Sekarang</WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
