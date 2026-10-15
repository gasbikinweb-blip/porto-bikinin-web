'use client';

// Panel kaca (glass) dengan kartu utama di kiri dan daftar di kanan.
// Memilih item di daftar mengganti kartu utama dan latar blur. Data lokal saja.
import Image from 'next/image';
import { useRef, useState } from 'react';
import type { ImageAsset } from '@/data/products';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export type ShowcaseItem = {
  id: string;
  title: string;
  /** Baris kecil di bawah judul, mis. kategori / status */
  subtitle: string;
  /** Baris dengan ikon pin, mis. warna / akun */
  meta: string;
  description: string;
  image: ImageAsset;
  /** Chip kecil di kartu utama, mis. harga */
  badge?: string;
  /** Isi pesan tombol WhatsApp */
  waMessage: string;
};

type Props = {
  id: string;
  title: string;
  listTitle: string;
  items: readonly [ShowcaseItem, ...ShowcaseItem[]];
  ctaLabel: string;
  /** Kartu utama di kanan (desktop), untuk tata letak zigzag antar-section */
  reverse?: boolean;
};

function PinIcon({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ShowcasePanel({ id, title, listTitle, items, ctaLabel, reverse = false }: Props) {
  const [active, setActive] = useState(0);
  const featured = useRef<HTMLDivElement>(null);
  const item = items[active] ?? items[0];

  const select = (i: number) => {
    setActive(i);
    // Di HP kartu utama ada di atas daftar: gulir ke sana bila tidak terlihat
    const el = featured.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'start' });
  };

  return (
    <section
      aria-labelledby={id}
      className="theme-dark relative isolate overflow-hidden px-3 py-14 sm:px-6 sm:py-24"
    >
      {/* Latar: foto item aktif yang diburamkan */}
      <Image
        key={item.image.src}
        src={item.image.src}
        alt=""
        fill
        sizes="100vw"
        className="animate-fade -z-20 scale-110 object-cover blur-2xl"
      />
      <div className="absolute inset-0 -z-10 bg-[#1a1411]/60" />

      <div className="mx-auto max-w-6xl rounded-[1.75rem] border border-white/15 bg-white/[0.07] p-3 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-4 px-2 pt-1 sm:mb-5">
          <h2 id={id} className="font-serif text-xl font-semibold sm:text-2xl">
            {title}
          </h2>
          <span className="rounded-full bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-wider text-white/80 uppercase">
            {items.length} item
          </span>
        </div>

        <div
          className={`grid gap-3 sm:gap-5 ${reverse ? 'lg:grid-cols-[1fr_1.25fr]' : 'lg:grid-cols-[1.25fr_1fr]'}`}
        >
          {/* Kartu utama */}
          <div
            ref={featured}
            className={`${reverse ? 'lg:order-2' : ''} relative isolate flex min-h-[520px] scroll-mt-24 flex-col justify-between overflow-hidden rounded-[1.4rem] p-5 sm:min-h-[600px] sm:p-7`}
          >
            <Image
              key={item.id}
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 560px, 94vw"
              className="animate-fade -z-20 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/25 to-black/60" />

            <div aria-live="polite" className="max-w-sm">
              <p className="text-4xl leading-none font-semibold tracking-tight sm:text-5xl">
                {item.title}
              </p>
              <p className="mt-2 text-lg text-white/90">{item.subtitle}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/85">{item.description}</p>
              {item.badge && (
                <p className="mt-4 inline-block rounded-full bg-white/15 px-3 py-1.5 text-sm backdrop-blur-md">
                  {item.badge}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/25 p-3 backdrop-blur-xl sm:p-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10">
                <PinIcon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{item.title}</span>
                <span className="block truncate text-xs text-white/75">{item.meta}</span>
              </span>
              <a
                href={buildWhatsAppLink(item.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-[#2f2620] transition-colors hover:bg-white/85"
              >
                <WhatsAppIcon className="size-4" />
                {ctaLabel}
                <span className="sr-only"> {item.title} (WhatsApp, tab baru)</span>
              </a>
            </div>
          </div>

          {/* Daftar */}
          <div>
            <h3 className="px-2 pb-3 text-sm font-semibold text-white/90">{listTitle}</h3>
            <ul className="no-scrollbar space-y-2.5 lg:max-h-[600px] lg:overflow-y-auto">
              {items.map((it, i) => (
                <li key={it.id}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={i === active}
                    className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-2.5 text-left transition-colors hover:bg-white/[0.12] aria-pressed:border-white/35 aria-pressed:bg-white/[0.16]"
                  >
                    <span className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-xl">
                      <Image src={it.image.src} alt="" fill sizes="72px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-semibold">{it.title}</span>
                      <span className="block truncate text-xs text-white/75">{it.subtitle}</span>
                      <span className="mt-1.5 flex items-center gap-1 truncate text-xs text-white/70">
                        <PinIcon /> {it.meta}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/15 text-white/80 transition-colors group-aria-pressed:bg-white group-aria-pressed:text-[#2f2620]"
                    >
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
