'use client';

// Modal detail produk memakai <dialog> native: focus trap, Esc, dan aria-modal dari browser.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { categoryName } from '@/data/categories';
import { priceLabel, type Product } from '@/data/products';
import { buildWhatsAppLink, config, productUrl } from '@/lib/config';

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const isOpen = product !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="judul-produk"
      onCancel={(e) => {
        e.preventDefault(); // Esc: tutup lewat alur yang sama agar URL ikut bersih
        onClose();
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-background text-foreground sm:m-auto sm:h-auto sm:max-h-[92dvh] sm:max-w-6xl sm:rounded-3xl"
    >
      {product && <Detail key={product.slug} product={product} onClose={onClose} />}
    </dialog>
  );
}

// Topik obrolan WhatsApp yang bisa dipilih pengunjung sebelum mengirim
const topics = [
  {
    id: 'harga',
    label: 'Tanya harga',
    text: (n: string) => `saya tertarik dengan ${n}. Boleh info harganya?`,
  },
  {
    id: 'custom',
    label: 'Custom ukuran/warna',
    text: (n: string) => `saya mau pesan ${n} dengan ukuran/warna custom. Bisa dibantu?`,
  },
  { id: 'stok', label: 'Cek ketersediaan', text: (n: string) => `apakah ${n} masih bisa dipesan?` },
  {
    id: 'konsultasi',
    label: 'Konsultasi desain',
    text: (n: string) => `saya ingin konsultasi desain untuk model seperti ${n}.`,
  },
] as const;

type TopicId = (typeof topics)[number]['id'];

const field =
  'min-h-11 w-full rounded-xl border border-foreground/20 bg-background px-4 text-sm outline-none focus:border-accent';

function Detail({ product: p, onClose }: { product: Product; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState<TopicId>('harga');
  const [size, setSize] = useState('');
  const [note, setNote] = useState('');
  const touchX = useRef<number | null>(null);
  const total = p.images.length;
  const img = p.images[index];
  const go = (step: number) => setIndex((i) => (i + step + total) % total);
  const t = topics.find((x) => x.id === topic) ?? topics[0];

  // Pesan WA tersusun otomatis dari pilihan pengunjung (tidak ada data yang disimpan)
  const body = [
    `Halo ${config.siteName}, ${t.text(p.name)}`,
    size.trim() && `Perkiraan ukuran: ${size.trim()}`,
    note.trim() && `Catatan: ${note.trim()}`,
  ].filter(Boolean);
  const message = `${body.join('\n')}\n\n${productUrl(p.slug)}`;

  const copy = async () => {
    const url = productUrl(p.slug);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Cadangan untuk browser tanpa Clipboard API
      window.prompt('Salin link produk:', url);
    }
  };

  const specs: [string, string | undefined][] = [
    ['Bahan', p.material],
    ['Ukuran', p.size],
    ['Finishing', p.finish],
  ];

  return (
    <div
      className="relative grid grid-cols-1 gap-6 p-4 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-10"
      onKeyDown={(e) => {
        if (total < 2) return;
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup detail produk"
        className="absolute top-3 right-3 z-10 grid size-11 place-items-center rounded-full border border-line bg-background text-xl hover:border-foreground sm:top-5 sm:right-5"
      >
        ×
      </button>

      {/* Kiri: foto utama + thumbnail */}
      <div className="min-w-0 md:sticky md:top-0 md:self-start">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface sm:rounded-3xl md:aspect-square"
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const end = e.changedTouches[0]?.clientX;
            if (touchX.current !== null && end !== undefined && total > 1) {
              const dx = end - touchX.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }
            touchX.current = null;
          }}
        >
          {img && (
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          )}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Foto sebelumnya"
                className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-xl shadow"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Foto berikutnya"
                className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-background/90 text-xl shadow"
              >
                ›
              </button>
              <span className="absolute right-3 bottom-3 rounded-full bg-black/55 px-3 py-1 text-xs text-white">
                {index + 1} / {total}
              </span>
            </>
          )}
        </div>
        {total > 1 && (
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {p.images.map((th, i) => (
              <li key={th.src} className="shrink-0">
                <button
                  type="button"
                  aria-label={`Tampilkan foto ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`relative block size-16 overflow-hidden rounded-xl sm:size-20 ${
                    i === index
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={th.thumb} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Kanan: info, spesifikasi, penyusun pesan WA */}
      <div className="min-w-0">
        <p className="pr-12 text-xs font-medium tracking-[0.25em] text-accent uppercase">
          {categoryName(p.category)}
        </p>
        <h2 id="judul-produk" className="mt-2 pr-12 font-serif text-3xl leading-tight sm:text-4xl">
          {p.name}
        </h2>
        <p className="mt-3 text-lg text-accent">
          {p.price === undefined ? 'Hubungi kami untuk harga' : priceLabel(p)}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>

        <h3 className="mt-6 font-serif text-xl">Spesifikasi</h3>
        <dl className="mt-3 divide-y divide-line border-y border-line text-sm">
          {specs.map(
            ([k, v]) =>
              v && (
                <div key={k} className="grid grid-cols-3 gap-3 py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="col-span-2">{v}</dd>
                </div>
              ),
          )}
        </dl>

        <div className="mt-6 rounded-2xl border border-line bg-surface/60 p-4 sm:p-5">
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
            Mau tanya apa?
          </p>
          <div
            role="radiogroup"
            aria-label="Topik pertanyaan"
            className="mt-3 flex flex-wrap gap-2"
          >
            {topics.map((x) => (
              <button
                key={x.id}
                type="button"
                role="radio"
                aria-checked={topic === x.id}
                onClick={() => setTopic(x.id)}
                className={`min-h-9 rounded-full border px-4 text-xs font-medium transition-colors ${
                  topic === x.id
                    ? 'border-accent bg-accent text-white'
                    : 'border-foreground/20 hover:border-foreground'
                }`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <input
              className={field}
              value={size}
              maxLength={60}
              onChange={(e) => setSize(e.target.value)}
              placeholder="Perkiraan ukuran (opsional)"
              aria-label="Perkiraan ukuran"
            />
            <input
              className={field}
              value={note}
              maxLength={120}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Catatan, mis. warna (opsional)"
              aria-label="Catatan"
            />
          </div>

          {/* Pratinjau ala chat WhatsApp */}
          <div className="mt-4 overflow-hidden rounded-xl border border-line">
            <div className="flex items-center gap-2 bg-[#075e54] px-4 py-2 text-white">
              <span className="grid size-7 place-items-center rounded-full bg-white/15 font-serif text-sm">
                D
              </span>
              <p className="text-xs font-semibold">
                {config.siteName}{' '}
                <span className="font-normal text-white/70">· pratinjau pesan</span>
              </p>
            </div>
            <div className="bg-[#efeae2] px-3 py-4">
              <p className="ml-auto max-w-[95%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-3 py-2 text-xs leading-relaxed break-words whitespace-pre-line text-neutral-900 shadow-sm">
                {message}
                <span className="mt-1 block text-right text-[10px] opacity-60">✓✓</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
          <a
            href={buildWhatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-white hover:bg-ink"
          >
            <WhatsAppIcon className="size-5" />
            Kirim via WhatsApp
            <span className="sr-only"> (tab baru)</span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="min-h-12 rounded-full border border-foreground/25 px-6 text-sm hover:border-foreground"
          >
            {copied ? 'Link tersalin ✓' : 'Salin Link Produk'}
          </button>
        </div>
        {p.customizable && (
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Semua produk bisa disesuaikan ukuran, bahan, dan warnanya. Pemesanan dan pembayaran
            dilakukan setelah konsultasi via WhatsApp.
          </p>
        )}
      </div>
    </div>
  );
}
