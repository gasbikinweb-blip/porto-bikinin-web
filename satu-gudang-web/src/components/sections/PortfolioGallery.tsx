'use client';

// Filter kategori + lightbox galeri proyek. Hanya menerima data string siap tampil dari server.
import Image from 'next/image';
import { useState } from 'react';
import { ArrowIcon, PinIcon, WhatsAppIcon } from '@/components/ui/icons';
import { Lightbox, useLightbox } from '@/components/ui/Lightbox';
import type { ProjectCategory } from '@/data/projects';

export type ProjectView = {
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  title: string;
  location: string;
  summary: string;
  scope: readonly string[];
  images: { small: string; large: string; alt: string }[];
  waHref: string;
};

type Filter = 'all' | ProjectCategory;

type Labels = {
  filter: string;
  filters: Record<Filter, string>;
  viewGallery: string;
  photos: string;
  askSimilar: string;
  gallery: string;
  close: string;
  previous: string;
  next: string;
};

const filterOrder: Filter[] = ['all', 'commercial', 'residential'];

export function PortfolioGallery({
  projects,
  labels,
}: {
  projects: ProjectView[];
  labels: Labels;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const lightbox = useLightbox();

  const visible = projects
    .map((p, index) => ({ p, index }))
    .filter(({ p }) => filter === 'all' || p.category === filter);

  const open = (index: number) => {
    const p = projects[index];
    if (p)
      lightbox.open({
        title: p.title,
        images: p.images,
        cta: { href: p.waHref, label: labels.askSimilar },
      });
  };

  return (
    <>
      <div role="group" aria-label={labels.filter} className="reveal mt-10 flex flex-wrap gap-2">
        {filterOrder.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="min-h-11 rounded-full border border-line px-5 text-sm font-bold transition-colors hover:border-accent aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background"
          >
            {labels.filters[f]}
          </button>
        ))}
      </div>

      <ul className="reveal mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map(({ p, index }, i) => {
          const cover = p.images[0];
          // Kartu pertama lebar penuh bila sisa kartu pas 3 kolom (mis. 4 proyek = 1 + 3)
          const featured = i === 0 && visible.length > 1 && visible.length % 3 === 1;
          return (
            <li
              key={p.slug}
              className={`group flex flex-col overflow-hidden rounded-[2rem] bg-background ${featured ? 'md:col-span-2 md:grid md:grid-cols-[1.4fr_1fr] lg:col-span-3' : ''}`}
            >
              <button
                type="button"
                onClick={() => open(index)}
                className={`relative block aspect-[4/3] w-full overflow-hidden text-left ${featured ? 'md:aspect-auto md:min-h-[26rem]' : ''}`}
              >
                {cover && (
                  <Image
                    src={cover.small}
                    alt={cover.alt}
                    fill
                    sizes={
                      featured
                        ? '(min-width: 768px) 60vw, 100vw'
                        : '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
                    }
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold tracking-wide">
                  {p.categoryLabel}
                </span>
                <span className="absolute right-4 bottom-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold">
                  {p.images.length} {labels.photos}
                </span>
                <span className="sr-only">
                  {labels.viewGallery}: {p.title}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.14em] text-muted uppercase">
                  <PinIcon className="size-3.5 text-accent-text" /> {p.location}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-medium sm:text-3xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.scope.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-xs font-semibold"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 text-sm font-bold">
                  <button
                    type="button"
                    onClick={() => open(index)}
                    className="inline-flex min-h-11 items-center gap-2 hover:text-accent-text"
                  >
                    {labels.viewGallery} <ArrowIcon />
                  </button>
                  <a
                    href={p.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 text-accent-text underline-offset-4 hover:underline"
                  >
                    <WhatsAppIcon className="size-4" /> {labels.askSimilar}
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Lightbox ctl={lightbox} labels={labels} />
    </>
  );
}
