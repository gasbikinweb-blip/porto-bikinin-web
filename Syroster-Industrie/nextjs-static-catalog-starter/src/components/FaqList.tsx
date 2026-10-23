import type { FaqItem } from '@/data/faq';

/** Akordeon aksesibel memakai details/summary bawaan browser (keyboard & pembaca layar otomatis didukung). */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-white">
      {items.map((f) => (
        <details key={f.question} className="group p-5 sm:p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-ink">
            {f.question}
            <span
              aria-hidden="true"
              className="faq-icon text-2xl leading-none text-gold-ink transition-transform"
            >
              +
            </span>
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
