'use client';

// Kartu video vertikal: hanya poster yang dimuat; video baru diunduh setelah tombol putar ditekan
import Image from 'next/image';
import { useState } from 'react';
import { PlayIcon } from './icons';

type Props = { id: string; title: string; sizes?: string };

export function VideoCard({ id, title, sizes = '(min-width: 1024px) 25vw, 50vw' }: Props) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure>
      <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-surface-2">
        {playing ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={`/video/${id}.mp4`}
            poster={`/video/${id}.webp`}
            controls
            autoPlay
            playsInline
            aria-label={title}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
          >
            <Image
              src={`/video/${id}.webp`}
              alt=""
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <PlayIcon className="ml-0.5 size-6" />
            </span>
            <span className="sr-only">Putar video: {title}</span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm leading-snug text-muted">{title}</figcaption>
    </figure>
  );
}
