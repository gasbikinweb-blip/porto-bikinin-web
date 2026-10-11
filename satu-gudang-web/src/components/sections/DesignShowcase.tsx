import Image from 'next/image';
import { sectionIds } from '@/components/site/nav';
import { WaButton } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';
import { designRenders } from '@/data/design';
import { imgLarge, imgSmall } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';

// Tata letak bento (desktop): render ke-5 besar, sisanya mengelilingi. Indeks = urutan di designRenders.
const layout = [
  { i: 4, cls: 'lg:col-span-4 lg:row-span-2', big: true },
  { i: 2, cls: 'lg:col-span-2' },
  { i: 1, cls: 'lg:col-span-2' },
  { i: 3, cls: 'lg:col-span-3' },
  { i: 0, cls: 'lg:col-span-3' },
];

// Desain 3D: menunjukkan Satu Gudang bisa membuat desain sesuai keinginan klien
export function DesignShowcase({ content }: { content: SiteContent }) {
  const t = content.design;
  return (
    <section
      id={sectionIds.design}
      aria-labelledby="design-title"
      className="theme-dark relative overflow-hidden bg-background py-20 sm:py-28"
    >
      {/* Garis denah samar sebagai latar (dekoratif) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:56px_56px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading id="design-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <div>
            <ul className="space-y-3" data-stagger>
              {t.points.map((p) => (
                <li key={p} className="reveal flex gap-3 text-sm sm:text-base">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-on-accent">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <WaButton href={waLink(content.wa.design)} className="reveal mt-8">
              {t.cta}
            </WaButton>
          </div>
        </div>

        {/* HP: geser horizontal; desktop: grid bento */}
        <ul
          className="-mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:auto-rows-[15rem] lg:grid-cols-6 lg:overflow-visible lg:px-0 lg:pb-0"
          data-stagger
        >
          {layout.map(({ i, cls, big }) => {
            const src = designRenders[i];
            if (!src) return null;
            return (
              <li
                key={src}
                className={`reveal reveal-zoom group relative aspect-[4/3] w-[82%] shrink-0 snap-center overflow-hidden rounded-3xl sm:w-[60%] lg:aspect-auto lg:w-auto ${cls}`}
              >
                <Image
                  src={big ? imgLarge(src) : imgSmall(src)}
                  alt={t.alts[i] ?? ''}
                  fill
                  sizes={big ? '(min-width: 1024px) 60vw, 82vw' : '(min-width: 1024px) 40vw, 82vw'}
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute top-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-bold backdrop-blur">
                  3D
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-xs text-muted">{t.note}</p>
      </div>
    </section>
  );
}
