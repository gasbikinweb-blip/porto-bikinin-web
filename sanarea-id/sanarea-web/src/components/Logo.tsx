// Logo teks SANARÉA: serif tipis, spasi huruf sangat lebar.
// TODO: ganti dengan file logo asli (resolusi tinggi / vektor) dari pemilik.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-serif text-lg font-light tracking-[0.42em] uppercase sm:text-xl ${className}`}
    >
      Sanaréa
    </span>
  );
}
