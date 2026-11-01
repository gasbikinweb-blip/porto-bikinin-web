'use client';

// Kolom cari kecamatan (combobox ARIA): ketik, pilih dengan klik atau panah + Enter.
import { useId, useMemo, useState } from 'react';
import { kecamatanLabel, kecamatanList, type Kecamatan } from '@/data/kecamatan';

// Huruf kecil tanpa tanda baca, supaya "kab. sleman" & "sleman" sama-sama cocok
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

type Props = {
  value: Kecamatan | null;
  onChange: (k: Kecamatan | null) => void;
};

export function KecamatanSearch({ value, onChange }: Props) {
  const id = useId();
  const listId = `${id}-list`;
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = norm(query);
    if (!q) return kecamatanList;
    // Semua kata harus ada di "nama kecamatan + kabupaten"
    const words = q.split(' ');
    return kecamatanList.filter((k) => {
      const hay = norm(`${k.name} ${k.region}`);
      return words.every((w) => hay.includes(w));
    });
  }, [query]);

  const choose = (k: Kecamatan) => {
    onChange(k);
    setQuery('');
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && open && results[active]) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  if (value) {
    return (
      <div className="mt-1 flex min-h-12 items-center justify-between gap-2 rounded-xl border-2 border-accent bg-white py-1 pr-1 pl-4">
        <span className="font-semibold">{kecamatanLabel(value)}</span>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="min-h-11 rounded-lg px-3 text-sm font-bold text-accent hover:bg-surface-2"
        >
          Ganti
        </button>
      </div>
    );
  }

  return (
    <div className="mt-1">
      {/* Pembungkus relative hanya untuk input + daftar, supaya daftar muncul tepat di bawah input */}
      <div className="relative">
        <input
          id="kecamatan"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            open && results[active] ? `${id}-${results[active].id}` : undefined
          }
          autoComplete="off"
          maxLength={40}
          value={query}
          placeholder="Ketik kecamatan, mis. Depok atau Bantul"
          onChange={(e) => {
            setQuery(e.target.value.slice(0, 40));
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          // Jeda kecil supaya klik pada pilihan sempat terbaca sebelum daftar ditutup
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={onKeyDown}
          className="h-12 w-full rounded-xl border border-line bg-white px-4"
        />
        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label="Daftar kecamatan di DIY"
            className="absolute inset-x-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-xl border border-line bg-white p-1 shadow-xl"
          >
            {results.length === 0 ? (
              <li className="px-3 py-3 text-sm text-muted">
                Kecamatan tidak ditemukan. Di luar Jogja? Tanyakan ke admin lewat catatan ya, Kak.
              </li>
            ) : (
              results.map((k, i) => (
                <li
                  key={k.id}
                  id={`${id}-${k.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(k)}
                  onMouseEnter={() => setActive(i)}
                  className="flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-lg px-3 aria-selected:bg-surface-2"
                >
                  <span className="font-semibold">{k.name}</span>
                  <span className="text-xs text-muted">{k.region}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      <p className="mt-1 text-xs text-muted">
        {kecamatanList.length} kecamatan di Kota Yogyakarta, Sleman, Bantul, Kulon Progo, dan
        Gunungkidul.
      </p>
    </div>
  );
}
