import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

// Situs satu halaman: hanya beranda
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL('/', siteConfig.url).href, changeFrequency: 'monthly', priority: 1 }];
}
