// Sumber: "Price List 2026" dari Google Drive ICH. Angka dalam Rupiah.
// `price` = harga terendah, dipakai untuk label "mulai dari" dan estimasi subtotal.
export type PriceOption = { label: string; price: number };
export type PriceInfo = { price: number; options?: PriceOption[]; note?: string };

const k = (list: [string, number][]): PriceOption[] =>
  list.map(([label, price]) => ({ label, price: price * 1000 }));

const opt = (list: [string, number][], note?: string): PriceInfo => ({
  price: Math.min(...list.map(([, p]) => p)) * 1000,
  options: k(list),
  note,
});

const TAMBAHAN =
  'Tambahan: air mineral gelas Rp1.500, air mineral botol Rp2.500, teh kotak Rp5.000, kurma 3 pcs Rp7.000.';

export const prices: Record<string, PriceInfo> = {
  'snack-box': opt(
    [
      ['Isi 2 pcs', 17],
      ['Isi 3 pcs', 24],
      ['Isi 4 pcs', 31],
      ['Isi 5 pcs', 38],
    ],
    TAMBAHAN,
  ),
  'snack-besekan': opt(
    [
      ['Isi 2 pcs', 21],
      ['Isi 3 pcs', 27],
      ['Isi 4 pcs', 35],
      ['Isi 5 pcs', 38],
    ],
    TAMBAHAN,
  ),
  'snack-cup': opt([
    ['Isi 2 pcs', 17],
    ['Isi 3 pcs', 22],
    ['Isi 4 pcs', 32],
  ]),
  'rantang-jajanan-pasar': opt([
    ['Kue 10 pcs', 145],
    ['Kue 15 pcs', 175],
    ['Kue 20 pcs', 235],
    ['Kue 25 pcs', 285],
    ['Kue 30 pcs', 335],
    ['Kue 40 pcs', 400],
  ]),
  'tampah-kue-jajanan-pasar': opt([
    ['Tampah 25 pcs', 215],
    ['Tampah 30 pcs', 250],
    ['Tampah 50 pcs', 385],
    ['Tampah 70 pcs', 535],
    ['Tampah 90 pcs', 665],
    ['Tampah 100 pcs', 745],
  ]),
  'tampah-rebusan': opt([
    ['Tampah kecil', 350],
    ['Tampah sedang', 425],
    ['Tampah besar', 575],
  ]),
  'tampah-rujak': opt([
    ['Tampah sedang', 425],
    ['Tampah besar', 575],
  ]),
  'nasi-tumpeng': opt([
    ['Tumpeng 10 porsi', 750],
    ['Tumpeng 15 porsi', 1125],
    ['Tumpeng 20 porsi', 1500],
    ['Tumpeng 25 porsi', 1875],
    ['Tumpeng 30 porsi', 2250],
  ]),
  // Price list menulis "45/50 K" tanpa keterangan bedanya. TODO: konfirmasi ke klien
  'nasi-box': { price: 45000, note: 'Nasi box putih atau cokelat: Rp45.000/Rp50.000.' },
  'nasi-besek': opt([
    ['Nasi besek', 55],
    ['Nasi besek pita', 60],
  ]),
  'nasi-cup': { price: 35000 },
  'nasi-rantang': opt([['Rantang 2 susun (5-6 pax)', 415]]),
  'nasi-bakul': { price: 345000 },
  'tumpeng-cenil': opt([
    ['Tampah mini', 205],
    ['Tampah kecil', 300],
    ['Tampah sedang', 405],
    ['Tampah besar', 515],
  ]),
  'cenil-besek': opt([
    ['Besek', 75],
    ['Besek + pita', 85],
  ]),
  'pempek-tampah': opt([
    ['Tampah 30 pcs', 265],
    ['Tampah 50 pcs', 400],
    ['Tampah 70 pcs', 560],
    ['Tampah 80 pcs', 640],
    ['Tampah 100 pcs', 800],
  ]),
  'pempek-rantang': opt([
    ['Rantang 10 pcs', 155],
    ['Rantang 15 pcs', 195],
    ['Rantang 20 pcs', 235],
    ['Rantang 30 pcs', 340],
    ['Rantang 40 pcs', 420],
  ]),
  'dimsum-besek-cup': opt([
    ['Box 10 pcs', 85],
    ['Besek 10 pcs', 100],
    ['Besek 15 pcs', 135],
    ['Besek 20 pcs', 170],
  ]),
  'tampah-bubur-kendil': opt([
    ['3 rasa, kendil ari', 395],
    ['3 rasa, kendil bakar', 470],
    ['5 rasa, kendil ari', 595],
    ['5 rasa, kendil bakar', 695],
  ]),
  'bubur-manis-cup': opt([
    ['Bubur 2 rasa, cup 150 ml', 15],
    ['Bubur 2 rasa, cup 200 ml', 17],
    ['Bubur 2 rasa, cup 300 ml', 20],
    ['Bubur manis pilihan rasa', 22],
  ]),
  'serabi-tart': {
    price: 195000,
    note: 'Isi 20 pcs, termasuk bday tag, lilin 2 pcs, kartu ucapan.',
  },
  'onde-tart': { price: 235000, note: 'Isi 30 pcs, termasuk bday tag, lilin 2 pcs, kartu ucapan.' },
  'lapis-legit': opt([
    ['Ukuran 20x10', 300],
    ['Ukuran 20x20', 500],
  ]),
};
