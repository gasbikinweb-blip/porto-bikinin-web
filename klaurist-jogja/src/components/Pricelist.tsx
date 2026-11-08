'use client';

// Galeri poster pricelist asli dari IG. Klik membuka modal (poster + deskripsi), bukan halaman baru.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Sparkle } from './decor';
import { WhatsAppIcon } from './icons';
import { buildWhatsAppLink } from '@/lib/whatsapp';

type Poster = {
  slug: string;
  title: string;
  alt: string;
  desc: string;
  w: number;
  h: number;
};

const posters: Poster[] = [
  {
    slug: 'poster-papan',
    title: 'Papan Akrilik',
    alt: 'Pricelist papan akrilik: Round, Kubah, Standing',
    desc: 'Pilihan sewa papan ucapan akrilik: Round Acrylic Rp60.000, Kubah Acrylic Rp85.000, dan Standing Akrilik Rp175.000. Sudah termasuk hiasan bunga non-fresh.',
    w: 864,
    h: 1080,
  },
  {
    slug: 'poster-papan-baru-1',
    title: 'Koleksi Papan Baru',
    alt: 'Poster koleksi papan akrilik baru',
    desc: 'Koleksi papan akrilik terbaru dengan bingkai gelombang dan rangkaian bunga warna-warni. Harga dikonfirmasi admin via WhatsApp.',
    w: 1080,
    h: 1080,
  },
  {
    slug: 'poster-papan-baru-2',
    title: 'Papan Baru di Acara',
    alt: 'Poster papan akrilik baru dipakai di acara',
    desc: 'Contoh papan akrilik koleksi baru saat terpasang di acara. Cocok untuk wisuda, sidang, dan grand opening.',
    w: 1080,
    h: 1080,
  },
  {
    slug: 'poster-bucket',
    title: 'Bucket Spesial',
    alt: 'Pricelist Velvet Maroon, Blue Ocean, Blue Round Daisy',
    desc: 'Velvet Maroon Rp80.000, Blue Ocean Rp70.000, dan Blue Round Daisy Rp90.000. Bunga non-fresh, awet dan tidak layu.',
    w: 864,
    h: 1080,
  },
  {
    slug: 'poster-round-daisy',
    title: 'Round Daisy & Tambahan',
    alt: 'Pricelist Round Daisy Flower dan tambahan',
    desc: 'Round Daisy 25/35/55/65 tangkai: Rp60.000, Rp90.000, Rp120.000, Rp150.000. Tambahan: pita Rp15.000, mahkota Rp10.000, kupu-kupu Rp5.000, tile salju Rp20.000.',
    w: 1080,
    h: 1350,
  },
  {
    slug: 'poster-paket',
    title: 'Paket 6 Tangkai',
    alt: 'Poster Paket 6 Tangkai: Paket Lilu dan Paket Limaw',
    desc: 'Paket Lilu (lili & tulip) dan Paket Limaw (lili & mawar), masing-masing Rp80.000 untuk 6 tangkai. Tersedia beberapa pilihan warna.',
    w: 1080,
    h: 1350,
  },
  {
    slug: 'poster-bloom',
    title: 'Klaurist Bloom (Satuan)',
    alt: 'Pricelist Klaurist Bloom bunga satuan',
    desc: 'Bunga satuan mulai Rp8.000: mini daisy, tulip, lili, peony, lavender, mawar, gerbera, lili 2 warna, sampai sunflower.',
    w: 1080,
    h: 1350,
  },
  {
    slug: 'poster-kenapa',
    title: 'Kenapa Klaurist?',
    alt: 'Poster kenapa harus memilih Klaurist',
    desc: 'Awet karena non-fresh, tampil aesthetic di setiap foto, ramah di kantong, dan bisa diantar di area Jogja.',
    w: 1080,
    h: 1350,
  },
];

export function Pricelist() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="judul-pricelist"
      id="pricelist"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="reveal">
        <h2
          id="judul-pricelist"
          className="flex items-center gap-2 font-serif text-3xl font-medium sm:text-4xl"
        >
          Pricelist Lengkap <Sparkle className="size-4 text-rose" />
        </h2>
        <p className="mt-1 text-sm text-muted">
          Poster asli dari Instagram Klaurist. Ketuk untuk melihat detailnya.
        </p>
      </div>
      <ul
        data-stagger
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-4"
      >
        {posters.map((p, i) => (
          <li key={p.slug} className="reveal w-[70%] shrink-0 snap-start sm:w-auto">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-[1.5rem] border border-line bg-blush-soft text-left"
            >
              <span className="relative block aspect-[4/5]">
                <Image
                  src={`/images/${p.slug}-thumb.webp`}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 70vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="block px-4 py-3 font-serif text-lg">{p.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <PosterModal index={open} onChange={setOpen} />
    </section>
  );
}

function PosterModal({
  index,
  onChange,
}: {
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = index !== null;
  const p = index !== null ? posters[index] : undefined;
  const last = posters.length - 1;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const close = () => onChange(null);
  const go = (step: number) =>
    index !== null && onChange((index + step + posters.length) % posters.length);

  const nav =
    'grid size-11 place-items-center rounded-full border border-line bg-card hover:bg-blush-soft';

  return (
    <dialog
      ref={ref}
      aria-labelledby="judul-poster"
      aria-modal="true"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="sheet bg-ivory p-0 text-plum"
    >
      {p && (
        <div className="grid md:grid-cols-[1.1fr_1fr]">
          <div className="relative aspect-[4/5] bg-blush-soft md:aspect-auto md:min-h-[34rem]">
            <Image
              key={p.slug}
              src={`/images/${p.slug}.webp`}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 500px, 100vw"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs tracking-[0.2em] text-rose uppercase">
                Pricelist {index! + 1} / {last + 1}
              </p>
              <button type="button" onClick={close} aria-label="Tutup" className={nav}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <h3 id="judul-poster" className="font-serif text-3xl font-medium">
              {p.title}
            </h3>
            <p className="leading-relaxed text-muted">{p.desc}</p>
            <a
              href={buildWhatsAppLink(
                `Halo Klaurist, saya mau tanya tentang ${p.title} dari pricelist di website.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose px-6 font-medium text-on-rose hover:bg-rose-strong"
            >
              <WhatsAppIcon className="size-5" /> Tanya via WhatsApp
              <span className="sr-only"> (tab baru)</span>
            </a>
            <div className="mt-auto flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Poster sebelumnya"
                className={nav}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 6-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Poster berikutnya"
                className={nav}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
