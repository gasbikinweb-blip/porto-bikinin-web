// Data kontak & profil. Sumber: assets/Informasi.txt dan Portfolio.pdf.
export const site = {
  name: 'Studio AG',
  tagline: 'Crafting Space Experiences',
  description:
    'Studio AG adalah interior design & build studio di Jakarta. Desain interior, produksi furnitur custom di workshop sendiri, hingga renovasi untuk hunian, kantor, dan ruang komersial di Jabodetabek.',
  founded: 2023,
  waDisplay: '+62 898-7701-605',
  email: 'studioagofficial@gmail.com',
  address: {
    street: 'Apartemen Menara Latumenten, Jl. Prof. Dr. Latumeten, Jelambar Baru',
    district: 'Grogol Petamburan',
    city: 'Jakarta Barat',
    region: 'DKI Jakarta',
    postalCode: '11460',
  },
  // Hanya link keluar, tanpa iframe
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Apartemen+Menara+Latumenten+Jelambar+Baru+Jakarta+Barat',
  // TODO: jam operasional belum ada di Informasi.txt
  hours: null as string | null,
  areaServed: 'Jakarta & Jabodetabek',
  social: [
    {
      label: 'Instagram',
      handle: '@official_studioag',
      href: 'https://www.instagram.com/official_studioag',
    },
    {
      label: 'TikTok',
      handle: '@official_studioag',
      href: 'https://www.tiktok.com/@official_studioag',
    },
    { label: 'Facebook', handle: 'Studio AG', href: 'https://www.facebook.com/share/1DBj2N3vU8/' },
    // TODO: link Threads belum tersedia
  ],
} as const;
