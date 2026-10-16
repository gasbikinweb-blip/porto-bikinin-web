import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { config } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, config.siteUrl).href;
  const pages = [
    '/',
    '/produk',
    '/solusi',
    '/portofolio',
    '/layanan',
    '/tentang',
    '/kontak',
    '/faq',
  ];
  return [
    ...pages.map((p) => ({ url: url(p), priority: p === '/' ? 1 : 0.7 })),
    ...products.map((p) => ({ url: url(`/produk/${p.slug}`), priority: 0.8 })),
  ];
}
