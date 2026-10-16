'use client';

import { useId, useState } from 'react';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const serviceOptions = [
  'Neon Box',
  'Letter Signage',
  'Cutting Laser',
  'UV Printing',
  'Custom Akrilik (kotak tisu, polling box, dll.)',
  'Papan Nama Kantor',
  'Gantungan Kunci / Merchandise',
  'Lainnya',
] as const;

type ServiceOption = (typeof serviceOptions)[number];

const LIMITS = { name: 60, size: 60, detail: 500 } as const;

// Buang karakter kontrol & rapikan spasi; panjang dibatasi
const clean = (value: string, max: number) =>
  value
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim()
    .slice(0, max);

const isService = (v: string): v is ServiceOption =>
  (serviceOptions as readonly string[]).includes(v);

// Pembuat pesan WhatsApp: tidak mengirim data ke server, hanya menyusun link wa.me
export function WaMessageBuilder() {
  const id = useId();
  const [service, setService] = useState<ServiceOption | ''>('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [detail, setDetail] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = clean(name, LIMITS.name);
    const s = clean(size, LIMITS.size);
    const d = clean(detail, LIMITS.detail);

    if (!isService(service)) return setError('Pilih jenis layanan terlebih dahulu.');
    if (n.length < 2) return setError('Isi nama Anda (minimal 2 huruf).');
    if (d.length < 5) return setError('Ceritakan kebutuhan Anda (minimal 5 karakter).');
    setError('');

    const message = [
      `Halo ${siteConfig.name}, saya ingin konsultasi custom order.`,
      '',
      `• Nama     : ${n}`,
      `• Layanan  : ${service}`,
      s ? `• Ukuran   : ${s}` : null,
      `• Kebutuhan: ${d}`,
      '',
      'Mohon info harga dan estimasi pengerjaannya. Terima kasih.',
    ]
      // Buang baris ukuran bila kosong; baris kosong '' tetap dipakai sebagai jeda
      .filter((line) => line !== null)
      .join('\n');

    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer');
  };

  const field =
    'mt-1 w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-steel focus:border-ink focus:outline-none';

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby={`${id}-info`}>
      <p id={`${id}-info`} className="text-sm text-steel">
        Data tidak disimpan di website. Tombol di bawah membuka WhatsApp dengan pesan yang sudah
        tersusun.
      </p>
      <div>
        <label htmlFor={`${id}-service`} className="text-sm font-semibold">
          Jenis layanan <span aria-hidden="true">*</span>
        </label>
        <select
          id={`${id}-service`}
          required
          value={service}
          onChange={(e) => setService(isService(e.target.value) ? e.target.value : '')}
          className={field}
        >
          <option value="">— Pilih layanan —</option>
          {serviceOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold">
            Nama / usaha <span aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            required
            autoComplete="name"
            maxLength={LIMITS.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Budi – Kopi Senja"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-size`} className="text-sm font-semibold">
            Perkiraan ukuran / jumlah
          </label>
          <input
            id={`${id}-size`}
            maxLength={LIMITS.size}
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Contoh: 60 x 40 cm, 2 sisi"
            className={field}
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-detail`} className="text-sm font-semibold">
          Detail kebutuhan <span aria-hidden="true">*</span>
        </label>
        <textarea
          id={`${id}-detail`}
          required
          rows={4}
          maxLength={LIMITS.detail}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Contoh: neon box logo cafe, dipasang outdoor, sudah ada file desain AI."
          className={field}
        />
        <p className="mt-1 text-right text-xs text-steel">
          {detail.length}/{LIMITS.detail}
        </p>
      </div>
      <p role="alert" className="min-h-5 text-sm font-medium text-red-700">
        {error}
      </p>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-strong"
      >
        <WhatsAppIcon />
        Kirim via WhatsApp
      </button>
    </form>
  );
}
