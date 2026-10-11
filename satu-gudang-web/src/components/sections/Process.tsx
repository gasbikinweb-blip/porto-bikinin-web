import Image from 'next/image';
import { sectionIds } from '@/components/site/nav';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';
import { processSteps } from '@/data/process';
import { imgLarge, imgSmall } from '@/lib/images';

export function Process({ content }: { content: SiteContent }) {
  const t = content.process;
  const beforeAfter = [
    { src: '/process/before-2', label: t.beforeAfter.before, alt: t.beforeAfter.beforeAlt },
    { src: '/projects/spa-seminyak/02', label: t.beforeAfter.after, alt: t.beforeAfter.afterAlt },
  ];

  return (
    <section id={sectionIds.process} aria-labelledby="process-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading id="process-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {processSteps.map((s, i) => {
            const item = t.items[s.id];
            return (
              <li key={s.id} className="reveal flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
                  {s.image ? (
                    <Image
                      src={imgSmall(s.image)}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    // TODO: belum ada foto workshop; kartu motif bilah kayu sementara (bukan gambar karangan)
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(90deg,var(--surface)_0_18px,var(--surface-2)_18px_20px)]"
                    >
                      <span className="font-serif text-7xl text-wood">0{i + 1}</span>
                    </div>
                  )}
                </div>
                <p className="mt-5 font-serif text-sm text-accent-text">0{i + 1}</p>
                <h3 className="mt-1 font-serif text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            );
          })}
        </ol>

        {/* Sebelum & sesudah: foto asli proyek spa */}
        <figure className="mt-20">
          <figcaption className="reveal font-serif text-2xl font-medium sm:text-3xl">
            {t.beforeAfter.title}
          </figcaption>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {beforeAfter.map((b) => (
              <div
                key={b.src}
                className="reveal reveal-curtain parallax-soft relative aspect-[16/10] overflow-hidden rounded-2xl"
              >
                <Image
                  src={imgLarge(b.src)}
                  alt={b.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </section>
  );
}
