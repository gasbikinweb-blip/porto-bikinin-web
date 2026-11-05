// Sumber: brief, assets/Informasi.txt, dan caption Instagram
export const site = {
  name: 'ICH Indonesia Creative House',
  shortName: 'ICH',
  description:
    'ICH Indonesia Creative House, pusat jajanan pasar di Cipete, Jakarta Selatan sejak 2016. Snack box, tampah, nasi tumpeng, dan hantaran untuk acara, pesan lewat WhatsApp.',
  since: 2016,
  // TODO: minta alamat lengkap, belum ada di Informasi.txt
  address: 'Cipete, Jakarta Selatan',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cipete+Jakarta+Selatan',
  // Sumber: caption "ICH buka setiap hari". TODO: minta jam bukanya
  hours: 'Buka setiap hari',
  // TODO: konfirmasi area antar. Caption hantaran: "Delivery ke semua alamat penerima"
  deliveryArea: 'Tanyakan area antar ke admin ya, Kak',
  whatsappDisplay: '0813-8116-8884',
  instagram: 'https://www.instagram.com/indonesiacreativehouse/',
  threads: 'https://www.threads.com/@indonesiacreativehouse/',
  handle: '@indonesiacreativehouse',
};

// Sumber: balasan otomatis WhatsApp ICH
export const orderSteps = [
  { title: 'Pilih menu', text: 'Lihat menu di sini atau price list di katalog WhatsApp kami.' },
  {
    title: 'Isi form order',
    text: 'Lengkapi tanggal kirim, pesanan, dan tujuan kirim, lalu kirim via WA.',
  },
  { title: 'Terima invoice', text: 'Admin mengirim invoice atau bon setelah form diterima.' },
  { title: 'Kirim bukti transfer', text: 'Kirim bukti transfer ke WhatsApp admin ya, Kak.' },
];

export const eventTypes = [
  'Arisan',
  'Pengajian',
  'Rapat kantor',
  'Ulang tahun',
  'Syukuran',
  'Lamaran',
  'Lainnya',
] as const;

// TODO: konfirmasi batas pemesanan. Caption menulis H-1
export const LEAD_DAYS = 1;
