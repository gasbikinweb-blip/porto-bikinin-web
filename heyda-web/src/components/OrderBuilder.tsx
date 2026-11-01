'use client';

// Penyusun pesanan WhatsApp. Tidak ada <form>, tidak ada penyimpanan: hanya membuat teks pesan.
import { useState } from 'react';
import { kecamatanLabel, type Kecamatan } from '@/data/kecamatan';
import { variants } from '@/data/variants';
import { buildWhatsAppLink, formatRupiah } from '@/lib/whatsapp';
import { KecamatanSearch } from './KecamatanSearch';
import { WhatsAppIcon } from './icons';

const MAX_QTY = 99;
const MAX_NAME = 50;
const MAX_ADDRESS = 120;
const MAX_NOTE = 150;

// Kotak kasar wilayah DIY, hanya untuk memberi peringatan bila lokasi di luar Jogja
const DIY_BOUNDS = { latMin: -8.25, latMax: -7.5, lngMin: 110.0, lngMax: 110.85 };

type Coords = { lat: number; lng: number };
type GeoState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ok'; coords: Coords; inDiy: boolean }
  | { status: 'error'; message: string };

// Paksa angka bulat 0–99
const clampQty = (n: number) =>
  Number.isFinite(n) ? Math.min(MAX_QTY, Math.max(0, Math.trunc(n))) : 0;
// Buang karakter kontrol & spasi berlebih, potong sesuai batas
const cleanText = (s: string, max: number) =>
  s
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .slice(0, max);

const mapsLink = ({ lat, lng }: Coords) => `https://maps.google.com/?q=${lat},${lng}`;

const geoErrorText: Partial<Record<number, string>> = {
  1: 'Izin lokasi ditolak. Aktifkan izin lokasi di browser, atau pilih kecamatan secara manual ya, Kak.',
  2: 'Lokasi tidak terdeteksi. Coba nyalakan GPS lalu ulangi.',
  3: 'Terlalu lama mencari lokasi. Coba lagi ya, Kak.',
};

const inputClass = 'mt-1 h-12 w-full rounded-xl border border-line bg-white px-4';

export function OrderBuilder() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [name, setName] = useState('');
  const [kecamatan, setKecamatan] = useState<Kecamatan | null>(null);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [geo, setGeo] = useState<GeoState>({ status: 'idle' });

  const chosen = variants.filter((v) => (qty[v.slug] ?? 0) > 0);
  const totalBottles = chosen.reduce((sum, v) => sum + (qty[v.slug] ?? 0), 0);
  const allPriced = chosen.length > 0 && chosen.every((v) => v.price !== undefined);
  const subtotal = chosen.reduce((sum, v) => sum + (v.price ?? 0) * (qty[v.slug] ?? 0), 0);
  const coords = geo.status === 'ok' ? geo.coords : null;

  // Yang masih kurang sebelum pesanan bisa dikirim
  const missing = [
    chosen.length === 0 && 'pilih minimal 1 botol',
    !name.trim() && 'isi nama',
    !kecamatan && !coords && 'pilih kecamatan atau pakai lokasi saat ini',
  ].filter((x): x is string => Boolean(x));
  const ready = missing.length === 0;

  const setOne = (slug: string, n: number) => setQty((q) => ({ ...q, [slug]: clampQty(n) }));

  const useMyLocation = () => {
    if (!('geolocation' in navigator)) {
      setGeo({ status: 'error', message: 'Browser ini tidak mendukung fitur lokasi.' });
      return;
    }
    setGeo({ status: 'loading' });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Dibulatkan 5 desimal (~1 meter), cukup untuk kurir
        const c = {
          lat: Number(pos.coords.latitude.toFixed(5)),
          lng: Number(pos.coords.longitude.toFixed(5)),
        };
        const b = DIY_BOUNDS;
        const inDiy =
          c.lat >= b.latMin && c.lat <= b.latMax && c.lng >= b.lngMin && c.lng <= b.lngMax;
        setGeo({ status: 'ok', coords: c, inDiy });
      },
      (err) =>
        setGeo({
          status: 'error',
          message: geoErrorText[err.code] ?? 'Lokasi tidak terdeteksi. Coba lagi ya, Kak.',
        }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    );
  };

  // Setiap bagian di paragraf sendiri supaya pesan lega dibaca admin
  const message = [
    'Halo Heyda, saya mau pesan Sari Kacang Ijo:',
    ...chosen.map((v) => `• ${v.shortName}: ${qty[v.slug]} botol`),
    `Atas nama: ${name.trim() || '-'}`,
    kecamatan && `Kirim ke: ${kecamatanLabel(kecamatan)}`,
    address.trim() && `Alamat / patokan: ${address.trim()}`,
    coords && `Lokasi saya: ${mapsLink(coords)}`,
    note.trim() && `Catatan: ${note.trim()}`,
    'Mohon info total dan cara pembayarannya ya. Terima kasih, Kak.',
  ]
    .filter(Boolean)
    .join('\n\n');

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <fieldset className="rounded-3xl border border-line bg-background p-5 sm:p-6">
          {/* legend bawaan menempel di garis border; judul tampil lewat <p> di dalam kotak */}
          <legend className="sr-only">1. Pilih varian & jumlah</legend>
          <p aria-hidden="true" className="font-serif text-xl">
            1. Pilih varian & jumlah
          </p>
          <ul className="mt-2 divide-y divide-line">
            {variants.map((v) => {
              const n = qty[v.slug] ?? 0;
              const inputId = `jumlah-${v.slug}`;
              return (
                <li key={v.slug} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <label htmlFor={inputId} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-3 rounded-full"
                      style={{ background: v.accentColor }}
                    />
                    <span>
                      <span className="block font-bold">{v.shortName}</span>
                      <span className="text-sm text-muted">
                        {v.price !== undefined
                          ? `${formatRupiah(v.price)} / botol`
                          : 'Harga via admin'}
                      </span>
                    </span>
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setOne(v.slug, n - 1)}
                      disabled={n === 0}
                      aria-label={`Kurangi ${v.shortName}`}
                      className="grid size-11 place-items-center rounded-full border border-line text-xl font-bold disabled:opacity-40"
                    >
                      −
                    </button>
                    <input
                      id={inputId}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={MAX_QTY}
                      step={1}
                      value={n}
                      onChange={(e) => setOne(v.slug, Number(e.target.value))}
                      className="h-11 w-14 rounded-xl border border-line bg-white text-center font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setOne(v.slug, n + 1)}
                      disabled={n === MAX_QTY}
                      aria-label={`Tambah ${v.shortName}`}
                      className="grid size-11 place-items-center rounded-full bg-accent text-xl font-bold text-white disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 flex justify-between border-t border-line pt-3 font-semibold">
            <span>Total botol</span>
            <span>{totalBottles}</span>
          </p>
          {allPriced && (
            <p className="mt-1 flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </p>
          )}
          <p className="mt-2 text-xs text-muted">
            Total final dikonfirmasi admin. Free ongkir se-Jogja.
          </p>
        </fieldset>

        <fieldset className="flex flex-col gap-4 rounded-3xl bg-surface-2 p-5 sm:p-6">
          <legend className="sr-only">2. Data pengiriman</legend>
          <p aria-hidden="true" className="font-serif text-xl">
            2. Data pengiriman
          </p>
          <div>
            <label htmlFor="nama" className="block font-semibold">
              Atas nama <span className="text-muted">(wajib)</span>
            </label>
            <input
              id="nama"
              type="text"
              autoComplete="name"
              maxLength={MAX_NAME}
              value={name}
              onChange={(e) => setName(cleanText(e.target.value, MAX_NAME))}
              placeholder="Nama penerima"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="kecamatan" className="block font-semibold">
              Kecamatan <span className="text-muted">(wajib, atau pakai lokasi)</span>
            </label>
            <KecamatanSearch value={kecamatan} onChange={setKecamatan} />
          </div>

          <div className="rounded-2xl border border-dashed border-accent/40 bg-background/70 p-4">
            <button
              type="button"
              onClick={useMyLocation}
              disabled={geo.status === 'loading'}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-accent px-4 font-bold text-accent hover:bg-white disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                <circle cx="12" cy="12" r="7" />
              </svg>
              {geo.status === 'loading'
                ? 'Mencari lokasi...'
                : geo.status === 'ok'
                  ? 'Perbarui lokasi saat ini'
                  : 'Pakai lokasi saya saat ini'}
            </button>
            <div aria-live="polite" className="mt-2 text-sm">
              {geo.status === 'idle' && (
                <p className="text-muted">
                  Biar nggak ribet, titik lokasi Kakak akan dikirim sebagai link Google Maps di
                  pesan WA. Lokasi tidak disimpan di website ini.
                </p>
              )}
              {geo.status === 'ok' && (
                <p className="text-accent">
                  ✓ Lokasi terdeteksi.{' '}
                  <a
                    href={mapsLink(geo.coords)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline"
                  >
                    Cek di peta
                  </a>
                  {!geo.inDiy && (
                    <span className="mt-1 block text-[#9a4a12]">
                      Sepertinya lokasi ini di luar DIY. Free ongkir khusus Jogja, admin akan
                      konfirmasi ongkirnya ya, Kak.
                    </span>
                  )}{' '}
                  <button
                    type="button"
                    onClick={() => setGeo({ status: 'idle' })}
                    className="font-bold underline"
                  >
                    Hapus lokasi
                  </button>
                </p>
              )}
              {geo.status === 'error' && <p className="text-[#9a4a12]">{geo.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="alamat" className="block font-semibold">
              Alamat / patokan <span className="text-muted">(opsional)</span>
            </label>
            <input
              id="alamat"
              type="text"
              autoComplete="street-address"
              maxLength={MAX_ADDRESS}
              value={address}
              onChange={(e) => setAddress(cleanText(e.target.value, MAX_ADDRESS))}
              placeholder="Mis. Jl. Kaliurang km 5, dekat masjid"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="catatan" className="block font-semibold">
              Catatan <span className="text-muted">(opsional)</span>
            </label>
            <textarea
              id="catatan"
              rows={2}
              maxLength={MAX_NOTE}
              value={note}
              onChange={(e) => setNote(cleanText(e.target.value, MAX_NOTE))}
              placeholder="Mis. kirim sore hari"
              aria-describedby="catatan-info"
              className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3"
            />
            <p id="catatan-info" className="mt-1 text-xs text-muted">
              {note.length}/{MAX_NOTE} karakter
            </p>
          </div>
        </fieldset>
      </div>

      {/* 3. Pratinjau pesan WA */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-line shadow-lg">
          <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
            <span className="grid size-10 place-items-center rounded-full bg-white/15">
              <WhatsAppIcon className="size-5" />
            </span>
            <div>
              <p className="font-bold">3. Pratinjau pesan</p>
              <p className="text-xs text-white/80">Begini pesan yang akan Kakak kirim ke Heyda</p>
            </div>
          </div>
          <div className="bg-[#ece5dd] p-4">
            <div
              aria-live="polite"
              className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-sm whitespace-pre-wrap text-[#111b21] shadow-sm"
            >
              {message}
            </div>
          </div>
          <div className="bg-white p-4">
            {ready ? (
              <a
                href={buildWhatsAppLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 font-bold text-[#0b3d1f] hover:brightness-95"
              >
                <WhatsAppIcon className="size-5" /> Kirim Pesanan via WhatsApp
              </a>
            ) : (
              <p className="rounded-full border border-dashed border-line px-4 py-3 text-center text-sm font-semibold text-muted">
                Sebelum kirim: {missing.join(', ')} ya, Kak
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
