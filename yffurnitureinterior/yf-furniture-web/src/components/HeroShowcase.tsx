'use client';

// Hero layar penuh: foto karya sebagai latar. Klik kartu / panah → latar berganti.
// Berganti otomatis tiap 7 detik, berhenti saat kursor/fokus di dalam hero
// atau bila pengguna memilih gerakan minimal.
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Work } from '@/data/works';
import { buildWhatsAppLink, workMessage } from '@/lib/whatsapp';
import { WorkModal } from './WorkModal';

type Props = {
  works: readonly Work[];
  categoryNames: Record<string, string>;
};

const pad = (n: number) => String(n).padStart(2, '0');

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d={dir === 'left' ? 'M19 12H5m6-6-6 6 6 6' : 'M5 12h14m-6-6 6 6-6 6'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroShowcase({ works, categoryNames }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [detail, setDetail] = useState<Work | null>(null);
  const count = works.length;
  const active = works[index] ?? works[0];

  useEffect(() => {
    if (paused || detail || count < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(timer);
  }, [paused, detail, count]);

  if (!active) return null;
  const go = (step: number) => setIndex((index + step + count) % count);
  // Kartu dimulai dari slide aktif, lalu sisanya berurutan
  const queue = works.map((_, i) => works[(index + i) % count]).filter((w): w is Work => !!w);

  return (
    <section
      id="beranda"
      aria-labelledby="judul"
      aria-roledescription="carousel"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Latar: semua foto ditumpuk, yang aktif tampil (fade) */}
      {works.map((w, i) => (
        <Image
          key={w.slug}
          src={w.cover.src}
          alt={i === index ? w.cover.alt : ''}
          aria-hidden={i !== index}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-20 object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {/* Gradasi agar teks putih selalu terbaca */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-28 pb-8 sm:px-6 lg:pt-36">
        <div className="grid flex-1 gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Kiri: teks */}
          <div className="flex min-w-0 flex-col">
            <p className="max-w-xs text-sm leading-relaxed text-white/80">
              Furnitur & interior custom, dikerjakan langsung oleh workshop di Boyolali
            </p>
            <h1 id="judul" className="mt-6 font-serif text-display-1 font-light">
              Furnitur Custom yang Pas dengan Ukuran dan Selera Anda,{' '}
              <strong className="font-medium italic">Langsung dari Workshop</strong>.
            </h1>
            <a
              href="#katalog"
              className="mt-10 grid size-28 place-items-center content-center gap-1 rounded-full border border-white/40 bg-white/10 text-center text-xs leading-tight backdrop-blur-md transition-colors hover:bg-white hover:text-ink sm:mt-auto"
            >
              <span aria-hidden="true" className="text-lg">
                ↗
              </span>
              Lihat
              <br />
              katalog
            </a>
          </div>

          {/* Kanan: penanda slide + kartu */}
          <div className="flex min-w-0 flex-col justify-end gap-6 lg:justify-center">
            <div className="flex items-center gap-4 font-medium tabular-nums" aria-live="polite">
              <span>{pad(index + 1)}</span>
              <span className="relative h-px flex-1 bg-white/30">
                <span
                  className="absolute inset-y-0 left-0 bg-white transition-all duration-700"
                  style={{ width: `${((index + 1) / count) * 100}%` }}
                />
              </span>
              <span className="text-white/60">{pad(count)}</span>
              <span className="sr-only">: {active.title}</span>
            </div>

            <ul className="-mr-5 flex gap-4 overflow-x-auto pr-5 pb-1 [scrollbar-width:none] sm:-mr-6 sm:pr-6">
              {queue.map((w, i) =>
                i === 0 ? (
                  <li
                    key={w.slug}
                    className="flex w-[19rem] shrink-0 gap-4 rounded-3xl border border-white/20 bg-white/15 p-3 backdrop-blur-xl sm:w-[22rem]"
                  >
                    <button
                      type="button"
                      onClick={() => setDetail(w)}
                      className="relative aspect-[4/5] w-32 shrink-0 overflow-hidden rounded-2xl sm:w-36"
                    >
                      <Image
                        src={w.cover.thumb}
                        alt=""
                        fill
                        sizes="144px"
                        className="object-cover"
                      />
                      <span className="sr-only">Lihat detail {w.title}</span>
                    </button>
                    <div className="flex min-w-0 flex-col py-1">
                      <p className="text-[11px] tracking-[0.2em] text-white/70 uppercase">
                        {categoryNames[w.category]}
                      </p>
                      <p className="mt-1 text-lg leading-snug font-semibold">{w.title}</p>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/75">
                        {w.summary}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-3">
                        <a
                          href={buildWhatsAppLink(workMessage(w.title))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-brand-gold"
                        >
                          Pesan<span className="sr-only"> {w.title} via WhatsApp (tab baru)</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setDetail(w)}
                          className="rounded-full border border-white/50 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white hover:text-ink"
                        >
                          Detail
                        </button>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={w.slug} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setIndex(works.indexOf(w))}
                      className="relative block aspect-[4/5] w-32 overflow-hidden rounded-3xl border border-white/20 opacity-80 transition-opacity hover:opacity-100 sm:w-40"
                    >
                      <Image
                        src={w.cover.thumb}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                      <span className="sr-only">Tampilkan {w.title} sebagai latar</span>
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bawah: indikator gulir + panah */}
        <div className="mt-8 flex items-center justify-between">
          <span
            aria-hidden="true"
            className="hidden h-10 w-6 justify-center rounded-full border border-white/50 pt-2 sm:flex lg:mx-auto"
          >
            <span className="h-2 w-px animate-bounce bg-white" />
          </span>
          <div className="ml-auto flex gap-2 sm:ml-0">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-11 place-items-center rounded-full border border-white/40 transition-colors hover:bg-white/15"
            >
              <span className="sr-only">Karya sebelumnya</span>
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-11 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-brand-gold"
            >
              <span className="sr-only">Karya berikutnya</span>
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>

      {detail && (
        <WorkModal
          work={detail}
          categoryName={categoryNames[detail.category]}
          onClose={() => setDetail(null)}
        />
      )}
    </section>
  );
}
