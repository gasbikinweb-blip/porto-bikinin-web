// Ikon SVG ringan (tanpa library). Semua dekoratif: aria-hidden.
type IconProps = { className?: string };

export function WhatsAppIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

export function CheckIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={className}
    >
      <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DownloadIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      className={className}
    >
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RoofMark({ className = 'size-8' }: IconProps) {
  // Bentuk sederhana garis atap sebagai ornamen (bukan pengganti logo)
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden="true"
      className={className}
    >
      <path d="M4 22 20 10l16 8M4 30l16-12 16 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Ikon garis untuk keunggulan layanan. Aksen emas memberi "titik warna" seperti logo.
export function PerkIcon({
  name,
  className = 'size-10',
}: IconProps & { name: 'truck' | 'cash' | 'factory' }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      {name === 'truck' && (
        <>
          <circle cx="27" cy="27" r="7" className="fill-gold-soft" />
          <path
            d="M4 10h20v17H4zM24 16h7l5 6v5h-12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle
            cx="11"
            cy="29"
            r="3"
            stroke="currentColor"
            strokeWidth="2.2"
            className="fill-page"
          />
          <circle
            cx="29"
            cy="29"
            r="3"
            stroke="currentColor"
            strokeWidth="2.2"
            className="fill-page"
          />
        </>
      )}
      {name === 'cash' && (
        <>
          <circle cx="27" cy="25" r="8" className="fill-gold-soft" />
          <rect
            x="4"
            y="11"
            width="30"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <circle cx="19" cy="20" r="4" stroke="currentColor" strokeWidth="2.2" />
          <path d="M9 16v8M29 16v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {name === 'factory' && (
        <>
          <circle cx="28" cy="26" r="8" className="fill-gold-soft" />
          <path
            d="M4 34V18l9 5v-5l9 5v-5l9 5V8h5v26z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M10 28h4M18 28h4M26 28h4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export function ChevronIcon({
  className = 'size-5',
  dir = 'right',
}: IconProps & { dir?: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      aria-hidden="true"
      className={className}
    >
      <path
        d={dir === 'right' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRightIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
