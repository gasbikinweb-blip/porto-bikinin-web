'use client';

import Image from 'next/image';
import { useState } from 'react';
import { site } from '@/data/site';
import { buildWhatsAppLink, generalMessage } from '@/lib/whatsapp';
import { ChevronIcon, WhatsAppIcon } from './icons';

type Slide = {
  outline: string;
  lines: readonly [string, string];
  image: string;
  alt: string;
  features: readonly [Feature, Feature];
};
type Feature = { title: string; text: string };

const slides: readonly Slide[] = [
  {
    outline: 'Neon Box',
    lines: ['Terang &', 'Menarik'],
    image: '/portfolio/neon-box-asia-croffle/03.webp',
    alt: 'Neon box custom menyala di outlet Asia Croffle',
    features: [
      {
        title: 'LED Outdoor',
        text: 'Cahaya merata dan tahan cuaca untuk fasad toko maupun booth.',
      },
      {
        title: 'Promo UMKM',
        text: 'Paket neon box bulat & kotak mulai Rp 400.000, gratis tempat QRIS.',
      },
    ],
  },
  {
    outline: 'Letter Signage',
    lines: ['Huruf Timbul', 'Presisi'],
    image: '/portfolio/neon-box-2-sisi/02.webp',
    alt: 'Letter signage akrilik timbul Naraya Law & Firm',
    features: [
      {
        title: 'Cutting Laser',
        text: 'Tepi potongan rapi dan presisi untuk logo serumit apa pun.',
      },
      { title: 'Dua Sisi', text: 'Signage terlihat terang dari dua arah sekaligus.' },
    ],
  },
  {
    outline: 'Custom Akrilik',
    lines: ['Satu Produk', 'Satu Desain'],
    image: '/portfolio/kotak-tisu/03.webp',
    alt: 'Kotak tisu akrilik bening model sliding di meja kerja',
    features: [
      {
        title: 'UV Printing',
        text: 'Cetak full color langsung di akrilik, tajam dan tahan gores.',
      },
      { title: 'Bebas Ukuran', text: 'Kotak tisu, polling box, papan nama, hingga mahar.' },
    ],
  },
];

const socials = [
  { label: 'Instagram', href: site.instagram },
  { label: 'TikTok', href: site.tiktok },
  { label: 'WhatsApp', href: buildWhatsAppLink(generalMessage) },
] as const;

// Hero bergaya poster produk: judul outline + tebal, foto besar, poin fitur, tombol panah
export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0]!;
  const go = (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length);

  return (
    <section
      id="beranda"
      aria-roledescription="carousel"
      aria-labelledby="judul-hero"
      className="bg-paper-2 px-4 py-6 sm:py-10"
    >
      <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-xl bg-linear-to-br from-white via-[#ececee] to-[#d9dbde] shadow-2xl shadow-black/15 lg:grid-cols-[56px_1fr_56px]">
        {/* Rel kiri: nomor slide */}
        <div className="hidden flex-col items-center justify-between border-r border-line py-6 lg:flex">
          <span className="font-display text-sm font-semibold">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-24 w-px bg-silver" aria-hidden="true" />
          <span className="font-display text-sm text-steel">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>

        <div className="relative grid min-h-[560px] items-center gap-6 px-6 pt-10 pb-0 md:grid-cols-2 lg:px-10">
          <div key={`t-${index}`} className="animate-slide relative z-10">
            <h1 id="judul-hero" className="text-xs font-bold tracking-[0.2em] text-steel uppercase">
              Solusi Custom Akrilik &amp; Signage Surabaya
            </h1>
            <p
              className="mt-4 font-display text-5xl leading-[0.95] font-semibold uppercase sm:text-6xl lg:text-7xl"
              aria-live="polite"
            >
              <span className="text-outline block font-light">{slide.outline}</span>
              <span className="block">{slide.lines[0]}</span>
              <span className="block">{slide.lines[1]}</span>
            </p>
            <a
              href={buildWhatsAppLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-strong"
            >
              <WhatsAppIcon />
              Konsultasi Custom Order
              <span className="sr-only">(membuka WhatsApp di tab baru)</span>
            </a>
          </div>

          <div
            key={`i-${index}`}
            className="animate-slide relative mx-auto w-full max-w-md self-end md:self-center"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-t-[2rem] shadow-2xl shadow-black/30 md:rounded-[2rem]">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 448px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Rel kanan: link sosial vertikal */}
        <ul className="hidden flex-col items-center justify-center gap-10 border-l border-line lg:flex">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] [writing-mode:vertical-rl] font-semibold tracking-[0.2em] text-steel uppercase hover:text-ink"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Panel putih bawah: poin fitur + tombol panah */}
        <div className="relative z-10 flex flex-col gap-6 border-t border-line bg-paper px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-3 lg:px-16">
          <dl key={`f-${index}`} className="animate-slide grid gap-5 sm:grid-cols-2 sm:gap-10">
            {slide.features.map((f, i) => (
              <div key={f.title} className="max-w-60">
                <dt className="text-sm font-bold uppercase">
                  <span className="mr-2">{String(i + 1).padStart(2, '0')}.</span>
                  {f.title}
                </dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-steel">{f.text}</dd>
              </div>
            ))}
          </dl>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Slide sebelumnya"
              className="grid size-11 place-items-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <ChevronIcon className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Slide berikutnya"
              className="grid size-11 place-items-center rounded-full border border-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <ChevronIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
