'use client';

// Pembuat pesan WhatsApp. BUKAN form: tidak ada <form>, tidak ada submit ke server,
// tidak ada penyimpanan. Input hanya dirangkai menjadi teks lalu dibuka di wa.me.
import { useId, useState } from 'react';
import { products } from '@/data/products';
import { config } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const NEEDS = ['Pembuatan sampel', 'Produksi', 'Konsultasi'] as const;
const PRODUCT_NAMES = products.map((p) => p.name);
const MAX_QTY = 100000;
const MAX_CITY = 40;

// Bersihkan teks kota: hanya huruf, angka, spasi, titik, koma, tanda hubung; batasi panjang
const cleanCity = (v: string) =>
  v
    .replace(/[^\p{L}\p{N} .,-]/gu, '')
    .replace(/\s+/g, ' ')
    .slice(0, MAX_CITY);

export function MessageBuilder() {
  const id = useId();
  const [product, setProduct] = useState<string>(PRODUCT_NAMES[0] ?? '');
  const [need, setNeed] = useState<(typeof NEEDS)[number]>('Konsultasi');
  const [qty, setQty] = useState('');
  const [city, setCity] = useState('');

  // Validasi dengan whitelist & batas nilai
  const safeProduct = PRODUCT_NAMES.includes(product) ? product : 'busana muslimah';
  const safeNeed = NEEDS.includes(need) ? need : 'Konsultasi';
  const qtyNum = Number(qty);
  const qtyValid = qty === '' || (Number.isInteger(qtyNum) && qtyNum > 0 && qtyNum <= MAX_QTY);
  const safeCity = cleanCity(city).trim();

  const message =
    `Halo ${config.siteName}, saya ingin konsultasi dan meminta penawaran untuk ${safeProduct} (${safeNeed.toLowerCase()})` +
    (qty && qtyValid ? `, estimasi jumlah ${qtyNum} pcs` : '') +
    (safeCity ? `, lokasi ${safeCity}` : '') +
    '.';

  const field = 'mt-1.5 block min-h-12 w-full rounded-lg border border-line bg-background px-3';

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-8">
      <h2 className="font-serif text-2xl sm:text-3xl">Susun pesan WhatsApp</h2>
      <p className="mt-2 text-sm text-muted">
        Pilih kebutuhan Anda, pesan otomatis tersusun. Data tidak dikirim atau disimpan di website
        ini, hanya dibuka di WhatsApp Anda.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold" htmlFor={`${id}-produk`}>
          Jenis produk
          <select
            id={`${id}-produk`}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className={`${field} font-normal`}
          >
            {PRODUCT_NAMES.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>

        <fieldset className="text-sm font-semibold">
          <legend>Kebutuhan</legend>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {NEEDS.map((n) => (
              <label
                key={n}
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-background px-4 font-normal has-checked:border-plum has-checked:text-plum"
              >
                <input
                  type="radio"
                  name={`${id}-kebutuhan`}
                  value={n}
                  checked={need === n}
                  onChange={() => setNeed(n)}
                  className="accent-plum"
                />
                {n}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="text-sm font-semibold" htmlFor={`${id}-jumlah`}>
          Estimasi jumlah (pcs)
          <input
            id={`${id}-jumlah`}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_QTY}
            step={1}
            value={qty}
            onChange={(e) => setQty(e.target.value.replace(/\D/g, '').slice(0, 6))}
            aria-invalid={!qtyValid}
            aria-describedby={`${id}-jumlah-info`}
            placeholder="Contoh: 100"
            className={`${field} font-normal`}
          />
          <span
            id={`${id}-jumlah-info`}
            className={`mt-1 block text-xs font-normal ${qtyValid ? 'text-muted' : 'text-[#9b2c2c]'}`}
          >
            {qtyValid ? 'Opsional, boleh dikosongkan.' : `Isi angka bulat 1 sampai ${MAX_QTY}.`}
          </span>
        </label>

        <label className="text-sm font-semibold" htmlFor={`${id}-kota`}>
          Kota
          <input
            id={`${id}-kota`}
            type="text"
            maxLength={MAX_CITY}
            autoComplete="address-level2"
            value={city}
            onChange={(e) => setCity(cleanCity(e.target.value))}
            placeholder="Contoh: Bandung"
            className={`${field} font-normal`}
          />
        </label>
      </div>

      <div className="mt-6 rounded-lg border border-dashed border-line bg-background p-4 text-sm">
        <p className="mb-1 text-xs font-semibold text-muted">Pratinjau pesan</p>
        <p>{message}</p>
      </div>

      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!qtyValid}
        onClick={(e) => !qtyValid && e.preventDefault()}
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-background hover:bg-plum-strong aria-disabled:opacity-50"
      >
        <WhatsAppIcon />
        Kirim lewat WhatsApp
        <span className="sr-only">(membuka tab baru)</span>
      </a>
    </div>
  );
}
