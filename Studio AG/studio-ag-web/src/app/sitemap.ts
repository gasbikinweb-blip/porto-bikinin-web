import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

// Situs satu halaman
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: new URL('/', config.siteUrl).href, priority: 1 }];
}
