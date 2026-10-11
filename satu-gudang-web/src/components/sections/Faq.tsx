import { sectionIds } from '@/components/site/nav';
import { PlusIcon } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';

// FAQ memakai <details>/<summary> bawaan browser: bisa dibuka-tutup tanpa JavaScript,
// ramah keyboard & pembaca layar, dan isinya tetap terbaca mesin pencari.
export function Faq({ content }: { content: SiteContent }) {
  const t = content.faq;
  return (
    <section id={sectionIds.faq} aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading id="faq-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="reveal divide-y divide-line border-y border-line">
          {t.items.map((item) => (
            <details key={item.q} name="faq" className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-lg font-medium sm:text-xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-on-accent">
                  <PlusIcon className="size-4" />
                </span>
              </summary>
              <p className="pb-6 text-sm leading-relaxed text-muted sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
