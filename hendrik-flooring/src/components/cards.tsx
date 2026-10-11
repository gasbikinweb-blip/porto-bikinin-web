// Daftar keunggulan, langkah kerja, dan FAQ (server component)
import { faqs } from '@/data/faq';
import { features, steps } from '@/data/site';
import { FeatureIcon, PlusIcon } from './icons';

export function FeatureGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
      {features.map((f) => (
        <li key={f.title} className="reveal rounded-2xl border border-line bg-background p-6">
          <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent-strong">
            <FeatureIcon name={f.icon} />
          </span>
          <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
          <p className="mt-2 text-muted">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function ProcessSteps() {
  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" data-stagger>
      {steps.map((s, i) => (
        <li key={s.title} className="reveal relative rounded-2xl bg-background p-6">
          <div className="flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-xl bg-mint text-sage">
              <FeatureIcon name={s.icon} />
            </span>
            <span className="text-4xl font-bold text-surface-2" aria-hidden="true">
              0{i + 1}
            </span>
          </div>
          <h3 className="mt-4 text-lg font-bold">
            <span className="sr-only">Langkah {i + 1}: </span>
            {s.title}
          </h3>
          <p className="mt-2 text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Akordeon FAQ memakai details/summary bawaan: aksesibel tanpa JavaScript */
export function FaqList({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-background">
      {items.map((f) => (
        <details key={f.question} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left font-semibold hover:text-accent-strong sm:p-6">
            {f.question}
            <PlusIcon className="size-5 shrink-0 text-accent transition-transform group-open:rotate-45" />
          </summary>
          <p className="px-5 pb-6 text-muted sm:px-6">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
