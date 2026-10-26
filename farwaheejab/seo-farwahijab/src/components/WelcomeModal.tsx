'use client';

// Pop-up "Selamat datang" yang muncul SEKALI per pengunjung (penanda disimpan di localStorage browser).
// Berbasis <dialog>: fokus terkunci di dalam, Esc / klik di luar / tombol × menutup.
import Image from 'next/image';
import { LogoMark } from './Logo';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { products } from '@/data/products';
import { site } from '@/data/site';

const STORAGE_KEY = 'farwa-sapaan-dilihat';
const DELAY_MS = 900;
const photo = products.find((p) => p.slug === 'syaima-khiban-voal-miracle')?.images[0];

function alreadySeen(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    // Storage diblokir (mode privat dsb.): anggap sudah dilihat supaya tidak muncul terus-menerus
    return true;
  }
}

function markSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // abaikan
  }
}

export function WelcomeModal() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Tampilkan setelah jeda singkat, hanya untuk kunjungan pertama
  useEffect(() => {
    if (alreadySeen()) return;
    const timer = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    dialog.showModal();
    markSeen();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  if (!open) return null;
  const close = () => setOpen(false);

  return (
    <dialog
      ref={ref}
      aria-labelledby="sapaan-judul"
      aria-describedby="sapaan-isi"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[90dvh] w-[min(46rem,calc(100%-2rem))] overflow-y-auto rounded-[2rem] bg-background p-0 text-mocha shadow-2xl backdrop:bg-mocha-strong/50 backdrop:backdrop-blur-sm open:animate-[sapaan_0.4s_ease-out]"
    >
      <div className="grid md:grid-cols-[0.85fr_1.15fr]">
        {photo && (
          <div className="relative hidden min-h-full bg-surface md:block">
            <Image src={photo.thumb} alt="" fill sizes="300px" className="object-cover" />
          </div>
        )}
        <div className="relative p-7 sm:p-9">
          <button
            type="button"
            onClick={close}
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full text-2xl leading-none hover:bg-surface"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Tutup sapaan</span>
          </button>
          <LogoMark className="mb-4 h-14 text-mocha" />
          <p className="eyebrow">Assalamu’alaikum, Kak ✦</p>
          <h2 id="sapaan-judul" className="mt-3 pr-8 font-serif text-3xl leading-tight md:text-4xl">
            Selamat datang di <em className="text-rose">Farwa Hijab</em>
          </h2>
          <p id="sapaan-isi" className="mt-4 leading-relaxed text-muted">
            {site.tagline} dari {site.city}. Lihat koleksi khimar, khiban, bergo, dan pashmina kami,
            checkout eceran di Shopee, atau gabung jadi reseller dengan harga grosir.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/#koleksi"
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-mocha px-6 font-bold text-background hover:bg-mocha-strong"
            >
              Lihat Katalog
            </Link>
            <Link
              href="/#reseller"
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-mocha px-6 font-bold hover:bg-mocha hover:text-background"
            >
              Mau Jadi Reseller
            </Link>
          </div>
        </div>
      </div>
    </dialog>
  );
}
