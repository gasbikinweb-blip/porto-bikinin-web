'use client';

// Kartu video "klik untuk putar": sebelum diklik hanya poster (gambar kecil) yang dimuat,
// file video baru diunduh saat diputar. Suara mengikuti video sumber (bisu hanya bila memang tanpa audio).
// Diputar setelah diklik, jadi browser mengizinkan langsung bersuara.
import Image from 'next/image';
import { useState } from 'react';
import type { Video } from '@/data/videos';

const formatDuration = (s: number) => `0:${String(Math.round(s)).padStart(2, '0')}`;

export function VideoGrid({ videos }: { videos: readonly Video[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0">
      {videos.map((v) => (
        <li key={v.name} className="w-[62%] shrink-0 snap-start sm:w-auto">
          <figure>
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-mocha">
              {playing === v.name ? (
                <video
                  src={v.src}
                  poster={v.poster}
                  width={v.width}
                  height={v.height}
                  controls
                  autoPlay
                  muted={!v.hasAudio}
                  playsInline
                  preload="none"
                  aria-label={v.title}
                  className="size-full object-cover"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(v.name)}
                  className="group absolute inset-0 block size-full"
                >
                  <Image
                    src={v.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 62vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background text-mocha shadow-lg transition-transform group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      className="ml-1 size-6"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M7 4.5v15l12-7.5-12-7.5Z" />
                    </svg>
                  </span>
                  <span className="absolute right-2 bottom-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white tabular-nums">
                    {formatDuration(v.duration)}
                  </span>
                  <span className="sr-only">
                    Putar video: {v.title} ({Math.round(v.sizeKb / 100) / 10} MB
                    {v.hasAudio ? '' : ', tanpa suara'})
                  </span>
                </button>
              )}
            </div>
            <figcaption className="mt-2 text-sm font-semibold">{v.title}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
