import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/data/products';
import { siteConfig } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).href;
  return [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/produk'), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/hasil-pasang'), changeFrequency: 'weekly', priority: 0.8 },
    { url: url('/tentang'), changeFrequency: 'yearly', priority: 0.5 },
    { url: url('/kontak'), changeFrequency: 'yearly', priority: 0.5 },
    ...getAllProducts().map((p) => ({
      url: url(`/produk/${p.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
