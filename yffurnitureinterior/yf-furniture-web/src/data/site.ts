// Profil bisnis yang tampil di website
export const site = {
  name: 'YF Furniture & Interior',
  shortName: 'YF Furniture',
  tagline: 'Furnitur & interior custom, dibuat langsung oleh workshop di Boyolali',
  description:
    'Workshop furnitur dan interior custom di Boyolali: kitchen set, backdrop TV, lemari, meja belajar, meja kasir, dan interior ruangan. Ukuran sesuai ruangan, pesan via WhatsApp.',
  waDisplay: '0898-8747-150',
  address: {
    street: 'Dk. Bakalan RT 01/04, Selodoko',
    district: 'Ampel',
    city: 'Boyolali',
    region: 'Jawa Tengah',
    postalCode: '57352',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=YF+Furniture+%26+Interior+Selodoko+Ampel+Boyolali',
  instagram: 'https://www.instagram.com/yffurnitureinterior/',
  threads: 'https://www.threads.net/@yffurnitureinterior',
  instagramPosts: '368+', // TODO: verifikasi jumlah postingan saat rilis
  // TODO: konfirmasi area layanan
  serviceAreas: ['Boyolali', 'Salatiga', 'Solo', 'Semarang', 'dan sekitarnya'],
  // Dari caption Instagram: free design & cek lokasi untuk area ini
  freeSurveyAreas: 'Boyolali, Salatiga, dan sekitarnya',
  // TODO: isi jam kerja asli
  hours: [
    { day: 'Senin – Sabtu', time: '08.00 – 16.00 WIB' },
    { day: 'Minggu', time: 'Dengan janji temu' },
  ],
  email: null as string | null, // TODO: isi email bila ada
} as const;

export const fullAddress = `${site.address.street}, Kec. ${site.address.district}, Kab. ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
