'use client';

import { useId, useState } from 'react';
import { Select } from './Select';
import { WhatsAppIcon } from './WhatsApp';
import type { ServiceSlug } from '@/data/types';
import { useLang } from '@/i18n/client';
import { buildWhatsAppLink } from '@/lib/config';

/*
 * Pembuat pesan WhatsApp. BUKAN form: tidak ada <form>, tidak ada submit,
 * tidak ada penyimpanan, dan tidak ada data yang dikirim ke server mana pun.
 * Hasilnya hanya sebuah link wa.me yang dibuka oleh pengunjung sendiri.
 */

const MAX_CITY = 40;

// Urutan pilihan layanan mengikuti urutan slug ini (sama di kedua bahasa)
const SERVICE_SLUGS: ServiceSlug[] = [
  'arsitektur',
  'desain-interior',
  'kitchen-set-furnitur',
  'renovasi',
  'property-management',
];

/** Hanya terima nilai yang ada di daftar (whitelist) */
const pick = (list: readonly string[], v: string): string => (list.includes(v) ? v : '');

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
  defaultService,
  title,
}: {
  defaultService?: ServiceSlug;
  title?: string;
}) {
  const id = useId();
  const { t } = useLang();
  const w = t.wa;
  const SERVICES = w.services;
  const PROPERTIES = w.properties;
  const BUDGETS = w.budgets;
  const initial = defaultService ? (SERVICES[SERVICE_SLUGS.indexOf(defaultService)] ?? '') : '';
  const [service, setService] = useState(initial);
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

  const message = w.message({ s, p, a, c, b });
  const ready = Boolean(s && p) && !areaInvalid;

  const field =
    'mt-1 w-full border-0 border-b border-line bg-transparent px-0 py-2.5 text-base text-fg focus:border-fg focus:outline-none focus-visible:outline-none';
  const labelCls = 'block text-xs tracking-[0.15em] text-muted uppercase';

  return (
    <div className="rounded-md bg-bg p-6 ring-1 ring-line md:p-12">
      {title && (
        <>
          <h2 className="font-serif text-3xl font-light md:text-4xl">{title}</h2>
          <p className="mt-3 mb-8 max-w-sm text-sm leading-relaxed text-muted">{w.intro}</p>
        </>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label id={`${id}-s-l`} htmlFor={`${id}-s`} className={labelCls}>
            {w.service}
          </label>
          <Select
            id={`${id}-s`}
            labelId={`${id}-s-l`}
            value={service}
            onChange={(v) => setService(pick(SERVICES, v))}
            options={SERVICES}
            placeholder={w.servicePh}
          />
        </div>
        <div>
          <label id={`${id}-p-l`} htmlFor={`${id}-p`} className={labelCls}>
            {w.property}
          </label>
          <Select
            id={`${id}-p`}
            labelId={`${id}-p-l`}
            value={property}
            onChange={(v) => setProperty(pick(PROPERTIES, v))}
            options={PROPERTIES}
            placeholder={w.propertyPh}
          />
        </div>
        <div>
          <label htmlFor={`${id}-a`} className={labelCls}>
            {w.area}
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
            placeholder={w.areaPh}
          />
          {areaInvalid && (
            <p id={`${id}-ae`} className="mt-1 text-sm text-red-700 dark:text-red-300">
              {w.areaError}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${id}-c`} className={labelCls}>
            {w.city}
          </label>
          <input
            id={`${id}-c`}
            className={field}
            maxLength={MAX_CITY}
            value={city}
            onChange={(e) => setCity(cleanCity(e.target.value))}
            placeholder={w.cityPh}
            autoComplete="address-level2"
          />
        </div>
        <div className="md:col-span-2">
          <label id={`${id}-b-l`} htmlFor={`${id}-b`} className={labelCls}>
            {w.budget}
          </label>
          <Select
            id={`${id}-b`}
            labelId={`${id}-b-l`}
            value={budget}
            onChange={(v) => setBudget(pick(BUDGETS, v))}
            options={BUDGETS}
            placeholder={w.budgetPh}
          />
        </div>
      </div>

      <div className="mt-8">
        <p className={labelCls}>{w.preview}</p>
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
            {w.send}
            <span className="sr-only">{t.newTab}</span>
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-sm border border-line px-6 py-3.5 text-[11px] font-medium tracking-[0.18em] text-muted uppercase"
          >
            <WhatsAppIcon />
            {w.send}
          </span>
        )}
        <p className="text-xs text-muted">{w.hint}</p>
      </div>
    </div>
  );
}
