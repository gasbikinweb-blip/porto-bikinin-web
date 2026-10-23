'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { KindBadge } from './KindBadge';
import { categories } from '@/data/categories';
import type { CategorySlug, Project } from '@/data/types';

// Grid karya rapat tiga kolom dengan tab kategori (terinspirasi tata letak portofolio studio arsitektur)
export function ProjectFilter({
  projects,
  headingLevel = 'h2',
}: {
  projects: Project[];
  headingLevel?: 'h2' | 'h3';
}) {
  const [active, setActive] = useState<CategorySlug | 'semua'>('semua');
  const H = headingLevel;
  // Hanya tampilkan kategori yang punya proyek
  const available = categories.filter((c) => projects.some((p) => p.category === c.slug));
  const shown = active === 'semua' ? projects : projects.filter((p) => p.category === active);

  const options = [{ slug: 'semua' as const, label: 'Semua Karya' }, ...available];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter kategori proyek"
        className="flex flex-wrap justify-center gap-x-6 gap-y-2"
      >
        {options.map((o) => (
          <button
            key={o.slug}
            type="button"
            aria-pressed={active === o.slug}
            onClick={() => setActive(o.slug)}
            className={`border-b py-2 text-xs tracking-[0.2em] uppercase transition-colors ${
              active === o.slug
                ? 'border-fg text-fg'
                : 'border-transparent text-muted hover:text-fg'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Menampilkan {shown.length} proyek
      </p>
      <ul className="mt-10 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => {
          const cat = categories.find((c) => c.slug === p.category)?.label;
          return (
            <li key={p.slug}>
              <Link
                href={`/proyek/${p.slug}/`}
                className="group relative block aspect-[4/3] overflow-hidden bg-surface"
              >
                <Image
                  src={p.cover.thumb}
                  alt={p.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <KindBadge kind={p.cover.kind} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white transition-all duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                  <H className="text-sm font-semibold tracking-[0.15em] uppercase">{p.title}</H>
                  <p className="mt-1 text-[11px] tracking-[0.2em] text-white/80 uppercase">
                    {[p.location, cat].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
