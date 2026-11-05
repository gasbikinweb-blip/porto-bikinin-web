'use client';

// Video pendek tanpa suara: hanya diputar saat terlihat, bisa dijeda, dan tidak otomatis
// bila pengguna memilih mengurangi gerakan.
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowIcon } from './icons';

// Tiap video berisi beberapa foto dari satu kelompok menu
const videos = [
  { file: 'nasi-tumpeng', name: 'Aneka Nasi', href: '#menu' },
  { file: 'pempek-tampah', name: 'Pempek', href: '#menu' },
  { file: 'tumpeng-cenil', name: 'Cenil', href: '#menu' },
  { file: 'snack-besekan', name: 'Snack Besek', href: '#menu-snack-besekan' },
  {
    file: 'rantang-jajanan-pasar',
    name: 'Rantang Jajanan Pasar',
    href: '#menu-rantang-jajanan-pasar',
  },
  { file: 'snack-cup', name: 'Snack Cup', href: '#menu-snack-cup' },
];

const noSubscribe = () => () => undefined;

export function VideoReels() {
  const list = useRef<HTMLUListElement>(null);
  const reduced = useSyncExternalStore(
    noSubscribe,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
  const [choice, setChoice] = useState<boolean | null>(null);
  const paused = choice ?? reduced;

  useEffect(() => {
    const els = Array.from(list.current?.querySelectorAll('video') ?? []);
    if (paused) {
      els.forEach((v) => v.pause());
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) void v.play().catch(() => undefined);
          else v.pause();
        }
      },
      { threshold: 0.5 },
    );
    els.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [paused]);

  const go = (dir: number) => {
    const card = list.current?.firstElementChild as HTMLElement | null | undefined;
    if (card) list.current?.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' });
  };

  return (
    <section id="video" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold tracking-widest text-leaf uppercase">
              Lihat Lebih Dekat
            </p>
            <h2 className="mt-2 font-serif text-4xl text-accent sm:text-5xl">
              Sajian kami dalam video
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setChoice(!paused)}
              className="min-h-11 rounded-full border border-line px-5 text-sm font-bold"
            >
              {paused ? 'Putar Video' : 'Jeda Video'}
            </button>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Video sebelumnya"
              className="grid size-11 place-items-center rounded-full border border-line"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Video berikutnya"
              className="grid size-11 place-items-center rounded-full bg-accent text-white"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>

        <ul
          ref={list}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto"
        >
          {videos.map(({ file, name, href }) => {
            return (
              <li
                key={file}
                className="relative aspect-[9/16] w-[70%] shrink-0 snap-start overflow-hidden rounded-3xl bg-blush sm:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)]"
              >
                <video
                  src={`/videos/${file}.mp4`}
                  poster={`/videos/${file}.webp`}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={`Video ${name}`}
                  className="absolute inset-0 size-full object-cover"
                />
                <a
                  href={href}
                  className="absolute inset-x-3 bottom-3 flex min-h-11 items-center justify-between gap-2 rounded-full bg-white py-1 pr-1 pl-4 text-sm font-bold"
                >
                  <span className="truncate">{name}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <ArrowIcon />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
