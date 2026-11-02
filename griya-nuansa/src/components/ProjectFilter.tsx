'use client';

import { useId, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { Select } from './Select';
import { categories } from '@/data/categories';
import { regions } from '@/data/project-facts';
import type { CategorySlug, Project } from '@/data/types';
import { useLang } from '@/i18n/client';

const MAX_QUERY = 40;

// Grid proyek dengan filter sesuai brief: nama, kategori, lokasi, tahun (semua di sisi klien)
export function ProjectFilter({
  projects,
  headingLevel = 'h2',
}: {
  projects: Project[];
  headingLevel?: 'h2' | 'h3';
}) {
  const { lang, t } = useLang();
  const f = t.filter;
  const id = useId();
  const [active, setActive] = useState<CategorySlug | 'semua'>('semua');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');

  // Hanya tampilkan pilihan yang punya proyek
  const available = categories.filter((c) => projects.some((p) => p.category === c.slug));
  const regionOptions = regions.filter((r) => projects.some((p) => p.region === r.slug));
  const yearOptions = [...new Set(projects.map((p) => p.year).filter((y) => y !== undefined))]
    .sort((a, b) => b - a)
    .map(String);

  const q = query.trim().toLowerCase();
  const region = regionOptions.find((r) => r.label === location)?.slug;
  const shown = projects.filter(
    (p) =>
      (active === 'semua' || p.category === active) &&
      (!q || p.title.toLowerCase().includes(q)) &&
      (!region || p.region === region) &&
      (!year || String(p.year) === year),
  );

  const options = [
    { slug: 'semua' as const, label: f.all },
    ...available.map((c) => ({ slug: c.slug, label: c.label[lang] })),
  ];
  const filtered = active !== 'semua' || q || location || year;
  const reset = () => {
    setActive('semua');
    setQuery('');
    setLocation('');
    setYear('');
  };
  const labelCls = 'block text-xs tracking-[0.15em] text-muted uppercase';

  return (
    <div>
      <div
        role="group"
        aria-label={f.label}
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

      <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor={`${id}-q`} className={labelCls}>
            {f.search}
          </label>
          <input
            id={`${id}-q`}
            type="search"
            value={query}
            maxLength={MAX_QUERY}
            onChange={(e) => setQuery(e.target.value.slice(0, MAX_QUERY))}
            placeholder={f.searchPh}
            className="mt-1 w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-fg focus:border-fg focus:outline-none"
          />
        </div>
        <div>
          <span id={`${id}-l-l`} className={labelCls}>
            {f.location}
          </span>
          <Select
            id={`${id}-l`}
            labelId={`${id}-l-l`}
            value={location}
            onChange={setLocation}
            options={regionOptions.map((r) => r.label)}
            placeholder={f.allLocations}
          />
        </div>
        <div>
          <span id={`${id}-y-l`} className={labelCls}>
            {f.year}
          </span>
          <Select
            id={`${id}-y`}
            labelId={`${id}-y-l`}
            value={year}
            onChange={setYear}
            options={yearOptions}
            placeholder={f.allYears}
          />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {f.showing(shown.length)}
      </p>
      {shown.length > 0 ? (
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.slug}>
              <ProjectCard lang={lang} project={p} headingLevel={headingLevel} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 text-center text-muted">
          <p>{f.empty}</p>
          {filtered && (
            <button
              type="button"
              onClick={reset}
              className="mt-4 border-b border-fg pb-0.5 text-xs tracking-[0.2em] text-fg uppercase"
            >
              {f.reset}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
