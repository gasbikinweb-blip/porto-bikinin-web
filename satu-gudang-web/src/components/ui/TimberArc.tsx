// Elemen khas Satu Gudang: garis lengkung seperti plafon kayu di proyek spa,
// berakhir dengan titik oranye (titik dari logo "G"). Dekoratif saja.
export function TimberArc({
  className = '',
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 80"
      fill="none"
      aria-hidden="true"
      className={`reveal arc-draw timber-arc block h-auto w-full ${flip ? '-scale-x-100' : ''} ${className}`}
    >
      <path
        d="M2 60 C 90 60, 120 14, 210 14 S 330 66, 420 52 S 540 18, 572 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        pathLength={1}
      />
      <circle cx="586" cy="34" r="7" fill="var(--accent)" />
    </svg>
  );
}
