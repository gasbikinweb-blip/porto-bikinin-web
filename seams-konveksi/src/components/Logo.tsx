// Logo resmi Seams (SEAMS / CUT · MAKE · TRIM), dipotong dari file logo asli di assets-src/brand/
import Image from 'next/image';

export function Logo({
  className = 'h-11',
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/logo-seams.webp"
      alt="Seams Cut Make Trim"
      width={480}
      height={251}
      priority={priority}
      className={`w-auto rounded-md ${className}`}
    />
  );
}
