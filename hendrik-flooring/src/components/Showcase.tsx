'use client';

// Kartu yang membuka modal "poster" (terinspirasi referensi 4): foto penuh, judul besar,
// deretan ikon keunggulan, baris gambar terkait, dan bar bawah dengan tombol WhatsApp.
// Memakai <dialog> bawaan: Esc atau klik di luar modal menutup, fokus kembali ke kartu.
import Image from 'next/image';
import { useId, useState } from 'react';
import type { Highlight } from '@/data/products';
import { trustItems } from '@/data/site';
import type { ImageAsset } from '@/data/types';
import { trapTab } from '@/lib/dialog';
import { useModal } from '@/lib/useModal';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { ArrowIcon, CheckIcon, CloseIcon, FeatureIcon, WhatsAppIcon } from './icons';

export type ShowcaseItem = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  image: ImageAsset;
  /** Kunci ruangan yang cocok (untuk pilihan "Untuk ruangan apa?") */
  areas: string[];
  /** Deretan ikon bulat */
  highlights?: Highlight[];
  brands?: string[];
  relatedTitle: string;
  related: { label: string; image: ImageAsset }[];
  waMessage: string;
};

export type RoomOption = { key: string; label: string; summary: string };

const delay = (i: number) => ({ '--i': i }) as React.CSSProperties;

export function Showcase({
  items,
  rooms = [],
  columns = 4,
}: {
  items: ShowcaseItem[];
  /** Pilihan ruangan di atas kartu; kosong = tanpa pilihan */
  rooms?: RoomOption[];
  columns?: 2 | 4;
}) {
  // id unik: komponen ini bisa dipakai lebih dari sekali di satu halaman
  const uid = useId();
  const headingId = `${uid}-judul`;
  const roomLabelId = `${uid}-ruangan`;
  const [room, setRoom] = useState<string | null>(null);
  const modal = useModal<ShowcaseItem>();
  const active = modal.value;
  const selectedRoom = rooms.find((r) => r.key === room);

  return (
    <>
      {/* Pilihan ruangan: menandai jenis lantai yang cocok */}
      {rooms.length > 0 && (
        <div className="reveal mb-6 rounded-2xl border border-line bg-background p-4 sm:p-5">
          <p id={roomLabelId} className="font-bold">
            Untuk ruangan apa?
          </p>
          <div
            role="group"
            aria-labelledby={roomLabelId}
            className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {[{ key: null, label: 'Semua' }, ...rooms].map((r) => (
              <button
                key={r.label}
                type="button"
                aria-pressed={room === r.key}
                onClick={() => setRoom(r.key)}
                className="min-h-11 shrink-0 rounded-full border border-line px-4 font-semibold text-muted transition-all hover:border-accent hover:text-accent-strong aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white"
              >
                {r.label}
              </button>
            ))}
          </div>
          <p role="status" className="mt-3 min-h-6 text-muted">
            {selectedRoom
              ? `${selectedRoom.summary} Lantai yang cocok ditandai di bawah.`
              : 'Pilih ruangan untuk melihat jenis lantai yang cocok.'}
          </p>
        </div>
      )}

      <ul
        className={`grid gap-5 sm:grid-cols-2 ${columns === 4 ? 'lg:grid-cols-4' : 'lg:gap-8'}`}
        data-stagger
      >
        {items.map((item) => (
          <li key={item.id} className="reveal">
            <ProductCard
              item={item}
              onOpen={modal.open}
              match={room === null ? null : item.areas.includes(room)}
            />
          </li>
        ))}
      </ul>

      <dialog
        {...modal.dialogProps}
        onKeyDown={trapTab}
        aria-labelledby={headingId}
        className="showcase-dialog m-auto h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 sm:h-[min(90dvh,48rem)] sm:max-h-none sm:w-[min(94vw,68rem)] sm:rounded-3xl"
      >
        {active && (
          <Poster key={active.id} item={active} headingId={headingId} onClose={modal.close} />
        )}
      </dialog>
    </>
  );
}

function ProductCard({
  item,
  onOpen,
  match,
}: {
  item: ShowcaseItem;
  onOpen: (i: ShowcaseItem, t: HTMLButtonElement) => void;
  /** null = tidak ada ruangan dipilih */
  match: boolean | null;
}) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(item, e.currentTarget)}
      aria-haspopup="dialog"
      className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-background text-left transition-all duration-300 hover:shadow-xl hover:shadow-black/10 ${match ? 'border-accent shadow-lg ring-2 shadow-accent/15 ring-accent' : 'border-line'} ${match === false ? 'opacity-45 grayscale' : ''}`}
    >
      <span className="relative block aspect-[4/3] w-full overflow-hidden bg-surface">
        <Image
          src={item.image.thumb}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {match && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-bold text-white shadow">
            <CheckIcon />
            Cocok
          </span>
        )}
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">
          {item.eyebrow}
        </span>
        <span className="mt-1 text-xl font-bold">{item.title}</span>
        <span className="mt-2 flex-1 text-muted">{item.summary}</span>
        <span className="mt-4 inline-flex items-center gap-2 font-semibold text-accent-strong">
          Lihat detail
          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </button>
  );
}

/** Isi modal bergaya poster */
function Poster({
  item,
  headingId,
  onClose,
}: {
  item: ShowcaseItem;
  headingId: string;
  onClose: () => void;
}) {
  // Foto latar bisa diganti dengan mengetuk gambar di baris "terkait"
  const [bg, setBg] = useState<{ label: string | null; image: ImageAsset }>({
    label: null,
    image: item.image,
  });
  // Mode lihat foto: teks disembunyikan agar fokus ke gambar
  const viewing = bg.label !== null;
  const reset = () => setBg({ label: null, image: item.image });

  return (
    <div className="relative isolate h-full text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#081416]">
        {/* Saat melihat foto di HP: foto di area atas, panel pilihan di bawah (tidak menutupi) */}
        <div
          className={`absolute ${viewing ? 'inset-x-0 top-16 bottom-[25rem] sm:inset-0' : 'inset-0'}`}
        >
          <Image
            key={bg.image.src}
            src={bg.image.src}
            alt={bg.image.alt}
            fill
            sizes="(min-width: 640px) 68rem, 100vw"
            className={`showcase-bg ${viewing ? 'object-contain' : 'object-cover'}`}
          />
        </div>
        {viewing ? (
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#081416]/90 to-transparent" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-[#081416]/95 via-[#081416]/75 to-[#081416]/40 sm:bg-gradient-to-r sm:from-[#081416]/95 sm:via-[#081416]/70 sm:to-transparent" />
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="absolute top-4 right-4 z-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-foreground shadow-lg hover:bg-mint"
      >
        <CloseIcon />
        Tutup
      </button>

      <div className="no-scrollbar flex h-full max-h-dvh flex-col overflow-y-auto sm:max-h-[90dvh]">
        <div
          className={`flex-1 px-6 pt-20 pb-4 sm:px-10 sm:pt-6 ${viewing ? 'flex flex-col justify-end' : 'lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-10'}`}
        >
          <div className={viewing ? 'hidden' : ''}>
            <p className="showcase-in text-lg font-semibold text-[#9be3d8] italic" style={delay(0)}>
              {item.eyebrow}
            </p>
            <h2
              id={headingId}
              className="showcase-in mt-1 max-w-xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance uppercase sm:text-5xl lg:text-[clamp(2.5rem,7vh,3.5rem)]"
              style={delay(1)}
            >
              {item.title}
            </h2>
            <div className="showcase-in mt-4 h-0.5 w-16 bg-[#9be3d8]" style={delay(2)} />
            <p className="showcase-in mt-4 max-w-lg text-lg text-white/90" style={delay(2)}>
              {item.description}
            </p>

            {item.brands && item.brands.length > 0 && (
              <div className="showcase-in mt-4 flex flex-wrap items-center gap-2" style={delay(2)}>
                <span className="text-sm font-semibold text-white/80">Merek tersedia:</span>
                {item.brands.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-sm font-bold"
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Kolom kanan (desktop): panel kaca berisi ikon & gambar terkait */}
          <div
            className={`lg:mt-0 lg:rounded-2xl lg:border lg:border-white/15 lg:bg-black/35 lg:p-5 lg:backdrop-blur-md ${viewing ? 'w-full max-w-xl min-w-0 self-start rounded-2xl bg-black/50 p-4 backdrop-blur-md' : 'mt-6'}`}
          >
            {item.highlights && !viewing && (
              <ul className="grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4 lg:gap-2">
                {item.highlights.map((h, i) => (
                  <li
                    key={h.label}
                    className="showcase-in flex flex-col items-center gap-2 text-center"
                    style={delay(3 + i)}
                  >
                    <span className="grid size-14 place-items-center rounded-full border-2 lg:size-12 border-white/60 bg-white/5">
                      <FeatureIcon name={h.icon} className="size-6" />
                    </span>
                    <span className="text-sm leading-tight font-bold uppercase lg:text-[0.7rem]">
                      {h.label}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {item.related.length > 0 && (
              <div className="showcase-in mt-6 first:mt-0" style={delay(7)}>
                <p className="text-sm font-bold tracking-wider text-[#9be3d8] uppercase">
                  {item.relatedTitle}
                  <span className="ml-2 font-medium tracking-normal text-white/70 normal-case">
                    (ketuk untuk melihat)
                  </span>
                </p>
                <ul className="mt-3 flex gap-3 overflow-x-auto pb-1">
                  {item.related.map((r) => {
                    const selected = bg.label === r.label;
                    return (
                      <li key={r.label} className="w-28 shrink-0 sm:w-32">
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => (selected ? reset() : setBg(r))}
                          className="group block w-full text-center"
                        >
                          <span
                            className={`relative block aspect-[4/3] overflow-hidden rounded-lg border-2 transition-all ${selected ? 'scale-105 border-[#9be3d8] shadow-lg shadow-[#9be3d8]/30' : 'border-white/30 group-hover:border-white'}`}
                          >
                            <Image
                              src={r.image.thumb}
                              alt=""
                              fill
                              sizes="8rem"
                              className="object-cover"
                            />
                          </span>
                          <span
                            className={`mt-1.5 block text-xs font-bold uppercase ${selected ? 'text-[#9be3d8]' : ''}`}
                          >
                            {r.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {viewing && (
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 font-semibold text-foreground hover:bg-mint"
                  >
                    ← Kembali ke penjelasan
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bar bawah: ajakan WhatsApp + janji layanan */}
        <div
          className="showcase-fade sticky bottom-0 flex flex-col gap-4 border-t border-white/15 bg-[#081416]/85 p-4 backdrop-blur sm:flex-row sm:items-center sm:gap-6 sm:px-10 sm:py-2.5"
          style={delay(8)}
        >
          <a
            href={buildWhatsAppLink(item.waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl bg-wa px-4 py-3 hover:bg-wa-strong"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-white/15">
              <WhatsAppIcon className="size-6" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold tracking-wider uppercase">
                Minta survei
              </span>
              <span className="block text-xl font-extrabold">LEWAT WHATSAPP</span>
            </span>
            <span className="sr-only">(tab baru)</span>
          </a>
          <ul className="hidden flex-1 items-center justify-around gap-4 sm:flex">
            {trustItems.map((t) => (
              <li
                key={t.label}
                className="flex items-center gap-2.5 text-xs font-semibold uppercase"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/50">
                  <FeatureIcon name={t.icon} className="size-5" />
                </span>
                <span className="max-w-24 leading-tight">{t.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
