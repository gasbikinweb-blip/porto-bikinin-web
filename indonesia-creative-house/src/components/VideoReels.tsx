'use client';

// Video asli dari Instagram, bersuara. Baru diunduh saat diputar pengguna (preload="none"),
// dan memutar satu video menjeda video lain.
import { useRef } from 'react';
import { ArrowIcon } from './icons';

const videos = [
  { file: 'nasi-tumpeng', name: 'Nasi Tumpeng' },
  { file: 'snack-box', name: 'Snack Box' },
  { file: 'hantaran-lamaran', name: 'Hantaran Lamaran' },
  { file: 'tampah-jajanan-pasar', name: 'Tampah Jajanan Pasar' },
  { file: 'nampan-bambu', name: 'Nampan Bambu' },
  { file: 'ayam-kodok', name: 'Ayam Kodok' },
  { file: 'snack-cup', name: 'Snack Cup' },
  { file: 'nasi-bakul', name: 'Nasi Bakul' },
];

export function VideoReels() {
  const list = useRef<HTMLUListElement>(null);

  const pauseOthers = (current: HTMLVideoElement) => {
    list.current?.querySelectorAll('video').forEach((v) => {
      if (v !== current) v.pause();
    });
  };

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
          {videos.map(({ file, name }) => (
            <li
              key={file}
              className="w-[70%] shrink-0 snap-start sm:w-[calc(33.333%-0.7rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-3xl bg-blush">
                <video
                  src={`/videos/${file}.mp4`}
                  poster={`/videos/${file}.webp`}
                  controls
                  playsInline
                  preload="none"
                  onPlay={(e) => pauseOthers(e.currentTarget)}
                  aria-label={`Video ${name}`}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <p className="mt-2 text-center font-bold">{name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
