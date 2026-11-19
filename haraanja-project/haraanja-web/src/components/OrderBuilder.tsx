'use client';

// Penyusun pesan pesanan souvenir via WhatsApp. Tanpa <form> submit dan tanpa penyimpanan:
// semua isian hanya dimasukkan ke link WhatsApp (encodeURIComponent di buildWhatsAppLink).
import { useEffect, useMemo, useState } from 'react';
import { addons, occasions } from '@/data/catalog-meta';
import { getProduct, products } from '@/data/products';
import type { OccasionId } from '@/data/types';
import { siteConfig } from '@/lib/config';
import { formatRupiah } from '@/lib/format';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { ADD_EVENT, type AddDetail } from './ProductModal';

const souvenirs = products.filter((p) => !p.isPackaging);
const packs = products.filter((p) => p.isPackaging && p.slug !== 'sample-box');
const MAX_QTY = 10000;
// TODO: konfirmasi estimasi waktu produksi (saat ini mengikuti saran Shopee: H-1 bulan)
const LEAD_DAYS = 30;

// Buang karakter kontrol agar pesan rapi
const clean = (s: string) =>
  Array.from(s)
    .map((c) => (c.charCodeAt(0) < 32 ? ' ' : c))
    .join('')
    .trim();

const field =
  'mt-1.5 min-h-12 w-full rounded-xl border border-line bg-surface px-4 text-base outline-none focus:border-accent';
const label = 'block text-sm font-semibold';

const validMaps = (v: string) =>
  /^https:\/\/(www\.google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)[^\s<>"]*$/i.test(
    v.trim(),
  );

export function OrderBuilder() {
  const [slug, setSlug] = useState('');
  const [variant, setVariant] = useState('');
  const [pack, setPack] = useState('');
  const [qty, setQty] = useState('');
  const [occ, setOcc] = useState<OccasionId | ''>('');
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [maps, setMaps] = useState('');
  const [locMsg, setLocMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [addOn, setAddOn] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  // "Tambahkan ke Pesanan" dari modal produk
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<AddDetail>).detail;
      const p = getProduct(d.slug);
      if (!p) return;
      if (p.isPackaging) setPack(p.slug);
      else {
        setSlug(p.slug);
        setVariant(d.variant && p.variants?.some((v) => v.label === d.variant) ? d.variant : '');
      }
      setErrors([]);
    };
    window.addEventListener(ADD_EVENT, on);
    return () => window.removeEventListener(ADD_EVENT, on);
  }, []);

  const p = getProduct(slug);
  const k = getProduct(pack);
  const n = /^\d+$/.test(qty) ? Number(qty) : NaN;
  const today = new Date().toISOString().slice(0, 10);
  const daysLeft = date
    ? Math.round((new Date(date).getTime() - new Date(today).getTime()) / 864e5)
    : null;
  const unit = (p?.price ?? 0) + (k?.price ?? 0);
  const subtotal = p?.price !== undefined && Number.isFinite(n) && n > 0 ? unit * n : undefined;
  const occName = occasions.find((o) => o.id === occ)?.name;
  const addOnNames = addons.filter((a) => addOn.includes(a.id)).map((a) => a.name);

  const message = useMemo(() => {
    const lines = [
      `Halo ${siteConfig.shortName}, saya ${clean(name) || '…'} mau pesan souvenir${occName ? ` untuk ${occName.toLowerCase()}` : ''}${date ? ` tanggal ${new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}` : ''}:`,
      `- ${p?.name ?? '(pilih souvenir)'}${variant ? ` (${variant})` : ''} ${Number.isFinite(n) ? n : '…'} pcs`,
      `- Kemasan: ${k?.name ?? (p?.includedPackaging ? 'bawaan produk' : 'belum dipilih')}`,
    ];
    if (clean(text)) lines.push(`- Teks custom: ${clean(text)}`);
    lines.push(`Kirim ke: ${clean(city) || '…'}.`);
    if (validMaps(maps)) lines.push(`Lokasi (Maps): ${maps.trim()}`);
    if (addOnNames.length) lines.push(`Tambahan: ${addOnNames.join(', ')}.`);
    if (subtotal)
      lines.push(
        `Estimasi subtotal: ${formatRupiah(subtotal)} (harga grosir, sablon & ongkir mohon dikonfirmasi).`,
      );
    return lines.join('\n');
  }, [p, k, variant, n, occName, date, text, name, city, maps, addOnNames, subtotal]);

  const send = () => {
    const errs: string[] = [];
    if (!p) errs.push('Pilih souvenir dulu ya, Kak.');
    if (!Number.isInteger(n) || n < 1 || n > MAX_QTY)
      errs.push(`Isi jumlah dengan angka 1–${MAX_QTY.toLocaleString('id-ID')}.`);
    else if (p?.minOrder && n < p.minOrder)
      errs.push(`Minimal order ${p.name} adalah ${p.minOrder} pcs.`);
    if (!occ) errs.push('Pilih jenis acara.');
    if (!date) errs.push('Isi tanggal acara.');
    else if (date < today) errs.push('Tanggal acara tidak boleh tanggal yang sudah lewat.');
    if (clean(name).length < 2) errs.push('Isi nama pemesan.');
    if (clean(city).length < 3) errs.push('Isi kota tujuan pengiriman.');
    if (maps.trim() && !validMaps(maps)) errs.push('Link lokasi harus dari Google Maps.');
    setErrors(errs);
    if (errs.length) return;
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  // Ambil titik lokasi dari browser (hanya jika diizinkan pengunjung), jadikan link Google Maps
  const useMyLocation = () => {
    if (!('geolocation' in navigator)) return setLocMsg('Browser tidak mendukung lokasi.');
    setLocMsg('Mengambil lokasi…');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setMaps(
          `https://www.google.com/maps?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`,
        );
        setLocMsg('Lokasi berhasil ditambahkan ✓');
      },
      () => setLocMsg('Izin lokasi ditolak. Tempel link Google Maps secara manual ya, Kak.'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const t = document.createElement('textarea');
      t.value = message;
      document.body.append(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
      <div className="grid gap-4 rounded-3xl border border-line bg-surface p-5 sm:grid-cols-2 sm:p-8">
        <div className="sm:col-span-2">
          <label htmlFor="o-nama" className={label}>
            Nama pemesan *
          </label>
          <input
            id="o-nama"
            maxLength={50}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="mis. Siti Aminah"
            autoComplete="name"
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="o-produk" className={label}>
            Souvenir *
          </label>
          <select
            id="o-produk"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setVariant('');
            }}
            className={field}
          >
            <option value="">Pilih souvenir</option>
            {souvenirs.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        {p?.variants && p.variants.length > 0 && (
          <div className="sm:col-span-2">
            <label htmlFor="o-varian" className={label}>
              Pilihan / varian
            </label>
            <select
              id="o-varian"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className={field}
            >
              <option value="">Bebas / tanya admin</option>
              {p.variants.map((v) => (
                <option key={v.label} value={v.label}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="o-kemasan" className={label}>
            Kemasan (opsional)
          </label>
          <select
            id="o-kemasan"
            value={pack}
            onChange={(e) => setPack(e.target.value)}
            className={field}
          >
            <option value="">
              {p?.includedPackaging ? `Bawaan: ${p.includedPackaging}` : 'Tanpa / tanya admin'}
            </option>
            {packs.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="o-jumlah" className={label}>
            Jumlah (pcs) *
          </label>
          <input
            id="o-jumlah"
            inputMode="numeric"
            value={qty}
            onChange={(e) => setQty(e.target.value.replace(/\D/g, '').slice(0, 5))}
            placeholder={p?.minOrder ? `min. ${p.minOrder}` : 'mis. 100'}
            className={field}
          />
          {p?.minOrder && <p className="mt-1 text-xs text-muted">Minimal order {p.minOrder} pcs</p>}
        </div>
        <div>
          <label htmlFor="o-acara" className={label}>
            Jenis acara *
          </label>
          <select
            id="o-acara"
            value={occ}
            onChange={(e) => setOcc(e.target.value as OccasionId | '')}
            className={field}
          >
            <option value="">Pilih acara</option>
            {occasions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="o-tanggal" className={label}>
            Tanggal acara *
          </label>
          <input
            id="o-tanggal"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={field}
          />
          {daysLeft !== null && daysLeft >= 0 && daysLeft < LEAD_DAYS && (
            <p
              role="status"
              className="mt-1.5 rounded-lg bg-surface-2 px-3 py-2 text-xs font-semibold text-accent"
            >
              Acara tinggal {daysLeft} hari. Kami sarankan pemesanan H-1 bulan; silakan konfirmasi
              ketersediaan ke admin dulu ya, Kak.
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="o-teks" className={label}>
            Teks custom (nama & tanggal)
          </label>
          <input
            id="o-teks"
            maxLength={80}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="mis. The Wedding of Rani & Dimas · 12.12.2026"
            className={field}
          />
          <p className="mt-1 text-right text-xs text-muted">{text.length}/80</p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="o-kota" className={label}>
            Kota tujuan pengiriman *
          </label>
          <input
            id="o-kota"
            maxLength={60}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="mis. Surabaya"
            autoComplete="address-level2"
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="o-maps" className={label}>
            Lokasi pengiriman (Google Maps)
          </label>
          <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
            <input
              id="o-maps"
              type="url"
              inputMode="url"
              maxLength={300}
              value={maps}
              onChange={(e) => setMaps(e.target.value)}
              placeholder="Tempel link Google Maps di sini"
              className={`${field.replace('mt-1.5 ', '')} sm:flex-1`}
            />
            <button
              type="button"
              onClick={useMyLocation}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold hover:border-accent hover:text-accent"
            >
              📍 Gunakan Lokasi Saya
            </button>
          </div>
          <p className="mt-1 text-xs text-muted" aria-live="polite">
            {locMsg || 'Opsional. Di Google Maps: tekan lama titik lokasi → Bagikan → Salin link.'}
          </p>
        </div>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Tambahan</legend>
          {addons.map((a) => (
            <label
              key={a.id}
              className="mt-2 flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border border-line p-3"
            >
              <input
                type="checkbox"
                checked={addOn.includes(a.id)}
                onChange={(e) =>
                  setAddOn((v) => (e.target.checked ? [...v, a.id] : v.filter((x) => x !== a.id)))
                }
                className="mt-1 size-4 accent-[var(--accent)]"
              />
              <span className="text-sm">
                <span className="font-semibold">{a.name}</span> · {formatRupiah(a.price)}
                <span className="block text-xs text-muted">{a.note}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-sm">
          <p className="flex items-center gap-2 bg-[#075e54] px-4 py-3 text-sm font-semibold text-white">
            <WhatsAppIcon className="size-4" /> Pratinjau pesan WhatsApp
          </p>
          <div className="bg-[#ece5dd] p-4">
            <p
              aria-live="polite"
              className="ml-auto max-w-[95%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-sm leading-relaxed whitespace-pre-line break-words text-[#111b21] shadow-sm"
            >
              {message}
            </p>
          </div>
          <div className="p-5">
            <p className="text-sm">
              <span className="font-semibold">Estimasi subtotal: </span>
              {subtotal ? formatRupiah(subtotal) : 'pilih souvenir & jumlah'}
            </p>
            <p className="mt-1 text-xs text-muted">
              Harga grosir, biaya sablon, dan ongkir dikonfirmasi admin.
            </p>
            {errors.length > 0 && (
              <ul
                role="alert"
                className="mt-3 list-inside list-disc text-sm font-semibold text-accent"
              >
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onClick={send}
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1f7a46] font-semibold text-white hover:brightness-110"
            >
              <WhatsAppIcon className="size-5" /> Kirim Pesanan via WhatsApp
            </button>
            <button
              type="button"
              onClick={copyMessage}
              className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line text-sm font-semibold hover:border-accent hover:text-accent"
            >
              {copied ? 'Pesan disalin ✓' : 'Salin Pesan'}
            </button>
            <p className="sr-only" aria-live="polite">
              {copied ? 'Isi pesan disalin' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
