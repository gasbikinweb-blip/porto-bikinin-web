'use client';

// Tombol bantu lokasi: cari teks lokasi di Google Maps (tab baru) dan bagikan titik lokasi
// dari GPS perangkat. Koordinat hanya masuk ke pesan WA, tidak dikirim ke mana pun.
import { useState } from 'react';

const mapsSearch = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q || 'Yogyakarta')}`;

export function LocationTools({
  query,
  pin,
  onPin,
}: {
  query: string;
  pin: string | null;
  onPin: (link: string | null) => void;
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const share = () => {
    if (!('geolocation' in navigator)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        onPin(
          `https://maps.google.com/?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`,
        );
        setStatus('idle');
      },
      () => setStatus('error'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const btn =
    'inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-field px-4 text-sm hover:border-rose hover:text-rose-strong';
  const pinIcon = (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 text-rose"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-2">
        <a href={mapsSearch(query)} target="_blank" rel="noopener noreferrer" className={btn}>
          {pinIcon} Cari di Google Maps
          <span className="sr-only"> (tab baru)</span>
        </a>
        <button type="button" onClick={share} disabled={status === 'loading'} className={btn}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="size-4 text-rose"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
          {status === 'loading' ? 'Mencari lokasi…' : 'Bagikan lokasi saya'}
        </button>
      </div>
      <div aria-live="polite" className="text-sm">
        {pin && (
          <p className="mt-2 flex flex-wrap items-center gap-2 rounded-xl bg-sage-soft px-3 py-2">
            <span>📍 Titik lokasi ikut dikirim ke WA.</span>
            <a href={pin} target="_blank" rel="noopener noreferrer" className="underline">
              Cek di peta<span className="sr-only"> (tab baru)</span>
            </a>
            <button type="button" onClick={() => onPin(null)} className="text-muted underline">
              Hapus
            </button>
          </p>
        )}
        {status === 'error' && (
          <p className="mt-2 text-rose-strong">
            Lokasi tidak bisa diambil. Izinkan akses lokasi di browser, atau tulis alamat saja ya,
            Kak.
          </p>
        )}
      </div>
    </div>
  );
}
