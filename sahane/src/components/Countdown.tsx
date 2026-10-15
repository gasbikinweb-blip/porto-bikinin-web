'use client';

// Hitung mundur dummy untuk flash sale. Sebelum JavaScript jalan tampil "--" (tanpa hydration mismatch).
import { useEffect, useState } from 'react';

const UNITS = [
  { label: 'Hari', ms: 86_400_000 },
  { label: 'Jam', ms: 3_600_000 },
  { label: 'Menit', ms: 60_000 },
  { label: 'Detik', ms: 1_000 },
] as const;

function split(ms: number): number[] {
  let rest = Math.max(0, ms);
  return UNITS.map((u) => {
    const value = Math.floor(rest / u.ms);
    rest -= value * u.ms;
    return value;
  });
}

export function Countdown({ hours }: { hours: number }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = Date.now() + hours * 3_600_000;
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [hours]);

  const values = left === null ? null : split(left);

  return (
    // Tidak diumumkan tiap detik ke pembaca layar; cukup label statis
    <div role="timer" aria-label="Sisa waktu promo" className="flex items-start gap-2 sm:gap-3">
      {UNITS.map((u, i) => (
        <div key={u.label} className="flex items-start gap-2 sm:gap-3">
          <div className="text-center">
            <span className="block font-mono text-3xl font-medium tabular-nums sm:text-5xl">
              {values ? String(values[i]).padStart(2, '0') : '--'}
            </span>
            <span className="mt-1 block text-xs text-muted">{u.label}</span>
          </div>
          {i < UNITS.length - 1 && (
            <span aria-hidden="true" className="font-mono text-2xl text-muted sm:text-4xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
