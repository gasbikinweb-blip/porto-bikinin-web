'use client';

import Image from 'next/image';
import { useRef } from 'react';
import type { Service } from '@/data/services';
import { buildWhatsAppLink, generalMessage, itemMessage } from '@/lib/whatsapp';
import { ArrowIcon, ChevronIcon, WhatsAppIcon } from './icons';

// Tinggi kartu bergantian agar tampil berundak seperti etalase
const heights = ['h-[440px]', 'h-[340px]', 'h-[270px]', 'h-[380px]'] as const;

// Section layanan bergaya etalase "best sellers": kartu foto gelap, label kaca, panah geser
export function ServicesShowcase({ services }: { services: readonly Service[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.6, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby="layanan" className="mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2
          id="layanan"
          className="max-w-xl font-display text-4xl leading-tight font-light sm:text-5xl"
        >
          Dikerjakan langsung di workshop kami
        </h2>
        <a
          href={buildWhatsAppLink(generalMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-ink py-1.5 pr-1.5 pl-5 text-xs font-bold tracking-wide uppercase hover:bg-paper-2"
        >
          Konsultasi gratis
          <span className="grid size-8 place-items-center rounded-full bg-ink text-paper">
            <ArrowIcon className="size-4 -rotate-45" />
          </span>
          <span className="sr-only">(membuka WhatsApp di tab baru)</span>
        </a>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="max-w-md lg:order-2 lg:max-w-xs">
          <p className="text-sm font-bold tracking-[0.15em] text-gold-text uppercase">
            Workshop Surabaya
          </p>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            Dari cutting laser, letter signage, UV printing, sampai neon box, semua dikerjakan di
            workshop sendiri agar presisi, kualitas, dan jadwal produksi terjaga.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Geser layanan ke kiri"
              aria-controls="daftar-layanan"
              className="grid size-10 place-items-center rounded-full bg-paper-2 text-steel transition-colors hover:bg-line"
            >
              <ChevronIcon className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Geser layanan ke kanan"
              aria-controls="daftar-layanan"
              className="grid size-10 place-items-center rounded-full bg-gold text-ink transition-colors hover:brightness-95"
            >
              <ChevronIcon className="size-5" />
            </button>
          </div>
        </div>

        <ul
          id="daftar-layanan"
          ref={trackRef}
          className="no-scrollbar -mx-4 flex snap-x snap-mandatory items-end gap-4 overflow-x-auto px-4 pb-2 lg:order-1 lg:mx-0 lg:px-0"
        >
          {services.map((s, i) => (
            <li
              key={s.id}
              className={`relative w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-ink sm:w-72 ${heights[i % heights.length]}`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="288px"
                className="object-cover opacity-90"
              />
              <div
                className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/30"
                aria-hidden="true"
              />
              {i === 0 && (
                <p className="absolute top-5 left-5 text-paper">
                  <span className="block text-sm font-semibold">Layanan Utama</span>
                  <span className="mt-2 block font-display text-xs tracking-widest text-silver">
                    0{services.length} JASA
                  </span>
                </p>
              )}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/45 p-3.5 text-paper backdrop-blur-md">
                <div>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-silver">
                    {s.summary}
                  </p>
                </div>
                <a
                  href={buildWhatsAppLink(itemMessage(s.title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tanya ${s.title} via WhatsApp (tab baru)`}
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-paper text-ink transition-colors hover:bg-accent"
                >
                  <WhatsAppIcon className="size-4" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
