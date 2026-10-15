'use client';

// Hero bergaya halaman produk: pilih warna (foto utama berganti) dan ukuran,
// lalu tombol WhatsApp menyusun pesan dari pilihan itu. Tidak ada data yang dikirim ke server.
import Image from 'next/image';
import { useState } from 'react';
import type { ImageAsset } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export type HeroVariant = {
  slug: string;
  /** Nama warna singkat, mis. "Baby Salem" */
  color: string;
  cover: ImageAsset;
  detail: ImageAsset;
};

type Props = {
  collection: string;
  variants: readonly [HeroVariant, ...HeroVariant[]];
  sizes: readonly string[];
};

export function HeroShowcase({ collection, variants, sizes }: Props) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const variant = variants[active] ?? variants[0];

  const message = [
    `Halo ${siteConfig.name}, saya ingin order ${collection} warna ${variant.color}`,
    size ? `, ukuran ${size}` : '',
    '. Apakah masih bisa ikut PO?',
  ].join('');

  const label = 'font-mono text-[11px] tracking-[0.2em] uppercase';

  return (
    <section
      aria-labelledby="judul-hero"
      className="hero-dots relative overflow-hidden border-b border-line"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.25fr_0.9fr] lg:items-center lg:gap-6 lg:py-16">
        {/* Kiri: nama & deskripsi */}
        <div className="animate-in">
          <p className={`${label} text-accent`}>Şahane.id · Koleksi Terbaru</p>
          <h1
            id="judul-hero"
            className="mt-3 font-mono text-[2.4rem] leading-[1.02] font-medium tracking-tight uppercase sm:text-6xl"
          >
            {collection}
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
            Abaya lapang berbahan linen premium dengan bordir bunga yang dikerjakan rapi. Ringan,
            adem, dan <em>nyaman dipakai seharian</em> — dari kajian hingga perjalanan umrah.
          </p>
          <a
            href="#koleksi"
            className="mt-3 inline-block text-sm text-accent underline underline-offset-4"
          >
            Lihat koleksi lengkap
          </a>
          <div className="relative mt-8 hidden aspect-square w-32 overflow-hidden rounded-xl border border-line lg:block">
            <Image
              key={variant.detail.src}
              src={variant.detail.src}
              alt={variant.detail.alt}
              fill
              sizes="128px"
              className="animate-fade object-cover"
            />
          </div>
        </div>

        {/* Tengah: foto utama */}
        <div className="animate-in relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-2 shadow-[0_40px_80px_-40px_rgb(47_38_32/0.45)]">
            {variants.map((v, i) => (
              <Image
                key={v.slug}
                src={v.cover.src}
                alt={v.cover.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 40vw, 92vw"
                className={`object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={i !== active}
              />
            ))}
          </div>
          <p className={`${label} mt-5 text-center text-accent`}>Linen Premium · Bordir Rapi</p>
          <p className={`${label} mt-1 text-center`}>Adem dipakai seharian</p>
        </div>

        {/* Kanan: ukuran, warna, aksi */}
        <div className="animate-in lg:pl-4">
          <fieldset>
            <legend className="font-mono text-2xl tracking-[0.15em] uppercase">Size</legend>
            <div className="mt-3 flex gap-2">
              {sizes.map((s) => (
                <label
                  key={s}
                  className="grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-background font-mono text-sm transition-colors hover:border-accent has-[:checked]:border-foreground has-[:checked]:bg-foreground has-[:checked]:text-background has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
                >
                  <input
                    type="radio"
                    name="hero-size"
                    value={s}
                    checked={size === s}
                    onChange={() => setSize(s)}
                    className="sr-only"
                  />
                  {s}
                </label>
              ))}
            </div>
            <a
              href={buildWhatsAppLink(
                `Halo ${siteConfig.name}, boleh minta panduan ukuran ${collection}?`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs text-accent underline underline-offset-4"
            >
              Panduan ukuran<span className="sr-only"> (tanya via WhatsApp, tab baru)</span>
            </a>
          </fieldset>

          <fieldset className="mt-8 border-t border-line pt-6">
            <legend className="sr-only">Warna</legend>
            <p aria-hidden="true" className="font-mono text-2xl tracking-[0.15em] uppercase">
              Colour
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {variants.map((v, i) => (
                <label key={v.slug} className="group cursor-pointer text-center">
                  <input
                    type="radio"
                    name="hero-color"
                    value={v.slug}
                    checked={active === i}
                    onChange={() => setActive(i)}
                    className="peer sr-only"
                  />
                  <span className="relative block aspect-square overflow-hidden rounded-xl border-2 border-transparent transition-colors peer-checked:border-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    <Image src={v.cover.src} alt="" fill sizes="80px" className="object-cover" />
                  </span>
                  <span
                    className={`${label} mt-1.5 block text-[10px] text-muted peer-checked:text-foreground`}
                  >
                    {v.color}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col gap-2.5">
            <a
              href="#koleksi"
              className="rounded-full border border-foreground px-6 py-3 text-center font-mono text-xs tracking-[0.2em] uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Lihat Koleksi
            </a>
            <a
              href={buildWhatsAppLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs tracking-[0.2em] text-background uppercase transition-colors hover:bg-accent-strong"
            >
              <WhatsAppIcon className="size-4" />
              Pesan Sekarang
              <span className="sr-only"> (WhatsApp, tab baru)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
