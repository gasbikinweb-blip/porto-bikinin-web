'use client';

// Deretan video vertikal. Video baru dimuat saat diputar (hemat kuota pengunjung).
import Image from 'next/image';
import { useState } from 'react';
import type { Content } from '@/content/types';
import { type ReelSlug, reels } from '@/data/media';
import { siteConfig } from '@/lib/config';

function ReelCard({ slug, title, playLabel, n }: { slug: ReelSlug; title: string; playLabel: string; n: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="w-[68vw] shrink-0 sm:w-[300px]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-surface-2">
        {playing ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={`/videos/${slug}.mp4`}
            poster={`/posters/${slug}.webp`}
            controls
            autoPlay
            playsInline
            preload="auto"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
            aria-label={`${playLabel}: ${title}`}
          >
            <Image
              src={`/posters/${slug}.webp`}
              alt=""
              fill
              sizes="(min-width: 640px) 300px, 68vw"
              className="object-cover transition-transform duration-[1.4s] group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
            <span className="absolute top-5 left-5 font-serif text-lg text-white/90">{String(n).padStart(2, '0')}</span>
            <span className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full border border-white/70 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1 size-5">
                <path d="M7 4.5v15l13-7.5z" />
              </svg>
            </span>
            <span className="absolute inset-x-5 bottom-5 text-left font-serif text-xl leading-snug text-white italic">
              {title}
            </span>
          </button>
        )}
      </div>
    </figure>
  );
}

// Hanya bagian konten yang dipakai, agar teks lain tidak ikut terkirim ke browser
export function Reels({ t }: { t: Pick<Content, 'reels' | 'wa'> }) {
  return (
    <section id="video" aria-labelledby="video-judul" className="overflow-hidden py-28 sm:py-36">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="eyebrow reveal text-accent">{t.reels.label}</p>
          <h2 id="video-judul" className="reveal mt-6 font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.02] font-light">
            {t.reels.title}
          </h2>
          <p className="reveal mt-6 max-w-lg leading-relaxed text-muted">{t.reels.intro}</p>
        </div>
        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal link-line text-sm font-medium"
        >
          Instagram {siteConfig.instagramHandle} ↗<span className="sr-only"> {t.wa.newTab}</span>
        </a>
      </div>

      <div
        className="snap-row reveal reveal-left mt-16 flex gap-5 overflow-x-auto scroll-px-4 px-4 pb-6 sm:scroll-px-6 sm:px-6 lg:scroll-px-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))] lg:px-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))]"
      >
        {reels.map((slug, i) => (
          <ReelCard key={slug} slug={slug} n={i + 1} title={t.reels.items[slug]} playLabel={t.reels.play} />
        ))}
      </div>
    </section>
  );
}
