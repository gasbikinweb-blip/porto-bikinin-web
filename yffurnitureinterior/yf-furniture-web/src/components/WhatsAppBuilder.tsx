'use client';

// Pembuat pesan WhatsApp. BUKAN form: tidak ada <form>, tidak ada submit ke server,
// tidak ada penyimpanan. Input hanya dirangkai menjadi teks di link wa.me.
import { useId, useState } from 'react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const FURNITURE = [
  'Kitchen Set',
  'Lemari / Wardrobe',
  'Backdrop / TV Panel',
  'Meja Belajar',
  'Meja Kasir / Resepsionis',
  'Partisi',
  'Rak / Kabinet / Meja TV',
  'Kamar Set',
  'Interior Ruangan',
  'Lainnya',
] as const;

const FINISH = [
  'Belum tahu',
  'Putih',
  'Motif Kayu',
  'Abu / Hitam',
  'Pink / Pastel',
  'Lainnya',
] as const;

const MAX_CM = 1000;
const MAX_CITY = 40;

// Angka bulat positif 1–1000 cm; selain itu dianggap kosong
function cleanCm(raw: string): number | null {
  if (!/^\d{1,4}$/.test(raw)) return null;
  const n = Number(raw);
  return n > 0 && n <= MAX_CM ? n : null;
}

// Nama kota: huruf, spasi, titik, strip; maksimal 40 karakter
const cleanCity = (raw: string) =>
  raw
    .replace(/[^\p{L}\s.\-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_CITY);

const pick = <T extends string>(list: readonly T[], value: string): T | null =>
  (list as readonly string[]).includes(value) ? (value as T) : null;

export function WhatsAppBuilder() {
  const id = useId();
  const [furniture, setFurniture] = useState<string>(FURNITURE[0]);
  const [finish, setFinish] = useState<string>(FINISH[0]);
  const [dims, setDims] = useState({ p: '', l: '', t: '' });
  const [city, setCity] = useState('');

  const type = pick(FURNITURE, furniture) ?? 'furnitur custom';
  const color = pick(FINISH, finish);
  const p = cleanCm(dims.p);
  const l = cleanCm(dims.l);
  const t = cleanCm(dims.t);
  const size = [p, l, t].some(Boolean) ? `${p ?? '?'}×${l ?? '?'}×${t ?? '?'}` : null;
  const town = cleanCity(city);

  const message = [
    `Halo YF Furniture, saya ingin pesan ${type}`,
    size && ` ukuran ${size} cm`,
    color && color !== 'Belum tahu' && `, warna ${color}`,
    town && `, kirim ke ${town}`,
    '. Mohon info harganya.',
  ]
    .filter(Boolean)
    .join('');

  const field =
    'mt-1.5 block min-h-12 w-full rounded-xl border border-line bg-white px-3 text-base';
  const invalid = (raw: string) => raw !== '' && cleanCm(raw) === null;

  return (
    <div className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-jenis`} className="text-sm font-semibold">
            Jenis furnitur
          </label>
          <select
            id={`${id}-jenis`}
            value={furniture}
            onChange={(e) => setFurniture(e.target.value)}
            className={field}
          >
            {FURNITURE.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-warna`} className="text-sm font-semibold">
            Warna / finishing <span className="font-normal text-muted">(opsional)</span>
          </label>
          <select
            id={`${id}-warna`}
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            className={field}
          >
            {FINISH.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-semibold">
            Perkiraan ukuran dalam cm <span className="font-normal text-muted">(opsional)</span>
          </legend>
          <div className="mt-1.5 grid grid-cols-3 gap-3">
            {(
              [
                ['p', 'Panjang'],
                ['l', 'Lebar'],
                ['t', 'Tinggi'],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label htmlFor={`${id}-${key}`} className="text-xs text-muted">
                  {label}
                </label>
                <input
                  id={`${id}-${key}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="cm"
                  value={dims[key]}
                  aria-invalid={invalid(dims[key])}
                  aria-describedby={`${id}-ukuran-info`}
                  onChange={(e) => setDims({ ...dims, [key]: e.target.value.replace(/\D/g, '') })}
                  className={`${field} mt-1 aria-[invalid=true]:border-brand-red`}
                />
              </div>
            ))}
          </div>
          <p id={`${id}-ukuran-info`} className="mt-1.5 text-xs text-muted">
            Angka bulat 1–{MAX_CM} cm. Belum tahu ukurannya? Kosongkan saja.
          </p>
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-kota`} className="text-sm font-semibold">
            Kota tujuan <span className="font-normal text-muted">(opsional)</span>
          </label>
          <input
            id={`${id}-kota`}
            type="text"
            maxLength={MAX_CITY}
            autoComplete="address-level2"
            placeholder="Contoh: Salatiga"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-surface p-4">
        <p className="text-xs font-semibold tracking-wide text-muted uppercase">Pratinjau pesan</p>
        <p className="mt-1 text-sm leading-relaxed" aria-live="polite">
          {message}
        </p>
      </div>

      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-wood px-6 font-semibold text-white hover:bg-wood-strong"
      >
        <WhatsAppIcon className="size-5" />
        Kirim lewat WhatsApp
        <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
      </a>
      <p className="mt-3 text-center text-xs text-muted">
        Data tidak disimpan di website ini. Pesan baru terkirim setelah Anda menekan kirim di
        WhatsApp.
      </p>
    </div>
  );
}
