'use client';

// Kalkulator estimasi biaya. Murni dihitung di browser: tidak ada data yang dikirim atau disimpan.
// Semua harga diambil dari src/data/prices.ts (tidak ada angka harga di komponen ini).
import { useId, useState } from 'react';
import { calcRules, formatRupiah, getPrice, type PriceId } from '@/data/prices';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const COLORS = { hp: 'Hitam putih', warna: 'Warna' } as const;
const PAPERS = { '75': 'HVS 75 gr', '80': 'HVS 80 gr' } as const;
const BINDINGS = {
  none: 'Tanpa jilid',
  biasa: 'Jilid biasa',
  lux: 'Jilid lux / hard cover',
} as const;

type Color = keyof typeof COLORS;
type Paper = keyof typeof PAPERS;
type Binding = keyof typeof BINDINGS;

// Angka bulat positif dalam batas; selain itu null
function toInt(raw: string, max: number): number | null {
  if (!/^\d{1,5}$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 1 && n <= max ? n : null;
}

function luxPriceId(copies: number): PriceId {
  return (calcRules.luxTiers.find((t) => copies >= t.min) ?? calcRules.luxTiers[2]).id;
}

export function Calculator() {
  const id = useId();
  const [pagesRaw, setPagesRaw] = useState('100');
  const [copiesRaw, setCopiesRaw] = useState('1');
  const [color, setColor] = useState<Color>('hp');
  const [paper, setPaper] = useState<Paper>('75');
  const [binding, setBinding] = useState<Binding>('none');

  const pages = toInt(pagesRaw, calcRules.maxPages);
  const copies = toInt(copiesRaw, calcRules.maxCopies);
  const valid = pages !== null && copies !== null;

  // Harga print per lembar: kertas 80 gr, atau promo bila rangkap ≥ minimal, atau harga normal
  const promo = paper === '75' && (copies ?? 0) >= calcRules.promoMinCopies;
  const printPrice = getPrice(paper === '80' ? 'print-80' : promo ? 'print-promo' : 'print-75');
  const bindPrice =
    binding === 'lux'
      ? getPrice(luxPriceId(copies ?? 1))
      : binding === 'biasa'
        ? getPrice('jilid-biasa')
        : null;

  const printTotal = valid ? pages * copies * (printPrice.price ?? 0) : 0;
  const bindTotal = valid && bindPrice?.price ? bindPrice.price * copies : 0;
  const bindUnknown = binding !== 'none' && bindPrice?.price == null;
  const total = printTotal + bindTotal;

  const message = valid
    ? [
        'Halo Sirait Printing, saya mau pesan dengan rincian:',
        `• ${pages} halaman × ${copies} rangkap`,
        `• ${COLORS[color]}, ${PAPERS[paper]}`,
        `• ${BINDINGS[binding]}`,
        `• Estimasi di website: ${formatRupiah(total)}${bindUnknown ? ' + biaya jilid' : ''}`,
        'File saya kirim di sini ya. Mohon konfirmasi total dan waktu selesainya.',
      ].join('\n')
    : '';

  const step = (raw: string, set: (v: string) => void, delta: number, max: number) => {
    const n = Math.min(max, Math.max(1, (Number(raw) || 0) + delta));
    set(String(n));
  };

  const numberField = (
    key: string,
    label: string,
    raw: string,
    set: (v: string) => void,
    max: number,
    stepBy: number,
    help: string,
  ) => {
    const invalid = toInt(raw, max) === null;
    return (
      <div>
        <label htmlFor={`${id}-${key}`} className="text-sm font-bold">
          {label}
        </label>
        <div className="mt-1.5 flex">
          <button
            type="button"
            onClick={() => step(raw, set, -stepBy, max)}
            className="grid size-12 shrink-0 place-items-center rounded-l-xl border border-r-0 border-line bg-surface text-xl font-bold hover:bg-surface-2"
          >
            <span aria-hidden="true">−</span>
            <span className="sr-only">Kurangi {label.toLowerCase()}</span>
          </button>
          <input
            id={`${id}-${key}`}
            type="number"
            inputMode="numeric"
            min={1}
            max={max}
            value={raw}
            aria-invalid={invalid}
            aria-describedby={`${id}-${key}-help`}
            onChange={(e) => set(e.target.value.replace(/\D/g, '').slice(0, 5))}
            className="h-12 w-full min-w-0 border border-line bg-background text-center font-display text-xl font-bold aria-[invalid=true]:border-red aria-[invalid=true]:bg-red/5"
          />
          <button
            type="button"
            onClick={() => step(raw, set, stepBy, max)}
            className="grid size-12 shrink-0 place-items-center rounded-r-xl border border-l-0 border-line bg-surface text-xl font-bold hover:bg-surface-2"
          >
            <span aria-hidden="true">+</span>
            <span className="sr-only">Tambah {label.toLowerCase()}</span>
          </button>
        </div>
        <p
          id={`${id}-${key}-help`}
          className={`mt-1 text-xs ${invalid ? 'font-semibold text-red' : 'text-muted'}`}
        >
          {invalid ? `Isi angka 1–${max.toLocaleString('id-ID')}` : help}
        </p>
      </div>
    );
  };

  const choice = <T extends string>(
    key: string,
    legend: string,
    options: Record<T, string>,
    value: T,
    onChange: (v: T) => void,
  ) => (
    <fieldset>
      <legend className="text-sm font-bold">{legend}</legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {(Object.keys(options) as T[]).map((k) => (
          <label
            key={k}
            className="relative flex min-h-11 cursor-pointer items-center rounded-xl border border-line px-4 text-sm font-semibold transition-colors has-checked:border-red has-checked:bg-red has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-blue"
          >
            <input
              type="radio"
              name={`${id}-${key}`}
              value={k}
              checked={value === k}
              onChange={() => onChange(k)}
              className="sr-only"
            />
            {options[k]}
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="grid gap-5 rounded-3xl border border-line bg-background p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          {numberField(
            'halaman',
            'Jumlah halaman',
            pagesRaw,
            setPagesRaw,
            calcRules.maxPages,
            10,
            '1 sisi kertas = 1 lembar',
          )}
          {numberField(
            'rangkap',
            'Jumlah rangkap',
            copiesRaw,
            setCopiesRaw,
            calcRules.maxCopies,
            1,
            `Mulai ${calcRules.promoMinCopies} rangkap dapat harga promo`,
          )}
        </div>
        {choice('warna', 'Jenis print', COLORS, color, setColor)}
        {choice('kertas', 'Kertas', PAPERS, paper, setPaper)}
        {choice('jilid', 'Jilid', BINDINGS, binding, setBinding)}
      </div>

      {/* Hasil */}
      <div className="flex flex-col rounded-3xl bg-ink p-5 text-white sm:p-7" aria-live="polite">
        <p className="text-sm font-semibold text-white/70">Estimasi total</p>
        <p className="mt-1 font-display text-price font-extrabold text-yellow">
          {valid ? formatRupiah(total) : '—'}
        </p>
        {bindUnknown && valid && (
          <p className="mt-1 text-sm text-white/80">
            + biaya {BINDINGS[binding].toLowerCase()} (tanya admin)
          </p>
        )}

        {valid && (
          <dl className="mt-6 space-y-2 border-t border-white/15 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-white/75">
                Print {pages} × {copies} × {formatRupiah(printPrice.price ?? 0)}
                {promo && (
                  <span className="ml-2 rounded-full bg-yellow px-2 py-0.5 text-xs font-bold text-ink">
                    promo
                  </span>
                )}
              </dt>
              <dd className="font-semibold tabular-nums">{formatRupiah(printTotal)}</dd>
            </div>
            {binding !== 'none' && (
              <div className="flex justify-between gap-4">
                <dt className="text-white/75">
                  {BINDINGS[binding]} × {copies}
                  {bindPrice?.price ? ` × ${formatRupiah(bindPrice.price)}` : ''}
                </dt>
                <dd className="font-semibold tabular-nums">
                  {bindPrice?.price ? formatRupiah(bindTotal) : 'tanya admin'}
                </dd>
              </div>
            )}
            {color === 'warna' && (
              <p className="text-white/70">Warna & hitam putih sama harganya.</p>
            )}
          </dl>
        )}

        <p className="mt-6 text-xs text-white/70">Estimasi, harga final dikonfirmasi admin.</p>
        <a
          href={valid ? buildWhatsAppLink(message) : undefined}
          aria-disabled={!valid}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-bold transition-colors ${valid ? 'bg-yellow text-ink hover:bg-white' : 'pointer-events-none bg-white/20 text-white/60'}`}
        >
          <WhatsAppIcon className="size-5" />
          Pesan dengan Rincian Ini
          <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
        </a>
      </div>
    </div>
  );
}
