'use client';

import { useId, useState } from 'react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export const BUILDING_TYPES = [
  'rumah tinggal',
  'ruko / bangunan komersial',
  'kafe / restoran',
  'gudang / pabrik',
  'kantor / gedung',
  'proyek perumahan',
  'proyek pemerintah',
] as const;

const MAX_AREA = 10000;
const MAX_CITY = 40;

/**
 * Pembuat pesan WhatsApp. BUKAN form: tidak ada <form>/submit, tidak ada penyimpanan,
 * tidak ada data yang dikirim ke server mana pun. Hanya menyusun link wa.me di browser.
 */
export function WaMessageBuilder({
  productNames,
  siteName,
}: {
  productNames: string[];
  siteName: string;
}) {
  const id = useId();
  const [product, setProduct] = useState('');
  const [building, setBuilding] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');

  // Validasi: whitelist pilihan, angka positif berbatas, teks kota dibersihkan & dibatasi panjangnya
  const productOk = productNames.includes(product);
  const buildingOk = (BUILDING_TYPES as readonly string[]).includes(building);
  const areaNum = Number(area.replace(',', '.'));
  const areaOk = area === '' || (Number.isFinite(areaNum) && areaNum > 0 && areaNum <= MAX_AREA);
  const cleanCity = city
    .replace(/[^\p{L}\p{N} .,'-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_CITY);
  const ready = productOk && buildingOk && areaOk && cleanCity.length >= 2;

  const message =
    `Halo ${siteName}, saya ingin meminta penawaran ${product} untuk ${building}` +
    (area !== '' && areaOk ? `, estimasi luas bidang ${areaNum} m²` : '') +
    `, lokasi ${cleanCity}.`;

  const field = 'mt-1 block w-full min-h-12 rounded-lg border border-line bg-white px-3 text-ink';

  return (
    <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="font-semibold text-ink">Jenis roster *</span>
          <select className={field} value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value="">Pilih jenis roster</option>
            {productNames.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-ink">Jenis bangunan *</span>
          <select className={field} value={building} onChange={(e) => setBuilding(e.target.value)}>
            <option value="">Pilih jenis bangunan</option>
            {BUILDING_TYPES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-ink">Estimasi luas bidang (m²)</span>
          <input
            className={field}
            inputMode="decimal"
            maxLength={7}
            value={area}
            onChange={(e) => setArea(e.target.value.replace(/[^\d.,]/g, ''))}
            placeholder="opsional, mis. 12"
            aria-invalid={!areaOk}
            aria-describedby={`${id}-area`}
          />
          <span
            id={`${id}-area`}
            className={`mt-1 block text-sm ${areaOk ? 'text-muted' : 'text-red-700'}`}
          >
            {areaOk
              ? `Angka positif, maksimal ${MAX_AREA.toLocaleString('id-ID')} m².`
              : 'Masukkan angka lebih dari 0.'}
          </span>
        </label>
        <label className="block">
          <span className="font-semibold text-ink">Kota / lokasi proyek *</span>
          <input
            className={field}
            maxLength={MAX_CITY}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="mis. Bandung"
            autoComplete="address-level2"
          />
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-surface p-4">
        <p className="text-sm font-semibold text-ink">Pratinjau pesan</p>
        <p className="mt-1 text-muted" aria-live="polite">
          {ready ? message : 'Lengkapi pilihan bertanda * untuk menyusun pesan.'}
        </p>
      </div>

      {ready ? (
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-wa px-6 py-3 font-semibold text-white hover:bg-wa-dark"
        >
          Buka WhatsApp dengan pesan ini
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="mt-5 inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-lg bg-sand px-6 py-3 font-semibold text-muted"
        >
          Buka WhatsApp dengan pesan ini
        </span>
      )}
      <p className="mt-3 text-sm text-muted">
        Data tidak disimpan atau dikirim ke mana pun selain ke WhatsApp yang Anda buka sendiri.
      </p>
    </div>
  );
}
