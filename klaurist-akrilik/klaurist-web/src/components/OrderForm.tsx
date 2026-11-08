'use client';

// Penyusun pesan WhatsApp: tanpa <form> submit dan tanpa penyimpanan. Semua pilihan di-whitelist.
import { useEffect, useState } from 'react';
import { LocationTools } from './LocationTools';
import { SectionTitle } from './SectionTitle';
import { Select } from './Select';
import { WhatsAppIcon } from './icons';
import { addons } from '@/data/addons';
import { boards } from '@/data/boards';
import { bouquets } from '@/data/bouquets';
import { getCatalogItem, ORDER_EVENT, type OrderEventDetail } from '@/data/catalog';
import { eventTypes, LEAD_DAYS } from '@/data/site';
import { buildWhatsAppLink, formatRupiah } from '@/lib/whatsapp';

type Tab = 'papan' | 'bucket';

const field = 'mt-1 min-h-12 w-full rounded-xl border border-line bg-field px-4 text-base';
const label = 'block text-sm font-medium';

const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dateAfter = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return isoLocal(d);
};
// Buang karakter kontrol & spasi berlebih, potong sesuai batas
const clean = (s: string, max: number) =>
  s
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
const longDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export function OrderForm() {
  const [tab, setTab] = useState<Tab>('papan');
  // Sewa papan
  const [board, setBoard] = useState(boards[0]?.slug ?? '');
  const [eventType, setEventType] = useState<string>(eventTypes[0]);
  const [venue, setVenue] = useState('');
  const [greeting, setGreeting] = useState('');
  // Bucket
  const [bouquet, setBouquet] = useState(bouquets[0]?.slug ?? '');
  const [variant, setVariant] = useState(bouquets[0]?.variants[0]?.label ?? '');
  const [qty, setQty] = useState(1);
  const [delivery, setDelivery] = useState<'antar' | 'ambil'>('antar');
  const [area, setArea] = useState('');
  const [pin, setPin] = useState<string | null>(null);
  // Bersama
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const bouquetItem = bouquets.find((b) => b.slug === bouquet);
  const boardItem = boards.find((b) => b.slug === board);

  // Diisi dari tombol "Tambahkan ke Pesanan" di modal
  useEffect(() => {
    const onAdd = (e: Event) => {
      const { slug, variant: v } = (e as CustomEvent<OrderEventDetail>).detail;
      const item = getCatalogItem(slug); // whitelist
      if (!item) return;
      if (item.kind === 'papan') {
        setTab('papan');
        setBoard(item.slug);
      } else {
        setTab('bucket');
        setBouquet(item.slug);
        setVariant(item.variants.some((x) => x.label === v) ? v! : (item.variants[0]?.label ?? ''));
      }
    };
    window.addEventListener(ORDER_EVENT, onAdd);
    return () => window.removeEventListener(ORDER_EVENT, onAdd);
  }, []);

  const tooSoon = date !== '' && date >= dateAfter(0) && date < dateAfter(LEAD_DAYS);
  const addonNames = addons.filter((a) => picked.includes(a.id)).map((a) => a.name);

  // Estimasi hanya dari harga yang ada di data
  const unitPrice =
    tab === 'papan'
      ? boardItem?.rentalPrice
      : bouquetItem?.variants.find((v) => v.label === variant)?.price;
  const addonPrices = addons.filter((a) => picked.includes(a.id)).map((a) => a.price);
  const total =
    unitPrice !== undefined && addonPrices.every((p) => p !== undefined)
      ? unitPrice * (tab === 'bucket' ? qty : 1) +
        addonPrices.reduce<number>((s, p) => s + (p ?? 0), 0)
      : undefined;

  const parts =
    tab === 'papan'
      ? [
          `Halo Klaurist, saya mau sewa papan akrilik model ${boardItem?.name ?? '-'}.`,
          `Atas nama: ${clean(name, 60) || '-'}`,
          `Acara: ${eventType}`,
          `Tanggal: ${date ? longDate(date) : '-'}${time ? `, jam ${time}` : ''}`,
          `Lokasi: ${clean(venue, 100) || '-'}`,
          ...(pin ? [`Titik lokasi: ${pin}`] : []),
          `Teks ucapan & nama penerima: ${clean(greeting, 150) || '-'}`,
          `Tambahan: ${addonNames.join(', ') || '-'}`,
          'Mohon info harga dan ketersediaannya ya, Kak. Terima kasih.',
        ]
      : [
          `Halo Klaurist, saya mau pesan bucket ${bouquetItem?.name ?? '-'} (${variant}) sebanyak ${qty}.`,
          `Atas nama: ${clean(name, 60) || '-'}`,
          `Dibutuhkan: ${date ? longDate(date) : '-'}${time ? `, jam ${time}` : ''}`,
          delivery === 'antar' ? `Diantar ke: ${clean(area, 60) || '-'}` : 'Diambil sendiri',
          ...(delivery === 'antar' && pin ? [`Titik lokasi: ${pin}`] : []),
          `Tambahan: ${addonNames.join(', ') || '-'}`,
          'Mohon info harga dan ketersediaannya ya, Kak. Terima kasih.',
        ];
  const message = parts.join('\n\n');

  const send = () => {
    const errs: string[] = [];
    if (!clean(name, 60)) errs.push('Isi nama pemesan ya, Kak.');
    if (!date) errs.push('Isi tanggal ya, Kak.');
    else if (date < dateAfter(0)) errs.push('Tanggal tidak boleh yang sudah lewat.');
    if (tab === 'papan') {
      if (!boardItem) errs.push('Pilih model papan ya, Kak.');
      if (!(eventTypes as readonly string[]).includes(eventType)) errs.push('Pilih jenis acara.');
      if (!clean(venue, 100)) errs.push('Isi lokasi atau gedung acara ya, Kak.');
      if (!clean(greeting, 150)) errs.push('Isi teks ucapan dan nama penerima ya, Kak.');
    } else {
      if (!bouquetItem || !bouquetItem.variants.some((v) => v.label === variant))
        errs.push('Pilih bucket dan ukurannya ya, Kak.');
      if (!Number.isInteger(qty) || qty < 1 || qty > 20) errs.push('Jumlah 1 sampai 20 ya, Kak.');
      if (delivery === 'antar' && !clean(area, 60)) errs.push('Isi area antar ya, Kak.');
    }
    setErrors(errs);
    if (!errs.length) window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  const tabBtn = (t: Tab, text: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={tab === t}
      onClick={() => {
        setTab(t);
        setErrors([]);
      }}
      className="min-h-12 flex-1 rounded-full text-sm font-medium tracking-wide aria-selected:bg-rose aria-selected:text-on-rose"
    >
      {text}
    </button>
  );

  return (
    <section aria-labelledby="judul-pesan" id="pesan" className="marble py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle
          id="judul-pesan"
          eyebrow="Pesan sekarang"
          title="Susun Pesanan Kakak"
          text="Isi rinciannya, pesannya tersusun otomatis di WhatsApp. Tidak ada data yang disimpan di website ini."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[1.75rem] bg-ivory p-5 shadow-sm sm:p-7">
            <div
              role="tablist"
              aria-label="Jenis pesanan"
              className="flex gap-1 rounded-full bg-blush-soft p-1"
            >
              {tabBtn('papan', 'Sewa Papan Akrilik')}
              {tabBtn('bucket', 'Bucket Bunga')}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nama" className={label}>
                  Atas nama
                </label>
                <input
                  id="nama"
                  autoComplete="name"
                  maxLength={60}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                />
              </div>

              {tab === 'papan' ? (
                <>
                  <div>
                    <label htmlFor="model" className={label}>
                      Model papan
                    </label>
                    <Select
                      id="model"
                      value={board}
                      onChange={setBoard}
                      options={boards.map((b) => ({
                        value: b.slug,
                        label: b.name,
                        hint: b.rentalPrice ? formatRupiah(b.rentalPrice) : undefined,
                      }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="acara" className={label}>
                      Jenis acara
                    </label>
                    <Select
                      id="acara"
                      value={eventType}
                      onChange={setEventType}
                      options={eventTypes.map((t) => ({ value: t, label: t }))}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="bucket-pilih" className={label}>
                      Bucket
                    </label>
                    <Select
                      id="bucket-pilih"
                      value={bouquet}
                      onChange={(v) => {
                        setBouquet(v);
                        setVariant(bouquets.find((b) => b.slug === v)?.variants[0]?.label ?? '');
                      }}
                      options={bouquets.map((b) => ({ value: b.slug, label: b.name }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="ukuran" className={label}>
                      Ukuran
                    </label>
                    <Select
                      id="ukuran"
                      value={variant}
                      onChange={setVariant}
                      options={(bouquetItem?.variants ?? []).map((v) => ({
                        value: v.label,
                        label: v.label,
                        hint: v.price ? formatRupiah(v.price) : undefined,
                      }))}
                    />
                  </div>
                  <div>
                    <label htmlFor="jumlah" className={label}>
                      Jumlah (1–20)
                    </label>
                    <input
                      id="jumlah"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={20}
                      step={1}
                      value={qty}
                      onChange={(e) =>
                        setQty(Math.min(20, Math.max(1, Math.trunc(Number(e.target.value)) || 1)))
                      }
                      className={field}
                    />
                  </div>
                  <fieldset>
                    <legend className={label}>Ambil atau antar</legend>
                    <div className="mt-1 flex gap-2">
                      {(['antar', 'ambil'] as const).map((d) => (
                        <button
                          key={d}
                          type="button"
                          aria-pressed={delivery === d}
                          onClick={() => setDelivery(d)}
                          className="min-h-12 flex-1 rounded-xl border border-line text-sm aria-pressed:border-rose aria-pressed:bg-blush-soft"
                        >
                          {d === 'antar' ? 'Diantar' : 'Ambil sendiri'}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              <div>
                <label htmlFor="tanggal" className={label}>
                  {tab === 'papan' ? 'Tanggal acara' : 'Tanggal dibutuhkan'}
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
                  <p className="mt-1 text-sm text-rose-strong">
                    Pemesanan sebaiknya H-{LEAD_DAYS}. Konfirmasi dulu ke admin ya, Kak.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="jam" className={label}>
                  Jam (opsional)
                </label>
                <input
                  id="jam"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={field}
                />
              </div>

              {tab === 'papan' ? (
                <>
                  <div className="sm:col-span-2">
                    <label htmlFor="lokasi" className={label}>
                      Lokasi / gedung
                    </label>
                    <input
                      id="lokasi"
                      maxLength={100}
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Mis. Auditorium kampus, Jl. Kaliurang"
                      className={field}
                    />
                    <LocationTools query={venue} pin={pin} onPin={setPin} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ucapan" className={label}>
                      Teks ucapan &amp; nama penerima
                    </label>
                    <textarea
                      id="ucapan"
                      rows={3}
                      maxLength={150}
                      value={greeting}
                      onChange={(e) => setGreeting(e.target.value)}
                      aria-describedby="ucapan-info"
                      className="mt-1 w-full rounded-xl border border-line bg-field p-4 text-base"
                    />
                    <p id="ucapan-info" className="mt-1 text-xs text-muted">
                      {greeting.length}/150. Teks ini hanya dikirim lewat WA Kakak sendiri dan tidak
                      disimpan di website.
                    </p>
                  </div>
                </>
              ) : (
                delivery === 'antar' && (
                  <div className="sm:col-span-2">
                    <label htmlFor="area" className={label}>
                      Area antar
                    </label>
                    <input
                      id="area"
                      maxLength={60}
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Mis. Jakal km 5, Sleman"
                      className={field}
                    />
                    <LocationTools query={area} pin={pin} onPin={setPin} />
                  </div>
                )
              )}

              <fieldset className="sm:col-span-2">
                <legend className={label}>Tambahan</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {addons.map((a) => (
                    <label
                      key={a.id}
                      className="flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm has-checked:border-rose has-checked:bg-blush-soft has-focus-visible:outline-3 has-focus-visible:outline-rose"
                    >
                      <input
                        type="checkbox"
                        checked={picked.includes(a.id)}
                        onChange={(e) =>
                          setPicked((cur) =>
                            e.target.checked ? [...cur, a.id] : cur.filter((x) => x !== a.id),
                          )
                        }
                        className="accent-rose"
                      />
                      {a.name}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-line bg-field shadow-sm">
              <p className="flex items-center gap-2 bg-[#075e54] px-4 py-3 text-sm font-medium text-white">
                <WhatsAppIcon className="size-4" /> Pratinjau pesan WhatsApp
              </p>
              <div className="bg-[#ece5dd] p-3 sm:p-4">
                <div
                  aria-live="polite"
                  className="ml-auto max-w-[95%] space-y-2 rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-sm leading-relaxed break-words text-[#111b21] shadow-sm"
                >
                  {parts.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm">
                  <span className="font-medium">Estimasi: </span>
                  {total !== undefined ? formatRupiah(total) : 'Tanya harga ke admin'}
                </p>
                <p className="mt-1 text-xs text-muted">
                  Total final dan ongkir dikonfirmasi admin.
                </p>
                {errors.length > 0 && (
                  <ul role="alert" className="mt-3 list-inside list-disc text-sm text-rose-strong">
                    {errors.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={send}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1f7a46] font-medium text-white hover:brightness-95"
                >
                  <WhatsAppIcon className="size-5" /> Kirim Pesanan via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
