'use client';

// Hero beranda gaya editorial: foto penuh berganti tiap 7 detik, judul kiri,
// kartu karya di kanan dengan penghitung 01 — 05, intipan slide berikutnya, dan tombol panah.
// Bila pengguna memilih "kurangi animasi", slide tidak berganti otomatis.
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';

const INTERVAL = 7000;

const slides = [
  {
    bg: '/projects/kitchen-set-island-modern/02.webp',
    card: '/projects/kitchen-set-island-modern/01.webp',
    slug: 'kitchen-set-island-modern',
    eyebrow: 'Interior custom untuk setiap sudut rumah Anda',
    light: 'Wujudkan Interior yang Pas Ukurannya dan',
    bold: 'Rapi Dipasang',
    cardTitle: 'Kitchen Set Island Modern',
    cardText: 'Kabinet atas-bawah dan island, dibuat sesuai ukuran dapur.',
  },
  {
    bg: '/projects/kitchen-set-minibar-kisi/02.webp',
    card: '/projects/kitchen-set-minibar-kisi/03.webp',
    slug: 'kitchen-set-minibar-kisi',
    eyebrow: 'Kitchen set custom di Bandung',
    light: 'Dapur Rapi, Masak Jadi Lebih',
    bold: 'Semangat',
    cardTitle: 'Kitchen Set & Minibar Kisi',
    cardText: 'Multiplek 18 mm berlapis HPL TACO, kuat dan mudah dibersihkan.',
  },
  {
    bg: '/projects/backdrop-tv-lengkung-led/01.webp',
    card: '/projects/backdrop-tv-marmer-led/01.webp',
    slug: 'backdrop-tv-lengkung-led',
    eyebrow: 'Backdrop TV dengan lampu LED',
    light: 'Ruang Keluarga Terasa',
    bold: 'Lebih Hidup',
    cardTitle: 'Backdrop TV Lengkung LED',
    cardText: 'Rak display, lampu LED, dan kabel tersembunyi rapi.',
  },
  {
    bg: '/projects/lemari-kaca-walk-in/01.webp',
    card: '/projects/lemari-kaca-walk-in/02.webp',
    slug: 'lemari-kaca-walk-in',
    eyebrow: 'Lemari & kamar set custom',
    light: 'Lemari Setinggi Plafon,',
    bold: 'Muat Lebih Banyak',
    cardTitle: 'Lemari Kaca Walk-in',
    cardText: 'Pembagian rak, gantungan, dan laci sesuai kebutuhan Anda.',
  },
  {
    bg: '/projects/partisi-kisi-ruang-tamu/02.webp',
    card: '/projects/partisi-kisi-ruang-tamu/03.webp',
    slug: 'partisi-kisi-ruang-tamu',
    eyebrow: 'Partisi kisi kayu',
    light: 'Bagi Ruang Tanpa Membuatnya',
    bold: 'Terasa Sempit',
    cardTitle: 'Partisi Kisi Ruang Tamu',
    cardText: 'Memisahkan ruang sekaligus jadi pemanis interior.',
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
        className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl grid-rows-[1fr_auto] px-4 pt-28 pb-10 sm:px-6 lg:pt-24"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* Kiri: judul */}
          <div key={i} aria-live="polite">
            <p className="animate-in text-sm text-foreground/80">{s.eyebrow}</p>
            <h1
              className="animate-in mt-5 max-w-xl text-4xl leading-[1.15] font-light tracking-tight sm:text-5xl lg:text-6xl"
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

            <div className="mt-6 flex items-stretch gap-4">
              <div
                key={`c${i}`}
                className="animate-in flex flex-1 gap-4 rounded-3xl border border-white/15 bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-2xl sm:w-36">
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
                      className="rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-accent-strong"
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
                      className="grid size-8 place-items-center rounded-full border border-foreground/50 transition-colors hover:border-accent hover:text-accent-strong"
                    >
                      <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
                        <path
                          d="M10 17s-6-3.6-6-8.2A3.3 3.3 0 0 1 10 6.6a3.3 3.3 0 0 1 6 2.2C16 13.4 10 17 10 17Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
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
        <div className="mt-10 flex items-end justify-end sm:justify-between">
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
