// Logo Ruang Mebel sebagai masker satu warna: bentuk dari /brand/logo-mask.png (dibuat dari
// Logo.jpg), warnanya mengikuti `currentColor` sehingga otomatis cocok di tema terang & gelap.
export function Logo({ className = 'h-9' }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Ruang Mebel"
      className={`block aspect-[841/341] bg-current [mask:url(/brand/logo-mask.png)_center/contain_no-repeat] [-webkit-mask:url(/brand/logo-mask.png)_center/contain_no-repeat] ${className}`}
    />
  );
}
