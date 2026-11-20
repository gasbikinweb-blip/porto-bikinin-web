'use client';

// Kutipan brand berganti tiap 6 detik (fade). Berhenti saat diarahkan kursor/fokus,
// dan tidak berganti otomatis bila prefers-reduced-motion.
import { useEffect, useState } from 'react';
import { quotes } from '@/data/quotes';

export function QuoteCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const q = quotes[index];

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span aria-hidden="true" className="block font-serif text-7xl leading-none text-rose-ink">
        “
      </span>
      {q && (
        <figure key={index} className="animate-fade" aria-live="polite">
          <blockquote className="font-serif text-3xl leading-snug font-light text-balance sm:text-4xl">
            {q.text}
          </blockquote>
          <figcaption className="eyebrow mt-6">{q.source}</figcaption>
        </figure>
      )}
      <div className="mt-8 flex justify-center gap-1">
        {quotes.map((x, i) => (
          <button
            key={x.text}
            type="button"
            onClick={() => setIndex(i)}
            aria-current={i === index}
            className="group grid size-9 place-items-center"
          >
            <span className="sr-only">Kutipan {i + 1}</span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-line transition-all group-aria-[current=true]:w-6 group-aria-[current=true]:bg-ink"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
