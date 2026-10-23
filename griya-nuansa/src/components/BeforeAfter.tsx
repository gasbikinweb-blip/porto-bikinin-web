'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ProjectImage } from '@/data/types';

/** Slider before-after. Memakai input range bawaan sehingga otomatis bisa dioperasikan keyboard. */
export function BeforeAfter({ before, after }: { before: ProjectImage; after: ProjectImage }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-surface select-none md:aspect-[3/2]">
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(min-width: 1024px) 66vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-white"
        style={{ left: `${pos}%` }}
      />
      <span className="absolute top-3 left-3 bg-black/65 px-2.5 py-1 text-[11px] tracking-wider text-white uppercase">
        Sebelum
      </span>
      <span className="absolute top-3 right-3 bg-black/65 px-2.5 py-1 text-[11px] tracking-wider text-white uppercase">
        Sesudah
      </span>
      <label className="sr-only" htmlFor={`ba-${after.src}`}>
        Geser untuk membandingkan sebelum dan sesudah
      </label>
      <input
        id={`ba-${after.src}`}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
