// Profil toko yang tampil di website
export const site = {
  name: 'Sirait Printing',
  taglines: ['Print Durung Murah', 'Berusaha Membantu Mahasiswa'],
  description:
    'Print skripsi, proposal, dan tesis mulai Rp190/lembar di Jl. Durung No. 174, Medan. Hitam putih dan warna sama harga, jilid lux, fotocopy, cetak sertifikat. Kirim file via WhatsApp.',
  waDisplay: '0851-8415-8680',
  address: {
    street: 'Jl. Durung No. 174',
    landmark: 'Depan SD-SMP Pahlawan, setelah Gereja Katolik',
    // Dari video Sep 2026: "dekat dari simpang Jl. William Iskandar (Jl. Pancing)"
    nearby: 'Dekat simpang Jl. William Iskandar (Jl. Pancing)',
    // TODO: konfirmasi kelurahan, kecamatan, dan kode pos
    city: 'Medan',
    region: 'Sumatera Utara',
  },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Sirait+Printing+Jl.+Durung+No.+174+Medan',
  instagram: 'https://www.instagram.com/sirait_printing/',
  threads: 'https://www.threads.net/@sirait_printing',
  // TODO: konfirmasi jam buka (angka dari brief, belum tertulis di postingan) & hari libur nasional
  hours: { open: '06.30', close: '23.50', days: 'Setiap hari' }, // "Buka setiap hari" tertulis di video Mar 2026
  // Kampus yang disebut di hashtag postingan. TODO: konfirmasi kampus terdekat untuk teks SEO
  campuses: ['Unimed', 'UINSU', 'Nommensen'],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region}`;
export const hoursText = `${site.hours.days}, ${site.hours.open}–${site.hours.close} WIB`;
