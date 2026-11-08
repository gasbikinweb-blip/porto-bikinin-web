// Ornamen SVG buatan sendiri (bunga line-art, garis gelombang, siluet produk). Semua dekoratif.

type P = { className?: string };
const line = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Tangkai mawar dan tulip garis tipis */
export function FlowerSprig({ className = 'w-24' }: P) {
  return (
    <svg viewBox="0 0 120 200" aria-hidden="true" className={className} {...line}>
      <path d="M60 196C58 150 62 110 56 70" />
      <path d="M58 150c-18-6-28-20-30-36 16 2 28 14 30 36Z" />
      <path d="M59 120c16-8 30-6 38 4-12 8-26 8-38-4Z" />
      {/* mawar */}
      <path d="M56 70c-14 0-22-10-20-22 4 6 10 8 16 6-6-6-4-16 4-20 8 4 10 14 4 20 6 2 12 0 16-6 2 12-6 22-20 22Z" />
      <path d="M50 46c4-4 10-4 14 0" />
      {/* tulip kecil */}
      <path d="M62 112c8-18 18-26 30-30" />
      <path d="M92 82c-6-10-2-20 6-24 2 6 0 10-2 12 4-4 10-4 12 0-2 8-8 12-16 12Z" />
    </svg>
  );
}

/** Garis bergelombang pemisah */
export function WavyLine({ className = 'w-32' }: P) {
  return (
    <svg viewBox="0 0 160 12" aria-hidden="true" className={className} {...line}>
      <path d="M2 6c10-8 20-8 30 0s20 8 30 0 20-8 30 0 20 8 30 0 20-8 30 0" />
    </svg>
  );
}

/** Bintang kecil berkilau */
export function Sparkle({ className = 'size-4' }: P) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={className} fill="currentColor">
      <path d="M10 0c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10Z" />
    </svg>
  );
}

/** Placeholder rapi untuk produk tanpa foto */
export function ProductPlaceholder({ kind, className = '' }: P & { kind: 'papan' | 'bucket' }) {
  return (
    <div
      className={`marble relative flex h-full w-full flex-col items-center justify-center gap-3 text-rose ${className}`}
    >
      {kind === 'papan' ? (
        <svg viewBox="0 0 120 160" aria-hidden="true" className="w-1/3" {...line}>
          <circle cx="60" cy="58" r="42" />
          <path d="M30 86c10 6 20 2 30-4s22-10 32 2" />
          <path d="M44 100 30 156M76 100l14 56M60 100v56" />
        </svg>
      ) : (
        <FlowerSprig className="w-1/4" />
      )}
      <span className="rounded-full border border-rose/40 bg-ivory/80 px-3 py-1 text-xs font-medium tracking-wider">
        Foto segera hadir
      </span>
    </div>
  );
}
