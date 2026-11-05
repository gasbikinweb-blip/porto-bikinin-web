'use client';

// Video asli dari Instagram dalam susunan panel melengkung (layar lebar) atau geser (HP).
// Klik panel membuka <dialog> berisi video bersuara; video baru diunduh saat itu.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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
type Video = (typeof videos)[number];

export function VideoReels() {
  const list = useRef<HTMLUListElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [current, setCurrent] = useState<Video | null>(null);

  useEffect(() => {
    if (current && !dialog.current?.open) dialog.current?.showModal();
  }, [current]);

  // Video dilepas dari halaman agar suaranya pasti berhenti
  const close = () => {
    dialog.current?.querySelector('video')?.pause();
    if (dialog.current?.open) dialog.current.close();
    setCurrent(null);
    trigger.current?.focus();
  };

  const go = (dir: number) => {
    const card = list.current?.firstElementChild as HTMLElement | null | undefined;
    if (card) list.current?.scrollBy({ left: dir * (card.offsetWidth + 12), behavior: 'smooth' });
  };

  return (
    <section id="video" className="overflow-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="reveal text-center">
          <p className="text-sm font-bold tracking-widest text-leaf uppercase">Lihat Lebih Dekat</p>
          <h2 className="mt-2 font-serif text-4xl text-accent sm:text-5xl">
            Sajian kami dalam video
          </h2>
          <p className="mt-3 text-muted">Klik salah satu video untuk memutarnya.</p>
        </div>
        <div className="mt-6 flex justify-end gap-2 lg:hidden">
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

      <ul ref={list} className="video-arc reveal no-scrollbar mt-6 lg:mt-12">
        {videos.map((v, i) => (
          <li
            key={v.file}
            className="video-panel"
            // Jarak dari tengah menentukan kemiringan panel
            style={{
              ['--o' as string]: i - (videos.length - 1) / 2,
              ['--a' as string]: Math.abs(i - (videos.length - 1) / 2),
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setCurrent(v);
              }}
              aria-label={`Putar video ${v.name}`}
              className="group block w-full text-center"
            >
              <span className="relative block aspect-[9/14] overflow-hidden rounded-2xl bg-blush">
                <Image
                  src={`/videos/${v.file}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 13vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-12 place-items-center rounded-full bg-white/90 text-accent shadow-lg transition-transform group-hover:scale-110">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="ml-0.5 size-5 fill-current"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="mt-3 block text-sm font-bold">{v.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={current ? `Video ${current.name}` : 'Video'}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto w-[min(92vw,26rem)] overflow-hidden rounded-3xl bg-black backdrop:bg-black/80"
      >
        {current && (
          <div className="relative">
            <video
              key={current.file}
              src={`/videos/${current.file}.mp4`}
              poster={`/videos/${current.file}.webp`}
              controls
              autoPlay
              playsInline
              className="max-h-[88dvh] w-full"
            />
            <button
              type="button"
              onClick={close}
              aria-label="Tutup video"
              className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white text-xl font-bold text-foreground"
            >
              ×
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
