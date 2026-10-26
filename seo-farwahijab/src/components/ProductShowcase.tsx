'use client';

// Hero showcase (gaya etalase produk): nama & deskripsi di kiri, foto besar di tengah,
// pilihan ukuran & thumbnail warna di kanan. Ganti produk/warna → foto "tumbuh" dengan animasi ala macOS.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getCategory } from '@/data/categories';
import { formatRupiah, type Product } from '@/data/products';
import { safeAnimate } from '@/lib/motion';
import { ShopeeIcon } from './icons';
import { ProductModal, type OpenProduct } from './ProductModal';

const MAX_COLORS = 8;

export function ProductShowcase({ products }: { products: readonly Product[] }) {
  const [index, setIndex] = useState(0);
  const [colorName, setColorName] = useState<string | null>(null);
  const [sizeName, setSizeName] = useState<string | null>(null);
  const [modal, setModal] = useState<OpenProduct | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const product = products[index] ?? products[0];
  const color = product?.colors.find((c) => c.name === colorName) ?? null;
  const size = product?.sizes?.find((s) => s.name === sizeName) ?? product?.sizes?.[0] ?? null;
  const main = color?.image ?? product?.images[0];
  const second = product?.images[1];

  // Animasi "genie": foto muncul dari bawah, mengecil-membesar, dengan blur yang menghilang.
  // Teks ikut bergeser masuk hanya saat produk (bukan warna) berganti. Dilewati saat pertama tampil.
  const lastIndex = useRef(index);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    safeAnimate(
      stageRef.current,
      [
        {
          transform: 'translateY(40px) scale(0.86) perspective(900px) rotateX(10deg)',
          opacity: 0,
          filter: 'blur(10px)',
        },
        { transform: 'none', opacity: 1, filter: 'none' },
      ],
      { duration: 560, easing: 'cubic-bezier(0.2, 0.9, 0.25, 1)' },
    );
    if (lastIndex.current !== index) {
      safeAnimate(
        textRef.current,
        [
          { transform: 'translateX(-16px)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 420, easing: 'ease-out' },
      );
    }
    lastIndex.current = index;
  }, [index, colorName]);

  if (!product || !main) return null;
  const extraColors = product.colors.length - MAX_COLORS;

  const go = (step: number) => {
    setIndex((i) => (i + step + products.length) % products.length);
    setColorName(null);
    setSizeName(null);
  };
  const openDetail = (e: React.MouseEvent<HTMLElement>) =>
    setModal({ product, origin: e.currentTarget.getBoundingClientRect() });

  return (
    <section
      id="beranda"
      aria-labelledby="judul"
      className="relative overflow-hidden bg-gradient-to-b from-surface to-background"
    >
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-12 sm:px-6 lg:pt-10">
        {/* Pemilih produk */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-background hover:border-mocha"
          >
            <span aria-hidden="true">←</span>
            <span className="sr-only">Produk sebelumnya</span>
          </button>
          <div
            role="group"
            aria-label="Pilih produk"
            className="flex flex-1 gap-2 overflow-x-auto [scrollbar-width:none]"
          >
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-pressed={i === index}
                onClick={() => {
                  setIndex(i);
                  setColorName(null);
                  setSizeName(null);
                }}
                className="min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap text-muted transition-colors hover:text-mocha aria-pressed:bg-mocha aria-pressed:text-background"
              >
                {p.shortName}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-background hover:border-mocha"
          >
            <span aria-hidden="true">→</span>
            <span className="sr-only">Produk berikutnya</span>
          </button>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1fr_1.15fr_0.85fr] lg:gap-10">
          {/* Kiri: nama & deskripsi */}
          <div ref={textRef} className="order-2 lg:order-1">
            <p className="eyebrow">{getCategory(product.category)?.name}</p>
            {/* h1 tetap satu per halaman: judul brand, nama produk sebagai teks besar */}
            <h1 id="judul" className="sr-only">
              Farwa Hijab — hijab premium harga grosir dari Bandung
            </h1>
            <p className="mt-3 font-serif text-hero tracking-tight uppercase" aria-live="polite">
              {product.shortName}
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">{product.description}</p>
            <button
              type="button"
              onClick={openDetail}
              className="mt-3 min-h-11 text-sm font-semibold underline underline-offset-4 hover:text-rose"
            >
              Baca selengkapnya
            </button>
            {second && (
              <button
                type="button"
                onClick={openDetail}
                className="mt-6 hidden w-36 overflow-hidden rounded-2xl bg-surface shadow-sm lg:block"
              >
                <span className="relative block aspect-[4/5]">
                  <Image src={second.thumb} alt="" fill sizes="144px" className="object-cover" />
                </span>
                <span className="sr-only">Lihat detail {product.shortName}</span>
              </button>
            )}
          </div>

          {/* Tengah: foto utama */}
          <div className="order-1 lg:order-2">
            <div
              ref={stageRef}
              className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-surface-2 shadow-[0_30px_60px_-30px_rgb(74_50_41/0.45)]"
            >
              <Image
                key={main.src}
                src={main.src}
                alt={main.alt}
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover"
              />
            </div>
            <p className="mt-4 text-center text-xs font-bold tracking-[0.25em] text-muted uppercase">
              {product.material}
            </p>
            <p className="mt-1 text-center text-xl font-bold">
              {formatRupiah(size?.price ?? product.priceRetail)}
            </p>
          </div>

          {/* Kanan: ukuran, warna, tombol */}
          <div className="order-3">
            {product.sizes && (
              <fieldset>
                <legend className="font-serif text-2xl tracking-wide uppercase">Size</legend>
                <div className="mt-3 flex gap-2">
                  {product.sizes.map((s) => (
                    <label
                      key={s.name}
                      className="grid size-11 cursor-pointer place-items-center rounded-full border border-line text-sm font-bold has-checked:border-mocha has-checked:bg-mocha has-checked:text-background has-focus-visible:outline-2 has-focus-visible:outline-mocha"
                    >
                      <input
                        type="radio"
                        name="showcase-size"
                        checked={size?.name === s.name}
                        onChange={() => setSizeName(s.name)}
                        className="sr-only"
                      />
                      {s.name}
                    </label>
                  ))}
                </div>
                {size && <p className="mt-2 text-xs text-muted">{size.detail}</p>}
              </fieldset>
            )}

            {product.colors.length > 0 ? (
              <fieldset className={product.sizes ? 'mt-7' : ''}>
                <legend className="font-serif text-2xl tracking-wide uppercase">Warna</legend>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {product.colors.slice(0, MAX_COLORS).map((c) => (
                    <label key={c.name} title={c.name} className="group cursor-pointer text-center">
                      <input
                        type="radio"
                        name="showcase-color"
                        checked={colorName === c.name}
                        onChange={() => setColorName(c.name)}
                        className="peer sr-only"
                      />
                      <span className="relative block aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-surface peer-checked:border-mocha peer-focus-visible:outline-2 peer-focus-visible:outline-mocha">
                        {c.image ? (
                          <Image
                            src={c.image.thumb}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <span
                            className="absolute inset-2 rounded-full"
                            style={{ backgroundColor: c.hex }}
                          />
                        )}
                      </span>
                      <span className="mt-1 block truncate text-[11px] text-muted">{c.name}</span>
                    </label>
                  ))}
                </div>
                {extraColors > 0 && (
                  <button
                    type="button"
                    onClick={openDetail}
                    className="mt-2 min-h-10 text-sm font-semibold underline underline-offset-4"
                  >
                    +{extraColors} warna lainnya
                  </button>
                )}
              </fieldset>
            ) : (
              <p className="text-sm text-muted">{product.note}</p>
            )}

            <div className="mt-7 grid gap-2">
              <button
                type="button"
                onClick={openDetail}
                className="min-h-12 rounded-full border-2 border-mocha px-6 font-bold transition-colors hover:bg-mocha hover:text-background"
              >
                Lihat Detail
              </button>
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-shopee px-6 font-bold text-white transition-colors hover:bg-shopee-strong"
              >
                <ShopeeIcon className="size-5" />
                Beli di Shopee
                <span className="sr-only"> (tab baru)</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {modal && <ProductModal open={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
