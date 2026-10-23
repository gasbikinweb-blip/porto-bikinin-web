'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight } from './icons';
import { KindBadge } from './KindBadge';
import { PillLink } from './ui';
import type { ProjectImage } from '@/data/types';

export interface ShowcaseItem {
  slug: string;
  title: string;
  category: string;
  scope: string;
  cover: ProjectImage;
}

/**
 * Foto utama beranda + deretan 3 proyek di sisi kanan.
 * Klik kartu samping mengganti foto utama (tidak pindah halaman).
 * Tombol panah memutar seluruh daftar proyek.
 */
export function HeroShowcase({ items }: { items: ShowcaseItem[] }) {
  const [active, setActive] = useState(0);
  const n = items.length;
  const main = items[active];
  const side = [1, 2, 3].map((k) => (active + k) % n).filter((i) => i !== active);
  const go = (d: number) => setActive((i) => (i + d + n) % n);

  if (!main) return null;

  return (
    <>
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-surface sm:aspect-[16/10] lg:col-span-7">
        {/* key memicu animasi fade setiap foto berganti */}
        <Image
          key={main.slug}
          src={main.cover.src}
          alt={main.cover.alt}
          fill
          priority={active === 0}
          fetchPriority={active === 0 ? 'high' : undefined}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="fade-in object-cover"
        />
        <KindBadge kind={main.cover.kind} />
        <p className="sr-only" aria-live="polite">
          Menampilkan {main.title}
        </p>
        <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xs rounded-2xl border border-white/25 bg-black/35 p-4 text-white backdrop-blur-md">
            <p className="font-serif text-2xl">{main.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-white/80">
              {main.category} · {main.scope}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { d: -1, label: 'Proyek sebelumnya', path: 'M10 3L5 8l5 5' },
              { d: 1, label: 'Proyek berikutnya', path: 'M6 3l5 5-5 5' },
            ].map((b) => (
              <button
                key={b.d}
                type="button"
                onClick={() => go(b.d)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-md hover:bg-white hover:text-neutral-900"
              >
                <span className="sr-only">{b.label}</span>
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d={b.path} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <PillLink
              href={`/proyek/${main.slug}/`}
              tone="light"
              className="bg-black/30 backdrop-blur-md"
            >
              Lihat Proyek
            </PillLink>
          </div>
        </div>
      </div>

      <ul
        aria-label="Pilih proyek untuk ditampilkan"
        className="flex gap-3 overflow-x-auto pb-1 lg:col-span-2 lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {side.map((i) => {
          const p = items[i];
          if (!p) return null;
          return (
            <li key={p.slug} className="w-40 shrink-0 lg:w-auto">
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group block w-full rounded-2xl bg-bg p-2 text-left shadow-sm ring-1 ring-line transition-shadow hover:shadow-md"
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={p.cover.thumb}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 15vw, 160px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="mt-2 flex items-center justify-between gap-2 px-1">
                  <span className="truncate text-sm font-medium">{p.title}</span>
                  <ArrowUpRight className="h-3 w-3 shrink-0 text-muted" />
                </span>
                <span className="block px-1 pb-1 text-[11px] tracking-wider text-muted uppercase">
                  {p.category}
                </span>
                <span className="sr-only">, tampilkan di foto utama</span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
