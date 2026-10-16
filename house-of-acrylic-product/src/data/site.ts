// Info bisnis yang tampil di halaman
export type OpeningHour = { readonly day: string; readonly time: string };

export const site = {
  handle: '@akriliksurabaya',
  instagram: 'https://www.instagram.com/akriliksurabaya/',
  tiktok: 'https://www.tiktok.com/@hap.project.surabaya',
  waDisplay: '0852-3321-5781',
  // TODO: caption Instagram menyebut "Jl. Gebang Lor No.105 B" — pastikan alamat mana yang benar
  address: {
    street: 'Jl. Pucang Lor No. 109A',
    city: 'Surabaya',
    region: 'Jawa Timur',
    country: 'ID',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jl.+Pucang+Lor+No.+109A+Surabaya',
  // TODO: verifikasi jam buka workshop
  hours: [
    { day: 'Senin – Sabtu', time: '08.00 – 17.00 WIB' },
    { day: 'Minggu & libur nasional', time: 'Tutup (chat WA tetap dibalas)' },
  ] satisfies readonly OpeningHour[],
  bank: 'BCA a/n Hersan Fachriansyah Putra',
  description:
    'Jasa akrilik Surabaya: cutting laser akrilik, letter signage, neon box, UV printing, dan produk akrilik custom untuk UMKM, kantor, dan instansi. Konsultasi & order via WhatsApp.',
} as const;
