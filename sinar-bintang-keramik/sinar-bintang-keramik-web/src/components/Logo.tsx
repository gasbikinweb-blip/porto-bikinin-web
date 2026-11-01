// Logo SBK sederhana: rumah merah dengan "SBK" di lingkaran putih.
// TODO: ganti dengan file logo asli bila tersedia (taruh di public/ lalu pakai <Image>).
export function LogoMark({ className = 'size-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path d="M24 3 3 21h6v24h30V21h6L24 3Z" fill="#c4161c" />
      <circle cx="24" cy="30" r="11" fill="#fff" />
      <text
        x="24"
        y="34"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="10"
        fill="#c4161c"
      >
        SBK
      </text>
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-tight">
        <span
          className={`block text-base font-extrabold ${light ? 'text-white' : 'text-foreground'}`}
        >
          Sinar Bintang Keramik
        </span>
        <span className={`block text-xs font-semibold ${light ? 'text-white/75' : 'text-red'}`}>
          Keramik Murah Jakarta
        </span>
      </span>
    </span>
  );
}
