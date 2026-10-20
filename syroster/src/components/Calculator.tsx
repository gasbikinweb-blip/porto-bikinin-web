'use client';

import { useId, useState } from 'react';
import { calculatorDefaults } from '@/data/guides';
import type { Product } from '@/data/products';
import { buildWhatsAppLink } from '@/lib/whatsapp';

type Option = Pick<Product, 'slug' | 'name' | 'piecesPerM2'>;

const MAX_METER = 100; // batas wajar panjang/tinggi bidang dinding (m)

/** Kalkulator estimasi jumlah roster. Murni hitungan di browser, tidak ada data yang dikirim/disimpan. */
export function Calculator({ products, siteName }: { products: Option[]; siteName: string }) {
  const id = useId();
  const [slug, setSlug] = useState(products[0]?.slug ?? '');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  const product = products.find((p) => p.slug === slug) ?? products[0];
  const w = Number(width.replace(',', '.'));
  const h = Number(height.replace(',', '.'));
  const valid = (n: number) => Number.isFinite(n) && n > 0 && n <= MAX_METER;
  const ok = valid(w) && valid(h);

  // TODO: rumus sementara. Ganti piecesPerM2 di products.ts dengan data asli tiap produk.
  const perM2 = product?.piecesPerM2 ?? calculatorDefaults.fallbackPiecesPerM2;
  const area = ok ? w * h : 0;
  const base = Math.ceil(area * perM2);
  const total = Math.ceil(base * (1 + calculatorDefaults.wastePercent / 100));

  const message = ok
    ? `Halo ${siteName}, saya ingin meminta penawaran ${product?.name} untuk bidang dinding ${w} m x ${h} m (sekitar ${area.toFixed(2)} m², estimasi ${total} keping).`
    : '';

  const input = 'mt-1 block w-full min-h-12 rounded-lg border border-line bg-white px-3 text-ink';

  return (
    <div className="rounded-xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-3">
        <label className="block sm:col-span-3">
          <span className="font-semibold text-ink">Jenis roster</span>
          <select className={input} value={slug} onChange={(e) => setSlug(e.target.value)}>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-semibold text-ink">Lebar bidang (m)</span>
          <input
            className={input}
            inputMode="decimal"
            maxLength={6}
            value={width}
            onChange={(e) => setWidth(e.target.value.replace(/[^\d.,]/g, ''))}
            placeholder="mis. 3"
            aria-describedby={`${id}-hint`}
          />
        </label>
        <label className="block">
          <span className="font-semibold text-ink">Tinggi bidang (m)</span>
          <input
            className={input}
            inputMode="decimal"
            maxLength={6}
            value={height}
            onChange={(e) => setHeight(e.target.value.replace(/[^\d.,]/g, ''))}
            placeholder="mis. 2,5"
            aria-describedby={`${id}-hint`}
          />
        </label>
        <div className="flex items-end">
          <p id={`${id}-hint`} className="text-sm text-muted">
            Angka positif, maksimal {MAX_METER} m.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-surface p-5" aria-live="polite">
        {ok ? (
          <>
            <p className="text-muted">
              Luas {area.toFixed(2)} m² × {perM2} keping/m² + cadangan{' '}
              {calculatorDefaults.wastePercent}%
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">
              ≈ {total.toLocaleString('id-ID')} keping
            </p>
          </>
        ) : (
          <p className="text-muted">Isi lebar dan tinggi bidang dinding untuk melihat estimasi.</p>
        )}
        <p className="mt-3 text-sm text-muted">
          Estimasi kasar berdasarkan ukuran nominal, belum termasuk nat. Angka pasti akan kami
          konfirmasi saat penawaran.
        </p>
      </div>

      {ok && (
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-lg bg-wa px-6 py-3 font-semibold text-white hover:bg-wa-dark"
        >
          Kirim hasil hitungan via WhatsApp
        </a>
      )}
    </div>
  );
}
