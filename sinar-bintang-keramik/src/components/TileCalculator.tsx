'use client';

// Kalkulator kebutuhan keramik: murni dihitung di browser, tanpa <form> dan tanpa penyimpanan.
// Luas per dus HANYA dari data produk atau isian pengguna; tidak pernah ditebak.
import { useId, useState } from 'react';
import { products } from '@/data/products';
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
  const [name, setName] = useState('');

  const product = tiles.find((p) => p.id === productId);
  const l = parsePositive(length, MAX_SIDE);
  const w = parsePositive(width, MAX_SIDE);
  const m2PerBox = product?.m2PerBox ?? parsePositive(manualM2, MAX_M2_BOX);
  const needManual = !product?.m2PerBox;

  const room = l && w ? l * w : null;
  const boxes = room && m2PerBox ? Math.ceil((room * (1 + spare / 100)) / m2PerBox) : null;
  // Nama: buang karakter kontrol & spasi berlebih, maksimal 50 karakter
  const cleanName = name
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const ready = Boolean(boxes && cleanName);

  // Tiap rincian di paragraf sendiri supaya pesan lega dibaca admin.
  // Sengaja tanpa estimasi biaya: harga final dikonfirmasi admin.
  const parts = boxes
    ? [
        'Halo Sinar Bintang Keramik, saya mau pesan keramik dengan rincian:',
        `Atas nama: ${cleanName || '-'}`,
        `*${product?.name ?? 'Keramik (belum pilih produk)'}*`,
        `Ukuran ruangan: ${fmt(l!)} m x ${fmt(w!)} m = ${fmt(room!)} m²`,
        `Cadangan potongan: ${spare}%`,
        `Luas per dus: ${fmt(m2PerBox!)} m²`,
        `Kebutuhan: ${boxes} dus`,
        'Mohon info harga, stok, dan total ongkirnya ya. Terima kasih.',
      ].filter((line): line is string => typeof line === 'string')
    : [];
  const message = parts.join('\n\n');

  const field = 'mt-1.5 min-h-12 w-full rounded-lg border border-line bg-card px-3 text-base';
  const invalid = (raw: string, ok: number | null) => raw.trim() !== '' && ok === null;

  return (
    <div className="grid gap-6 rounded-3xl border border-line bg-card p-5 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid content-start gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-n`} className="text-sm font-semibold">
            Atas nama <span className="font-normal text-muted">(wajib)</span>
          </label>
          <input
            id={`${id}-n`}
            autoComplete="name"
            maxLength={50}
            placeholder="Nama pemesan"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 50))}
            className={field}
          />
        </div>
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
        </dl>
        <p className="mt-2 text-xs text-muted">
          Dibulatkan ke atas. Harga, stok, dan ongkir dikonfirmasi admin via WA.
        </p>

        {/* Pratinjau pesan WA sebelum dikirim */}
        <div className="mt-4 overflow-hidden rounded-xl border border-line">
          <p className="flex items-center gap-2 bg-[#075e54] px-3 py-2 text-sm font-bold text-white">
            <WhatsAppIcon className="size-4" /> Pratinjau pesan WhatsApp
          </p>
          <div className="bg-[#ece5dd] p-3">
            {boxes ? (
              <div className="ml-auto max-w-[95%] space-y-2 rounded-xl rounded-tr-sm bg-[#dcf8c6] px-3 py-2.5 text-sm text-[#111b21] shadow-sm">
                {parts.map((line) =>
                  // *teks* di WhatsApp tampil tebal
                  /^\*.+\*$/.test(line) ? (
                    <p key={line} className="font-bold">
                      {line.slice(1, -1)}
                    </p>
                  ) : (
                    <p key={line}>{line}</p>
                  ),
                )}
              </div>
            ) : (
              <p className="text-center text-sm text-[#54656f]">
                Isi ukuran ruangan dan luas per dus, pesan akan muncul di sini.
              </p>
            )}
          </div>
        </div>

        <a
          href={ready ? buildWhatsAppLink(message) : undefined}
          aria-disabled={!ready}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 pt-0 font-bold ${ready ? 'bg-red text-white hover:bg-red-strong' : 'pointer-events-none bg-surface-2 text-muted'}`}
        >
          <WhatsAppIcon className="size-5" />
          Pesan dengan Rincian Ini<span className="sr-only"> (tab baru)</span>
        </a>
        {boxes && !cleanName && (
          <p className="mt-2 text-center text-xs font-semibold text-red">
            Isi nama pemesan dulu ya, Kak.
          </p>
        )}
      </div>
    </div>
  );
}
