// Ikon garis untuk poin keunggulan Klaurist
import type { reasons } from '@/data/site';

export function ReasonIcon({
  name,
  className = 'size-7',
}: {
  name: (typeof reasons)[number]['icon'];
  className?: string;
}) {
  const p = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className,
  };
  if (name === 'flower')
    return (
      <svg {...p}>
        <circle cx="12" cy="9" r="2.5" />
        <path d="M12 6.5c0-3 3-3 3 0M12 6.5c0-3-3-3-3 0M14.5 9c3 0 3 3 0 3M9.5 9c-3 0-3 3 0 3M12 11.5V21M12 17c-2-2-4-2-5-1M12 16c2-2 4-2 5-1" />
      </svg>
    );
  if (name === 'sparkle')
    return (
      <svg {...p}>
        <path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7ZM19 16c.3 1.6 1 2.3 2.5 2.5-1.6.3-2.3 1-2.5 2.5-.3-1.6-1-2.3-2.5-2.5 1.6-.3 2.3-1 2.5-2.5Z" />
      </svg>
    );
  if (name === 'wallet')
    return (
      <svg {...p}>
        <rect x="3" y="6" width="18" height="13" rx="3" />
        <path d="M3 10h18M16 14.5h2" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </svg>
  );
}
