'use client';

// Dropdown bergaya tema (pengganti <select> bawaan browser).
// Tombol + daftar role="listbox"; tutup dengan Esc, klik di luar, atau setelah memilih.
import { useEffect, useId, useRef, useState } from 'react';

type Option = { value: string; label: string };

export function Select({
  label,
  value,
  options,
  onChange,
  hideLabel = false,
  full = false,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  /** Label hanya untuk pembaca layar (label terlihat ditaruh di luar) */
  hideLabel?: boolean;
  /** Lebar penuh, untuk formulir */
  full?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    // Fokus ke opsi terpilih saat dibuka
    box.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')?.focus();
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const move = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('button'));
    const i = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length];
    next?.focus();
  };

  return (
    <div ref={box} className={`relative flex items-center gap-3 text-sm ${full ? 'w-full' : ''}`}>
      <span id={`${id}-label`} className={hideLabel ? 'sr-only' : 'text-muted'}>
        {label}
      </span>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex min-h-11 min-w-48 items-center justify-between gap-3 rounded-full border border-line bg-paper px-5 text-ink transition hover:border-ink ${full ? 'w-full' : ''}`}
      >
        <span id={`${id}-value`}>{current?.label}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={`size-4 text-gold-text transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          onKeyDown={move}
          className={`animate-card absolute top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl ${full ? 'inset-x-0' : 'right-0 w-60'} border border-line bg-paper p-1.5 shadow-[0_20px_50px_-20px_rgb(30_26_22/0.35)]`}
        >
          {options.map((o) => {
            const selected = o.value === value;
            return (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                    button.current?.focus();
                  }}
                  className={`flex min-h-11 w-full items-center justify-between rounded-xl px-4 text-left transition ${
                    selected ? 'bg-ink text-paper' : 'text-ink hover:bg-ivory'
                  }`}
                >
                  {o.label}
                  {selected && <span aria-hidden="true">✓</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
