import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml. Website satu halaman: hanya beranda.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL('/', config.siteUrl).href, changeFrequency: 'weekly', priority: 1 }];
}
