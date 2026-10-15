import type { FaqItem } from '@/data/faq';
import { PlusIcon } from './icons';

// Akordeon native <details>/<summary>: aksesibel tanpa JavaScript
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-serif text-xl [&::-webkit-details-marker]:hidden">
            {f.question}
            <PlusIcon className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="pb-5 leading-relaxed text-muted">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
