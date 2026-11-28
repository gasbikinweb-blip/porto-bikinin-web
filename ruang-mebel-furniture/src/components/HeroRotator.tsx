'use client';

// Hero beranda gaya editorial: foto penuh berganti tiap 7 detik, judul kiri,
// kartu karya di kanan dengan penghitung 01 — 05, intipan slide berikutnya, dan tombol panah.
// Bila pengguna memilih "kurangi animasi", slide tidak berganti otomatis.
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const INTERVAL = 7000;

const slides = [
  {
    bg: '/projects/meja-tv-anthony/01.webp',
    card: '/projects/meja-tv-anthony/03.webp',
    slug: 'meja-tv-anthony',
    eyebrow: 'Furnitur kayu jati buatan pengrajin Jepara',
    light: 'Furnitur Jati Solid yang Bikin Rumah Terasa',
    bold: 'Lebih Hangat',
    cardTitle: 'Meja TV Anthony',
    cardText: 'Kisi kayu jati solid dengan rak terbuka dan laci.',
  },
  {
    bg: '/projects/credenza-retro-rotan/01.webp',
    card: '/projects/credenza-retro-rotan/05.webp',
    slug: 'credenza-retro-rotan',
    eyebrow: 'Bufet & credenza kombinasi rotan',
    light: 'Ruang Simpan Lega dengan Sentuhan',
    bold: 'Anyaman Rotan',
    cardTitle: 'Credenza Retro Rotan',
    cardText: 'Kayu jati kombinasi rotan, panjang 200 cm.',
  },
  {
    bg: '/projects/nakas-retro-aesthetic/01.webp',
    card: '/projects/nakas-retro-aesthetic/04.webp',
    slug: 'nakas-retro-aesthetic',
    eyebrow: 'Nakas untuk kamar tidur',
    light: 'Sudut Kamar Lebih Rapi dan',
    bold: 'Estetik',
    cardTitle: 'Nakas Retro Jati Aesthetic',
    cardText: 'Laci rotan dan kaki ramping bergaya retro.',
  },
  {
    bg: '/projects/meja-tamu-mid-century/01.webp',
    card: '/projects/meja-tamu-mid-century/02.webp',
    slug: 'meja-tamu-mid-century',
    eyebrow: 'Meja tamu kayu solid',
    light: 'Pusat Ruang Tamu yang',
    bold: 'Berkarakter',
    cardTitle: 'Meja Tamu Mid-Century',
    cardText: 'Kaki melengkung presisi dengan serat kayu alami.',
  },
  {
    bg: '/projects/bufet-tv-ukiran/01.webp',
    card: '/projects/bufet-tv-ukiran/03.webp',
    slug: 'bufet-tv-ukiran',
    eyebrow: 'Bisa custom ukuran & model',
    light: 'Detail Ukir Khas',
    bold: 'Pengrajin Jepara',
    cardTitle: 'Bufet TV Ukiran Palembang',
    cardText: 'Ukiran tangan pada pintu kayu jati solid.',
  },
];


const pad = (n: number) => String(n).padStart(2, '0');

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
      <path
        d={dir === 'right' ? 'M4 10h12m-5-5 5 5-5 5' : 'M16 10H4m5-5-5 5 5 5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), INTERVAL);
    return () => window.clearTimeout(id);
  }, [i, paused, n]);

  const s = slides[i]!;
  const next = slides[(i + 1) % n]!;

  return (
    <>
      {/* Latar foto */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {slides.map((x, idx) => (
          <Image
            key={x.bg}
            src={x.bg}
            alt=""
            fill
            priority={idx === 0}
            sizes="100vw"
            className={`object-cover transition-[opacity,transform] duration-[1600ms] ease-out ${
              idx === i ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      <div
        className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl grid-rows-[1fr_auto] px-4 pt-24 pb-8 sm:px-6 sm:pt-28 sm:pb-10 lg:pt-24"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Kiri: judul */}
          <div key={i} aria-live="polite">
            <p className="animate-in text-sm text-foreground/80">{s.eyebrow}</p>
            <h1
              className="animate-in mt-4 max-w-xl text-[length:clamp(1.85rem,8.6vw,2.25rem)] leading-[1.15] font-light tracking-tight sm:mt-5 sm:text-5xl lg:text-6xl"
              style={{ '--delay': '150ms' } as React.CSSProperties}
            >
              {s.light} <strong className="font-semibold text-accent-strong">{s.bold}</strong>.
            </h1>
          </div>

          {/* Kanan: penghitung + kartu karya + intipan */}
          <div className="w-full lg:self-end lg:pb-6">
            <div className="flex items-center gap-4 text-sm text-foreground/80">
              <span className="font-semibold text-foreground">{pad(i + 1)}</span>
              <span className="relative h-px flex-1 bg-foreground/30">
                <span
                  className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-700"
                  style={{ width: `${((i + 1) / n) * 100}%` }}
                />
              </span>
              <span>{pad(n)}</span>
            </div>

            <div className="mt-5 flex items-stretch gap-4 sm:mt-6">
              <div
                key={`c${i}`}
                className="animate-in flex min-w-0 flex-1 gap-3 rounded-3xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-md sm:gap-4 sm:p-3"
              >
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl min-[380px]:w-28 sm:w-36">
                  <Image src={s.card} alt={s.cardTitle} fill sizes="144px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-col justify-between py-1 pr-1">
                  <div>
                    <p className="text-base leading-snug font-semibold sm:text-lg">{s.cardTitle}</p>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-foreground/75">
                      {s.cardText}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={`/#produk-${s.slug}`}
                      className="rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-background transition-colors hover:bg-accent-strong sm:px-4"
                    >
                      Lihat Detail
                    </Link>
                    <a
                      href={buildWhatsAppLink(
                        `Halo ${siteConfig.name}, saya tertarik dengan ${s.cardTitle}. Boleh info lebih lanjut?`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Tanya ${s.cardTitle} via WhatsApp (tab baru)`}
                      className="grid size-8 shrink-0 place-items-center rounded-full border border-foreground/50 transition-colors hover:border-accent hover:text-accent-strong"
                    >
                      <WhatsAppIcon className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={`Slide berikutnya: ${next.cardTitle}`}
                className="relative hidden w-28 shrink-0 overflow-hidden rounded-3xl border border-white/15 sm:block"
              >
                <Image src={next.card} alt="" fill sizes="112px" className="object-cover transition-transform duration-500 hover:scale-105" />
              </button>
            </div>
          </div>
        </div>

        {/* Baris bawah: tombol bulat, indikator gulir, panah */}
        <div className="mt-8 flex items-end justify-end sm:mt-10 sm:justify-between">
          <span className="hidden w-[176px] sm:block" aria-hidden="true" />

          <a href="#tentang" className="hidden sm:block" aria-label="Gulir ke bawah">
            <span className="flex h-12 w-7 justify-center rounded-full border border-foreground/50 pt-2">
              <span className="animate-scroll-dot block size-1.5 rounded-full bg-foreground" />
            </span>
          </a>

          <div className="mr-16 flex gap-2 sm:mr-20" role="group" aria-label="Navigasi slide">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Slide sebelumnya"
              className="grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Slide berikutnya"
              className="grid size-11 place-items-center rounded-full bg-foreground text-background transition-colors hover:bg-accent-strong"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
