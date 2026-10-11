import Image from 'next/image';
import { sectionIds } from '@/components/site/nav';
import { CheckIcon, WhatsAppIcon } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';
import { services } from '@/data/services';
import { imgSmall } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';

export function Services({ content }: { content: SiteContent }) {
  const t = content.services;
  return (
    <section id={sectionIds.services} aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading id="services-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {services.map((s, i) => {
            const item = t.items[s.id];
            return (
              <li
                key={s.id}
                className="reveal lift group flex flex-col overflow-hidden rounded-[2rem] bg-surface sm:last:col-span-2 lg:last:col-span-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-b-[2rem]">
                  <Image
                    src={imgSmall(s.image)}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 grid size-11 place-items-center rounded-full bg-background/90 font-serif text-lg">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-serif text-2xl font-medium">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {item.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent-text" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={waLink(content.wa.service, { service: item.title })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-accent-text underline-offset-4 hover:underline"
                  >
                    <WhatsAppIcon className="size-4" />
                    {t.cta}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
