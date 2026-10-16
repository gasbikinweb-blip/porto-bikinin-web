// Lencana bulat dengan teks melingkar (dekoratif)
export function CircleBadge() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className="size-24 text-foreground">
      <defs>
        <path id="lingkar" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <g className="animate-spin-slow origin-center">
        <text fontSize="9.2" letterSpacing="2.4" fill="currentColor" className="uppercase">
          <textPath href="#lingkar">Cut · Make · Trim · Seams Konveksi ·</textPath>
        </text>
      </g>
      <circle cx="50" cy="50" r="6" className="fill-plum" />
    </svg>
  );
}
