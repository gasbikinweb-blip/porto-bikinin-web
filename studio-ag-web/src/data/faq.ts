// FAQ. Jawaban hanya diisi bila ada sumbernya (PDF / caption IG); sisanya TODO untuk dikonfirmasi klien.
export type Faq = { q: string; a: string; todo?: boolean };

export const faqs: Faq[] = [
  {
    q: 'Apa saja layanan Studio AG?',
    a: 'Kami adalah interior design & build studio: desain interior, produksi furnitur custom di workshop sendiri, hingga renovasi interior untuk hunian, kantor, dan ruang komersial.',
  },
  {
    q: 'Apakah bisa hanya jasa desain, tanpa produksi?',
    a: 'Bisa. Beberapa proyek kami, misalnya di Park Serpong, dikerjakan sebagai layanan desain interior saja.',
  },
  {
    q: 'Apakah saya bisa melihat desainnya sebelum dikerjakan?',
    a: 'Ya. Kami menyediakan visualisasi 3D (digital rendering) agar Anda bisa melihat gambaran ruang sebelum produksi dimulai.',
  },
  {
    q: 'Bagaimana memastikan hasilnya sesuai desain?',
    a: 'Setiap proyek yang berjalan melalui quality check oleh tim produksi agar furnitur presisi sesuai gambar perencanaan.',
  },
  {
    q: 'HPL apa yang biasa dipakai?',
    a: 'Material dipilih per proyek sesuai konsep dan kebutuhan. Silakan konsultasikan pilihan finishing untuk ruangan Anda.',
  },
  {
    q: 'Area mana saja yang dilayani?',
    // TODO: konfirmasi jangkauan area ke klien (portofolio juga mencakup Singkawang)
    a: 'Jakarta dan Jabodetabek. Untuk lokasi lain, silakan tanyakan lewat WhatsApp.',
    todo: true,
  },
  {
    q: 'Berapa biaya dan lama pengerjaan?',
    // TODO: isi bila klien ingin mencantumkan kisaran; jangan mengarang angka
    a: 'Biaya dan durasi bergantung pada luas, desain, dan material. Kami menyusunnya secara transparan setelah konsultasi.',
    todo: true,
  },
  {
    q: 'Apakah ada garansi?',
    // TODO: konfirmasi kebijakan garansi ke klien
    a: 'Silakan tanyakan detailnya kepada tim kami lewat WhatsApp.',
    todo: true,
  },
];
