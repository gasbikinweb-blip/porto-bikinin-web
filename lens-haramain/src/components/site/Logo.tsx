import { siteConfig } from '@/lib/config';

// Simbol logo asli (diwarnai lewat CSS mask) + nama dengan huruf serif seperti pada logo
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span aria-hidden="true" className="logo-mark size-7 sm:size-9" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[0.95rem] font-medium tracking-[0.06em] uppercase sm:text-xl sm:tracking-[0.08em]">
          {siteConfig.name}
        </span>
        <span className="mt-1 text-[0.5rem] font-medium tracking-[0.36em] sm:text-[0.55rem] sm:tracking-[0.42em] text-muted uppercase">
          Photo &amp; Video
        </span>
      </span>
    </span>
  );
}
