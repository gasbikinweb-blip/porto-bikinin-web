'use client';

// Dropdown bertema (pengganti <select> bawaan browser): ivory, aksen maroon & emas,
// bisa pakai gambar kecil, bisa dioperasikan keyboard (panah, Enter, Esc, ketik huruf).
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';

export type SelectOption = { value: string; label: string; thumb?: string; hint?: string };

export function ThemedSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly SelectOption[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();
  const all: SelectOption[] = [{ value: '', label: placeholder }, ...options];
  const current = options.find((o) => o.value === value);

  // Tutup saat klik di luar
  useEffect(() => {
    if (!open) return;
    const h = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', h);
    return () => document.removeEventListener('pointerdown', h);
  }, [open]);

  // Jaga opsi aktif tetap terlihat saat navigasi keyboard
  useEffect(() => {
    if (open)
      list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  const show = () => {
    setActive(
      Math.max(
        0,
        all.findIndex((o) => o.value === value),
      ),
    );
    setOpen(true);
  };
  const pick = (v: string) => {
    onChange(v);
    setOpen(false);
    btn.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        show();
      }
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'Tab') setOpen(false);
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(all.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      pick(all[active]!.value);
    } else if (e.key.length === 1) {
      const k = e.key.toLowerCase();
      const i = all.findIndex((o, j) => j > 0 && o.label.toLowerCase().startsWith(k));
      if (i > 0) setActive(i);
    }
  };

  return (
    <div ref={box} className="relative mt-1.5">
      <button
        ref={btn}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKey}
        className="flex min-h-12 w-full items-center gap-3 rounded-xl border border-line bg-surface px-4 text-left text-base transition outline-none hover:border-gold focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25 aria-expanded:border-accent aria-expanded:ring-2 aria-expanded:ring-accent/25"
      >
        {current?.thumb && (
          <span className="relative size-8 shrink-0 overflow-hidden rounded-lg bg-surface-2">
            <Image src={current.thumb} alt="" fill sizes="32px" className="object-cover" />
          </span>
        )}
        <span className={`flex-1 truncate ${current ? '' : 'text-muted'}`}>
          {current?.label ?? placeholder}
        </span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`size-5 shrink-0 text-gold transition duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          ref={list}
          id={listId}
          role="listbox"
          aria-labelledby={id}
          className="animate-in absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-y-auto overscroll-contain rounded-2xl border border-gold/30 bg-surface p-1.5 shadow-[0_20px_50px_-15px_rgb(94_22_32/0.35)]"
        >
          {all.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value || 'kosong'}
                id={`${listId}-${i}`}
                data-i={i}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(i)}
                onClick={() => pick(o.value)}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-1.5 text-[15px] transition-colors ${
                  i === active ? 'bg-surface-2' : ''
                } ${o.value ? '' : 'text-muted italic'} ${selected ? 'font-semibold text-accent' : ''}`}
              >
                {o.thumb && (
                  <span className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-surface-2">
                    <Image src={o.thumb} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{o.label}</span>
                  {o.hint && <span className="block text-xs text-muted not-italic">{o.hint}</span>}
                </span>
                {selected && o.value && (
                  <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-gold" aria-hidden="true">
                    <path
                      d="m5 12 5 5 9-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
