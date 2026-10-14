import Link from 'next/link';
import { siteConfig } from '@/lib/config';

// Logo resmi SA Living dipakai sebagai CSS mask (public/brand/logo-mask.png),
// sehingga warnanya mengikuti token --foreground di mode terang maupun gelap.
export function Logo({ className = 'h-12 sm:h-14' }: { className?: string }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      <span
        aria-hidden="true"
        className={`block aspect-[285/240] bg-foreground [mask-image:url(/brand/logo-mask.png)] [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] ${className}`}
      />
      <span className="sr-only">{siteConfig.name}, ke beranda</span>
    </Link>
  );
}
