// Semua nilai NEXT_PUBLIC_* BERSIFAT PUBLIK (ikut ke browser), bukan secret.

/** Bersihkan nomor ke format 62xxx. Mengembalikan null kalau tidak valid. */
export function cleanWaNumber(raw: string): string | null {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`;
  return /^62\d{8,13}$/.test(digits) ? digits : null;
}

const waNumber = cleanWaNumber(process.env.NEXT_PUBLIC_WA_NUMBER || '081381168884');
if (!waNumber) throw new Error('NEXT_PUBLIC_WA_NUMBER tidak valid. Gunakan format 628xxxxxxxxx.');

export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'ICH Indonesia Creative House',
  // TODO: ganti dengan domain asli saat deploy
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ich-web.vercel.app').replace(/\/+$/, ''),
  waNumber,
};

/** Satu-satunya pembuat link WhatsApp */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${config.waNumber}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = 'Halo ICH, saya mau tanya menu dan pesanan untuk acara.';

export const itemUrl = (slug: string) => `${config.siteUrl}/#menu-${slug}`;

export type OrderForm = {
  tanggal?: string;
  pemesan?: string;
  jam?: string;
  pesanan: string[];
  penerima?: string;
  alamat?: string;
  lokasi?: string;
  hp?: string;
  bon?: string;
  tambahan?: string[];
};

// Urutan dan label mengikuti form order dari admin ICH
export const orderFormMessage = (o: OrderForm) =>
  [
    'Halo ICH, saya mau pesan:',
    '',
    `Hari, Tgl kirim: ${o.tanggal ?? ''}`,
    `Nama Pemesan: ${o.pemesan ?? ''}`,
    `Jam sampai: ${o.jam ?? ''}`,
    'Pesanan:',
    ...o.pesanan.map((p) => `- ${p}`),
    '',
    'Tujuan Kirim',
    `Nama: ${o.penerima ?? ''}`,
    `Alamat: ${o.alamat ?? ''}`,
    ...(o.lokasi ? [`Titik lokasi: ${o.lokasi}`] : []),
    `No hp: ${o.hp ?? ''}`,
    `Bon/Kuitansi atas nama: ${o.bon ?? ''}`,
    ...(o.tambahan?.length ? ['', ...o.tambahan] : []),
  ].join('\n');

export const itemMessage = (name: string, slug: string, qty: number, unit: string) =>
  orderFormMessage({
    pesanan: [`${name} ${qty} ${unit}`],
    tambahan: [`Link menu: ${itemUrl(slug)}`],
  });
