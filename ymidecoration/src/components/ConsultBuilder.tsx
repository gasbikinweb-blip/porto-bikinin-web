'use client';

// Penyusun pesan konsultasi: dihitung di browser, tanpa <form> submit dan tanpa penyimpanan.
import { useState } from 'react';
import { WhatsAppIcon } from './icons';
import { budgets } from '@/data/content';
import { events, eventTypes, palettes, type EventType } from '@/data/events';
import { buildWhatsAppLink, config } from '@/lib/config';

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

export function ConsultBuilder() {
  const [type, setType] = useState<EventType | ''>('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [guests, setGuests] = useState('');
  const [palette, setPalette] = useState('');
  const [paletteNote, setPaletteNote] = useState('');
  const [ref, setRef] = useState('');
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const send = () => {
    const errs: string[] = [];
    const today = isoLocal(new Date());
    if (!type || !types.includes(type)) errs.push('Pilih jenis acara.');
    if (!date) errs.push('Isi tanggal acara.');
    else if (date < today) errs.push('Tanggal acara tidak boleh tanggal yang sudah lewat.');
    if (!clean(venue)) errs.push('Isi kota atau venue acara.');
    const n = guests.trim() === '' ? null : Number(guests);
    if (n !== null && (!Number.isInteger(n) || n < 1 || n > 100000))
      errs.push('Jumlah tamu harus bilangan bulat.');
    setErrors(errs);
    if (errs.length || !type) return;

    const tanggal = new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const nuansa = [palette, clean(paletteNote)].filter(Boolean).join(', ');
    const refEvent = events.find((e) => e.slug === ref);
    const parts = [
      `Halo ${config.name}, saya ingin konsultasi dekorasi ${eventTypes[type].toLowerCase()} tanggal ${tanggal} di ${clean(venue)}`,
    ];
    let msg = parts[0] ?? '';
    if (n) msg += `, sekitar ${n} tamu`;
    if (nuansa) msg += `, nuansa ${nuansa}`;
    msg += '.';
    if (refEvent) msg += ` Saya suka dekorasi ${refEvent.title}.`;
    if (budget) msg += ` Kisaran budget: ${budget}.`;
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="konsultasi" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow">Konsultasi</p>
          <h2 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl">
            Ceritakan
            <br />
            <em className="text-gold-text">rencana Anda</em>
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted">
            Isi rincian singkat di sini, lalu pesannya tersusun otomatis di WhatsApp. Data Anda
            tidak kami simpan di website.
          </p>
        </div>

        <div className="reveal grid gap-8 sm:grid-cols-2">
          <div>
            <label htmlFor="jenis" className={label}>
              Jenis acara
            </label>
            <select
              id="jenis"
              value={type}
              onChange={(e) => setType(e.target.value as EventType)}
              className={field}
            >
              <option value="">Pilih…</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {eventTypes[t]}
                </option>
              ))}
            </select>
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
          <div>
            <label htmlFor="nuansa" className={label}>
              Nuansa warna (opsional)
            </label>
            <select
              id="nuansa"
              value={palette}
              onChange={(e) => setPalette(e.target.value)}
              className={field}
            >
              <option value="">Pilih…</option>
              {palettes.map((p) => (
                <option key={p}>{p}</option>
              ))}
              <option>Putih & Hijau</option>
              <option>Belum tahu</option>
            </select>
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
            <label htmlFor="referensi" className={label}>
              Acara referensi (opsional)
            </label>
            <select
              id="referensi"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              className={field}
            >
              <option value="">Tidak ada</option>
              {events.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className={label}>
              Kisaran budget (opsional)
            </label>
            <select
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={field}
            >
              <option value="">Pilih…</option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
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
        </div>
      </div>
    </section>
  );
}
