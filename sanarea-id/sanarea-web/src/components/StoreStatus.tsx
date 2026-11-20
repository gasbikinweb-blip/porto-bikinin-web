'use client';

// Status "Buka sekarang / Tutup" dihitung di browser dengan zona waktu Asia/Jakarta
import { useSyncExternalStore } from 'react';
import { site } from '@/data/site';

function compute(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const now = `${get('hour')}:${get('minute')}`;
  const h = site.hours[day];
  if (!h) return 'closed';
  return now >= h.open && now < h.close ? 'open' : 'closed';
}

// Perbarui tiap menit
const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 60_000);
  return () => clearInterval(t);
};

export function StoreStatus() {
  // Saat prerender status belum diketahui → tidak menampilkan apa-apa
  const status = useSyncExternalStore(subscribe, compute, () => null);
  if (!status) return <span className="inline-block h-7" aria-hidden="true" />;
  const open = status === 'open';
  return (
    <span
      className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase"
      role="status"
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${open ? 'bg-emerald-600' : 'bg-muted'}`}
      />
      {open ? 'Buka sekarang' : 'Tutup · buka 11.00 WIB'}
    </span>
  );
}
