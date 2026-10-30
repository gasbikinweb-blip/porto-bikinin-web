'use client';

// Penyusun pesan WhatsApp untuk calon klien. BUKAN <form>: tidak ada data yang dikirim ke server,
// hanya membuka wa.me dengan teks yang di-encode. Pilihan dibatasi whitelist, input teks dibatasi panjangnya.
import { useState } from 'react';
import { buildWhatsAppLink, config } from '@/lib/config';
import { WhatsAppIcon } from './icons';

const OPTIONS = {
  layanan: [
    'Desain Interior',
    'Build & Produksi Furnitur',
    'Renovasi Interior',
    'Design & Build lengkap',
  ],
  ruangan: [
    'Kitchen set',
    'Ruang keluarga / ruang tamu',
    'Kamar tidur utama',
    'Kamar anak',
    'Ruang kerja',
    'Satu unit / rumah',
    'Kantor',
    'Kafe / komersial',
    'Lainnya',
  ],
  properti: ['Rumah', 'Apartemen', 'Kantor', 'Ruang komersial'],
  mulai: ['Secepatnya', '1–3 bulan lagi', 'Lebih dari 3 bulan', 'Belum pasti'],
} as const;

type Key = keyof typeof OPTIONS;
const LIMIT = { kota: 40, luas: 20 } as const;

// Buang karakter kontrol & rapikan spasi; panjang dipotong sesuai batas
const clean = (v: string, max: number) =>
  v
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

export function WaBuilder({ defaultService }: { defaultService?: string }) {
  const [sel, setSel] = useState<Record<Key, string>>({
    layanan: OPTIONS.layanan.find((o) => o === defaultService) ?? '',
    ruangan: '',
    properti: '',
    mulai: '',
  });
  const [kota, setKota] = useState('');
  const [luas, setLuas] = useState('');

  // Hanya nilai yang ada di whitelist yang dipakai
  const pick = (k: Key) => ((OPTIONS[k] as readonly string[]).includes(sel[k]) ? sel[k] : '');

  const lines = [
    `Halo ${config.siteName}, saya ingin konsultasi.`,
    '',
    pick('layanan') && `• Layanan  : ${pick('layanan')}`,
    pick('ruangan') && `• Ruangan  : ${pick('ruangan')}`,
    pick('properti') && `• Properti : ${pick('properti')}`,
    clean(luas, LIMIT.luas) && `• Luas     : ${clean(luas, LIMIT.luas)}`,
    clean(kota, LIMIT.kota) && `• Kota     : ${clean(kota, LIMIT.kota)}`,
    pick('mulai') && `• Mulai    : ${pick('mulai')}`,
    '',
    'Terima kasih.',
  ].filter((l): l is string => typeof l === 'string');
  const message = lines.join('\n').replace(/\n{3,}/g, '\n\n');

  const field = 'mt-2 w-full rounded-none border border-line bg-background px-3 py-3 text-base';

  const select = (k: Key, label: string, optional = false) => (
    <div>
      <label htmlFor={`wa-${k}`} className="text-sm font-medium">
        {label} {optional && <span className="text-muted">(opsional)</span>}
      </label>
      <select
        id={`wa-${k}`}
        value={sel[k]}
        onChange={(e) => setSel((s) => ({ ...s, [k]: e.target.value }))}
        className={field}
      >
        <option value="">Pilih…</option>
        {OPTIONS[k].map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {select('layanan', 'Layanan')}
        {select('ruangan', 'Ruangan')}
        {select('properti', 'Tipe properti')}
        <div>
          <label htmlFor="wa-luas" className="text-sm font-medium">
            Perkiraan luas <span className="text-muted">(opsional)</span>
          </label>
          <input
            id="wa-luas"
            type="text"
            inputMode="text"
            maxLength={LIMIT.luas}
            placeholder="contoh: 3 x 4 m"
            value={luas}
            onChange={(e) => setLuas(e.target.value)}
            className={field}
          />
        </div>
        <div>
          <label htmlFor="wa-kota" className="text-sm font-medium">
            Kota
          </label>
          <input
            id="wa-kota"
            type="text"
            maxLength={LIMIT.kota}
            placeholder="contoh: Jakarta Barat"
            autoComplete="address-level2"
            value={kota}
            onChange={(e) => setKota(e.target.value)}
            className={field}
          />
        </div>
        {select('mulai', 'Rencana mulai', true)}
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium" id="wa-preview-label">
          Pratinjau pesan
        </p>
        <pre
          aria-labelledby="wa-preview-label"
          aria-live="polite"
          className="mt-2 font-sans text-sm leading-relaxed whitespace-pre-wrap text-muted"
        >
          {message}
        </pre>
      </div>

      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-ink"
      >
        <WhatsAppIcon className="size-4" />
        Kirim via WhatsApp
        <span className="sr-only"> (membuka tab baru)</span>
      </a>
    </div>
  );
}
