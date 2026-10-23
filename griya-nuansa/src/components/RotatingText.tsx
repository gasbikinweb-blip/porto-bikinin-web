'use client';

import { useEffect, useState } from 'react';

/**
 * Teks yang berganti otomatis setiap beberapa detik (efek fade).
 * Bersifat dekoratif (aria-hidden): sediakan teks statis untuk pembaca layar di luar komponen ini.
 * Tidak berganti bila pengunjung memilih "kurangi animasi".
 */
export function RotatingText({
  items,
  interval = 3500,
  className = '',
}: {
  items: string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => window.clearInterval(id);
  }, [items.length, interval]);

  return (
    <span aria-hidden="true" className={`grid ${className}`}>
      {/* Semua teks ditumpuk di sel yang sama agar tinggi tetap (tanpa layout shift) */}
      {items.map((t, n) => (
        <span
          key={t}
          className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${
            n === i ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
        >
          {t}
        </span>
      ))}
    </span>
  );
}
