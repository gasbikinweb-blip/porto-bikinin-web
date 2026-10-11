'use client';

// Pembuat pesan WhatsApp. BUKAN form: tidak ada <form>, tidak ada submit, tidak ada penyimpanan.
// Input hanya dipakai untuk menyusun teks pesan, lalu dibuka di WhatsApp lewat link wa.me.
import { useId, useState } from 'react';
import {
  FACILITY_TYPES,
  ROOM_TYPES,
  facilityLabels,
  roomLabels,
  type FacilityType,
  type RoomType,
} from '@/data/types';
import { siteConfig } from '@/lib/config';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

const MAX_AREA = 100_000;
const CITY_MAX = 50;
// Huruf (termasuk beraksen), spasi, titik, koma, tanda hubung, dan apostrof
const CITY_PATTERN = /^[\p{L} .,'-]+$/u;

const isFacility = (v: string): v is FacilityType =>
  (FACILITY_TYPES as readonly string[]).includes(v);
const isRoom = (v: string): v is RoomType => (ROOM_TYPES as readonly string[]).includes(v);

type Errors = Partial<Record<'facility' | 'room' | 'area' | 'city', string>>;

function validate(facility: string, room: string, area: string, city: string) {
  const errors: Errors = {};
  if (!isFacility(facility)) errors.facility = 'Pilih tipe fasilitas.';
  if (!isRoom(room)) errors.room = 'Pilih tipe ruangan.';

  // "1.200" dibaca sebagai seribu dua ratus (format Indonesia); koma sebagai desimal
  const areaText = /^\d{1,3}(\.\d{3})+$/.test(area) ? area.replace(/\./g, '') : area;
  const areaNum = Number(areaText.replace(',', '.'));
  if (!area.trim()) errors.area = 'Isi estimasi luas.';
  else if (!Number.isFinite(areaNum) || areaNum <= 0)
    errors.area = 'Luas harus angka lebih dari 0.';
  else if (areaNum > MAX_AREA)
    errors.area = `Luas maksimal ${MAX_AREA.toLocaleString('id-ID')} m².`;

  const cityClean = city.trim().replace(/\s+/g, ' ');
  if (cityClean.length < 2) errors.city = 'Isi nama kota (minimal 2 huruf).';
  else if (cityClean.length > CITY_MAX) errors.city = `Nama kota maksimal ${CITY_MAX} karakter.`;
  else if (!CITY_PATTERN.test(cityClean)) errors.city = 'Gunakan huruf saja untuk nama kota.';

  return { errors, areaNum, cityClean };
}

export function WhatsAppMessageBuilder() {
  const id = useId();
  const [facility, setFacility] = useState('');
  const [room, setRoom] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [touched, setTouched] = useState(false);

  const { errors, areaNum, cityClean } = validate(facility, room, area, city);
  const valid = Object.keys(errors).length === 0;

  const message =
    valid && isFacility(facility) && isRoom(room)
      ? `Halo ${siteConfig.name}, saya ingin meminta survei dan penawaran lantai vinyl untuk ${roomLabels[room].toLowerCase()} di ${facilityLabels[facility].toLowerCase()}, estimasi luas ${areaNum.toLocaleString('id-ID')} m2, lokasi ${cityClean}.`
      : '';

  const showError = (key: keyof Errors) => (touched ? errors[key] : undefined);
  const field =
    'mt-2 block w-full rounded-xl border border-line bg-background px-4 py-3 text-base aria-invalid:border-red-700';

  const fieldProps = (key: keyof Errors) => ({
    'aria-invalid': Boolean(showError(key)),
    'aria-describedby': showError(key) ? `${id}-${key}-err` : undefined,
    onBlur: () => setTouched(true),
  });

  const errorText = (k: keyof Errors) =>
    showError(k) ? (
      <p id={`${id}-${k}-err`} className="mt-1.5 text-sm text-red-700">
        {showError(k)}
      </p>
    ) : null;

  return (
    <div className="rounded-3xl border border-line bg-background p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold">Susun pesan WhatsApp Anda</h2>
      <p className="mt-2 text-sm text-muted">
        Isian ini hanya untuk menyusun teks pesan. Tidak ada data yang dikirim atau disimpan oleh
        situs ini. Pesan baru terkirim setelah Anda menekan kirim di WhatsApp.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-facility`} className="text-sm font-semibold">
            Tipe fasilitas
          </label>
          <select
            id={`${id}-facility`}
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className={field}
            {...fieldProps('facility')}
          >
            <option value="">Pilih…</option>
            {FACILITY_TYPES.map((f) => (
              <option key={f} value={f}>
                {facilityLabels[f]}
              </option>
            ))}
          </select>
          {errorText('facility')}
        </div>
        <div>
          <label htmlFor={`${id}-room`} className="text-sm font-semibold">
            Tipe ruangan
          </label>
          <select
            id={`${id}-room`}
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={field}
            {...fieldProps('room')}
          >
            <option value="">Pilih…</option>
            {ROOM_TYPES.map((r) => (
              <option key={r} value={r}>
                {roomLabels[r]}
              </option>
            ))}
          </select>
          {errorText('room')}
        </div>
        <div>
          <label htmlFor={`${id}-area`} className="text-sm font-semibold">
            Estimasi luas (m²)
          </label>
          <input
            id={`${id}-area`}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            maxLength={9}
            placeholder="contoh: 120"
            value={area}
            onChange={(e) => setArea(e.target.value.replace(/[^\d.,]/g, ''))}
            className={field}
            {...fieldProps('area')}
          />
          {errorText('area')}
        </div>
        <div>
          <label htmlFor={`${id}-city`} className="text-sm font-semibold">
            Kota lokasi proyek
          </label>
          <input
            id={`${id}-city`}
            type="text"
            autoComplete="off"
            maxLength={CITY_MAX}
            placeholder="contoh: Bandung"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={field}
            {...fieldProps('city')}
          />
          {errorText('city')}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-surface p-4 text-sm">
        <p className="font-semibold">Pratinjau pesan</p>
        <p className="mt-1 text-muted" aria-live="polite">
          {message || 'Lengkapi semua isian untuk melihat pesan.'}
        </p>
      </div>

      {valid ? (
        <a
          href={buildWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wa px-6 py-4 font-semibold text-white transition-colors hover:bg-wa-strong sm:w-auto"
        >
          <WhatsAppIcon />
          Buka di WhatsApp
          <span className="sr-only">(tab baru)</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setTouched(true)}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-wa px-6 py-4 font-semibold text-white sm:w-auto"
        >
          <WhatsAppIcon />
          Buka di WhatsApp
        </button>
      )}
    </div>
  );
}
