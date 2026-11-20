// Logo teks SANARÉA: serif tipis, spasi huruf sangat lebar.
// TODO: ganti dengan file logo asli (resolusi tinggi / vektor) dari pemilik.
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-serif text-base font-light tracking-[0.26em] uppercase sm:text-xl sm:tracking-[0.42em] ${className}`}
    >
      Sanaréa
    </span>
  );
}
