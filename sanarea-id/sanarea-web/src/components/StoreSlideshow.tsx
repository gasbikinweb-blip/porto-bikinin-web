'use client';

// Foto toko berganti tiap 5 detik (fade). Berhenti saat kursor di atasnya / fokus,
// dan tidak berganti otomatis bila pengunjung memilih prefers-reduced-motion.
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { Img } from '@/data/types';

export function StoreSlideshow({ images }: { images: readonly Img[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [paused, images.length]);

  return (
    <div
      className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-surface shadow-[0_30px_60px_-35px_rgb(30_28_26/0.45)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          aria-hidden={i !== index}
          className={`object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-current={i === index}
              className="group grid size-8 place-items-center"
            >
              <span className="sr-only">Foto toko {i + 1}</span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-white/60 transition-all group-aria-[current=true]:w-5 group-aria-[current=true]:bg-white"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
