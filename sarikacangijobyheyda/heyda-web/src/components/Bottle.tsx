import { Leaf } from './decor';

type BottleProps = {
  /** Warna tutup & aksen label */
  color: string;
  label: string;
  className?: string;
  /** Tampilkan tulisan "Foto produk segera hadir" */
  placeholder?: boolean;
};

// Botol ilustrasi SVG, dipakai selama foto produk asli belum ada
export function Bottle({ color, label, className = 'w-40', placeholder = false }: BottleProps) {
  return (
    <figure className={`relative ${className}`}>
      <svg
        viewBox="0 0 160 300"
        role="img"
        aria-label={`Ilustrasi botol ${label}`}
        className="w-full"
      >
        {/* Tutup */}
        <rect x="52" y="6" width="56" height="34" rx="6" fill={color} />
        <rect x="52" y="30" width="56" height="5" fill="#000" opacity=".12" />
        {/* Leher */}
        <path
          d="M58 40h44v14c0 6 26 16 26 34v176a26 26 0 0 1-26 26H58a26 26 0 0 1-26-26V88c0-18 26-28 26-34Z"
          fill="#e3edcd"
        />
        {/* Isi sari kacang ijo */}
        <path d="M34 108h92v156a24 24 0 0 1-24 24H58a24 24 0 0 1-24-24Z" fill="#b9d38f" />
        {/* Kilau */}
        <rect x="42" y="96" width="8" height="150" rx="4" fill="#fff" opacity=".35" />
        {/* Label */}
        <rect x="40" y="140" width="80" height="94" rx="8" fill="#fffdf6" />
        <text
          x="80"
          y="170"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fill="#1f3a24"
        >
          heyda
        </text>
        <text x="80" y="188" textAnchor="middle" fontSize="8" letterSpacing="1" fill="#4d5f4f">
          SARI KACANG IJO
        </text>
        <rect x="52" y="200" width="56" height="20" rx="10" fill={color} />
        {/* Label panjang dipadatkan agar tetap muat di pita */}
        <text
          x="80"
          y="214"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#fff"
          {...(label.length > 9 ? { textLength: 48, lengthAdjust: 'spacingAndGlyphs' } : {})}
        >
          {label}
        </text>
      </svg>
      <Leaf className="absolute top-[40%] -right-3 size-8 rotate-12 text-[#6f9a3e]" />
      {placeholder && (
        <figcaption className="mt-2 text-center text-xs font-semibold text-muted">
          Foto produk segera hadir
        </figcaption>
      )}
    </figure>
  );
}
