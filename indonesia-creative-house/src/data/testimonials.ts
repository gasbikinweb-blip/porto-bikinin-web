export type Testimonial = {
  id: string;
  text: string;
  name: string; // disamarkan
  event?: string;
  source: string;
  isPlaceholder: boolean;
};

// TODO: isi testimoni asli beserta izin pelanggan. Dilarang mengarang testimoni.
export const testimonials: Testimonial[] = [
  {
    id: 'placeholder-1',
    text: '[Testimoni pelanggan asli akan ditampilkan di sini]',
    name: '',
    source: '',
    isPlaceholder: true,
  },
];
