'use client';

// Sanaréa Moments gaya "jemuran": kartu foto digantung di tali melengkung dengan jepit,
// bergoyang pelan, dan berbalik (flip) saat diklik/di-tap untuk menampilkan keterangan.
// HP: geser horizontal (scroll-snap). Desktop: semua kartu dalam satu tali.
// Animasi goyang & flip mati bila pengunjung memilih prefers-reduced-motion (lihat globals.css).
import Image from 'next/image';
import { useState } from 'react';
import { moments } from '@/data/moments';

// Titik tali (kurva bezier kuadrat): ujung kiri-kanan di atas, tengah melengkung ke bawah
const SAG = 44; // px, seberapa dalam tali melengkung
const sagAt = (t: number) => 2 * (1 - t) * t * SAG * 2; // tinggi kurva pada posisi t (0..1)

export function MomentsLine() {
  const [flipped, setFlipped] = useState<string | null>(null);
  const n = moments.length;

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <div className="relative mx-auto w-max min-w-full pt-4 lg:w-full">
        {/* Tali */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-4 h-[110px] w-full text-muted"
          viewBox="0 0 1000 110"
          preserveAspectRatio="none"
        >
          <path
            d={`M0 6 Q500 ${6 + SAG * 2} 1000 6`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        <ul className="relative flex snap-x snap-mandatory gap-4 px-2 sm:gap-6 lg:justify-between lg:gap-3 lg:px-6">
          {moments.map((m, i) => {
            const t = (i + 0.5) / n;
            const isFlipped = flipped === m.src;
            return (
              <li
                key={m.src}
                className="moment-card shrink-0 snap-center"
                style={
                  {
                    // Kartu turun mengikuti lengkung tali, miring bergantian
                    marginTop: `${sagAt(t)}px`,
                    '--tilt': `${i % 2 === 0 ? -2.5 : 2}deg`,
                    '--sway-delay': `${i * -0.7}s`,
                  } as React.CSSProperties
                }
              >
                {/* Jepit */}
                <span
                  aria-hidden="true"
                  className="mx-auto block h-6 w-3 rounded-sm border border-line bg-card shadow-sm"
                />
                <button
                  type="button"
                  aria-pressed={isFlipped}
                  onClick={() => setFlipped(isFlipped ? null : m.src)}
                  className="moment-flip -mt-2 block w-[13.5rem] text-left sm:w-[15rem] lg:w-[clamp(9.5rem,14vw,12.5rem)]"
                >
                  <span className="sr-only">
                    {isFlipped ? 'Tampilkan foto' : 'Lihat keterangan'}:{' '}
                  </span>
                  <span className="moment-inner relative block aspect-[3/4]">
                    {/* Depan: foto */}
                    <span className="moment-face absolute inset-0 overflow-hidden rounded-[1.25rem] border border-line bg-card p-2 shadow-[0_24px_40px_-26px_rgb(0_0_0/0.55)]">
                      <span className="relative block h-[78%] overflow-hidden rounded-[0.9rem] bg-surface">
                        <Image
                          src={m.thumb}
                          alt={m.alt}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex h-[22%] items-center justify-between gap-2 px-1.5">
                        <span className="min-w-0">
                          <span className="block truncate font-serif text-base leading-tight">
                            {m.label}
                          </span>
                          <span className="block text-[0.6rem] tracking-[0.2em] text-muted uppercase">
                            Sanaréa Moments
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-xs text-background"
                        >
                          ↻
                        </span>
                      </span>
                    </span>
                    {/* Belakang: keterangan */}
                    <span className="moment-face moment-back absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.25rem] border border-line bg-gradient-to-br from-card via-surface to-[color-mix(in_oklab,var(--rose)_35%,var(--card))] p-4">
                      <span>
                        <span className="block text-[0.6rem] tracking-[0.25em] text-muted uppercase">
                          No. {String(i + 1).padStart(2, '0')} · Moments
                        </span>
                        <span className="mt-3 block font-serif text-xl leading-tight">
                          {m.label}
                        </span>
                        <span className="mt-2 block text-xs leading-relaxed text-muted">
                          {m.alt}.
                        </span>
                      </span>
                      <span className="flex items-end justify-between gap-2">
                        <span className="font-serif text-sm tracking-[0.3em] uppercase">
                          Sanaréa
                        </span>
                        <span className="text-[0.6rem] tracking-[0.2em] text-muted uppercase">
                          Tap untuk kembali
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mt-2 text-center text-[0.65rem] tracking-[0.25em] text-muted uppercase">
        Klik / tap kartu untuk membalik{' '}
        <span className="lg:hidden">· geser untuk lihat lainnya</span>
      </p>
    </div>
  );
}
