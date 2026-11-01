// Klaim brand, diambil dari caption resmi @sarikacangijobyheyda

export type Benefit = {
  icon: 'leaf' | 'nosweet' | 'bean' | 'truck';
  title: string;
  text: string;
};

export const benefits: readonly Benefit[] = [
  {
    icon: 'leaf',
    title: 'Tanpa Pengawet',
    text: 'Diproduksi tanpa bahan pengawet, sesuai yang disampaikan Heyda di setiap postingannya.',
  },
  {
    icon: 'nosweet',
    title: 'Tanpa Pemanis Buatan',
    text: 'Tidak memakai pemanis buatan, jadi rasa kacang ijonya tetap terasa.',
  },
  {
    // TODO: verifikasi klaim "kacang ijo pilihan" ke owner
    icon: 'bean',
    title: 'Dari Kacang Ijo Pilihan',
    text: 'Dibuat dari kacang hijau yang dipilih, diolah jadi minuman yang segar.',
  },
  {
    // TODO: konfirmasi syarat free ongkir
    icon: 'truck',
    title: 'Free Ongkir se-Jogja',
    text: 'Gratis ongkos kirim ke seluruh Yogyakarta. Tinggal chat, botolnya kami antar.',
  },
];
