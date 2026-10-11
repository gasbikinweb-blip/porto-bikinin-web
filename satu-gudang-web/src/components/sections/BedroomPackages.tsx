import Image from 'next/image';
import { sectionIds } from '@/components/site/nav';
import { WaButton } from '@/components/ui/Button';
import { CheckIcon } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { SiteContent } from '@/content/types';
import { bedroomPackages } from '@/data/packages';
import { isProduction } from '@/lib/config';
import { formatIdr } from '@/lib/format';
import { imgSmall } from '@/lib/images';
import { waLink } from '@/lib/whatsapp';

export function BedroomPackages({ content }: { content: SiteContent }) {
  const t = content.packages;
  const { common } = content;
  return (
    <section id={sectionIds.packages} aria-labelledby="packages-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading id="packages-title" eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3" data-stagger>
          {bedroomPackages.map((pkg) => {
            const item = t.items[pkg.id];
            return (
              <li
                key={pkg.id}
                className={`reveal lift relative flex flex-col overflow-hidden rounded-[2rem] border ${pkg.featured ? 'border-accent bg-surface shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)]' : 'border-line'}`}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={imgSmall(pkg.image)}
                    alt={item.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                  {pkg.featured && (
                    <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-on-accent">
                      {t.featuredBadge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-serif text-3xl font-medium">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted">{item.forWho}</p>
                  <p className="mt-5 flex flex-wrap items-baseline gap-2">
                    {pkg.priceFrom ? (
                      <>
                        <span className="text-sm text-muted">{common.priceFrom}</span>
                        <span className="font-serif text-2xl">
                          {formatIdr(pkg.priceFrom, content.locale)}
                        </span>
                      </>
                    ) : (
                      <span className="font-serif text-2xl">{common.priceOnRequest}</span>
                    )}
                    {/* Penanda harga belum diisi, hanya terlihat saat development */}
                    {!pkg.priceFrom && !isProduction && (
                      <span className="rounded bg-accent px-1.5 py-0.5 text-[0.65rem] font-bold text-on-accent">
                        TODO
                      </span>
                    )}
                  </p>
                  <p className="mt-6 text-xs font-bold tracking-[0.16em] text-muted uppercase">
                    {t.includesLabel}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {item.includes.map((inc) => (
                      <li key={inc} className="flex gap-2.5">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent-text" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <WaButton
                      href={waLink(content.wa.bedroomPackage, { package: item.name })}
                      variant={pkg.featured ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      {t.cta}
                    </WaButton>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="reveal mt-8 max-w-2xl text-sm text-muted">{t.note}</p>
      </div>
    </section>
  );
}
