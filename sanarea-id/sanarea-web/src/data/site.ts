// Profil toko. Sumber: bio & caption IG @sanarea.id dan assets/Informasi.txt

/** Jam buka per hari (0 = Minggu … 6 = Sabtu), format HH:MM WIB */
export type DayHours = { open: string; close: string } | null;

export const site = {
  name: 'SANARÉA',
  tagline: 'A Modest Soul Essentials',
  // Versi panjang tagline (footer & hero)
  taglineLong:
    'Hijab dan aksesoris yang lembut, tenang, dan mudah dipadukan, dibuat untuk menemani setiap langkah Kakak dengan anggun dan percaya diri.',
  description:
    'SANARÉA, toko hijab Cianjur: pashmina, khimar viscose, khiban rayon, bandana instan, hijab sport, dan aksesoris dengan gaya modern dan minimalis.',
  address: 'Jl. Puncak Manis, Nagrak, Blok D10, Cianjur',
  addressDetail: {
    street: 'Jl. Puncak Manis, Nagrak, Blok D10',
    city: 'Cianjur',
    region: 'Jawa Barat',
    country: 'ID',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sanarea+Jl.+Puncak+Manis+Nagrak+Cianjur',
  hoursText: 'Senin – Minggu, 11.00 – 21.00 WIB',
  hours: [
    { open: '11:00', close: '21:00' },
    { open: '11:00', close: '21:00' },
    { open: '11:00', close: '21:00' },
    { open: '11:00', close: '21:00' },
    { open: '11:00', close: '21:00' },
    { open: '11:00', close: '21:00' },
    { open: '11:00', close: '21:00' },
  ] satisfies DayHours[],
  instagram: 'https://www.instagram.com/sanarea.id',
  threads: 'https://www.threads.com/@sanarea.id',
  handle: '@sanarea.id',
  // TODO: email & marketplace belum ada di Informasi.txt
} as const;
