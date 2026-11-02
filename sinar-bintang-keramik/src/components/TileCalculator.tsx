'use client';

// Kalkulator kebutuhan keramik: murni dihitung di browser, tanpa <form> dan tanpa penyimpanan.
// Luas per dus HANYA dari data produk atau isian pengguna; tidak pernah ditebak.
import { useId, useState } from 'react';
import { formatRupiah, products } from '@/data/products';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const TILE_CATEGORIES = new Set(['lantai', 'teras', 'kamar-mandi', 'dinding', 'granit']);
const tiles = products
  .filter((p) => TILE_CATEGORIES.has(p.category))
  .sort((a, b) => a.name.localeCompare(b.name, 'id'));
const MANUAL = 'manual';
const MAX_SIDE = 100; // meter
const MAX_M2_BOX = 10;

/** Angka desimal positif (koma atau titik), dalam batas wajar; selain itu null */
function parsePositive(raw: string, max: number): number | null {
  const n = Number(raw.trim().replace(',', '.'));
  return Number.isFinite(n) && n > 0 && n <= max ? n : null;
}

const fmt = (n: number) => n.toLocaleString('id-ID', { maximumFractionDigits: 2 });

export function TileCalculator() {
  const id = useId();
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [productId, setProductId] = useState(MANUAL);
  const [manualM2, setManualM2] = useState('');
  const [spare, setSpare] = useState(10);

  const product = tiles.find((p) => p.id === productId);
  const l = parsePositive(length, MAX_SIDE);
  const w = parsePositive(width, MAX_SIDE);
  const m2PerBox = product?.m2PerBox ?? parsePositive(manualM2, MAX_M2_BOX);
  const needManual = !product?.m2PerBox;

  const room = l && w ? l * w : null;
  const boxes = room && m2PerBox ? Math.ceil((room * (1 + spare / 100)) / m2PerBox) : null;
  const cost =
    boxes && product?.price && product.priceUnit === 'dus' ? boxes * product.price : null;

  const message = boxes
    ? [
        'Halo Sinar Bintang Keramik, saya mau pesan keramik dengan rincian:',
        '',
        `*${product?.name ?? 'Keramik (belum pilih produk)'}*`,
        `Ukuran ruangan: ${fmt(l!)} m x ${fmt(w!)} m = ${fmt(room!)} m²`,
        `Cadangan potongan: ${spare}%`,
        `Luas per dus: ${fmt(m2PerBox!)} m²`,
        `Kebutuhan: ${boxes} dus`,
        cost &&
          `Estimasi biaya: ${formatRupiah(cost)}${product?.priceFrom ? ' (harga mulai)' : ''}`,
        '',
        'Mohon dicek stok dan total ongkirnya ya. Terima kasih.',
      ]
        .filter((line) => typeof line === 'string')
        .join('\n')
    : '';

  const field = 'mt-1.5 min-h-12 w-full rounded-lg border border-line bg-card px-3 text-base';
  const invalid = (raw: string, ok: number | null) => raw.trim() !== '' && ok === null;

  return (
    <div className="grid gap-6 rounded-3xl border border-line bg-card p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-p`} className="text-sm font-semibold">
            Panjang ruangan (m)
          </label>
          <input
            id={`${id}-p`}
            inputMode="decimal"
            maxLength={6}
            placeholder="contoh: 4"
            value={length}
            aria-invalid={invalid(length, l)}
            onChange={(e) => setLength(e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-l`} className="text-sm font-semibold">
            Lebar ruangan (m)
          </label>
          <input
            id={`${id}-l`}
            inputMode="decimal"
            maxLength={6}
            placeholder="contoh: 3,5"
            value={width}
            aria-invalid={invalid(width, w)}
            onChange={(e) => setWidth(e.target.value)}
            className={field}
          />
        </div>
        {(invalid(length, l) || invalid(width, w)) && (
          <p className="text-sm font-semibold text-red sm:col-span-2" role="alert">
            Isi angka lebih dari 0 dan maksimal {MAX_SIDE} meter.
          </p>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-k`} className="text-sm font-semibold">
            Pilih keramik
          </label>
          <select
            id={`${id}-k`}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className={field}
          >
            <option value={MANUAL}>Isi luas per dus sendiri</option>
            {tiles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
                {p.m2PerBox ? ` (${fmt(p.m2PerBox)} m²/dus)` : ''}
              </option>
            ))}
          </select>
        </div>
        {needManual && (
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-m`} className="text-sm font-semibold">
              Luas per dus (m²)
            </label>
            <input
              id={`${id}-m`}
              inputMode="decimal"
              maxLength={5}
              placeholder="lihat di dus, contoh: 0,96"
              value={manualM2}
              aria-invalid={invalid(manualM2, m2PerBox)}
              aria-describedby={`${id}-m-help`}
              onChange={(e) => setManualM2(e.target.value)}
              className={field}
            />
            <p id={`${id}-m-help`} className="mt-1.5 text-xs text-muted">
              {product
                ? 'Luas per dus produk ini belum tercatat. Isi sesuai keterangan di dus atau tanyakan ke admin.'
                : 'Tertulis di dus keramik. Belum tahu? Tanyakan ke admin via WhatsApp.'}
            </p>
          </div>
        )}
        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-semibold">Cadangan potongan</legend>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {[5, 10, 15].map((n) => (
              <label
                key={n}
                className={`flex min-h-11 cursor-pointer items-center rounded-lg border px-4 text-sm font-semibold has-focus-visible:outline-3 has-focus-visible:outline-red ${spare === n ? 'border-red bg-red-soft text-red-strong' : 'border-line'}`}
              >
                <input
                  type="radio"
                  name={`${id}-cad`}
                  value={n}
                  checked={spare === n}
                  onChange={() => setSpare(n)}
                  className="sr-only"
                />
                {n}%
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col rounded-xl bg-surface p-5" aria-live="polite">
        <h3 className="font-bold">Hasil hitungan</h3>
        <dl className="mt-3 divide-y divide-line text-sm">
          <div className="flex justify-between py-2.5">
            <dt>Luas ruangan</dt>
            <dd className="font-bold">{room ? `${fmt(room)} m²` : '–'}</dd>
          </div>
          <div className="flex justify-between py-2.5">
            <dt>+ cadangan {spare}%</dt>
            <dd className="font-bold">{room ? `${fmt(room * (1 + spare / 100))} m²` : '–'}</dd>
          </div>
          <div className="flex items-baseline justify-between py-2.5">
            <dt>Jumlah dus</dt>
            <dd className="text-2xl font-extrabold text-red">{boxes ? `${boxes} dus` : '–'}</dd>
          </div>
          {product && (
            <div className="flex justify-between py-2.5">
              <dt>Estimasi biaya</dt>
              <dd className="font-bold">
                {cost ? formatRupiah(cost) : product.price === undefined ? 'Tanya harga' : '–'}
              </dd>
            </div>
          )}
        </dl>
        <p className="mt-2 text-xs text-muted">
          Dibulatkan ke atas. Estimasi belum termasuk ongkir; harga dan stok terbaru konfirmasi via
          WA.
        </p>
        <a
          href={boxes ? buildWhatsAppLink(message) : undefined}
          aria-disabled={!boxes}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 pt-0 font-bold ${boxes ? 'bg-red text-white hover:bg-red-strong' : 'pointer-events-none bg-surface-2 text-muted'}`}
        >
          <WhatsAppIcon className="size-5" />
          Pesan dengan Rincian Ini<span className="sr-only"> (tab baru)</span>
        </a>
      </div>
    </div>
  );
}
