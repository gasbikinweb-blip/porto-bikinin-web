// Ikon media sosial (garis)
type IconProps = { className?: string };

export function InstagramIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThreadsIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M16.5 11.2c-.5-2.4-2.2-3.7-4.5-3.7-3 0-4.5 2.3-4.5 4.5s1.5 4.5 4.5 4.5c2.4 0 3.8-1.4 3.8-3.2 0-2.2-2.3-2.8-4.3-2.3M19.5 8c-1.3-3-4-4.5-7.5-4.5C7 3.5 4 7 4 12s3 8.5 8 8.5c3.4 0 5.9-1.6 7-4.5" />
    </svg>
  );
}
