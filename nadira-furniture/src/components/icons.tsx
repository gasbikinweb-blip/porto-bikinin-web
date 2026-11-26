// Ikon SVG sederhana (dekoratif, disembunyikan dari pembaca layar)
type IconProps = { className?: string };

export function WhatsAppIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.79.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.01-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

export function ArrowIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function InstagramIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ThreadsIcon({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.19 23.5h-.01c-3.48-.02-6.15-1.17-7.95-3.4C2.64 18.1 1.82 15.33 1.79 11.9v-.02c.03-3.43.85-6.2 2.44-8.18C6.03 1.47 8.7.32 12.18.3h.02c2.67.02 4.9.7 6.63 2.04 1.63 1.25 2.77 3.04 3.4 5.3l-1.98.55c-1.07-3.84-3.79-5.8-8.06-5.83-2.82.02-4.95.9-6.34 2.63-1.3 1.62-1.97 3.96-2 6.96.03 3 .7 5.34 2 6.96 1.39 1.73 3.52 2.61 6.34 2.63 2.54-.02 4.22-.61 5.62-1.98 1.6-1.56 1.57-3.48 1.06-4.65-.3-.69-.85-1.26-1.59-1.7-.19 1.31-.6 2.38-1.25 3.18-.86 1.08-2.08 1.67-3.63 1.75-1.17.06-2.3-.21-3.17-.79-1.04-.68-1.64-1.72-1.71-2.93-.06-1.17.4-2.25 1.3-3.04.87-.75 2.08-1.19 3.5-1.27 1.05-.06 2.03-.01 2.94.14-.12-.73-.37-1.3-.74-1.72-.51-.58-1.3-.88-2.35-.89h-.03c-.84 0-1.98.23-2.71 1.31l-1.73-1.16c.97-1.44 2.55-2.24 4.44-2.24h.04c3.16.02 5.05 1.96 5.24 5.34.11.05.21.1.32.15 1.47.69 2.54 1.74 3.1 3.03.79 1.8.86 4.74-1.53 7.08-1.83 1.79-4.05 2.6-7.2 2.62Zm.99-11.64c-.24 0-.48.01-.73.02-1.82.1-2.95.94-2.89 2.12.07 1.25 1.44 1.83 2.76 1.76 1.21-.06 2.79-.54 3.05-3.67-.67-.15-1.4-.23-2.19-.23Z" />
    </svg>
  );
}
