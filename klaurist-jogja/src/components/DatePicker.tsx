'use client';

// Pemilih tanggal kustom ikut tema (pengganti <input type="date"> bawaan). Nilai: 'YYYY-MM-DD'.
import { useEffect, useRef, useState } from 'react';

const MONTHS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];
const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

export function DatePicker({
  id,
  value,
  min,
  onChange,
}: {
  id: string;
  value: string;
  min: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const base = value || min;
  const [view, setView] = useState(() => ({
    y: Number(base.slice(0, 4)),
    m: Number(base.slice(5, 7)) - 1,
  }));
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      const b = value || min;
      setView({ y: Number(b.slice(0, 4)), m: Number(b.slice(5, 7)) - 1 });
    }
    setOpen((v) => !v);
  };

  const shift = (step: number) =>
    setView(({ y, m }) => {
      const t = m + step;
      return { y: y + Math.floor(t / 12), m: ((t % 12) + 12) % 12 };
    });

  const first = new Date(view.y, view.m, 1).getDay();
  const total = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(first).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
  const canPrev = iso(view.y, view.m, 1) > min.slice(0, 8) + '01';

  const label = value
    ? `${Number(value.slice(8, 10))} ${MONTHS[Number(value.slice(5, 7)) - 1]} ${value.slice(0, 4)}`
    : 'Pilih tanggal';

  const nav =
    'grid size-10 place-items-center rounded-full hover:bg-blush-soft disabled:opacity-30 disabled:hover:bg-transparent';

  return (
    <div ref={wrap} className="relative mt-1">
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-line bg-field px-4 text-left text-base transition-colors hover:border-rose/60 aria-expanded:border-rose"
      >
        <span className={value ? '' : 'text-muted'}>{label}</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-5 shrink-0 text-rose"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3.5" y="5" width="17" height="15" rx="3" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
        </svg>
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Pilih tanggal"
          className="absolute inset-x-0 top-full z-20 mt-2 rounded-2xl border border-line bg-field p-3 shadow-xl sm:right-auto sm:w-80"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => shift(-1)}
              disabled={!canPrev}
              aria-label="Bulan sebelumnya"
              className={nav}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <p className="font-serif text-lg font-medium" aria-live="polite">
              {MONTHS[view.m]} {view.y}
            </p>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Bulan berikutnya"
              className={nav}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>
          <div className="mt-2 grid grid-cols-7 text-center text-xs text-muted">
            {DAYS.map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <span key={`k${i}`} />;
              const v = iso(view.y, view.m, d);
              const off = v < min;
              const sel = v === value;
              return (
                <button
                  key={v}
                  type="button"
                  disabled={off}
                  aria-pressed={sel}
                  aria-label={`${d} ${MONTHS[view.m]} ${view.y}`}
                  onClick={() => {
                    onChange(v);
                    setOpen(false);
                  }}
                  className={`grid aspect-square place-items-center rounded-full text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                    sel ? 'bg-rose font-semibold text-on-rose' : 'hover:bg-blush-soft'
                  } ${v === min && !sel ? 'ring-1 ring-rose/60' : ''}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
