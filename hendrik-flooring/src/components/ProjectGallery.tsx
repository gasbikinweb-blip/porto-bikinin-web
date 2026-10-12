'use client';

// Galeri portofolio: grid "bento" + filter tipe fasilitas + lightbox memakai <dialog> bawaan.
// Lightbox: Esc / klik area kosong menutup, panah keyboard & geser (swipe) untuk pindah foto,
// strip thumbnail di bawah, fokus kembali ke foto pemicu.
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { categoryLabels, type Project } from '@/data/projects';
import { facilityLabels, roomLabels, type FacilityType } from '@/data/types';
import { trapTab } from '@/lib/dialog';
import { useModal } from '@/lib/useModal';
import { ChevronIcon, CloseIcon, PlusIcon } from './icons';

type FilterKey = 'semua' | FacilityType | 'toilet' | 'handrail' | 'karpet';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'semua', label: 'Semua' },
  { key: 'rumah-sakit', label: facilityLabels['rumah-sakit'] },
  { key: 'klinik', label: facilityLabels.klinik },
  { key: 'klinik-gigi', label: facilityLabels['klinik-gigi'] },
  { key: 'laboratorium', label: facilityLabels.laboratorium },
  { key: 'toilet', label: 'Toilet' },
  { key: 'handrail', label: 'Handrail' },
  { key: 'karpet', label: 'Karpet' },
];

/** Judul foto: nama ruangan, diawali jenis pekerjaan bila bukan lantai vinyl */
const titleOf = (p: Project) =>
  p.category && p.category !== 'lantai'
    ? `${categoryLabels[p.category]} · ${roomLabels[p.roomType]}`
    : roomLabels[p.roomType];

function matches(p: Project, f: FilterKey) {
  if (f === 'semua') return true;
  if (f === 'toilet') return p.roomType === 'toilet';
  if (f === 'handrail' || f === 'karpet') return p.category === f;
  return p.facilityType === f;
}

// Pola ukuran kotak bento, diulang tiap 8 foto: 1 besar + 1 tinggi + 6 kecil = 12 kotak
// (pas 3 baris x 4 kolom di desktop, tanpa celah)
const BENTO = ['col-span-2 row-span-2', '', '', 'row-span-2', '', '', '', ''];

export function ProjectGallery({
  projects,
  initialCount,
}: {
  projects: Project[];
  /** Jumlah foto yang tampil sebelum tombol "Tampilkan semua" ditekan */
  initialCount?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState<FilterKey>('semua');
  const modal = useModal<number>();
  const index = modal.value;
  const setIndex = modal.setValue;
  const touchX = useRef<number | null>(null);

  const visible = useMemo(() => projects.filter((p) => matches(p, filter)), [projects, filter]);
  const shown = expanded || !initialCount ? visible : visible.slice(0, initialCount);
  const current = index === null ? null : visible[index];

  const countFor = (f: FilterKey) => projects.filter((p) => matches(p, f)).length;

  const open = (i: number, trigger: HTMLButtonElement) => modal.open(i, trigger);

  const step = useCallback(
    (delta: number) =>
      setIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length, setIndex],
  );

  // Thumbnail aktif selalu terlihat di strip bawah
  useEffect(() => {
    if (index === null) return;
    document
      .getElementById(`thumb-${index}`)
      ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [index]);

  const close = modal.close;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else {
      trapTab(e);
    }
  };

  // Klik pada area kosong (bukan foto/tombol) menutup lightbox
  const closeOnEmpty = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  return (
    // reveal-group: foto bento baru beranimasi saat galeri masuk layar
    <div className="reveal-group">
      <div
        role="group"
        aria-label="Filter tipe fasilitas"
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-background px-4 font-semibold text-muted transition-all hover:border-accent hover:text-accent-strong aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-white aria-pressed:shadow-lg aria-pressed:shadow-accent/25"
          >
            {f.label}
            <span className="rounded-full bg-black/10 px-2 text-xs">{countFor(f.key)}</span>
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        Menampilkan {shown.length} dari {visible.length} foto
      </p>

      <ul
        key={filter}
        className="mt-6 grid grid-flow-dense auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[13rem]"
      >
        {shown.map((p, i) => (
          <li
            key={p.id}
            className={`gallery-in ${BENTO[i % BENTO.length]}`}
            style={{ '--i': i } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              aria-label={`Perbesar foto: ${p.alt}`}
              className="group relative block size-full overflow-hidden rounded-2xl bg-surface-2 text-left"
            >
              <Image
                src={p.thumb}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
              {/* Ikon perbesar muncul saat hover */}
              <span className="absolute top-3 right-3 grid size-10 scale-75 place-items-center rounded-full bg-white/90 text-foreground opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                <PlusIcon className="size-5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
                <span className="mb-1.5 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase backdrop-blur">
                  {facilityLabels[p.facilityType]}
                </span>
                <span className="block font-bold sm:text-lg">{titleOf(p)}</span>
                <span className="block max-h-0 overflow-hidden text-sm text-white/85 transition-all duration-500 group-hover:max-h-12">
                  {p.floorType}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown.length < visible.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-7 font-semibold text-white shadow-lg transition-colors hover:bg-accent-strong"
          >
            <PlusIcon />
            Tampilkan semua foto ({visible.length})
          </button>
        </div>
      )}

      <dialog
        {...modal.dialogProps}
        onKeyDown={onKeyDown}
        aria-label="Foto proyek"
        className="lightbox-dialog m-0 h-dvh max-h-none w-full max-w-none bg-transparent p-0 text-white"
      >
        {current && (
          <div className="relative isolate flex h-full flex-col">
            {/* Latar: foto yang sama, diburamkan */}
            <div className="absolute inset-0 -z-10 overflow-hidden bg-[#081416]" aria-hidden="true">
              <Image
                key={current.id}
                src={current.thumb}
                alt=""
                fill
                sizes="30vw"
                className="scale-110 object-cover opacity-40 blur-2xl"
              />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 sm:px-6">
              <p
                className="rounded-full bg-black/40 px-4 py-2 text-sm font-semibold"
                aria-live="polite"
              >
                {(index ?? 0) + 1} / {visible.length}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 font-semibold text-foreground shadow-lg hover:bg-mint"
              >
                <CloseIcon />
                Tutup
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
              onClick={closeOnEmpty}
              onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
              onTouchEnd={(e) => {
                const start = touchX.current;
                const end = e.changedTouches[0]?.clientX;
                if (start != null && end != null && Math.abs(end - start) > 50) {
                  step(end < start ? 1 : -1);
                }
                touchX.current = null;
              }}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="lightbox-img max-h-full w-auto rounded-xl object-contain shadow-2xl"
              />
              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute left-2 hidden size-14 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30 sm:left-5 sm:grid"
                  >
                    <ChevronIcon dir="left" className="size-7" />
                    <span className="sr-only">Foto sebelumnya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute right-2 hidden size-14 place-items-center rounded-full bg-white/15 backdrop-blur hover:bg-white/30 sm:right-5 sm:grid"
                  >
                    <ChevronIcon dir="right" className="size-7" />
                    <span className="sr-only">Foto berikutnya</span>
                  </button>
                </>
              )}
            </div>

            <div className="px-4 pt-4 pb-5 text-center" onClick={closeOnEmpty}>
              <p className="text-lg font-bold">
                {titleOf(current)}
                <span className="font-normal text-white/70">
                  {' '}
                  · {facilityLabels[current.facilityType]}
                </span>
              </p>
              <p className="mt-0.5 text-white/80">
                {current.floorType}
                {current.area ? ` · ± ${current.area} m²` : ''}
              </p>
              <ul className="no-scrollbar mx-auto mt-4 flex max-w-3xl gap-2 overflow-x-auto px-1 py-1">
                {visible.map((p, i) => (
                  <li key={p.id} className="shrink-0">
                    <button
                      id={`thumb-${i}`}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-current={i === index ? 'true' : undefined}
                      className={`relative block h-14 w-20 overflow-hidden rounded-lg transition-all ${i === index ? 'ring-3 ring-[#9be3d8]' : 'opacity-50 hover:opacity-100'}`}
                    >
                      <Image src={p.thumb} alt="" fill sizes="5rem" className="object-cover" />
                      <span className="sr-only">
                        Foto {i + 1}: {titleOf(p)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-white/60 sm:hidden">Geser foto untuk pindah</p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
