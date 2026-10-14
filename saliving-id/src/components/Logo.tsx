import Link from 'next/link';
import { siteConfig } from '@/lib/config';

// Wordmark teks (belum ada file logo resmi). TODO: ganti dengan logo asli SA Living bila tersedia
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-baseline gap-1.5 leading-none ${className}`}>
      <span className="font-serif text-2xl font-semibold tracking-tight sm:text-[1.7rem]">SA</span>
      <span className="font-serif text-2xl italic text-accent sm:text-[1.7rem]">living</span>
      <span className="sr-only">{siteConfig.name}, ke beranda</span>
    </Link>
  );
}
