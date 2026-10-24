import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

// Website satu halaman: hanya beranda
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL('/', config.siteUrl).href, changeFrequency: 'weekly', priority: 1 }];
}
