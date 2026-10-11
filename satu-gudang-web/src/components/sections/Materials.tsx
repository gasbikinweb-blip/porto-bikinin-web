import Image from 'next/image';
import { sectionIds } from '@/components/site/nav';
import { WaButton } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';
import { materials } from '@/data/materials';
import { imgLarge, imgSmall } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';
import { SampleGallery } from './SampleGallery';

// Foto asli request sample warna (assets-src/process/sample-request-*.jpg); urutan = content.materials.sample.alts
const sampleImages = [
  '/process/sample-request-1',
  '/process/sample-request-2',
  '/process/sample-request-3',
];

export function Materials({ content }: { content: SiteContent }) {
  const t = content.materials;
  return (
    <section
      id={sectionIds.materials}
      aria-labelledby="materials-title"
      className="bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="materials-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <WaButton
            href={waLink(content.wa.material)}
            variant="outline"
            className="reveal self-start lg:self-auto"
          >
            {t.cta}
          </WaButton>
        </div>

        <ul
          className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3"
          data-stagger
        >
          {materials.map((m) => {
            const item = t.items[m.id];
            return (
              <li key={m.id} className="reveal reveal-zoom">
                {/* Bentuk "sample chip": atas melengkung seperti potongan papan sample */}
                <div className="relative aspect-square overflow-hidden rounded-t-full rounded-b-2xl">
                  <Image
                    src={imgSmall(m.image)}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-serif text-lg font-medium sm:text-xl">{item.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
                <p className="mt-2 text-xs font-semibold text-accent-text">{item.seenIn}</p>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-xs text-muted">{t.note}</p>

        {/* Request sample warna sebelum pengerjaan: foto asli papan sample HPL & lantai */}
        <div className="mt-16 grid items-center gap-10 overflow-hidden rounded-[2rem] bg-background p-6 sm:p-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h3 className="reveal font-serif text-2xl leading-tight font-medium text-balance sm:text-4xl">
              {t.sample.title}
            </h3>
            <p className="reveal mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
              {t.sample.text}
            </p>
            <WaButton href={waLink(content.wa.sample)} className="reveal mt-8">
              {t.sample.cta}
            </WaButton>
          </div>
          <SampleGallery
            images={sampleImages.map((src, i) => ({
              small: imgSmall(src),
              large: imgLarge(src),
              alt: t.sample.alts[i as 0 | 1 | 2],
            }))}
            title={t.sample.gallery}
            hint={t.sample.hint}
            cta={{ href: waLink(content.wa.sample), label: t.sample.cta }}
            labels={{
              gallery: t.sample.gallery,
              close: content.common.close,
              previous: content.common.previous,
              next: content.common.next,
            }}
          />
        </div>
      </div>
    </section>
  );
}
