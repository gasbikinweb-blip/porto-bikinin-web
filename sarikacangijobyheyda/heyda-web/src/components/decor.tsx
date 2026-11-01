// Hiasan SVG inline (daun, kacang ijo, gelombang). Semua dekoratif: aria-hidden.

type DecorProps = { className?: string };

export function Leaf({ className = 'size-8' }: DecorProps) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path d="M6 34C6 16 18 6 36 4c-1 18-11 30-30 30Z" fill="currentColor" />
      <path
        d="M8 32C16 22 24 15 33 8"
        stroke="var(--background)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity=".7"
      />
    </svg>
  );
}

export function Beans({ className = 'w-24' }: DecorProps) {
  return (
    <svg viewBox="0 0 120 50" aria-hidden="true" className={className}>
      {(
        [
          [14, 30, -20],
          [36, 18, 15],
          [58, 32, -5],
          [80, 20, 25],
          [102, 32, -15],
        ] as const
      ).map(([cx, cy, r]) => (
        <g key={`${cx}-${cy}`} transform={`rotate(${r} ${cx} ${cy})`}>
          <ellipse cx={cx} cy={cy} rx="9" ry="6.5" fill="#6f9a3e" />
          <ellipse cx={cx - 3} cy={cy - 2} rx="3" ry="1.6" fill="#b7d48d" opacity=".8" />
        </g>
      ))}
    </svg>
  );
}

/** Gelombang pemisah section; warna = currentColor */
export function Wave({ className = '', flip = false }: DecorProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-8 w-full sm:h-12 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path
        d="M0 30c120-22 240-22 360 0s240 22 360 0 240-22 360 0 240 22 360 0v30H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
