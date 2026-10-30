'use client';

// Slider sebelum/sesudah. Memakai <input type="range"> asli supaya bisa digeser dengan
// keyboard (panah, Home/End) dan terbaca pembaca layar.
import Image from 'next/image';
import { useId, useState } from 'react';
import type { ProjectImage } from '@/data/projects';

export function BeforeAfter({ before, after }: { before: ProjectImage; after: ProjectImage }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  const sizes = '(min-width: 1024px) 64rem, 100vw';

  return (
    <div
      className="relative overflow-hidden bg-surface select-none"
      style={{ aspectRatio: `${after.width} / ${after.height}` }}
    >
      <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow"
        style={{ left: `${pos}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 grid size-10 -translate-1/2 place-items-center rounded-full bg-white text-foreground shadow">
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="m9 6-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-foreground/85 px-3 py-1 text-xs text-white">
        Sebelum
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-xs text-white">
        Sesudah
      </span>
      <label htmlFor={id} className="sr-only">
        Geser untuk membandingkan kondisi sebelum dan sesudah
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`Garis pembanding di ${pos}%`}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      {/* Penanda fokus keyboard (input-nya transparan) */}
      <span
        className="pointer-events-none absolute inset-0 hidden outline-2 -outline-offset-4 outline-accent-ink peer-focus-visible:block"
        aria-hidden="true"
      />
    </div>
  );
}
