import Image from 'next/image';

// Logo asli Heyda (dari assets/Logo.jpg, diproses npm run optimize-images)
export function Logo({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.webp"
      alt="Logo Heyda"
      width={size}
      height={size}
      sizes={`${size}px`}
      className={`rounded-full ${className}`}
    />
  );
}
