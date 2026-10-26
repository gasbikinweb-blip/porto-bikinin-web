'use client';

// Kalkulator cuan reseller: semua angka diisi pengunjung sendiri (tanpa klaim harga dari kami),
// dihitung di browser saja, tidak dikirim atau disimpan.
import { useId, useState } from 'react';
import { formatRupiah } from '@/data/products';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const MAX_PRICE = 1_000_000;
const MAX_QTY = 5_000;

const toInt = (raw: string, max: number) => {
  if (!/^\d{1,7}$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 1 && n <= max ? n : null;
};
const digits = (raw: string) => raw.replace(/\D/g, '').slice(0, 7);

export function ProfitCalculator() {
  const id = useId();
  const [buyRaw, setBuyRaw] = useState('');
  const [sellRaw, setSellRaw] = useState('');
  const [qtyRaw, setQtyRaw] = useState('20');

  const buy = toInt(buyRaw, MAX_PRICE);
  const sell = toInt(sellRaw, MAX_PRICE);
  const qty = toInt(qtyRaw, MAX_QTY);
  const ready = buy !== null && sell !== null && qty !== null;
  const perPcs = ready ? sell - buy : 0;
  const total = ready ? perPcs * qty : 0;

  const field =
    'mt-1.5 block h-12 w-full rounded-2xl border border-line bg-background px-4 text-lg font-semibold';
  const inputs = [
    {
      key: 'beli',
      label: 'Harga beli grosir / pcs',
      value: buyRaw,
      set: setBuyRaw,
      hint: 'Tanyakan ke admin',
    },
    {
      key: 'jual',
      label: 'Harga jual Kakak / pcs',
      value: sellRaw,
      set: setSellRaw,
      hint: 'Harga yang Kakak tentukan',
    },
    {
      key: 'qty',
      label: 'Jumlah terjual (pcs)',
      value: qtyRaw,
      set: setQtyRaw,
      hint: `1–${MAX_QTY.toLocaleString('id-ID')}`,
    },
  ];

  return (
    <div className="grid gap-6 rounded-[2rem] bg-surface p-5 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {inputs.map((f) => (
          <div key={f.key}>
            <label htmlFor={`${id}-${f.key}`} className="text-sm font-bold">
              {f.label}
            </label>
            <div className="relative">
              {f.key !== 'qty' && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-muted"
                >
                  Rp
                </span>
              )}
              <input
                id={`${id}-${f.key}`}
                type="text"
                inputMode="numeric"
                placeholder={f.key === 'qty' ? '20' : 'contoh 30000'}
                value={f.value}
                onChange={(e) => f.set(digits(e.target.value))}
                aria-describedby={`${id}-${f.key}-hint`}
                className={`${field} ${f.key !== 'qty' ? 'pl-12' : ''}`}
              />
            </div>
            <p id={`${id}-${f.key}-hint`} className="mt-1 text-xs text-muted">
              {f.hint}
            </p>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col justify-between rounded-[1.5rem] bg-panel p-6 text-on-panel"
        aria-live="polite"
      >
        <div>
          <p className="text-sm text-on-panel/75">Perkiraan cuan</p>
          <p className="mt-1 font-serif text-5xl">{ready ? formatRupiah(total) : '—'}</p>
          {ready && (
            <p
              className={`mt-2 text-sm ${perPcs < 0 ? 'font-semibold text-on-panel' : 'text-on-panel/80'}`}
            >
              {perPcs < 0
                ? 'Harga jual masih di bawah harga beli, coba naikkan ya, Kak.'
                : `${formatRupiah(perPcs)} per pcs × ${qty} pcs`}
            </p>
          )}
          {!ready && (
            <p className="mt-2 text-sm text-on-panel/75">
              Isi ketiga kolom untuk melihat hasilnya.
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-xs text-on-panel/70">
            Hanya simulasi dari angka yang Kakak isi. Harga grosir resmi dikonfirmasi admin.
          </p>
          <a
            href={buildWhatsAppLink(
              'Halo Farwa, saya sudah coba hitung-hitung cuan reseller di website. Boleh minta daftar harga grosir terbaru, Kak?',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-on-panel px-6 font-bold text-panel transition-colors hover:bg-on-panel/85"
          >
            <WhatsAppIcon />
            Minta Harga Grosir
            <span className="sr-only"> (tab baru)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
