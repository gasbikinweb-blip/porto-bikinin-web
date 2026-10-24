'use client';

// Grid karya; klik foto membuka lightbox. Client component karena butuh state lightbox.
import Image from 'next/image';
import { useState } from 'react';
import type { Work } from '@/data/works';
import { buildWhatsAppLink, workMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { Lightbox } from './Lightbox';

type Props = {
  works: readonly Work[];
  /** Nama kategori per slug, untuk label kecil di kartu */
  categoryNames: Record<string, string>;
  headingLevel?: 'h2' | 'h3';
};

export function WorkGrid({ works, categoryNames, headingLevel: H = 'h2' }: Props) {
  const [open, setOpen] = useState<{ work: Work; index: number } | null>(null);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <li
            key={work.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
          >
            <button
              type="button"
              onClick={() => setOpen({ work, index: 0 })}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-surface"
            >
              <Image
                src={work.cover.thumb}
                alt={work.cover.alt}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute right-3 bottom-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                Lihat {work.images.length} foto
              </span>
              {work.status === 'proses' && (
                <span className="absolute top-3 left-3 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-foreground">
                  Proses Produksi
                </span>
              )}
            </button>
            <div className="flex flex-1 flex-col p-5">
              <p className="text-xs font-semibold tracking-wide text-wood uppercase">
                {categoryNames[work.category]}
              </p>
              <H className="mt-1 text-lg leading-snug font-bold">{work.title}</H>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{work.summary}</p>
              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
                <a
                  href={buildWhatsAppLink(workMessage(work.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-wood px-4 text-sm font-semibold text-white hover:bg-wood-strong"
                >
                  <WhatsAppIcon className="size-4" />
                  Pesan yang serupa
                  <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
                </a>
                {work.instagramUrl && (
                  <a
                    href={work.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted underline underline-offset-4 hover:text-wood"
                  >
                    Lihat di Instagram
                    <span className="sr-only"> (tab baru)</span>
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {open && (
        <Lightbox
          title={open.work.title}
          images={open.work.images}
          index={open.index}
          onIndexChange={(index) => setOpen({ work: open.work, index })}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
