'use client';

// Pembuat "format order" WhatsApp. BUKAN form yang mengirim data: tidak ada <form>, tidak ada upload,
// tidak ada penyimpanan. Isian hanya dirangkai menjadi teks (dengan *bold* ala WhatsApp) di link wa.me.
import { useId, useState } from 'react';
import { calcRules } from '@/data/prices';
import { site } from '@/data/site';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const COLORS = { hp: 'Hitam putih', warna: 'Warna' } as const;
const BINDINGS = {
  none: 'Tanpa jilid',
  biasa: 'Jilid biasa',
  lux: 'Jilid lux / hard cover',
} as const;
const DELIVERY = { ambil: 'Ambil di toko', antar: 'Minta diantar' } as const;
const DAYS = { hari_ini: 'Hari ini', besok: 'Besok', lusa: 'Lusa' } as const;
const FILE_MODE = { link: 'Kirim link', chat: 'File saya kirim di chat' } as const;

const MAX_NAME = 50;
const MAX_LINK = 500;
const MAX_NOTE = 200;

// Teks bebas: buang karakter format WhatsApp (* _ ~ `) & baris baru supaya format tetap rapi
const clean = (raw: string, max: number) =>
  raw
    .replace(/[*_~`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

// Hanya link http(s) yang valid (menolak javascript:, data:, dll.)
function cleanLink(raw: string): string | null {
  const value = raw.trim().slice(0, MAX_LINK);
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}

const toMinutes = (hhmm: string) => {
  const [h = 0, m = 0] = hhmm.replace('.', ':').split(':').map(Number);
  return h * 60 + m;
};
const OPEN = site.hours.open.replace('.', ':');
const CLOSE = site.hours.close.replace('.', ':');

function cleanTime(raw: string): string | null {
  if (!/^\d{2}:\d{2}$/.test(raw)) return null;
  const t = toMinutes(raw);
  return t >= toMinutes(OPEN) && t <= toMinutes(CLOSE) ? raw : null;
}

export function OrderForm() {
  const id = useId();
  const [name, setName] = useState('');
  const [fileMode, setFileMode] = useState<keyof typeof FILE_MODE>('link');
  const [link, setLink] = useState('');
  const [copiesRaw, setCopiesRaw] = useState('1');
  const [color, setColor] = useState<keyof typeof COLORS>('hp');
  const [binding, setBinding] = useState<keyof typeof BINDINGS>('none');
  const [delivery, setDelivery] = useState<keyof typeof DELIVERY>('ambil');
  const [day, setDay] = useState<keyof typeof DAYS>('besok');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const nameOk = clean(name, MAX_NAME);
  const linkOk = cleanLink(link);
  const copies = /^\d{1,2}$/.test(copiesRaw) ? Number(copiesRaw) : 0;
  const copiesOk = copies >= 1 && copies <= calcRules.maxCopies;
  const timeOk = time ? cleanTime(time) : null;

  const errors = {
    name: !nameOk ? 'Nama wajib diisi' : null,
    link: fileMode === 'link' && !linkOk ? 'Tempel link yang diawali https://' : null,
    copies: !copiesOk ? `Isi angka 1–${calcRules.maxCopies}` : null,
    time: time && !timeOk ? `Pilih jam antara ${OPEN} dan ${CLOSE}` : null,
  };
  const valid = !errors.name && !errors.link && !errors.copies && !errors.time;
  // Tampilkan pesan error hanya setelah pengguna mulai mengisi
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const touch = (k: string) => setTouched((t) => ({ ...t, [k]: true }));
  const showError = (k: keyof typeof errors) => (touched[k] ? errors[k] : null);

  const lines = [
    '*FORMAT ORDER – SIRAIT PRINTING*',
    '',
    `*Nama:* ${nameOk || '-'}`,
    `*File:* ${fileMode === 'link' ? (linkOk ?? '-') : 'Saya kirim di chat ini'}`,
    `*Jumlah rangkap:* ${copiesOk ? copies : '-'}`,
    `*Jenis print:* ${COLORS[color]}`,
    `*Jilid:* ${BINDINGS[binding]}`,
    `*Pengambilan:* ${DELIVERY[delivery]}`,
    `*Waktu ${delivery === 'ambil' ? 'ambil' : 'antar'}:* ${DAYS[day]}${timeOk ? `, ${timeOk.replace(':', '.')} WIB` : ' (jam menyesuaikan)'}`,
    `*Catatan:* ${clean(note, MAX_NOTE) || '-'}`,
    '',
    'Mohon konfirmasi total biaya dan waktu selesainya ya. Terima kasih 🙏',
  ];
  const message = lines.join('\n');

  const input =
    'mt-1.5 block min-h-12 w-full rounded-xl border border-line bg-background px-3 text-base aria-[invalid=true]:border-red aria-[invalid=true]:bg-red/5';
  const label = 'text-sm font-bold';

  const help = (key: string, text: string | null, hint?: string) =>
    text ? (
      <p id={`${id}-${key}-help`} className="mt-1 text-xs font-semibold text-red">
        {text}
      </p>
    ) : hint ? (
      <p id={`${id}-${key}-help`} className="mt-1 text-xs text-muted">
        {hint}
      </p>
    ) : null;

  const choice = <T extends string>(
    key: string,
    legend: string,
    options: Record<T, string>,
    value: T,
    onChange: (v: T) => void,
  ) => (
    <fieldset>
      <legend className={label}>{legend}</legend>
      <div className="mt-1.5 flex flex-wrap gap-2">
        {(Object.keys(options) as T[]).map((k) => (
          <label
            key={k}
            className="relative flex min-h-11 cursor-pointer items-center rounded-xl border border-line px-4 text-sm font-semibold transition-colors has-checked:border-red has-checked:bg-red has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-blue"
          >
            <input
              type="radio"
              name={`${id}-${key}`}
              value={k}
              checked={value === k}
              onChange={() => onChange(k)}
              className="sr-only"
            />
            {options[k]}
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid gap-6 rounded-3xl bg-background p-5 text-ink sm:p-7 lg:grid-cols-[1.25fr_1fr]">
      <div className="grid content-start gap-5">
        <div>
          <label htmlFor={`${id}-nama`} className={label}>
            Nama (atas nama pesanan)
          </label>
          <input
            id={`${id}-nama`}
            type="text"
            autoComplete="name"
            maxLength={MAX_NAME}
            placeholder="Contoh: Rina Siregar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => touch('name')}
            aria-invalid={!!showError('name')}
            aria-describedby={`${id}-name-help`}
            className={input}
          />
          {help('name', showError('name'))}
        </div>

        {choice('file', 'File yang mau di-print', FILE_MODE, fileMode, setFileMode)}
        {fileMode === 'link' ? (
          <div>
            <label htmlFor={`${id}-link`} className={label}>
              Link file
            </label>
            <input
              id={`${id}-link`}
              type="url"
              inputMode="url"
              maxLength={MAX_LINK}
              placeholder="https://drive.google.com/..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onBlur={() => touch('link')}
              aria-invalid={!!showError('link')}
              aria-describedby={`${id}-link-help`}
              className={input}
            />
            {help(
              'link',
              showError('link'),
              'Pastikan akses link "Siapa saja yang memiliki link" supaya admin bisa membuka.',
            )}
          </div>
        ) : (
          <p className="rounded-xl bg-yellow-soft px-4 py-3 text-sm">
            Setelah pesan terkirim, lampirkan file di chat WhatsApp yang sama ya. PDF lebih aman.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-rangkap`} className={label}>
              Jumlah rangkap
            </label>
            <input
              id={`${id}-rangkap`}
              type="number"
              inputMode="numeric"
              min={1}
              max={calcRules.maxCopies}
              value={copiesRaw}
              onChange={(e) => setCopiesRaw(e.target.value.replace(/\D/g, '').slice(0, 2))}
              onBlur={() => touch('copies')}
              aria-invalid={!!showError('copies')}
              aria-describedby={`${id}-copies-help`}
              className={input}
            />
            {help('copies', showError('copies'))}
          </div>
          {choice('warna', 'Jenis print', COLORS, color, setColor)}
        </div>

        {choice('jilid', 'Jilid', BINDINGS, binding, setBinding)}
        {choice('antar', 'Pengambilan', DELIVERY, delivery, setDelivery)}

        <div className="grid gap-5 sm:grid-cols-2">
          {choice('hari', delivery === 'ambil' ? 'Hari ambil' : 'Hari antar', DAYS, day, setDay)}
          <div>
            <label htmlFor={`${id}-jam`} className={label}>
              Jam {delivery === 'ambil' ? 'ambil' : 'antar'}{' '}
              <span className="font-normal text-muted">(opsional)</span>
            </label>
            <input
              id={`${id}-jam`}
              type="time"
              min={OPEN}
              max={CLOSE}
              value={time}
              onChange={(e) => setTime(e.target.value)}
              onBlur={() => touch('time')}
              aria-invalid={!!showError('time')}
              aria-describedby={`${id}-time-help`}
              className={input}
            />
            {help('time', showError('time'), `Jam buka ${site.hours.open}–${site.hours.close} WIB`)}
          </div>
        </div>
        {delivery === 'antar' && (
          // TODO: konfirmasi syarat antar & ongkir
          <p className="rounded-xl bg-yellow-soft px-4 py-3 text-sm">
            Antar berlaku untuk pesanan tertentu; area & ongkos dikonfirmasi admin.
          </p>
        )}

        <div>
          <label htmlFor={`${id}-catatan`} className={label}>
            Catatan <span className="font-normal text-muted">(opsional)</span>
          </label>
          <textarea
            id={`${id}-catatan`}
            rows={2}
            maxLength={MAX_NOTE}
            placeholder="Contoh: halaman 1–5 warna, sisanya hitam putih"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1.5 block w-full rounded-xl border border-line bg-background px-3 py-2.5 text-base"
          />
        </div>
      </div>

      {/* Pratinjau pesan, tampil seperti chat WA */}
      <div className="flex flex-col">
        <p className={label}>Pratinjau pesan WhatsApp</p>
        <div className="mt-1.5 flex-1 rounded-2xl bg-[#e7ddd3] p-3">
          <div
            className="ml-auto max-w-[95%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap shadow-sm [overflow-wrap:anywhere]"
            aria-live="polite"
          >
            {lines.map((line, i) => {
              // Tampilkan *teks* sebagai tebal, persis seperti di WhatsApp
              const parts = line.split(/(\*[^*]+\*)/g);
              return (
                <span key={i} className="block min-h-[1.25em]">
                  {parts.map((p, j) =>
                    /^\*[^*]+\*$/.test(p) ? <strong key={j}>{p.slice(1, -1)}</strong> : p,
                  )}
                </span>
              );
            })}
          </div>
        </div>
        {valid ? (
          <a
            href={buildWhatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#1f9e4f] px-6 font-bold text-white transition-colors hover:bg-[#178a43]"
          >
            <WhatsAppIcon className="size-5" />
            Kirim Format Order ke WA
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
        ) : (
          // Belum lengkap: tombol menampilkan semua pesan error (tetap bisa difokus keyboard)
          <button
            type="button"
            onClick={() => setTouched({ name: true, link: true, copies: true, time: true })}
            className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-surface-2 px-6 font-bold text-muted"
          >
            <WhatsAppIcon className="size-5" />
            Kirim Format Order ke WA
          </button>
        )}
        {!valid && (
          <p className="mt-2 text-center text-xs text-muted" aria-live="polite">
            Lengkapi nama dan file dulu ya.
          </p>
        )}
        <p className="mt-3 text-center text-xs text-muted">
          Data tidak disimpan di website ini. Pesan baru terkirim setelah kamu menekan kirim di WA.
        </p>
      </div>
    </div>
  );
}
