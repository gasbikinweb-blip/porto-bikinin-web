// Logo "Na" Griya Nuansa. Dipakai sebagai mask supaya warnanya ikut currentColor (terang/gelap/footer).
export function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: 'url(/brand/logo-black.png)',
        WebkitMaskImage: 'url(/brand/logo-black.png)',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}
