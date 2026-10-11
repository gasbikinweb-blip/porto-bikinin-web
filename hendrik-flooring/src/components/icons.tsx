// Ikon SVG inline sederhana (tanpa library). Semua dekoratif: aria-hidden.
import type { IconName } from '@/data/site';

type Props = { className?: string };

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
};

export function WhatsAppIcon({ className = 'size-5' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.02 2.57.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function ArrowIcon({ className = 'size-4' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className = 'size-4' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function PlusIcon({ className = 'size-4' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CloseIcon({ className = 'size-5' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronIcon({
  className = 'size-5',
  dir = 'right',
}: Props & { dir?: 'left' | 'right' }) {
  return (
    <svg {...base} className={className}>
      <path d={dir === 'right' ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'} />
    </svg>
  );
}

export function DownloadIcon({ className = 'size-5' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />
    </svg>
  );
}

export function PinIcon({ className = 'size-5' }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function MailIcon({ className = 'size-5' }: Props) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  seamless: <path d="M3 17h18M3 12h7m4 0h7M10 9.5v5M14 9.5v5M3 7h18" />,
  clean: (
    <>
      <path d="M12 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9Z" />
      <path d="M10 13.5a2 2 0 0 0 2 2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 3 7.8 7 9.5 4-1.7 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  grip: <path d="M4 19h16M6 15l2-2M10 15l2-2M14 15l2-2M18 15l2-2M6 10l2-2M10 10l2-2M14 10l2-2" />,
  coving: <path d="M5 3v11a6 6 0 0 0 6 6h10M9 3v11a2 2 0 0 0 2 2h10" />,
  ruler: (
    <>
      <path d="m3 16 13-13 5 5L8 21l-5-5Z" />
      <path d="m7 12 2 2M10 9l2 2M13 6l2 2" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4V5Z M8 9.5h8M8 12.5h5" />,
  doc: (
    <>
      <path d="M7 3h7l5 5v13H7V3Z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </>
  ),
  // Kunci pas
  tools: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9l-3.8 3.8Z" />
  ),
  // Dua orang: tim pemasang
  team: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" />
      <path d="M18.5 14.6a6.5 6.5 0 0 1 3 5.4" />
    </>
  ),
  box: (
    <>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z" />
      <path d="m3 7.5 9 4.5 9-4.5M12 12v9" />
    </>
  ),
  repair: (
    <>
      <path d="M4 20h16M6 16l9-9 3 3-9 9H6v-3Z" />
      <path d="m13 9 3 3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

export function FeatureIcon({ name, className = 'size-6' }: Props & { name: IconName }) {
  return (
    <svg {...base} className={className}>
      {paths[name]}
    </svg>
  );
}
