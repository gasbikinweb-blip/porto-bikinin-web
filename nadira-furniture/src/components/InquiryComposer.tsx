'use client';

// Pratinjau pesan WhatsApp di modal produk: pengunjung pilih topik + isi catatan,
// lalu tinggal klik kirim. Tidak ada data yang disimpan.
import { useState } from 'react';
import type { Product } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink, productUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const topics = [
  { id: 'harga', label: 'Tanya harga', text: (n: string) => `saya tertarik dengan ${n}. Boleh info estimasi harganya?` },
  { id: 'custom', label: 'Custom ukuran/warna', text: (n: string) => `saya mau model seperti ${n}, tapi dengan ukuran/warna yang berbeda. Bisa dibantu?` },
  { id: 'survei', label: 'Jadwal survei', text: (n: string) => `saya ingin jadwalkan survei gratis untuk dibuatkan ${n}.` },
] as const;

const field =
  'w-full rounded-xl border border-line bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent';

export function InquiryComposer({ product }: { product: Product }) {
  const [topic, setTopic] = useState<(typeof topics)[number]['id']>('harga');
  const [size, setSize] = useState('');
  const [note, setNote] = useState('');
  const t = topics.find((x) => x.id === topic) ?? topics[0];

  const message = [
    `Halo ${siteConfig.name}, ${t.text(product.name)}`,
    size.trim() && `Perkiraan ukuran: ${size.trim()}`,
    note.trim() && `Catatan: ${note.trim()}`,
    '',
    productUrl(product.slug),
  ]
    .filter((l): l is string => typeof l === 'string')
    .join('\n');

  return (
    <div className="mt-8">
      <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Mau tanya apa?</p>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Topik pertanyaan">
        {topics.map((x) => (
          <button
            key={x.id}
            type="button"
            role="radio"
            aria-checked={topic === x.id}
            onClick={() => setTopic(x.id)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
              topic === x.id
                ? 'border-accent bg-accent text-background'
                : 'border-line text-foreground/80 hover:border-accent'
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <input className={field} value={size} onChange={(e) => setSize(e.target.value)} placeholder="Perkiraan ukuran (opsional)" aria-label="Perkiraan ukuran" />
        <input className={field} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Catatan, mis. warna putih (opsional)" aria-label="Catatan" />
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-line">
        <div className="flex items-center gap-2 bg-[#075e54] px-4 py-2 text-white">
          <span className="grid size-7 place-items-center rounded-full bg-white/15 font-serif text-sm">N</span>
          <p className="text-xs font-semibold">
            {siteConfig.name} <span className="font-normal text-white/70">· pratinjau pesan</span>
          </p>
        </div>
        <div className="bg-[#efeae2] px-3 py-4">
          <div className="ml-auto max-w-[95%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-xs leading-relaxed break-words whitespace-pre-line text-neutral-900 shadow-sm">
            {message}
            <span className="mt-1 block text-right text-[10px] opacity-60">✓✓</span>
          </div>
        </div>
      </div>

      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
      >
        <WhatsAppIcon className="size-5" />
        Kirim via WhatsApp
        <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
      </a>
    </div>
  );
}
