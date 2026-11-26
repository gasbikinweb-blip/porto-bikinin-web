'use client';

// Penyusun pesan survei gratis: semua isian hanya dirangkai menjadi teks WhatsApp,
// tidak ada data yang dikirim atau disimpan ke server.
import { useState } from 'react';
import { getCategories } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';
import { ThemedSelect } from './ThemedSelect';

const rooms = ['Dapur', 'Ruang Keluarga', 'Ruang Tamu', 'Kamar Tidur', 'Kamar Anak', 'Kolong Tangga', 'Ruang Kerja', 'Lainnya'];
const areas = [
  'Kota Bandung',
  'Kab. Bandung (Soreang, Baleendah, Dayeuhkolot, dll.)',
  'Bandung Barat (Lembang, Padalarang, Ngamprah, dll.)',
  'Cimahi',
  'Sumedang (Jatinangor, Tanjungsari)',
  'Di luar Bandung Raya',
];

const field =
  'w-full rounded-xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent';
const label = 'mb-2 block text-[11px] font-semibold tracking-[0.12em] text-muted uppercase';

export function SurveyComposer() {
  const cats = getCategories();
  const [product, setProduct] = useState(cats[0]?.name ?? 'Kitchen Set');
  const [room, setRoom] = useState<string>(rooms[0] ?? "");
  const [size, setSize] = useState('');
  const [area, setArea] = useState<string>(areas[0] ?? "");
  const [place, setPlace] = useState('');
  const [loc, setLoc] = useState('');
  const [gps, setGps] = useState<'idle' | 'busy' | 'error'>('idle');

  const message =
    `Halo ${siteConfig.name}, saya ingin minta survei gratis dan penawaran ${product} untuk ${room}` +
    (size.trim() ? `, perkiraan ukuran ${size.trim()}` : '') +
    `, lokasi ${area}` +
    (place.trim() ? ` (${place.trim()})` : '') +
    '.' +
    (loc.trim() ? `\n\nTitik lokasi: ${loc.trim()}` : '');

  const locate = () => {
    if (!navigator.geolocation) return setGps('error');
    setGps('busy');
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setLoc(`https://maps.google.com/?q=${p.coords.latitude.toFixed(6)},${p.coords.longitude.toFixed(6)}`);
        setGps('idle');
      },
      () => setGps('error'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <div className="reveal mt-14 rounded-3xl border border-line bg-surface p-6 sm:p-10">
      <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-accent-strong uppercase">
        Pembuat pesan cepat
      </span>
      <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Susun Pesan Survei Gratis ke WhatsApp</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Pilih jenis interior, ruangan, perkiraan ukuran, dan kawasan Anda. Anda juga bisa
        melampirkan titik lokasi (Sharelock) agar tim survei kami lebih mudah menuju lokasi.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Kiri: pratinjau chat */}
        <div className="order-2 lg:order-1 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-line">
            <div className="flex items-center gap-3 bg-[#075e54] px-5 py-3 text-white">
              <span className="grid size-9 place-items-center rounded-full bg-white/15 font-serif text-lg">N</span>
              <div>
                <p className="text-sm font-semibold">{siteConfig.name}</p>
                <p className="text-[11px] text-white/75">Pratinjau pesan otomatis</p>
              </div>
            </div>
            <div className="flex min-h-72 flex-col bg-[#efeae2] px-4 py-6 sm:px-6">
              <p className="mx-auto w-fit rounded-md bg-white px-3 py-1 text-[11px] text-neutral-600 shadow-sm">
                Hari ini
              </p>
              <div className="mt-4 ml-auto max-w-[92%] rounded-xl rounded-tr-sm bg-[#d9fdd3] px-4 py-3 text-sm leading-relaxed break-words whitespace-pre-line text-neutral-900 shadow-sm">
                {message}
                <span className="mt-1 block text-right text-[10px] opacity-60">Pesan siap dikirim ✓✓</span>
              </div>
            </div>
            <p className="bg-background py-2 text-center text-[11px] text-muted">Tidak ada data yang disimpan di server</p>
          </div>
          <a
            href={buildWhatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-background transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
          >
            <WhatsAppIcon className="size-5" />
            Minta Survei Gratis via WhatsApp
            <span className="sr-only"> (membuka WhatsApp di tab baru)</span>
          </a>
          <p className="mt-3 text-center text-xs text-muted">
            Survei dan konsultasi gratis untuk area Bandung Raya.
          </p>
        </div>

        {/* Kanan: brief */}
        <div className="order-1 grid gap-5 sm:grid-cols-2 lg:order-2">
          <div>
            <span id="sv-produk" className={label}>1. Jenis interior</span>
            <ThemedSelect labelId="sv-produk" value={product} options={cats.map((c) => c.name)} onChange={setProduct} />
          </div>
          <div>
            <span id="sv-ruang" className={label}>2. Ruangan</span>
            <ThemedSelect labelId="sv-ruang" value={room} options={rooms} onChange={setRoom} />
          </div>
          <label className="sm:col-span-2">
            <span className={label}>3. Perkiraan ukuran (opsional)</span>
            <input className={field} value={size} onChange={(e) => setSize(e.target.value)} placeholder="Contoh: panjang 3 m x tinggi 2,4 m" />
          </label>
          <div className="sm:col-span-2">
            <span id="sv-area" className={label}>4. Kawasan</span>
            <ThemedSelect labelId="sv-area" value={area} options={areas} onChange={setArea} />
          </div>
          <label className="sm:col-span-2">
            <span className={label}>5. Kecamatan / perumahan (opsional)</span>
            <input className={field} value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Contoh: Antapani, Perum Bumi Asri" />
          </label>
          <div className="sm:col-span-2">
            <span className={label}>6. Sharelock / titik lokasi (opsional)</span>
            <input
              className={field}
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              placeholder="Tempel link Google Maps atau klik tombol di bawah"
              aria-label="Link titik lokasi"
            />
            <button
              type="button"
              onClick={locate}
              className="mt-3 w-full rounded-xl border border-accent/50 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent-strong transition-colors hover:bg-accent/20"
            >
              {gps === 'busy' ? 'Mengambil lokasi…' : 'Ambil Titik Lokasi Saya'}
            </button>
            {gps === 'error' && (
              <p className="mt-2 text-xs text-muted">Lokasi tidak bisa diambil. Silakan tempel link Google Maps secara manual.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
