import type { MetadataRoute } from 'next';
import { activeCategories } from '@/lib/catalog';
import { config } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, config.siteUrl).href;
  return [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/katalog'), changeFrequency: 'weekly', priority: 0.9 },
    ...activeCategories.map((c) => ({
      url: url(`/katalog/${c.slug}`),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    { url: url('/tentang'), changeFrequency: 'yearly', priority: 0.5 },
    { url: url('/faq'), changeFrequency: 'yearly', priority: 0.5 },
    { url: url('/kontak'), changeFrequency: 'yearly', priority: 0.6 },
  ];
}
