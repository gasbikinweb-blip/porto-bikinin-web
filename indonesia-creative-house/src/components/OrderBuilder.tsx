'use client';

// Penyusun pesan WhatsApp untuk acara: dihitung di browser, tanpa <form> submit dan tanpa penyimpanan.
import { useState } from 'react';
import { WhatsAppIcon } from './icons';
import { formatRupiah, getItem, menu } from '@/data/menu';
import { eventTypes, LEAD_DAYS } from '@/data/site';
import { buildWhatsAppLink, orderFormMessage } from '@/lib/config';

export type OrderLines = Record<string, number>;

const field = 'min-h-11 w-full rounded-xl border border-line bg-white px-4 text-base';
const label = 'mb-1 block text-sm font-bold';

const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const dateAfter = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return isoLocal(d);
};

// Buang baris baru dan karakter kontrol dari teks bebas
const clean = (s: string) =>
  Array.from(s)
    .map((c) => (c.charCodeAt(0) < 32 ? ' ' : c))
    .join('')
    .trim();

export function OrderBuilder({
  lines,
  setLines,
}: {
  lines: OrderLines;
  setLines: (fn: (cur: OrderLines) => OrderLines) => void;
}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [eventType, setEventType] = useState('');
  const [pemesan, setPemesan] = useState('');
  const [penerima, setPenerima] = useState('');
  const [alamat, setAlamat] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [lokasiInfo, setLokasiInfo] = useState('');
  const [mencari, setMencari] = useState(false);
  const [hp, setHp] = useState('');
  const [bon, setBon] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const slugs = Object.keys(lines);
  const available = menu.filter((m) => !lines[m.slug]);
  const priced = slugs.filter((s) => getItem(s)?.price);
  const subtotal = priced.reduce((sum, s) => sum + (getItem(s)?.price ?? 0) * (lines[s] ?? 0), 0);
  const tooSoon = date !== '' && date < dateAfter(LEAD_DAYS) && date >= dateAfter(0);

  const add = (slug: string) => {
    const item = getItem(slug); // Whitelist dari data
    if (item) setLines((cur) => ({ ...cur, [slug]: item.minOrder ?? 1 }));
  };
  const remove = (slug: string) =>
    setLines((cur) => {
      const next = { ...cur };
      delete next[slug];
      return next;
    });

  // Lokasi hanya diminta saat tombol diklik dan hanya masuk ke pesan WhatsApp
  const pakaiLokasi = () => {
    if (!navigator.geolocation) {
      setLokasiInfo('Browser ini tidak mendukung lokasi. Tulis alamatnya saja ya, Kak.');
      return;
    }
    setMencari(true);
    setLokasiInfo('');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLokasi(
          `https://www.google.com/maps?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`,
        );
        setMencari(false);
      },
      () => {
        setLokasiInfo('Lokasi tidak bisa diambil. Cek izin lokasi atau tulis alamatnya ya, Kak.');
        setMencari(false);
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  };

  const send = () => {
    const errs: string[] = [];
    if (!slugs.length) errs.push('Pilih minimal satu menu ya, Kak.');
    for (const s of slugs) {
      const item = getItem(s);
      const qty = lines[s] ?? 0;
      if (!item) continue;
      if (!Number.isInteger(qty) || qty < (item.minOrder ?? 1)) {
        errs.push(`Jumlah ${item.name} minimal ${item.minOrder ?? 1}.`);
      }
    }
    if (!date) errs.push('Isi tanggal acara ya, Kak.');
    else if (date < dateAfter(0)) errs.push('Tanggal acara tidak boleh tanggal yang sudah lewat.');
    if (!clean(pemesan)) errs.push('Isi nama pemesan ya, Kak.');
    if (!time) errs.push('Isi jam sampai ya, Kak.');
    if (!clean(penerima)) errs.push('Isi nama penerima ya, Kak.');
    if (!clean(alamat)) errs.push('Isi alamat tujuan dan patokannya ya, Kak.');
    if (!/^[0-9+\-\s]{8,20}$/.test(clean(hp)))
      errs.push('Isi nomor HP penerima dengan benar ya, Kak.');
    if (!clean(bon)) errs.push('Isi nama untuk bon/kuitansi ya, Kak.');
    setErrors(errs);
    if (errs.length) return;

    const tanggal = new Date(`${date}T00:00:00`).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const tambahan = [];
    if (eventType) tambahan.push(`Jenis acara: ${eventType}`);
    if (clean(notes)) tambahan.push(`Catatan: ${clean(notes)}`);
    const message = orderFormMessage({
      tanggal,
      pemesan: clean(pemesan),
      jam: time,
      pesanan: slugs.map((s) => {
        const item = getItem(s);
        return `${item?.name} ${lines[s]} ${item?.unit}`;
      }),
      penerima: clean(penerima),
      alamat: clean(alamat),
      lokasi,
      hp: clean(hp),
      bon: clean(bon),
      tambahan,
    });
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pesan-acara" className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="reveal font-serif text-4xl text-accent sm:text-5xl">Pesan untuk acara</h2>
        <p className="reveal mt-2 text-muted">
          Isi rincian di bawah, nanti pesannya tersusun otomatis di WhatsApp. Data tidak kami
          simpan.
        </p>

        <div className="mt-8 space-y-5 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div>
            <label htmlFor="tambah-menu" className={label}>
              Tambah menu
            </label>
            <select
              id="tambah-menu"
              className={field}
              value=""
              onChange={(e) => add(e.target.value)}
            >
              <option value="">Pilih menu…</option>
              {available.map((m) => (
                <option key={m.slug} value={m.slug}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {slugs.length > 0 && (
            <ul className="divide-y divide-line rounded-xl border border-line">
              {slugs.map((s) => {
                const item = getItem(s);
                if (!item) return null;
                return (
                  <li key={s} className="flex flex-wrap items-center gap-3 p-3">
                    <label htmlFor={`jumlah-${s}`} className="min-w-0 flex-1 text-sm font-semibold">
                      {item.name}
                      <span className="block text-xs font-normal text-muted">
                        Per {item.unit}
                        {item.minOrder ? `, minimal ${item.minOrder}` : ''}
                      </span>
                    </label>
                    <input
                      id={`jumlah-${s}`}
                      type="number"
                      inputMode="numeric"
                      min={item.minOrder ?? 1}
                      step={1}
                      value={lines[s] ?? ''}
                      onChange={(e) => {
                        const n = Math.floor(Number(e.target.value));
                        setLines((cur) => ({ ...cur, [s]: Number.isFinite(n) ? n : 0 }));
                      }}
                      className="min-h-11 w-24 rounded-xl border border-line px-3 text-base"
                    />
                    <button
                      type="button"
                      onClick={() => remove(s)}
                      aria-label={`Hapus ${item.name}`}
                      className="grid size-11 place-items-center rounded-full border border-line"
                    >
                      ×
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="tanggal" className={label}>
                Hari, tanggal kirim
              </label>
              <input
                id="tanggal"
                type="date"
                min={dateAfter(0)}
                suppressHydrationWarning
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={field}
              />
              {tooSoon && (
                <p className="mt-1 text-sm font-semibold text-accent">
                  Pemesanan sebaiknya H-{LEAD_DAYS}. Konfirmasi dulu ke admin ya, Kak.
                </p>
              )}
            </div>
            <div>
              <label htmlFor="jam" className={label}>
                Jam sampai
              </label>
              <input
                id="jam"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="pemesan" className={label}>
                Nama pemesan
              </label>
              <input
                id="pemesan"
                type="text"
                maxLength={80}
                value={pemesan}
                onChange={(e) => setPemesan(e.target.value)}
                className={field}
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="jenis" className={label}>
                Jenis acara (opsional)
              </label>
              <select
                id="jenis"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className={field}
              >
                <option value="">Pilih…</option>
                {eventTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="pt-2 font-bold">Tujuan kirim</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="penerima" className={label}>
                Nama penerima
              </label>
              <input
                id="penerima"
                type="text"
                maxLength={80}
                value={penerima}
                onChange={(e) => setPenerima(e.target.value)}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="hp" className={label}>
                No HP penerima
              </label>
              <input
                id="hp"
                type="tel"
                inputMode="tel"
                maxLength={20}
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className={field}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="alamat" className={label}>
                Alamat
              </label>
              <textarea
                id="alamat"
                rows={2}
                maxLength={200}
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full rounded-xl border border-line bg-white p-4 text-base"
              />
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={pakaiLokasi}
                  disabled={mencari}
                  className="min-h-11 rounded-full border-2 border-accent px-5 text-sm font-bold text-accent disabled:opacity-60"
                >
                  {mencari ? 'Mencari lokasi…' : 'Pakai Lokasi Saat Ini'}
                </button>
                {lokasi && (
                  <>
                    <a
                      href={lokasi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-sm font-semibold underline"
                    >
                      Cek di Google Maps<span className="sr-only"> (tab baru)</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setLokasi('')}
                      className="min-h-11 text-sm font-semibold text-muted underline"
                    >
                      Hapus lokasi
                    </button>
                  </>
                )}
              </div>
              <p aria-live="polite" className="mt-1 text-sm text-muted">
                {lokasi
                  ? 'Titik lokasi ikut terkirim. Pastikan ini lokasi tujuan kirim ya, Kak.'
                  : lokasiInfo || 'Tetap tulis alamat dan patokannya agar kurir mudah menemukan.'}
              </p>
            </div>
            <div>
              <label htmlFor="bon" className={label}>
                Bon/kuitansi atas nama
              </label>
              <input
                id="bon"
                type="text"
                maxLength={80}
                value={bon}
                onChange={(e) => setBon(e.target.value)}
                className={field}
              />
            </div>
          </div>
          <div>
            <label htmlFor="catatan" className={label}>
              Catatan (opsional)
            </label>
            <textarea
              id="catatan"
              rows={3}
              maxLength={200}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-line bg-white p-4 text-base"
            />
          </div>

          {priced.length > 0 && (
            <p className="rounded-xl bg-blush p-4 text-sm">
              <strong>Estimasi subtotal: {formatRupiah(subtotal)}</strong>
              <br />
              Dari harga mulai untuk {priced.length} menu yang harganya tersedia. Invoice dikirim
              admin setelah form diterima.
            </p>
          )}

          {errors.length > 0 && (
            <ul role="alert" className="list-inside list-disc text-sm font-semibold text-accent">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}

          <button
            type="button"
            onClick={send}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-bold text-white hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-5" />
            Kirim Pesanan via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
