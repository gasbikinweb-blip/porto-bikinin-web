'use client';

import { useId, useState } from 'react';
import { Select } from './Select';
import { WhatsAppIcon } from './WhatsApp';
import { buildWhatsAppLink } from '@/lib/config';

/*
 * Pembuat pesan WhatsApp. BUKAN form: tidak ada <form>, tidak ada submit,
 * tidak ada penyimpanan, dan tidak ada data yang dikirim ke server mana pun.
 * Hasilnya hanya sebuah link wa.me yang dibuka oleh pengunjung sendiri.
 */

const SERVICES = [
  'Desain Arsitektur',
  'Desain Interior',
  'Kitchen Set & Furnitur Custom',
  'Renovasi',
  'Property Management',
] as const;
const PROPERTIES = [
  'Rumah',
  'Apartemen',
  'Kafe / Bakery / Resto',
  'Gym / Klinik',
  'Kantor',
  'Industri',
  'Kost / Properti Sewa',
] as const;
const BUDGETS = ['< Rp100 juta', 'Rp100–300 juta', 'Rp300–750 juta', '> Rp750 juta'] as const; // TODO: sesuaikan rentang budget dengan Griya Nuansa

const MAX_CITY = 40;

const pick = <T extends string>(list: readonly T[], v: string): T | '' =>
  (list as readonly string[]).includes(v) ? (v as T) : '';

/** Bersihkan teks kota: hanya huruf, angka, spasi, titik, koma, tanda hubung. */
export function cleanCity(v: string) {
  return v
    .replace(/[^\p{L}\p{N} .,'-]/gu, '')
    .replace(/\s+/g, ' ')
    .slice(0, MAX_CITY);
}

export function cleanArea(v: string): number | null {
  if (!/^\d{1,6}$/.test(v.trim())) return null;
  const n = Number(v);
  return n > 0 && n <= 100000 ? n : null;
}

export function WaMessageBuilder({
  defaultService = '',
  title,
}: {
  defaultService?: string;
  title?: string;
}) {
  const id = useId();
  const [service, setService] = useState(pick(SERVICES, defaultService));
  const [property, setProperty] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');

  const s = pick(SERVICES, service);
  const p = pick(PROPERTIES, property);
  const b = pick(BUDGETS, budget);
  const a = cleanArea(area);
  const c = cleanCity(city).trim();
  const areaInvalid = area.trim() !== '' && a === null;

  const parts = [
    `Halo Griya Nuansa, saya ingin konsultasi ${s ? s.toLowerCase() : 'desain'}`,
    p && ` untuk ${p.toLowerCase()}`,
    a && `, luas sekitar ${a} m2`,
    c && `, lokasi ${c}`,
    '.',
    b && ` Kisaran budget: ${b}.`,
  ];
  const message = parts.filter(Boolean).join('');
  const ready = Boolean(s && p) && !areaInvalid;

  const field =
    'mt-1 w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-fg focus:border-fg focus:outline-none focus-visible:outline-none';
  const labelCls = 'block text-xs tracking-[0.15em] text-muted uppercase';

  return (
    <div className="rounded-md bg-bg p-6 ring-1 ring-line md:p-12">
      {title && (
        <>
          <h2 className="font-serif text-3xl font-light md:text-4xl">{title}</h2>
          <p className="mt-3 mb-8 max-w-sm text-sm leading-relaxed text-muted">
            Isi seperlunya, pesan akan tersusun otomatis lalu dibuka di WhatsApp Anda.
          </p>
        </>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label id={`${id}-s-l`} htmlFor={`${id}-s`} className={labelCls}>
            Jenis layanan *
          </label>
          <Select
            id={`${id}-s`}
            labelId={`${id}-s-l`}
            value={service}
            onChange={(v) => setService(pick(SERVICES, v))}
            options={SERVICES}
            placeholder="Pilih layanan"
          />
        </div>
        <div>
          <label id={`${id}-p-l`} htmlFor={`${id}-p`} className={labelCls}>
            Tipe properti *
          </label>
          <Select
            id={`${id}-p`}
            labelId={`${id}-p-l`}
            value={property}
            onChange={(v) => setProperty(pick(PROPERTIES, v))}
            options={PROPERTIES}
            placeholder="Pilih tipe properti"
          />
        </div>
        <div>
          <label htmlFor={`${id}-a`} className={labelCls}>
            Estimasi luas (m², opsional)
          </label>
          <input
            id={`${id}-a`}
            className={field}
            inputMode="numeric"
            maxLength={6}
            value={area}
            aria-invalid={areaInvalid}
            aria-describedby={areaInvalid ? `${id}-ae` : undefined}
            onChange={(e) => setArea(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="mis. 120"
          />
          {areaInvalid && (
            <p id={`${id}-ae`} className="mt-1 text-sm text-red-700 dark:text-red-300">
              Masukkan angka positif.
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-c`} className={labelCls}>
            Kota
          </label>
          <input
            id={`${id}-c`}
            className={field}
            maxLength={MAX_CITY}
            value={city}
            onChange={(e) => setCity(cleanCity(e.target.value))}
            placeholder="mis. Serpong"
            autoComplete="address-level2"
          />
        </div>
        <div className="md:col-span-2">
          <label id={`${id}-b-l`} htmlFor={`${id}-b`} className={labelCls}>
            Kisaran budget (opsional)
          </label>
          <Select
            id={`${id}-b`}
            labelId={`${id}-b-l`}
            value={budget}
            onChange={(v) => setBudget(pick(BUDGETS, v))}
            options={BUDGETS}
            placeholder="Belum tahu / tidak disebutkan"
          />
        </div>
      </div>

      <div className="mt-8">
        <p className={labelCls}>Pratinjau pesan</p>
        <p
          className="mt-2 border-l-2 border-amber pl-4 font-serif text-lg italic"
          aria-live="polite"
        >
          {message}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        {ready ? (
          <a
            href={buildWhatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-fg px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] text-bg uppercase hover:opacity-85"
          >
            <WhatsAppIcon />
            Kirim lewat WhatsApp
            <span className="sr-only"> (tab baru)</span>
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-sm border border-line px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] text-muted uppercase"
          >
            <WhatsAppIcon />
            Kirim lewat WhatsApp
          </span>
        )}
        <p className="text-xs text-muted">
          Pilih layanan dan tipe properti dulu. Data tidak disimpan; pesan dikirim dari WhatsApp
          Anda sendiri.
        </p>
      </div>
    </div>
  );
}
