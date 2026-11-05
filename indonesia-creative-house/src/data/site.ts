// Sumber: brief, assets/Informasi.txt, dan caption Instagram
export const site = {
  name: 'ICH Indonesia Creative House',
  shortName: 'ICH',
  description:
    'ICH Indonesia Creative House, pusat jajanan pasar di Cipete, Jakarta Selatan sejak 2016. Snack box, tampah, nasi tumpeng, dan hantaran untuk acara, pesan lewat WhatsApp.',
  since: 2016,
  // TODO: minta alamat jalan lengkap; titik peta dari Google Maps klien
  address: 'Cipete, Jakarta Selatan',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=ICH+Jakarta+Indonesia+Creative+House',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.900298885759!2d106.80063419999999!3d-6.2768375999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f193892cff2b%3A0x7a5a7985076e452e!2sICH%20Jakarta-%20Indonesia%20Creative%20House!5e0!3m2!1sid!2sid!4v1793842895749!5m2!1sid!2sid',
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
