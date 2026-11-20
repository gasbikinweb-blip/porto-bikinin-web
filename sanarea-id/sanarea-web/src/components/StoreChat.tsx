'use client';

// Susun pesan WhatsApp dengan preview langsung: nama, keperluan, produk, warna, ukuran, kota, catatan.
// Data hanya dipakai untuk menyusun teks pesan di browser; tidak dikirim/disimpan ke server.
import { useState } from 'react';
import { products } from '@/data/products';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { Select } from './Select';

const topics = [
  { id: 'stok', label: 'Stok & warna', ask: 'apakah stoknya ready' },
  { id: 'ukuran', label: 'Ukuran', ask: 'boleh info ukurannya' },
  { id: 'harga', label: 'Harga', ask: 'berapa harganya' },
  {
    id: 'kirim',
    label: 'Pengiriman',
    ask: 'apakah bisa dikirim ke alamat saya dan berapa ongkirnya',
  },
  { id: 'toko', label: 'Datang ke toko', ask: 'apakah bisa saya lihat langsung di toko' },
] as const;
type TopicId = (typeof topics)[number]['id'];

// Buang karakter kontrol & batasi panjang teks bebas
const clean = (s: string, max: number) =>
  Array.from(s)
    .map((c) => (c.charCodeAt(0) < 32 && c !== '\n' ? ' ' : c))
    .join('')
    .trim()
    .slice(0, max);

const productOptions = [
  { value: '', label: 'Belum tahu / tanya umum' },
  ...products.map((p) => ({ value: p.slug, label: p.name })),
];

export function StoreChat() {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState<TopicId>('stok');
  const [productSlug, setProductSlug] = useState('');
  const [color, setColor] = useState('');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');

  const product = products.find((p) => p.slug === productSlug);
  const t = topics.find((x) => x.id === topic) ?? topics[0];
  const lines = [
    `Halo Sanaréa${name.trim() ? `, saya ${clean(name, 60)}` : ''}.`,
    '',
    product
      ? `Saya mau tanya ${t.label.toLowerCase()} untuk ${product.name}${color.trim() ? ` warna ${clean(color, 40)}` : ''}: ${t.ask}?`
      : `Saya mau tanya soal ${t.label.toLowerCase()}: ${t.ask}?`,
    city.trim() ? `Lokasi saya: ${clean(city, 120)}` : null,
    note.trim() ? `Catatan: ${clean(note, 300)}` : null,
    '',
    'Terima kasih.',
  ].filter((l): l is string => l !== null);
  const message = lines.join('\n');

  const field =
    'mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink';

  return (
    <div className="grid overflow-hidden rounded-[1.75rem] border border-line bg-card lg:grid-cols-[1.1fr_1fr]">
      {/* Form */}
      <div className="p-6 sm:p-8">
        <p className="eyebrow">Chat WhatsApp</p>
        <h3 className="mt-3 font-serif text-3xl font-light">Tanya dulu sebelum datang</h3>
        <p className="mt-2 text-sm text-muted">
          Isi seperlunya, pesannya tersusun otomatis. Lihat preview di samping sebelum dikirim.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-nama" className="text-xs">
              Nama
            </label>
            <input
              id="c-nama"
              autoComplete="given-name"
              value={name}
              maxLength={60}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Kakak"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="c-kota" className="text-xs">
              Lokasi / alamat <span className="text-muted">(opsional)</span>
            </label>
            <input
              id="c-kota"
              autoComplete="address-level2"
              value={city}
              maxLength={120}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Mis. Cianjur kota, atau Bandung"
              className={field}
            />
          </div>

          <fieldset className="sm:col-span-2">
            <legend className="text-xs">Mau tanya soal</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {topics.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={topic === x.id}
                  onClick={() => setTopic(x.id)}
                  className="min-h-10 rounded-full border border-line px-4 text-sm transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-background"
                >
                  {x.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <span id="c-produk-label" className="text-xs">
              Produk
            </span>
            <Select
              labelledBy="c-produk-label"
              value={productSlug}
              onChange={(v) => {
                setProductSlug(v);
                setColor('');
              }}
              options={productOptions}
            />
          </div>
          <div>
            <label htmlFor="c-warna" className="text-xs">
              Warna <span className="text-muted">(opsional)</span>
            </label>
            <input
              id="c-warna"
              list="c-warna-list"
              value={color}
              maxLength={40}
              onChange={(e) => setColor(e.target.value)}
              placeholder={product?.colors[0] ? `Mis. ${product.colors[0].name}` : 'Mis. Espresso'}
              className={field}
            />
            <datalist id="c-warna-list">
              {product?.colors.map((c) => (
                <option key={c.slug} value={c.name} />
              ))}
            </datalist>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="c-catatan" className="text-xs">
              Catatan <span className="text-muted">(opsional)</span>
            </label>
            <textarea
              id="c-catatan"
              value={note}
              maxLength={300}
              rows={2}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Mis. butuh 3 pcs untuk seragam, atau mau ambil Sabtu sore"
              className={`${field} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Preview ala WhatsApp */}
      <div className="flex flex-col bg-surface p-6 sm:p-8" aria-label="Preview pesan WhatsApp">
        <div className="flex items-center gap-3 border-b border-line pb-4">
          <span className="grid size-10 place-items-center rounded-full bg-ink font-serif text-sm text-background">
            S
          </span>
          <span>
            <span className="block text-sm">SANARÉA</span>
            <span className="block text-xs text-muted">Biasanya membalas di jam buka toko</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-end py-6">
          <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-bubble px-4 py-3 text-sm leading-relaxed text-bubble-ink shadow-sm">
            <p className="whitespace-pre-line" aria-live="polite">
              {message}
            </p>
            <p className="mt-1 text-right text-[0.65rem] opacity-60" aria-hidden="true">
              ✓✓
            </p>
          </div>
        </div>
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid rounded-full"
        >
          <WhatsAppIcon className="size-4" />
          Kirim via WhatsApp<span className="sr-only"> (tab baru)</span>
        </a>
      </div>
    </div>
  );
}
