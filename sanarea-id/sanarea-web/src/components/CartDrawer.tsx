'use client';

// Panel keranjang (<dialog> dari kanan): daftar produk, nama penerima, alamat, lalu kirim sebagai satu pesan WhatsApp.
// "Gunakan lokasi saya saat ini": koordinat GPS perangkat → alamat teks lewat OpenStreetMap Nominatim.
// Koordinat hanya dikirim ke Nominatim untuk diubah jadi alamat, lalu ikut pesan WA. Tidak disimpan di mana pun.
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getProduct } from '@/data/products';
import { salePriceOf } from '@/data/promos';
import { cart, OPEN_CART_EVENT, useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { BagIcon, PinIcon, WhatsAppIcon } from './icons';

// Koordinat → alamat teks (bahasa Indonesia); null bila gagal
async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      format: 'jsonv2',
      lat: String(lat),
      lon: String(lon),
      zoom: '18',
      'accept-language': 'id',
    });
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`);
    if (!res.ok) return null;
    const data: unknown = await res.json();
    const name = (data as { display_name?: unknown }).display_name;
    return typeof name === 'string' ? name.replace(/,\s*Indonesia$/, '').slice(0, 200) : null;
  } catch {
    return null;
  }
}

// Buang karakter kontrol (kecuali baris baru) dari teks bebas
const clean = (s: string, max: number) =>
  Array.from(s)
    .map((c) => (c.charCodeAt(0) < 32 && c !== '\n' ? ' ' : c))
    .join('')
    .trim()
    .slice(0, max);

export function CartDrawer() {
  const ref = useRef<HTMLDialogElement>(null);
  const items = useCart();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pin, setPin] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [geo, setGeo] = useState<'idle' | 'loading' | 'denied' | 'partial'>('idle');
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_CART_EVENT, show);
    return () => window.removeEventListener(OPEN_CART_EVENT, show);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      // Tutup dialog lain (mis. detail produk) agar tidak bertumpuk
      document
        .querySelectorAll<HTMLDialogElement>('dialog[open]')
        .forEach((d) => d !== dialog && d.close());
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }
    if (!open && dialog.open) {
      dialog.close();
      document.body.style.overflow = '';
    }
  }, [open]);

  const lines = items.flatMap((i) => {
    const p = getProduct(i.slug);
    if (!p) return [];
    const color = p.colors.find((c) => c.slug === i.color);
    const price = salePriceOf(p.slug) ?? p.price;
    const image = color?.images?.[0] ?? p.images[0];
    return [{ ...i, p, colorInfo: color, price, image }];
  });
  const total = lines.reduce((sum, l) => sum + (l.price ?? 0) * l.qty, 0);
  const unknownPrice = lines.some((l) => l.price === undefined);
  const count = lines.reduce((n, l) => n + l.qty, 0);

  const errors = [
    !lines.length && 'Keranjang masih kosong.',
    !name.trim() && 'Isi nama penerima.',
    !address.trim() && 'Isi alamat pengiriman, atau tekan "Gunakan lokasi saya saat ini".',
  ].filter((e): e is string => Boolean(e));

  const message = [
    'Halo Sanaréa, saya mau pesan:',
    '',
    ...lines.flatMap((l, idx) => [
      `${idx + 1}. ${l.p.name}`,
      l.colorInfo ? `   Warna: ${l.colorInfo.name}` : null,
      `   Jumlah: ${l.qty} pcs`,
      `   Harga: ${l.price === undefined ? 'mohon info harga' : `${formatPrice(l.price)} / pcs`}`,
      '',
    ]),
    '----------',
    `Subtotal: ${formatPrice(total)}${unknownPrice ? ' (belum termasuk produk yang harganya perlu dikonfirmasi)' : ''}`,
    '----------',
    `Nama penerima: ${clean(name, 80)}`,
    `Alamat: ${clean(address, 300)}`,
    pin ? `Titik lokasi: ${pin}` : null,
    notes.trim() ? `Catatan: ${clean(notes, 300)}` : null,
    '',
    'Apakah semuanya ready dan berapa ongkirnya? Terima kasih.',
  ]
    .filter((l): l is string => l !== null)
    .join('\n');

  function locateMe() {
    if (!('geolocation' in navigator)) {
      setGeo('denied');
      return;
    }
    setGeo('loading');
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const lat = coords.latitude.toFixed(6);
        const lon = coords.longitude.toFixed(6);
        setPin(`https://maps.google.com/?q=${lat},${lon}`);
        const text = await reverseGeocode(coords.latitude, coords.longitude);
        if (text) {
          setAddress(text);
          setGeo('idle');
        } else setGeo('partial');
      },
      () => setGeo('denied'),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  const field =
    'mt-2 w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-ink';

  return (
    <dialog
      ref={ref}
      aria-labelledby="keranjang-judul"
      aria-modal="true"
      onCancel={(e) => {
        e.preventDefault();
        setOpen(false);
      }}
      onClose={() => {
        setOpen(false);
        document.body.style.overflow = '';
      }}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      className="sheet m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-background p-0 text-ink"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="keranjang-judul" className="display-caps text-xl">
            Keranjang{' '}
            <span className="font-sans text-sm tracking-normal text-muted">({count})</span>
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid size-11 place-items-center rounded-full border border-line hover:border-ink"
          >
            <span className="sr-only">Tutup keranjang</span>
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {lines.length === 0 ? (
            <div className="py-16 text-center text-muted">
              <BagIcon className="mx-auto size-8" />
              <p className="mt-4">Keranjang masih kosong, Kak.</p>
              <a
                href="#katalog"
                onClick={() => setOpen(false)}
                className="btn btn-line mt-6 rounded-full"
              >
                Lihat katalog
              </a>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((l) => (
                <li key={`${l.slug}-${l.color ?? ''}`} className="flex gap-4 py-4">
                  <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-surface">
                    {l.image && (
                      <Image
                        src={l.image.thumb}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-lg leading-tight">{l.p.name}</p>
                    {l.colorInfo && (
                      <p className="mt-0.5 text-xs text-muted">Warna: {l.colorInfo.name}</p>
                    )}
                    <p className="mt-1 text-sm">{formatPrice(l.price)}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          onClick={() => cart.setQty(l.slug, l.color, l.qty - 1)}
                          className="grid size-9 place-items-center"
                          aria-label={`Kurangi jumlah ${l.p.name}`}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                          {l.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => cart.setQty(l.slug, l.color, l.qty + 1)}
                          className="grid size-9 place-items-center"
                          aria-label={`Tambah jumlah ${l.p.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(l.slug, l.color)}
                        className="min-h-9 text-xs text-muted underline underline-offset-4 hover:text-ink"
                      >
                        Hapus<span className="sr-only"> {l.p.name}</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 && (
            <>
              <div className="mt-2 flex items-baseline justify-between border-t border-line pt-4">
                <span className="eyebrow">Subtotal</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>
              {unknownPrice && (
                <p className="mt-1 text-xs text-muted">
                  Sebagian harga akan dikonfirmasi admin. Ongkir dihitung admin.
                </p>
              )}

              {/* Data penerima: hanya dipakai untuk menyusun pesan WA, tidak dikirim ke server */}
              <div className="mt-8 space-y-5">
                <div>
                  <label htmlFor="k-nama" className="text-xs">
                    Nama penerima
                  </label>
                  <input
                    id="k-nama"
                    autoComplete="name"
                    value={name}
                    maxLength={80}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap penerima"
                    aria-invalid={tried && !name.trim()}
                    className={field}
                  />
                </div>
                <div>
                  <div className="flex items-end justify-between gap-3">
                    <label htmlFor="k-alamat" className="text-xs">
                      Alamat pengiriman
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={locateMe}
                    disabled={geo === 'loading'}
                    className="mt-2 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-ink px-4 text-xs tracking-[0.12em] uppercase transition-colors hover:bg-ink hover:text-background disabled:opacity-60"
                  >
                    <PinIcon className="size-4" />
                    {geo === 'loading' ? 'Mencari lokasi…' : 'Gunakan lokasi saya saat ini'}
                  </button>
                  <textarea
                    id="k-alamat"
                    autoComplete="street-address"
                    value={address}
                    maxLength={300}
                    rows={3}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kota"
                    aria-invalid={tried && !address.trim()}
                    aria-describedby="k-alamat-info"
                    className={`${field} resize-none`}
                  />
                  <div id="k-alamat-info" aria-live="polite" className="mt-2 text-xs text-muted">
                    {geo === 'denied' &&
                      'Lokasi tidak bisa diambil. Izinkan akses lokasi di browser, atau tulis alamatnya ya, Kak.'}
                    {geo === 'partial' &&
                      'Titik lokasi tersimpan, tapi alamat tidak terbaca otomatis. Tulis alamatnya ya, Kak.'}
                    {geo !== 'denied' &&
                      geo !== 'partial' &&
                      (pin ? (
                        <span className="flex flex-wrap gap-x-3">
                          Titik lokasi ikut dikirim. Lengkapi nomor rumah bila perlu.
                          <a
                            href={pin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink underline"
                          >
                            Cek di peta<span className="sr-only"> (tab baru)</span>
                          </a>
                          <button type="button" onClick={() => setPin(null)} className="underline">
                            Hapus titik
                          </button>
                        </span>
                      ) : (
                        'Alamat terisi otomatis dari lokasi Kakak, tetap bisa diedit.'
                      ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="k-catatan" className="text-xs">
                    Catatan <span className="text-muted">(opsional)</span>
                  </label>
                  <textarea
                    id="k-catatan"
                    value={notes}
                    maxLength={300}
                    rows={2}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Mis. patokan rumah, ambil di toko, dll."
                    className={`${field} resize-none`}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-5 py-4">
            {tried && errors.length > 0 && (
              <ul role="alert" className="mb-3 space-y-1 text-xs text-rose-ink">
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}
            <a
              href={buildWhatsAppLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                setTried(true);
                if (errors.length) e.preventDefault();
              }}
              className="btn btn-solid w-full rounded-full"
            >
              <WhatsAppIcon className="size-4" />
              Kirim pesanan via WhatsApp<span className="sr-only"> (tab baru)</span>
            </a>
          </div>
        )}
      </div>
    </dialog>
  );
}
