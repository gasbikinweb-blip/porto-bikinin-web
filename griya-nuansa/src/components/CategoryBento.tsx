'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from './icons';
import { WhatsAppIcon } from './WhatsApp';
import type { ShowcaseItem } from './HeroShowcase';
import { buildWhatsAppLink } from '@/lib/config';

export interface BentoCategory {
  slug: string;
  label: string;
  description: string;
  projects: ShowcaseItem[];
}

const arrow = (path: string) => (
  <svg
    viewBox="0 0 16 16"
    className="h-4 w-4"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d={path} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Warna latar kartu "proyek populer" bergantian
const tones = ['bg-[#b9835a] text-white', 'bg-ink text-white', 'bg-surface text-fg'];

/** Section kategori bergaya bento: chip kategori, slider proyek, dan proyek populer */
export function CategoryBento({ categories }: { categories: BentoCategory[] }) {
  const [catIndex, setCatIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const cat = categories[catIndex];
  if (!cat) return null;
  const list = cat.projects;
  const current = list[slide % list.length];
  const second = list[1] ?? list[0];

  function pick(i: number) {
    setCatIndex(i);
    setSlide(0);
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className="shrink-0 font-serif text-2xl">Kategori</h2>
        <div role="group" aria-label="Pilih kategori" className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              aria-pressed={i === catIndex}
              onClick={() => pick(i)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors ${
                i === catIndex ? 'bg-fg text-bg' : 'bg-surface hover:bg-line'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Kategori {cat.label}: {list.length} proyek
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        {/* Kartu kiri: slider proyek dalam kategori */}
        <div className="flex flex-col rounded-[1.75rem] bg-surface p-4 lg:col-span-4 lg:row-span-2">
          <p className="px-2 pt-2 font-serif text-3xl">{cat.label}</p>
          <p className="px-2 text-sm text-muted">
            {slide + 1} / {list.length} proyek
          </p>
          {current && (
            <Link
              href={`/proyek/${current.slug}/`}
              className="group relative mt-4 block flex-1 overflow-hidden rounded-[1.25rem]"
            >
              <div className="relative aspect-[4/5] h-full lg:aspect-auto lg:min-h-[340px]">
                <Image
                  key={current.slug}
                  src={current.cover.thumb}
                  alt={current.cover.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="fade-in object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs text-neutral-900">
                {current.scope}
              </span>
              <span className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/25 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
                <span className="block font-serif text-xl">{current.title}</span>
              </span>
            </Link>
          )}
          <div className="mt-4 flex items-center justify-between rounded-full bg-bg p-1.5">
            <button
              type="button"
              onClick={() => setSlide((s) => (s - 1 + list.length) % list.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line hover:bg-surface"
            >
              <span className="sr-only">Proyek sebelumnya</span>
              {arrow('M10 3L5 8l5 5')}
            </button>
            <span className="text-sm text-muted">Geser kiri &amp; kanan</span>
            <button
              type="button"
              onClick={() => setSlide((s) => (s + 1) % list.length)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-fg text-bg hover:opacity-85"
            >
              <span className="sr-only">Proyek berikutnya</span>
              {arrow('M6 3l5 5-5 5')}
            </button>
          </div>
        </div>

        {/* Kartu tengah: ringkasan kategori */}
        <div className="relative flex min-h-[260px] overflow-hidden rounded-[1.75rem] bg-surface p-6 lg:col-span-5">
          <div className="relative z-10 max-w-[55%]">
            <p className="font-serif text-4xl leading-tight">Ruang {cat.label}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{cat.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-bg px-4 py-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-amber" />
              {list.length} proyek
            </span>
          </div>
          {second && (
            <div className="absolute inset-y-4 right-4 w-[42%] overflow-hidden rounded-[1.25rem]">
              <Image
                key={second.slug}
                src={second.cover.thumb}
                alt={second.cover.alt}
                fill
                sizes="(min-width: 1024px) 18vw, 40vw"
                className="fade-in object-cover"
              />
            </div>
          )}
        </div>

        {/* Kartu kanan: ajakan konsultasi */}
        <div className="flex flex-col justify-between rounded-[1.75rem] bg-surface p-6 lg:col-span-3">
          <p className="font-serif text-3xl leading-tight">
            Rancang ruang <em>{cat.label.toLowerCase()}</em> Anda
          </p>
          <a
            href={buildWhatsAppLink(
              `Halo Griya Nuansa, saya ingin konsultasi proyek ${cat.label.toLowerCase()}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-between rounded-full bg-bg py-1.5 pr-1.5 pl-5 text-sm hover:ring-1 hover:ring-line"
          >
            Mulai konsultasi
            <span className="flex h-11 w-14 items-center justify-center rounded-full bg-fg text-bg">
              <WhatsAppIcon />
            </span>
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
        </div>

        {/* Proyek populer dalam kategori */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-3xl md:text-4xl">Proyek Populer</h3>
            <Link
              href="/proyek/"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm hover:border-fg"
            >
              Lihat semua <ArrowUpRight />
            </Link>
          </div>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {list.slice(0, 3).map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={`/proyek/${p.slug}/`}
                  className={`group block rounded-[1.5rem] p-3 ${tones[i % 3]}`}
                >
                  <span className="flex items-center justify-between px-1 pb-3">
                    <span className="truncate text-sm font-medium">{p.title}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/90 text-neutral-900 transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </span>
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={p.cover.thumb}
                      alt={p.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
