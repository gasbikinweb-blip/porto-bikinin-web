// Monogram sementara "Na" dalam lingkaran. TODO: ganti dengan file logo asli Griya Nuansa.
export function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        fontWeight="300"
        fill="currentColor"
        letterSpacing="0.5"
      >
        Na
      </text>
    </svg>
  );
}
