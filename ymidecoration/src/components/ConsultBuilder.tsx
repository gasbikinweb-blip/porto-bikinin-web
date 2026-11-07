'use client';

// Penyusun pesan konsultasi: dihitung di browser, tanpa <form> submit dan tanpa penyimpanan.
// Pratinjau WhatsApp diperbarui langsung saat formulir diisi.
import { useEffect, useRef, useState } from 'react';
import { CloseIcon, PinIcon, WhatsAppIcon } from './icons';
import { Select } from './Select';
import { budgets } from '@/data/content';
import { events, eventTypes, palettes, type EventType } from '@/data/events';
import { buildWhatsAppLink, config, eventUrl } from '@/lib/config';

const field =
  'min-h-12 w-full border-0 border-b border-line bg-transparent px-0 text-base focus:border-gold focus:ring-0';
const label = 'block text-xs tracking-[0.18em] text-muted uppercase';

const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

// Buang karakter kontrol dari teks bebas
const clean = (s: string) =>
  Array.from(s)
    .map((c) => (c.charCodeAt(0) < 32 ? ' ' : c))
    .join('')
    .trim();

const types = Object.keys(eventTypes) as EventType[];

// Foto referensi hanya diproses di browser pengguna, tidak diunggah ke server mana pun
const MAX_PHOTOS = 4;
const MAX_SIZE = 10 * 1024 * 1024;
type Photo = { file: File; url: string };
const paletteOptions = [...palettes, 'Putih & Hijau', 'Belum tahu'];

const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export function ConsultBuilder() {
  const [type, setType] = useState<EventType | ''>('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [locating, setLocating] = useState(false);
  const [locationInfo, setLocationInfo] = useState('');
  const [guests, setGuests] = useState('');
  const [palette, setPalette] = useState('');
  const [paletteNote, setPaletteNote] = useState('');
  const [ref, setRef] = useState('');
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoInfo, setPhotoInfo] = useState('');
  const [notice, setNotice] = useState('');
  const urls = useRef<string[]>([]);

  // Bersihkan URL pratinjau saat komponen dilepas
  useEffect(() => () => urls.current.forEach((u) => URL.revokeObjectURL(u)), []);

  const addPhotos = (list: FileList | null) => {
    if (!list) return;
    const ok: Photo[] = [];
    let skipped = 0;
    for (const file of Array.from(list)) {
      if (!file.type.startsWith('image/') || file.size > MAX_SIZE) {
        skipped++;
        continue;
      }
      if (photos.length + ok.length >= MAX_PHOTOS) break;
      const url = URL.createObjectURL(file);
      urls.current.push(url);
      ok.push({ file, url });
    }
    setPhotos((p) => [...p, ...ok]);
    setPhotoInfo(
      skipped
        ? `${skipped} file dilewati. Gunakan gambar maksimal 10 MB.`
        : photos.length + ok.length >= MAX_PHOTOS
          ? `Maksimal ${MAX_PHOTOS} foto.`
          : '',
    );
  };

  const removePhoto = (url: string) => {
    URL.revokeObjectURL(url);
    urls.current = urls.current.filter((u) => u !== url);
    setPhotos((p) => p.filter((x) => x.url !== url));
  };

  const refEvent = events.find((e) => e.slug === ref);
  const guestCount = guests.trim() === '' ? null : Number(guests);

  // Satu sumber pesan: dipakai untuk pratinjau dan untuk WhatsApp
  const lines: [string, string][] = [];
  if (type) lines.push(['Jenis acara', eventTypes[type]]);
  if (date) lines.push(['Tanggal', longDate(date)]);
  if (clean(venue)) lines.push(['Kota / venue', clean(venue)]);
  if (clean(address)) lines.push(['Alamat', clean(address)]);
  if (location) lines.push(['Titik lokasi', location]);
  if (guestCount && Number.isInteger(guestCount))
    lines.push(['Perkiraan tamu', `${guestCount} orang`]);
  const nuansa = [palette, clean(paletteNote)].filter(Boolean).join(', ');
  if (nuansa) lines.push(['Nuansa', nuansa]);
  if (refEvent) lines.push(['Referensi', `${refEvent.title} ${eventUrl(refEvent.slug)}`]);
  if (budget) lines.push(['Budget', budget]);
  if (photos.length) lines.push(['Foto referensi', `${photos.length} foto terlampir`]);
  const greeting = `Halo ${config.name}, saya ingin konsultasi dekorasi.`;
  const message = [greeting, '', ...lines.map(([k, v]) => `${k}: ${v}`)].join('\n');

  const useLocation = () => {
    if (!navigator.geolocation) {
      setLocationInfo('Browser ini tidak mendukung lokasi. Tulis alamatnya saja ya.');
      return;
    }
    setLocating(true);
    setLocationInfo('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation(
          `https://www.google.com/maps?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`,
        );
        setLocating(false);
      },
      () => {
        setLocationInfo('Lokasi tidak bisa diambil. Cek izin lokasi atau tulis alamatnya ya.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  };

  const send = async () => {
    const errs: string[] = [];
    if (!type || !types.includes(type)) errs.push('Pilih jenis acara.');
    if (!date) errs.push('Isi tanggal acara.');
    else if (date < isoLocal(new Date()))
      errs.push('Tanggal acara tidak boleh tanggal yang sudah lewat.');
    if (!clean(venue)) errs.push('Isi kota atau venue acara.');
    if (
      guestCount !== null &&
      (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 100000)
    )
      errs.push('Jumlah tamu harus bilangan bulat.');
    setErrors(errs);
    if (errs.length) return;
    setNotice('');

    // Ada foto: kirim lewat menu Bagikan HP (teks + foto sekaligus), pilih WhatsApp lalu chat YMI
    const files = photos.map((p) => p.file);
    if (files.length && navigator.canShare?.({ files, text: message })) {
      try {
        await navigator.share({ files, text: message });
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return; // dibatalkan pengguna
      }
    }
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
    if (files.length) {
      setNotice(
        'Browser ini belum bisa mengirim foto langsung. Pesan sudah terbuka di WhatsApp, silakan lampirkan foto referensinya di chat ya.',
      );
    }
  };

  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <section id="konsultasi" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow">Konsultasi</p>
          <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
            Ceritakan <em className="text-gold-text">rencana Anda</em>
          </h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Isi rincian acara Anda. Pesannya langsung tersusun di pratinjau ini, jadi Anda bisa
            melihatnya sebelum dikirim. Data tidak kami simpan di website.
          </p>

          {/* Pratinjau WhatsApp */}
          <figure
            data-anim="zoom"
            className="reveal mt-8 overflow-hidden rounded-3xl border border-line bg-[#efe7dc] shadow-[0_30px_60px_-35px_rgb(30_26_22/0.45)]"
          >
            <figcaption className="flex items-center gap-3 bg-[#1f4d3a] px-4 py-3 text-white">
              <span className="grid size-9 place-items-center rounded-full bg-paper font-serif text-sm text-gold-text">
                Ym
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-medium">{config.name}</span>
                <span className="block text-xs text-white/70">Pratinjau pesan Anda</span>
              </span>
            </figcaption>
            <div className="p-4 sm:p-5">
              <div
                aria-live="polite"
                className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[#dcf3d0] p-3.5 text-[0.9rem] leading-relaxed text-[#1b1b1b] shadow-sm"
              >
                {photos.length > 0 && (
                  <ul
                    className={`-mx-1 -mt-1 mb-3 grid gap-1 overflow-hidden rounded-xl ${photos.length > 1 ? 'grid-cols-2' : ''}`}
                  >
                    {photos.map((p) => (
                      <li key={p.url} className="relative aspect-square bg-white/60">
                        {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau lokal (blob:) */}
                        <img
                          src={p.url}
                          alt="Foto referensi dari Anda"
                          className="size-full object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                )}
                <p>{greeting}</p>
                {lines.length === 0 ? (
                  <p className="mt-2 text-[#5e6b5a] italic">
                    Rincian acara akan muncul di sini saat formulir diisi.
                  </p>
                ) : (
                  <dl className="mt-2 space-y-0.5">
                    {lines
                      .filter(([k]) => k !== 'Titik lokasi')
                      .map(([k, v]) => (
                        <div key={k} className="break-words">
                          <dt className="inline">{k}: </dt>
                          <dd className="inline">{v}</dd>
                        </div>
                      ))}
                  </dl>
                )}
                {location && (
                  <a
                    href={location}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-3 rounded-xl bg-white/70 p-2.5 hover:bg-white"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#1f4d3a] text-white">
                      <PinIcon className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">Titik lokasi acara</span>
                      <span className="block truncate text-xs text-[#5e6b5a]">{location}</span>
                    </span>
                    <span className="sr-only"> (buka Google Maps, tab baru)</span>
                  </a>
                )}
                <p
                  className="mt-1.5 text-right text-[0.7rem] text-[#5e6b5a]"
                  suppressHydrationWarning
                >
                  {time} ✓✓
                </p>
              </div>
            </div>
          </figure>
        </div>

        <div className="reveal grid content-start gap-8 sm:grid-cols-2">
          <div>
            <p className={label} aria-hidden="true">
              Jenis acara
            </p>
            <div className="mt-2">
              <Select
                label="Jenis acara"
                hideLabel
                full
                value={type}
                options={[
                  { value: '', label: 'Pilih jenis acara' },
                  ...types.map((t) => ({ value: t, label: eventTypes[t] })),
                ]}
                onChange={(v) => setType(v as EventType | '')}
              />
            </div>
          </div>
          <div>
            <label htmlFor="tanggal" className={label}>
              Tanggal acara
            </label>
            <input
              id="tanggal"
              type="date"
              min={isoLocal(new Date())}
              suppressHydrationWarning
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="venue" className={label}>
              Kota / venue
            </label>
            <input
              id="venue"
              type="text"
              maxLength={80}
              placeholder="mis. Gedung X, Surabaya"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <label htmlFor="tamu" className={label}>
              Perkiraan tamu (opsional)
            </label>
            <input
              id="tamu"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={field}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="alamat" className={label}>
              Alamat lokasi acara (opsional)
            </label>
            <textarea
              id="alamat"
              rows={2}
              maxLength={200}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${field} resize-none py-3`}
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={useLocation}
                disabled={locating}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink px-5 text-sm transition hover:bg-ink hover:text-paper disabled:opacity-60"
              >
                <PinIcon className="size-4" />
                {locating
                  ? 'Mencari lokasi…'
                  : location
                    ? 'Perbarui lokasi'
                    : 'Pakai lokasi saat ini'}
              </button>
              {location && (
                <button
                  type="button"
                  onClick={() => setLocation('')}
                  className="min-h-11 text-sm text-muted underline underline-offset-4"
                >
                  Hapus lokasi
                </button>
              )}
            </div>
            <p aria-live="polite" className="mt-2 text-sm text-muted">
              {location
                ? 'Titik lokasi ikut terkirim. Pastikan Anda sedang berada di lokasi acara.'
                : locationInfo ||
                  'Berguna kalau Anda sedang berada di venue, misalnya saat survei.'}
            </p>
          </div>

          <div>
            <p className={label} aria-hidden="true">
              Nuansa warna (opsional)
            </p>
            <div className="mt-2">
              <Select
                label="Nuansa warna"
                hideLabel
                full
                value={palette}
                options={[
                  { value: '', label: 'Pilih nuansa' },
                  ...paletteOptions.map((p) => ({ value: p, label: p })),
                ]}
                onChange={setPalette}
              />
            </div>
          </div>
          <div>
            <label htmlFor="nuansa-catatan" className={label}>
              Detail tema (opsional)
            </label>
            <input
              id="nuansa-catatan"
              type="text"
              maxLength={80}
              placeholder="mis. rustic, banyak bunga putih"
              value={paletteNote}
              onChange={(e) => setPaletteNote(e.target.value)}
              className={field}
            />
          </div>
          <div>
            <p className={label} aria-hidden="true">
              Acara referensi (opsional)
            </p>
            <div className="mt-2">
              <Select
                label="Acara referensi"
                hideLabel
                full
                value={ref}
                options={[
                  { value: '', label: 'Tidak ada' },
                  ...events.map((e) => ({ value: e.slug, label: e.title })),
                ]}
                onChange={setRef}
              />
            </div>
          </div>
          <div>
            <p className={label} aria-hidden="true">
              Kisaran budget (opsional)
            </p>
            <div className="mt-2">
              <Select
                label="Kisaran budget"
                hideLabel
                full
                value={budget}
                options={[
                  { value: '', label: 'Pilih budget' },
                  ...budgets.map((b) => ({ value: b, label: b })),
                ]}
                onChange={setBudget}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <p className={label}>Foto referensi (opsional)</p>
            <p className="mt-1 text-sm text-muted">
              Punya contoh dekorasi impian? Tambahkan hingga {MAX_PHOTOS} foto. Foto tidak diunggah
              ke website, hanya ikut dikirim ke WhatsApp.
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {photos.map((p, i) => (
                <li
                  key={p.url}
                  className="relative size-24 overflow-hidden rounded-2xl border border-line"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau lokal (blob:) */}
                  <img
                    src={p.url}
                    alt={`Foto referensi ${i + 1}`}
                    className="size-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(p.url)}
                    aria-label={`Hapus foto referensi ${i + 1}`}
                    className="absolute top-1 right-1 grid size-8 place-items-center rounded-full bg-night/70 text-white backdrop-blur hover:bg-night"
                  >
                    <CloseIcon className="size-4" />
                  </button>
                </li>
              ))}
              {photos.length < MAX_PHOTOS && (
                <li>
                  <label className="grid size-24 cursor-pointer place-items-center rounded-2xl border border-dashed border-gold bg-ivory text-center text-xs text-gold-text transition hover:bg-paper focus-within:ring-2 focus-within:ring-gold">
                    <span>
                      <span aria-hidden="true" className="block text-2xl leading-none">
                        +
                      </span>
                      Tambah foto
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        addPhotos(e.target.files);
                        e.target.value = '';
                      }}
                    />
                  </label>
                </li>
              )}
            </ul>
            {photoInfo && (
              <p aria-live="polite" className="mt-2 text-sm text-muted">
                {photoInfo}
              </p>
            )}
          </div>

          {errors.length > 0 && (
            <ul role="alert" className="list-inside list-disc text-sm text-[#9b2c2c] sm:col-span-2">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={send}
            className="inline-flex min-h-14 items-center justify-center gap-3 bg-ink px-8 text-sm tracking-[0.18em] text-paper uppercase transition hover:bg-gold-text sm:col-span-2"
          >
            <WhatsAppIcon className="size-5" />
            Kirim via WhatsApp
          </button>
          {photos.length > 0 && !notice && (
            <p className="text-sm text-muted sm:col-span-2">
              Di HP, menu Bagikan akan terbuka: pilih WhatsApp lalu chat {config.name} agar pesan
              dan foto terkirim sekaligus.
            </p>
          )}
          {notice && (
            <p role="status" className="rounded-2xl bg-ivory p-4 text-sm sm:col-span-2">
              {notice}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
