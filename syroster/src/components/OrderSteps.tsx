import { orderSteps } from '@/data/site';
import { SectionHeading } from './SectionHeading';

export function OrderSteps() {
  return (
    <section
      id="cara-order"
      aria-label="Cara order"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        eyebrow="Cara order"
        title="Pesan roster dalam"
        highlight="4 langkah"
        align="center"
      />
      <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
        {orderSteps.map((s, i) => (
          <li key={s.title} className="reveal border-t-2 border-line pt-6">
            <span aria-hidden="true" className="font-display text-sm font-bold text-gold-ink">
              Langkah {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 font-display text-lg font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
