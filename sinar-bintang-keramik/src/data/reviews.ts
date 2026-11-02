// Ulasan pelanggan ASLI, disalin dari highlight "Testimoni" Instagram @sinarbintang.keramik
// (tangkapan layar ulasan Shopee & Tokopedia yang dipublikasikan toko sendiri).
// Nama pembeli disamarkan. Teks disalin apa adanya (hanya emoji dibuang).
// TODO: konfirmasi izin pemilik toko untuk menampilkan ulasan ini di website.
export type Review = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  buyer: string;
  product: string;
  source: 'shopee' | 'tokopedia' | 'pelanggan';
  /** Placeholder TIDAK boleh tampil seperti ulasan asli */
  isPlaceholder: boolean;
};

export const reviews: readonly Review[] = [
  {
    id: 'roma-1',
    rating: 5,
    text: 'Mantaaap terima kasiiih,,, semoga hasil akhirnya sesuai harapan.',
    buyer: 'b***o',
    product: 'Keramik Lantai Kamar Mandi 25x25 Roma',
    source: 'shopee',
    isPlaceholder: false,
  },
  {
    id: 'fremont-1',
    rating: 5,
    text: 'Terima kasih, responnya cepet banget. Order jam 1 pagi, jam 11 siang udah di anter. Bisa jadi langganan.',
    buyer: 'n***j',
    product: 'Keramik 40x40 Fremont',
    source: 'shopee',
    isPlaceholder: false,
  },
  {
    id: 'qatar-1',
    rating: 5,
    text: 'Keramik sesuai pesanan, sesuai motif, harga terjangkau, seller ramah response bagus mantaaapp.',
    buyer: 'p***o',
    product: 'Keramik Ruangan 40x40 Qatar',
    source: 'shopee',
    isPlaceholder: false,
  },
  {
    id: 'pintu-pvc-1',
    rating: 5,
    text: 'Kualitas produk baik, sesuai sama di gambar respon penjual sangat baiiiikkkk, pokoknya gk mengecewakan thankyou seller.',
    buyer: 'n***k',
    product: 'Pintu PVC Kamar Mandi 70x195',
    source: 'shopee',
    isPlaceholder: false,
  },
  {
    id: 'kloset-1',
    rating: 5,
    text: 'Barang bagus Harga terjangkau, kurir Ramah dan admin fast respon.',
    buyer: 'z***n',
    product: 'Kloset Jongkok Volk',
    source: 'tokopedia',
    isPlaceholder: false,
  },
  {
    id: 'upvc-1',
    rating: 5,
    text: 'Kalian wajib banget sih beli pintu kamar mandi dsni, barangnya cpt banget dikirim, malam pesen siang udah nyampe, gk nyesel pokonya bagus banget.',
    buyer: 'u***n',
    product: 'Pintu Kamar Mandi UPVC Eden',
    source: 'shopee',
    isPlaceholder: false,
  },
];
