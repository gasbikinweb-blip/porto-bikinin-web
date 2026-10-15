// Pertanyaan yang sering diajukan. Jawaban bertanda TODO wajib diverifikasi sebelum go-live.

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: readonly FaqItem[] = [
  {
    question: 'Berapa lama proses Pre-Order (PO)?',
    // TODO: verifikasi estimasi produksi PO
    answer:
      'PO dibuka dalam periode tertentu (diumumkan di Instagram @sahane.id). Setelah PO ditutup, estimasi produksi sekitar 14–21 hari kerja, lalu pesanan langsung dikirim.',
  },
  {
    question: 'Apakah ada produk ready stock?',
    answer:
      'Ada, untuk warna dan ukuran tertentu. Stok berubah cepat, jadi silakan cek ketersediaan langsung ke admin via WhatsApp.',
  },
  {
    question: 'Apakah bisa custom ukuran?',
    // TODO: verifikasi kebijakan custom ukuran
    answer:
      'Untuk beberapa model, penyesuaian panjang bisa dibantu selama periode PO dengan tambahan waktu produksi. Konsultasikan ukuran Anda dengan admin sebelum membayar.',
  },
  {
    question: 'Bagaimana kebijakan retur atau tukar barang?',
    // TODO: verifikasi kebijakan retur
    answer:
      'Tukar ukuran atau retur hanya untuk produk cacat produksi atau salah kirim, maksimal 2×24 jam setelah paket diterima, dengan video unboxing tanpa jeda sebagai bukti.',
  },
  {
    question: 'Bahan apa yang digunakan?',
    // TODO: verifikasi dengan spesifikasi produk asli
    answer:
      'Kami memilih bahan yang adem, jatuh, dan tidak menerawang, seperti linen premium dan material Arabian. Detail bahan tiap produk tertera di halaman produknya.',
  },
  {
    question: 'Bagaimana cara pembayarannya?',
    // TODO: verifikasi metode pembayaran
    answer:
      'Pembayaran melalui transfer bank yang diinformasikan admin di WhatsApp. Kami tidak pernah meminta pembayaran lewat link di luar chat resmi admin.',
  },
  {
    question: 'Dikirim dari mana dan pakai ekspedisi apa?',
    // TODO: verifikasi kota asal dan ekspedisi
    answer:
      'Pesanan dikirim ke seluruh Indonesia melalui ekspedisi reguler (mis. JNE, J&T, SiCepat). Nomor resi dikirim via WhatsApp setelah paket diserahkan ke kurir.',
  },
];
