import type { Content } from '@/content/types';
import { PlusIcon } from '../icons';

// FAQ memakai <details> bawaan HTML: bisa dibuka tanpa JavaScript dan ramah keyboard
export function Faq({ t }: { t: Content }) {
  return (
    <section id="tanya" aria-labelledby="tanya-judul" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-28 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-36">
        <div className="lg:col-span-4">
          <p className="eyebrow reveal text-accent">{t.faq.label}</p>
          <h2 id="tanya-judul" className="reveal mt-6 font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] font-light">
            {t.faq.title}
          </h2>
        </div>
        <div className="border-t border-line lg:col-span-8" data-stagger>
          {t.faq.items.map((item) => (
            <details key={item.q} className="reveal group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl sm:text-2xl">
                {item.q}
                <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-hover:border-accent">
                  <PlusIcon className="size-4" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
