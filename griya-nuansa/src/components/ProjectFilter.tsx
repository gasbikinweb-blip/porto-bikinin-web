'use client';

import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { categories } from '@/data/categories';
import type { CategorySlug, Project } from '@/data/types';

// Grid proyek dengan tab kategori
export function ProjectFilter({
  projects,
  headingLevel = 'h2',
}: {
  projects: Project[];
  headingLevel?: 'h2' | 'h3';
}) {
  const [active, setActive] = useState<CategorySlug | 'semua'>('semua');
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
      <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} headingLevel={headingLevel} />
          </li>
        ))}
      </ul>
    </div>
  );
}
