'use client';

// Hero bergaya halaman produk: kiri nama & cerita, tengah foto besar, kanan ukuran + pilihan warna.
// Pilih warna → foto utama berganti; tombol WhatsApp menyusun pesan dari warna terpilih.
import Image from 'next/image';
import { useState } from 'react';
import type { Img, Product } from '@/data/types';
import { buildWhatsAppLink, orderMessage } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

type Variant = { slug: string; name: string; image: Img };

export function HeroShowcase({ product, detail }: { product: Product; detail: Img }) {
  const variants: Variant[] = product.colors.flatMap((c) =>
    c.images?.[0] ? [{ slug: c.slug, name: c.name, image: c.images[0] }] : [],
  );
  const [active, setActive] = useState(0);
  const variant = variants[active] ?? variants[0];

  // Buka modal detail produk di katalog (dibaca Catalog lewat event popstate)
  const openDetail = () => {
    history.pushState(
      null,
      '',
      `${location.pathname}?warna=${variant?.slug ?? ''}#produk-${product.slug}`,
    );
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const label = 'text-[0.68rem] tracking-[0.3em] uppercase';

  return (
    <section id="beranda" aria-labelledby="judul-hero" className="border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_1.2fr_0.9fr] lg:items-center lg:gap-10 lg:py-20">
        {/* Kiri: nama & cerita */}
        <div className="animate-fade order-2 lg:order-1">
          <p className={`${label} text-rose-ink`}>Sanaréa · Koleksi Terbaru</p>
          <h1 id="judul-hero" className="display-caps mt-4 text-4xl leading-[1.1] sm:text-5xl">
            Marble <br />
            Series
          </h1>
          <p className="mt-6 max-w-sm leading-relaxed text-muted">
            Pashmina viscose bermotif marmer dengan nuansa earthy yang lembut. Ringan, jatuh dengan
            anggun, dan <em className="font-serif text-lg">mudah dipadukan</em> untuk tampilan
            sehari-hari. <span className="sr-only">{product.name}.</span>
          </p>
          <a
            href="#katalog"
            className="mt-4 inline-block text-sm text-rose-ink underline underline-offset-4"
          >
            Lihat katalog lengkap
          </a>
          <div className="relative mt-10 hidden aspect-square w-32 overflow-hidden border border-line lg:block">
            <Image
              src={detail.thumb}
              alt={detail.alt}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Tengah: foto utama */}
        <div className="animate-fade order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface shadow-[0_40px_80px_-40px_rgb(30_28_26/0.45)]">
            {variants.map((v, i) => (
              <Image
                key={v.slug}
                src={v.image.src}
                alt={v.image.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 40vw, 92vw"
                className={`object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={i !== active}
              />
            ))}
          </div>
          <p className={`${label} mt-5 text-center text-rose-ink`}>
            Viscose Premium · Motif Marmer
          </p>
          <p className={`${label} mt-1 text-center`}>A Modest Soul Essentials</p>
        </div>

        {/* Kanan: ukuran, warna, aksi */}
        <div className="animate-fade order-3 lg:pl-2">
          <p className="display-caps text-2xl">Size</p>
          <p className="mt-3 inline-flex min-h-10 items-center rounded-full border border-ink px-4 text-sm">
            {product.size}
          </p>

          <fieldset className="mt-8 border-t border-line pt-6">
            <legend className="sr-only">Warna</legend>
            <p aria-hidden="true" className="display-caps text-2xl">
              Colour
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {variants.map((v, i) => (
                <label key={v.slug} className="cursor-pointer text-center">
                  <input
                    type="radio"
                    name="hero-warna"
                    value={v.slug}
                    checked={active === i}
                    onChange={() => setActive(i)}
                    className="peer sr-only"
                  />
                  <span className="relative block aspect-square overflow-hidden rounded-xl border-2 border-transparent transition-colors peer-checked:border-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                    <Image
                      src={v.image.thumb}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover object-top"
                    />
                  </span>
                  <span className="mt-1.5 block text-[0.6rem] tracking-[0.2em] text-muted uppercase peer-checked:text-ink">
                    {v.name}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={openDetail}
              aria-haspopup="dialog"
              className="btn btn-line rounded-full"
            >
              Lihat Detail
            </button>
            <a
              href={buildWhatsAppLink(
                orderMessage(
                  product,
                  1,
                  variant ? { name: variant.name, slug: variant.slug } : undefined,
                ),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid rounded-full"
            >
              <WhatsAppIcon className="size-4" />
              Pesan Sekarang<span className="sr-only"> (WhatsApp, tab baru)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
