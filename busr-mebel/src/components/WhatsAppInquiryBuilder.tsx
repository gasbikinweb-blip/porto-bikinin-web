'use client';

import { useId, useState } from 'react';
import { WhatsAppIcon } from './icons';
import { buildInquiryMessage, buildWhatsAppLink } from '@/lib/whatsapp';

const furnitureOptions = [
  'Meja Kerja Eksekutif / Workstation',
  'Kursi Ergonomis / Dining / Barstool',
  'Lemari, Rak Buku & Storage HPL/Jati',
  'Sofa Modular / Lounge Chair',
  'Meja Meeting Konferensi / Resepsionis',
  'Dipan Kamar Tidur & Nakas',
  'Set Furnitur Outdoor & Kafe',
  'Custom Interior Satu Ruangan / Kantor',
];

export function WhatsAppInquiryBuilder() {
  const [orderType, setOrderType] = useState<'Beli Jadi' | 'Custom Sesuai Desain'>('Beli Jadi');
  const [furnitureType, setFurnitureType] = useState<string>(
    furnitureOptions[0] ?? 'Meja Kerja Eksekutif / Workstation'
  );
  const [quantity, setQuantity] = useState('1');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const typeId = useId();
  const qtyId = useId();
  const cityId = useId();
  const notesId = useId();

  const generatedMessage = buildInquiryMessage({
    orderType,
    furnitureType,
    quantity: quantity || '1',
    city: city || 'Indonesia',
    notes,
  });

  const whatsappHref = buildWhatsAppLink(generatedMessage);

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-xl shadow-black/5">
      <div className="max-w-2xl">
        <span className="inline-block rounded-full bg-accent/15 px-3.5 py-1 text-xs font-semibold tracking-wider text-accent-strong uppercase">
          Kalkulator Estimasi Cepat
        </span>
        <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-foreground">
          Susun Kebutuhan Furnitur Anda
        </h3>
        <p className="mt-2 text-sm text-muted">
          Pilih spesifikasi kebutuhan Anda di bawah ini untuk langsung menyusun pesan penawaran resmi via WhatsApp ke tim kami.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {/* Tipe Pemesanan */}
        <div>
          <label className="block text-xs font-semibold tracking-wider text-muted uppercase">
            Jenis Pesanan
          </label>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(['Beli Jadi', 'Custom Sesuai Desain'] as const).map((type) => {
              const active = orderType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all ${
                    active
                      ? 'border-accent bg-accent/10 text-accent-strong shadow-sm'
                      : 'border-line bg-surface-2 text-foreground/80 hover:border-line/80'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tipe Furnitur & Jumlah */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label htmlFor={typeId} className="block text-xs font-semibold tracking-wider text-muted uppercase">
              Kategori Furnitur
            </label>
            <select
              id={typeId}
              value={furnitureType}
              onChange={(e) => setFurnitureType(e.target.value)}
              className="mt-2 w-full cursor-pointer rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              {furnitureOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-surface text-foreground">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor={qtyId} className="block text-xs font-semibold tracking-wider text-muted uppercase">
              Perkiraan Jumlah
            </label>
            <input
              id={qtyId}
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="1"
              className="mt-2 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {/* Kota Pengiriman */}
        <div>
          <label htmlFor={cityId} className="block text-xs font-semibold tracking-wider text-muted uppercase">
            Kota Tujuan Pengiriman & Pemasangan
          </label>
          <input
            id={cityId}
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Contoh: Jakarta Selatan, Surabaya, Jepara, Bali, dll."
            className="mt-2 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
          />
        </div>

        {/* Catatan Tambahan */}
        <div>
          <label htmlFor={notesId} className="block text-xs font-semibold tracking-wider text-muted uppercase">
            Detail Khusus / Dimensi (Opsional)
          </label>
          <textarea
            id={notesId}
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Misal: butuh kayu jati finishing dark walnut, ada file gambar denah/sketsa, dsb."
            className="mt-2 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none resize-none"
          />
        </div>

        {/* Pratinjau Teks & Tombol Aksi */}
        <div className="rounded-2xl border border-line/60 bg-surface-2/60 p-4 text-xs text-muted">
          <p className="font-semibold text-foreground/80 mb-1">Pratinjau pesan WhatsApp:</p>
          <p className="whitespace-pre-line font-mono text-[11px] leading-relaxed text-foreground/70">
            {generatedMessage}
          </p>
        </div>

        <div>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-center text-sm font-semibold text-background transition-all hover:bg-accent-strong hover:shadow-lg hover:shadow-accent/20"
          >
            <WhatsAppIcon className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            Minta Estimasi Penawaran via WhatsApp
            <span className="sr-only"> (Membuka aplikasi WhatsApp di tab baru)</span>
          </a>
          <p className="mt-3 text-center text-[11px] text-muted">
            Tanpa registrasi & tanpa formulir online. Diskusi langsung dengan spesialis furnitur Busr Mebel.
          </p>
        </div>
      </div>
    </div>
  );
}
