'use client';

// Latar hero berupa video yang berganti tiap 10 detik dengan efek memudar.
// Hanya video aktif yang diputar; video berikutnya dimuat lebih dulu. Bisa dijeda,
// dan tidak berputar otomatis bila pengguna memilih mengurangi gerakan.
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const INTERVAL = 10000;

const clips = [
  { slug: 'putri-luthfi', title: 'Putri & Luthfi' },
  { slug: 'della-adil', title: 'Della & Adil' },
  { slug: 'berlin-aziz', title: 'Berlin & Aziz' },
  { slug: 'dita-iqbal', title: 'Dita & Iqbal' },
];

const noSubscribe = () => () => undefined;

export function HeroVideos() {
  const [active, setActive] = useState(0);
  const [choice, setChoice] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(
    noSubscribe,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
  const paused = choice ?? reduced;
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  // Putar video aktif, jeda yang lain, dan muat video berikutnya
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && !paused) void v.play().catch(() => undefined);
      else v.pause();
    });
    const next = refs.current[(active + 1) % clips.length];
    if (next && next.preload !== 'auto') next.preload = 'auto';
  }, [active, paused]);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % clips.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0">
        {clips.map((c, i) => (
          <video
            key={c.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={`/videos/${c.slug}.mp4`}
            poster={`/videos/${c.slug}.webp`}
            muted
            loop
            playsInline
            preload={i === 0 ? 'auto' : 'none'}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-[1.4s] ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <div aria-hidden="true" className="hero-shade absolute inset-0" />

      <div className="absolute top-24 right-4 z-10 flex items-center gap-3 sm:right-8">
        <span className="hidden text-xs tracking-[0.2em] text-white/80 uppercase sm:inline">
          {clips[active]?.title}
        </span>
        <div className="flex">
          {clips.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Tampilkan video ${c.title}`}
              aria-current={i === active}
              className="grid h-11 w-7 place-items-center"
            >
              <span
                className={`block h-px w-5 transition ${i === active ? 'bg-white' : 'bg-white/40'}`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setChoice(!paused)}
          aria-label={paused ? 'Putar video latar' : 'Jeda video latar'}
          className="grid size-11 place-items-center rounded-full border border-white/40 text-white hover:bg-white/10"
        >
          {paused ? (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
              <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
