'use client';

// Dropdown bergaya tema (pengganti <select> bawaan browser) dengan dukungan keyboard.
import { useEffect, useId, useRef, useState } from 'react';

type Props = {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  labelId: string;
};

export function ThemedSelect({ value, options, onChange, labelId }: Props) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(Math.max(0, options.indexOf(value)));
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const pick = (i: number) => {
    const v = options[i];
    if (v !== undefined) onChange(v);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return setOpen(true);
      const d = e.key === 'ArrowDown' ? 1 : -1;
      setHi((h) => (h + d + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) pick(hi);
      else setOpen(true);
    } else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${hi}` : undefined}
        onClick={() => {
          setHi(Math.max(0, options.indexOf(value)));
          setOpen((o) => !o);
        }}
        onKeyDown={onKey}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-background px-4 py-3 text-left text-sm transition-colors ${
          open ? 'border-accent' : 'border-line hover:border-accent/60'
        }`}
      >
        <span className="truncate">{value}</span>
        <svg viewBox="0 0 20 20" className={`size-4 shrink-0 text-accent transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-auto rounded-xl border border-line bg-surface p-1.5 shadow-2xl shadow-black/30"
        >
          {options.map((o, i) => {
            const sel = o === value;
            return (
              <li
                key={o}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={sel}
                onMouseEnter={() => setHi(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(i);
                }}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  i === hi ? 'bg-accent/15 text-accent-strong' : 'text-foreground/85'
                }`}
              >
                {o}
                {sel && <span className="text-accent" aria-hidden="true">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
