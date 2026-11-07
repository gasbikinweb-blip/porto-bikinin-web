'use client';

// Kutipan tentang pernikahan berganti tiap 7 detik, dengan ajakan konsultasi lewat WhatsApp.
import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { WhatsAppIcon } from './icons';
import { getEvent } from '@/data/events';
import { buildWhatsAppLink, generalMessage } from '@/lib/config';

const quotes = [
  {
    text: 'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan untukmu dari jenismu sendiri, agar kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    by: 'QS. Ar-Rum: 21',
  },
  {
    text: 'Pernikahan bukan tentang menemukan orang yang sempurna, tetapi belajar melihat orang yang tidak sempurna dengan cara yang sempurna.',
    by: 'Kata bijak',
  },
  {
    text: 'Hari bahagia layak dirayakan dengan indah, karena kenangannya akan dikisahkan seumur hidup.',
    by: 'YMI Decoration',
  },
  {
    text: 'Cinta tidak saling menatap, tetapi bersama-sama memandang ke arah yang sama.',
    by: 'Antoine de Saint-Exupéry',
  },
];

const bg = getEvent('hana-felix-wedding')?.images[0] ?? getEvent('della-adil')?.cover;

const noop = () => () => {};
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function WeddingQuotes() {
  const [i, setI] = useState(0);
  const still = useSyncExternalStore(noop, reduced, () => true);

  useEffect(() => {
    if (still) return;
    const t = setInterval(() => setI((n) => (n + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, [still]);

  const q = quotes[i] ?? quotes[0]!;

  return (
    <section
      aria-label="Kutipan pernikahan"
      className="relative isolate overflow-hidden bg-night py-24 text-white sm:py-32"
    >
      {bg && (
        <Image src={bg.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/40 to-night/80" />
      <div className="reveal mx-auto max-w-3xl px-4 text-center sm:px-8">
        <p aria-hidden="true" className="font-serif text-7xl leading-none text-gold-light">
          “
        </p>
        <figure key={i} className="animate-in" aria-live="polite">
          <blockquote className="font-serif text-2xl leading-snug italic sm:text-4xl">
            {q.text}
          </blockquote>
          <figcaption className="mt-6 text-xs tracking-[0.3em] text-gold-light uppercase">
            {q.by}
          </figcaption>
        </figure>
        <div className="mt-8 flex justify-center gap-2">
          {quotes.map((x, n) => (
            <button
              key={x.by}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Kutipan ${n + 1}`}
              aria-current={n === i}
              className="grid size-11 place-items-center"
            >
              <span
                className={`h-1 rounded-full transition-all ${n === i ? 'w-8 bg-gold-light' : 'w-3 bg-white/40'}`}
              />
            </button>
          ))}
        </div>
        <a
          href={buildWhatsAppLink(generalMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-gold-light px-7 text-sm font-medium tracking-[0.12em] text-night uppercase transition hover:bg-white"
        >
          <WhatsAppIcon className="size-5" />
          Wujudkan Hari Bahagia Anda<span className="sr-only"> (tab baru)</span>
        </a>
      </div>
    </section>
  );
}
