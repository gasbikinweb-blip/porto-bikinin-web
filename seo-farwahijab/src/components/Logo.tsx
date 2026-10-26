import type { CSSProperties } from 'react';

// Logo asli Farwa (monogram "fa" + tulisan "farwa"). File di public/brand/ berupa mask transparan
// (dibuat `npm run build-logo`), jadi warnanya mengikuti `currentColor`: mocha di mode terang,
// krem di mode gelap / di atas panel cokelat.
function mask(src: string): CSSProperties {
  const value = `url(${src}) center / contain no-repeat`;
  return { mask: value, WebkitMask: value };
}

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block aspect-[346/381] bg-current ${className}`}
      style={mask('/brand/logo-mark.png')}
    />
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${light ? 'text-on-panel' : 'text-mocha'}`}>
      <LogoMark className="h-10" />
      <span className="leading-none">
        <span
          className="block aspect-[672/171] h-5 bg-current"
          style={mask('/brand/logo-word.png')}
        >
          <span className="sr-only">Farwa</span>
        </span>
        <span
          className={`mt-1.5 block text-[0.6rem] font-bold tracking-[0.3em] uppercase ${light ? 'text-on-panel/80' : 'text-muted'}`}
        >
          Hijab · Bandung
        </span>
      </span>
    </span>
  );
}
