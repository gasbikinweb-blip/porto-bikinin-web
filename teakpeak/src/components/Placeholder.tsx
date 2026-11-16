// Kotak pengganti gambar untuk template. Ganti dengan <Image> saat foto klien sudah ada.
export function Placeholder({
  label = 'Gambar',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder ${label}`}
      className={`grid place-items-center bg-surface bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(127_127_127/0.08)_14px_15px)] text-muted ${className}`}
    >
      <span className="flex flex-col items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-8 opacity-60"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <path d="m21 16-5-5-9 9" />
        </svg>
        {label}
      </span>
    </div>
  );
}
