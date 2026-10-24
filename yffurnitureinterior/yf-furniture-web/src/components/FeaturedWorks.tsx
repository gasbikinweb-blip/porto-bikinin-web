'use client';

// "Karya pilihan": strip keunggulan + bento kategori (1 kartu besar, 2 kartu kecil).
// Klik judul karya atau foto membuka modal detail.
import Image from 'next/image';
import { useState } from 'react';
import type { Work } from '@/data/works';
import { WorkModal } from './WorkModal';

export type FeaturedGroup = {
  slug: string;
  name: string;
  description: string;
  works: readonly Work[];
};

type Props = {
  groups: readonly FeaturedGroup[];
  categoryNames: Record<string, string>;
};

const features = [
  {
    title: 'Ukuran Custom',
    text: 'Dibuat pas dengan ukuran ruangan Anda',
    icon: 'M3 17 17 3l4 4L7 21H3v-4Zm11-11 4 4M8 12l2 2m1-5 2 2',
  },
  {
    title: 'Free Desain & Cek Lokasi',
    text: 'Area Boyolali, Salatiga & sekitarnya', // TODO: konfirmasi
    icon: 'M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  },
  {
    title: 'Konsultasi via WhatsApp',
    text: 'Kirim ukuran & contoh model, kami bantu',
    icon: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12ZM8.5 12h.01M12 12h.01M15.5 12h.01',
  },
] as const;

function GroupCard({
  group,
  big,
  onOpen,
}: {
  group: FeaturedGroup;
  big: boolean;
  onOpen: (w: Work) => void;
}) {
  const cover = group.works[0];
  if (!cover) return null;
  return (
    <div
      className={`relative flex overflow-hidden rounded-3xl bg-surface p-6 sm:p-8 ${big ? 'min-h-[30rem] flex-col lg:row-span-2' : 'min-h-[15rem] flex-col sm:flex-row'}`}
    >
      <div className={`relative z-10 ${big ? 'sm:max-w-[44%]' : 'sm:w-1/2'}`}>
        <p className="text-sm">
          <span className="font-semibold text-brand-red">{group.works.length}</span>{' '}
          <span className="text-muted">Karya</span>
        </p>
        <h3
          className={`mt-1 font-semibold tracking-tight ${big ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl'}`}
        >
          {group.name}
        </h3>
        {big && <p className="mt-3 text-sm leading-relaxed text-muted">{group.description}</p>}
        <ul className="mt-4 space-y-1.5 text-sm">
          {group.works.map((w) => (
            <li key={w.slug}>
              <button
                type="button"
                onClick={() => onOpen(w)}
                className="text-left text-foreground/75 underline-offset-4 hover:text-wood hover:underline"
              >
                {w.title}
              </button>
            </li>
          ))}
        </ul>
        <a
          href={`#katalog-${group.slug}`}
          className="mt-5 inline-block text-xs font-semibold tracking-[0.15em] uppercase hover:text-wood"
        >
          Lihat semua →
        </a>
      </div>
      <button
        type="button"
        onClick={() => onOpen(cover)}
        className={`group relative mt-6 overflow-hidden rounded-2xl ${big ? 'aspect-[4/5] w-full sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 sm:w-[50%]' : 'aspect-[4/3] w-full sm:mt-0 sm:ml-6 sm:aspect-auto sm:w-1/2'}`}
      >
        <Image
          src={cover.cover.thumb}
          alt={cover.cover.alt}
          fill
          sizes={big ? '(min-width: 1024px) 380px, 100vw' : '(min-width: 1024px) 280px, 100vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="sr-only">Lihat detail {cover.title}</span>
      </button>
    </div>
  );
}

export function FeaturedWorks({ groups, categoryNames }: Props) {
  const [open, setOpen] = useState<Work | null>(null);
  const [first, ...rest] = groups;

  return (
    <>
      <ul className="grid gap-6 border-b border-line pb-10 sm:grid-cols-3">
        {features.map((f) => (
          <li key={f.title} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-gold/25 text-wood-strong">
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <span className="block font-semibold">{f.title}</span>
              <span className="block text-sm text-muted">{f.text}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {first && <GroupCard group={first} big onOpen={setOpen} />}
        {rest.map((g) => (
          <GroupCard key={g.slug} group={g} big={false} onOpen={setOpen} />
        ))}
      </div>

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
