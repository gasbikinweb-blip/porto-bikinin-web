import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).href;
  return [{ url: url('/'), changeFrequency: 'weekly', priority: 1 }];
}
