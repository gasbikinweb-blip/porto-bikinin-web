'use client';

// Katalog dengan tab kategori + modal detail karya. Tab bisa dibuka lewat link #katalog-[slug].
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Work } from '@/data/works';
import { buildWhatsAppLink, workMessage } from '@/lib/whatsapp';
import { WorkModal } from './WorkModal';

type Tab = { slug: string; name: string; count: number };

type Props = {
  works: readonly Work[];
  tabs: readonly Tab[];
  categoryNames: Record<string, string>;
};

export function CatalogTabs({ works, tabs, categoryNames }: Props) {
  const [active, setActive] = useState('semua');
  const [open, setOpen] = useState<Work | null>(null);

  // Sinkron dengan hash URL (#katalog-kitchen-set) dari kartu kategori/menu
  useEffect(() => {
    const read = () => {
      const slug = window.location.hash.replace(/^#katalog-?/, '');
      if (!window.location.hash.startsWith('#katalog')) return;
      setActive(tabs.some((t) => t.slug === slug) ? slug : 'semua');
      // #katalog-[slug] bukan id elemen, jadi gulir ke section katalog secara manual
      if (slug) document.getElementById('katalog')?.scrollIntoView();
    };
    read();
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, [tabs]);

  const shown = active === 'semua' ? works : works.filter((w) => w.category === active);
  const allTabs = [{ slug: 'semua', name: 'Semua', count: works.length }, ...tabs];

  return (
    <>
      <div
        role="group"
        aria-label="Filter kategori"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {allTabs.map((t) => (
          <button
            key={t.slug}
            type="button"
            aria-pressed={active === t.slug}
            onClick={() => setActive(t.slug)}
            className="shrink-0 rounded-full border border-line px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:border-wood aria-pressed:border-wood aria-pressed:bg-wood aria-pressed:text-white"
          >
            {t.name}
            <sup className="ml-0.5 text-[10px] opacity-75">{t.count}</sup>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Menampilkan {shown.length} karya
      </p>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {shown.map((work) => (
          <li key={work.slug} className="text-center">
            <button type="button" onClick={() => setOpen(work)} className="group block w-full">
              <span className="relative block aspect-square overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={work.cover.thumb}
                  alt={work.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {work.status === 'proses' && (
                  <span className="absolute top-3 left-3 rounded-full bg-brand-gold px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] text-ink uppercase">
                    Proses Produksi
                  </span>
                )}
              </span>
              <span className="mt-4 block text-[10px] font-medium tracking-[0.2em] text-muted uppercase">
                {categoryNames[work.category]}
              </span>
              <span className="mt-1 block font-serif text-xl leading-snug group-hover:text-wood">
                {work.title}
              </span>
            </button>
            <a
              href={buildWhatsAppLink(workMessage(work.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-xs text-wood-strong underline-offset-4 hover:underline"
            >
              Tanya via WhatsApp<span className="sr-only"> tentang {work.title} (tab baru)</span>
            </a>
          </li>
        ))}
      </ul>

      {open && (
        <WorkModal
          work={open}
          categoryName={categoryNames[open.category]}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
