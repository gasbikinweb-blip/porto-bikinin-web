'use client';

// Galeri portofolio dengan filter kategori dan lightbox
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { categoryLabels, type ProductCategory } from '@/data/products';
import type { Project } from '@/data/projects';
import { Lightbox } from './Lightbox';

type Filter = 'semua' | ProductCategory;

export function PortfolioGallery({
  projects,
  showFilter = true,
}: {
  projects: Project[];
  showFilter?: boolean;
}) {
  const [filter, setFilter] = useState<Filter>('semua');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const visible = filter === 'semua' ? projects : projects.filter((p) => p.category === filter);
  const filters: Filter[] = ['semua', ...(Object.keys(categoryLabels) as ProductCategory[])];
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <div>
      {showFilter && (
        <div role="group" aria-label="Filter kategori" className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="min-h-11 rounded-full border border-line px-5 text-sm transition-colors hover:border-plum aria-pressed:border-plum aria-pressed:bg-plum aria-pressed:text-background"
            >
              {f === 'semua' ? 'Semua' : categoryLabels[f]}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Menampilkan {visible.length} foto
      </p>

      {visible.length === 0 ? (
        <p className="text-muted">Belum ada foto untuk kategori ini.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visible.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group block w-full text-left"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-surface">
                  <Image
                    src={p.thumb ?? p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 270px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {p.kind === 'ilustrasi' && (
                    <span className="absolute top-2 left-2 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold">
                      Ilustrasi
                    </span>
                  )}
                </span>
                <span className="mt-2 block text-sm font-semibold">{p.productType}</span>
                <span className="block text-xs text-muted">
                  {p.material ?? categoryLabels[p.category]}
                  <span className="sr-only">, buka foto lebih besar</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {openIndex !== null && (
        <Lightbox items={visible} index={openIndex} onIndexChange={setOpenIndex} onClose={close} />
      )}
    </div>
  );
}
