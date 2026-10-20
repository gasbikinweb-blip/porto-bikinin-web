import Image from 'next/image';

export function Logo({ className = 'h-8 w-auto sm:h-9' }: { className?: string }) {
  // Logo resmi (latar dibuat transparan, desain tidak diubah). Rasio 400x112.
  return (
    <Image
      src="/brand/logo-400.webp"
      alt="Syroster Industrie"
      width={400}
      height={112}
      className={className}
      loading="eager"
    />
  );
}
