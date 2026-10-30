import Image from 'next/image';

// Logo resmi Studio AG (dari assets/Logo.jpg, lihat scripts/optimize-images.mjs)
export function Logo({ className = 'h-10' }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-wordmark.webp"
      alt="Studio AG"
      width={461}
      height={96}
      className={`w-auto rounded-md ${className}`}
    />
  );
}

// Versi lingkaran 1:1 untuk navbar
export function LogoBadge({ className = 'size-12' }: { className?: string }) {
  return (
    <Image
      src="/brand/logo.jpg"
      alt="Studio AG"
      width={512}
      height={512}
      priority
      className={`rounded-full object-cover ${className}`}
    />
  );
}
