import type { L } from '@/i18n';
import type { Faq } from './types';

// TODO: SEMUA jawaban di bawah ini wajib diverifikasi oleh Griya Nuansa sebelum rilis.
export const faqs: L<Faq[]> = {
  id: [
    {
      q: 'Berapa lama proses desain dan pengerjaan?',
      a: 'Durasi bergantung pada luas, tingkat kerumitan, dan lingkup pekerjaan. Estimasi waktu akan kami sampaikan setelah konsultasi dan survei. (TODO: verifikasi)',
    },
    {
      q: 'Apakah bisa desain saja tanpa pengerjaan (build)?',
      a: 'Bisa. Anda dapat memilih layanan desain saja, atau desain sekaligus pengerjaan. (TODO: verifikasi)',
    },
    {
      q: 'Apakah melayani proyek di luar Jabodetabek?',
      a: 'Fokus layanan kami di area Jabodetabek. Untuk lokasi di luar area tersebut, silakan hubungi kami via WhatsApp untuk didiskusikan. (TODO: verifikasi)',
    },
    {
      q: 'Bagaimana sistem pembayarannya?',
      a: 'Pembayaran dilakukan bertahap sesuai progres pekerjaan dan tercantum jelas dalam penawaran. Website ini tidak menerima pembayaran apa pun. (TODO: verifikasi termin)',
    },
    {
      q: 'Apakah ada garansi?',
      a: 'Ketentuan garansi akan dijelaskan dalam penawaran sesuai jenis pekerjaan. (TODO: verifikasi)',
    },
    {
      q: 'Apakah konsultasi awal dikenakan biaya?',
      a: 'Konsultasi awal via WhatsApp tidak dikenakan biaya. (TODO: konfirmasi apakah konsultasi memang gratis)',
    },
  ],
  // Terjemahan tanpa catatan TODO; ikut diperbarui bila jawaban ID berubah
  en: [
    {
      q: 'How long does the design and build process take?',
      a: 'It depends on the size, complexity, and scope of work. We will share a time estimate after the consultation and site survey.',
    },
    {
      q: 'Can I hire you for design only, without the build?',
      a: 'Yes. You can choose design only, or design and build together.',
    },
    {
      q: 'Do you take projects outside Greater Jakarta?',
      a: 'Our main service area is Greater Jakarta (Jabodetabek). For other locations, please contact us via WhatsApp to discuss.',
    },
    {
      q: 'How does payment work?',
      a: 'Payment is made in stages according to work progress and is stated clearly in the quotation. This website does not accept any payments.',
    },
    {
      q: 'Is there a warranty?',
      a: 'Warranty terms are explained in the quotation, depending on the type of work.',
    },
    {
      q: 'Is the initial consultation free?',
      a: 'The initial consultation via WhatsApp is free of charge.',
    },
  ],
};
