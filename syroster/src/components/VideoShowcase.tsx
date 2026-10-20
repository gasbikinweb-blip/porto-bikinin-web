'use client';

// Deretan kartu video vertikal (9:16). Klik kartu untuk memutar dengan audio asli;
// video lain otomatis dijeda agar suara tidak bertumpuk. Bisa digeser (scroll-snap) atau lewat tombol panah.
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { VideoItem } from '@/data/projects';
import { ChevronIcon } from './icons';

export function VideoShowcase({ videos }: { videos: VideoItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const refs = useRef(new Map<string, HTMLVideoElement>());
  const [playing, setPlaying] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  const focus = (i: number) => {
    const idx = Math.max(0, Math.min(videos.length - 1, i));
    setActive(idx);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    trackRef.current?.querySelectorAll('li')[idx]?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const toggle = (v: VideoItem, i: number) => {
    setActive(i);
    const el = refs.current.get(v.id);
    if (!el) return;
    refs.current.forEach((other, id) => id !== v.id && other.pause());
    if (el.paused) void el.play();
    else el.pause();
  };

  return (
    <div>
      {videos.length > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => focus(active - 1)}
            aria-label="Video sebelumnya"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            <ChevronIcon dir="left" />
          </button>
          <div className="flex items-center gap-1.5 px-1">
            {videos.map((v, i) => (
              <button
                key={v.id}
                type="button"
                onClick={() => focus(i)}
                aria-label={`Ke video: ${v.title}`}
                aria-current={i === active ? 'true' : undefined}
                className="grid h-11 place-items-center"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${i === active ? 'w-7 bg-gold' : 'w-2 bg-ink/20'}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => focus(active + 1)}
            aria-label="Video berikutnya"
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            <ChevronIcon />
          </button>
        </div>
      )}

      <ul
        ref={trackRef}
        aria-label="Video Syroster Industrie"
        className="reveal reveal-zoom -mx-4 mt-10 flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-4 py-6 [scrollbar-width:none] sm:gap-7 [&>li:first-child]:ml-auto [&>li:last-child]:mr-auto [&::-webkit-scrollbar]:hidden"
      >
        {videos.map((v, i) => {
          const isPlaying = playing === v.id;
          const isActive = active === i;
          return (
            <li
              key={v.id}
              className={`relative aspect-[9/16] w-[64vw] max-w-[270px] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-ink shadow-[0_30px_60px_-28px_rgb(28_33_80/0.55)] transition-[transform,box-shadow] duration-500 sm:w-[270px] ${isActive ? 'ring-4 ring-gold/60 sm:scale-[1.03]' : 'ring-1 ring-line'}`}
            >
              <video
                ref={(el) => {
                  if (el) refs.current.set(v.id, el);
                  else refs.current.delete(v.id);
                }}
                src={v.src}
                poster={v.poster}
                playsInline
                preload="none"
                controls={isPlaying}
                onPlay={() => setPlaying(v.id)}
                onPause={() => setPlaying((p) => (p === v.id ? null : p))}
                onEnded={() => setPlaying(null)}
                className="absolute inset-0 size-full object-cover"
                aria-label={v.title}
              />
              {!isPlaying && (
                <>
                  <Image src={v.poster} alt="" fill sizes="270px" className="object-cover" />
                  {/* Gradasi agar teks putih terbaca di atas foto */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/85" />
                  <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                    <span className="rounded-full bg-ink/55 px-3 py-1.5 text-[0.7rem] leading-tight font-bold tracking-wide text-white uppercase backdrop-blur-sm">
                      {v.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[0.7rem] font-bold text-night">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-3"
                      >
                        <path d="M4 9v6h4l5 4V5L8 9H4Zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4Z" />
                      </svg>
                      Audio
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggle(v, i)}
                    className="group absolute inset-0 grid place-items-center"
                  >
                    <span className="grid size-16 place-items-center rounded-full bg-white/25 text-white ring-1 ring-white/50 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-brand">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-1 size-6"
                      >
                        <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10-6.5a1 1 0 0 0 0-1.72l-10-6.5A1 1 0 0 0 8 5.5Z" />
                      </svg>
                    </span>
                    <span className="sr-only">Putar video: {v.title}</span>
                  </button>
                  <div className="pointer-events-none absolute inset-x-4 bottom-5 text-white">
                    <p className="text-[0.7rem] font-bold tracking-[0.14em] text-gold uppercase">
                      {v.meta}
                    </p>
                    <h3 className="mt-1.5 font-display text-lg leading-snug font-bold">
                      {v.title}
                    </h3>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
