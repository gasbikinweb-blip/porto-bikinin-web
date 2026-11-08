'use client';

// Dropdown kustom ikut tema (pengganti <select> bawaan). Pola ARIA: tombol + listbox.
// Keyboard: Enter/Spasi/↓ membuka, ↑↓ Home End memilih, Enter memilih, Esc/Tab menutup.
import { useEffect, useId, useRef, useState } from 'react';

export type Option = { value: string; label: string; hint?: string };

export function Select({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const current = options.find((o) => o.value === value) ?? options[0];

  // Tutup saat klik di luar
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // Opsi yang disorot selalu terlihat
  useEffect(() => {
    if (open) list.current?.children[focus]?.scrollIntoView({ block: 'nearest' });
  }, [open, focus]);

  const show = () => {
    setFocus(
      Math.max(
        0,
        options.findIndex((o) => o.value === value),
      ),
    );
    setOpen(true);
  };
  const pick = (i: number) => {
    const o = options[i];
    if (o) onChange(o.value);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    const last = options.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(last, focus + 1),
      ArrowUp: Math.max(0, focus - 1),
      Home: 0,
      End: last,
    };
    if (e.key in moves) {
      e.preventDefault();
      setFocus(moves[e.key]!);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(focus);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Tab') setOpen(false);
  };

  return (
    <div ref={wrap} className="relative mt-1">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${focus}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-line bg-field px-4 text-left text-base transition-colors hover:border-rose/60 aria-expanded:border-rose"
      >
        <span className="truncate">{current?.label}</span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`size-4 shrink-0 text-rose transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 8 5 5 5-5" />
        </svg>
      </button>
      <ul
        ref={list}
        id={listId}
        role="listbox"
        aria-labelledby={id}
        hidden={!open}
        className="absolute inset-x-0 top-full z-20 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-line bg-field p-1.5 shadow-xl"
      >
        {options.map((o, i) => {
          const selected = o.value === value;
          return (
            <li
              key={o.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setFocus(i)}
              onClick={() => pick(i)}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 text-sm ${
                i === focus ? 'bg-blush-soft' : ''
              } ${selected ? 'font-medium text-rose-strong' : ''}`}
            >
              <span>{o.label}</span>
              <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
                {o.hint}
                {selected && (
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="size-4 text-rose"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m4 10 4 4 8-8" />
                  </svg>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
