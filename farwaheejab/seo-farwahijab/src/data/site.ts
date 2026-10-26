// Profil brand yang tampil di website (sumber: Informasi.txt & caption Instagram)
export const site = {
  name: 'Farwa Hijab',
  handle: '@farwaheejab',
  tagline: 'Pelopor Hijab Premium Harga Grosir',
  description:
    'Farwa Hijab: khimar, khiban voal, hijab instan, dan pashmina premium dengan harga bersahabat dari Bandung. Beli eceran di Shopee atau gabung jadi reseller.',
  city: 'Bandung',
  waDisplay: '+62 851-6631-0005',
  instagram: 'https://www.instagram.com/farwaheejab/',
  tiktok: 'https://www.tiktok.com/@farwa.heejab',
  facebook: 'https://www.facebook.com/1167447336442595',
  // TODO: Informasi.txt berisi link TikTok untuk Threads; konfirmasi link Threads yang benar
  threads: null as string | null,
  // TODO: konfirmasi hubungan dengan @bohoutfit
  parentBrand: '@bohoutfit',
  email: null as string | null, // TODO
  address: null as string | null, // TODO: alamat (caption: "bisa visit lokasi Bandung")
} as const;
