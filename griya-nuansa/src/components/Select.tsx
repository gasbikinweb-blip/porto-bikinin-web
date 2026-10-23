'use client';

import { useEffect, useId, useRef, useState } from 'react';

/**
 * Dropdown kustom (pola ARIA "select-only combobox") sebagai pengganti <select> bawaan
 * yang tampilannya tidak bisa diatur. Keyboard: ↑ ↓ Home End untuk memilih, Enter/Spasi
 * untuk membuka/menutup, Esc untuk menutup. Klik di luar menutup daftar.
 */
export function Select({
  id,
  labelId,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  /** id elemen label, karena <label htmlFor> tidak berlaku untuk div */
  labelId: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  // Opsi pertama ('') = placeholder, agar pilihan bisa dikosongkan lagi
  const all = ['', ...options];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  function openList() {
    setActive(Math.max(0, all.indexOf(value)));
    setOpen(true);
  }

  function choose(i: number) {
    onChange(all[i] ?? '');
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const last = all.length - 1;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key] ?? 0);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(active);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative mt-1">
      <div
        id={id}
        role="combobox"
        tabIndex={0}
        aria-labelledby={labelId}
        aria-controls={listId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex w-full cursor-pointer items-center justify-between border-b py-2.5 text-base transition-colors focus:outline-none ${
          open ? 'border-fg' : 'border-line hover:border-fg/50 focus-visible:border-fg'
        }`}
      >
        <span className={value ? 'text-fg' : 'text-muted'}>{value || placeholder}</span>
        <svg
          viewBox="0 0 16 16"
          className={`h-3.5 w-3.5 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3.5 6l4.5 4.5L12.5 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <ul
        id={listId}
        role="listbox"
        aria-labelledby={labelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-md bg-bg py-1.5 shadow-xl ring-1 ring-line"
      >
        {all.map((o, i) => {
          const selected = o === value;
          return (
            <li
              key={o || 'kosong'}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm ${
                i === active ? 'bg-surface' : ''
              } ${o ? 'text-fg' : 'text-muted'}`}
            >
              {o || placeholder}
              {selected && (
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 text-amber"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
