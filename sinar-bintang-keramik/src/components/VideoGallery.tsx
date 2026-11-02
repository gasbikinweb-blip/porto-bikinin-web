'use client';

// Galeri video toko. Video baru diunduh saat diputar (preload="none"), jadi halaman tetap ringan.
// Hanya satu video berbunyi sekaligus: memutar satu video menjeda video lain.
import { useRef } from 'react';
import type { StoreVideo } from '@/data/videos';

const fmtDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export function VideoGallery({ videos }: { videos: readonly StoreVideo[] }) {
  const listRef = useRef<HTMLUListElement>(null);

  const pauseOthers = (current: HTMLVideoElement) => {
    listRef.current?.querySelectorAll('video').forEach((v) => {
      if (v !== current) v.pause();
    });
  };

  return (
    <ul
      ref={listRef}
      // HP: geser ke samping; layar lebar: grid
      className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4"
    >
      {videos.map((v) => (
        <li key={v.slug} className="reveal w-[70%] shrink-0 snap-start sm:w-auto">
          <figure className="overflow-hidden rounded-2xl border border-line bg-card">
            <div className="relative aspect-[9/16] bg-ink">
              <video
                controls
                playsInline
                preload="none"
                poster={`/videos/${v.slug}.webp`}
                onPlay={(e) => pauseOthers(e.currentTarget)}
                aria-label={`Video: ${v.title}`}
                className="absolute inset-0 size-full object-cover"
              >
                <source src={`/videos/${v.slug}.mp4`} type="video/mp4" />
              </video>
              <span className="pointer-events-none absolute top-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white tabular-nums">
                {fmtDuration(v.duration)}
              </span>
            </div>
            <figcaption className="p-3">
              <p className="font-bold">{v.title}</p>
              <p className="mt-0.5 text-sm text-muted">{v.caption}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
