import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

// Situs satu halaman: cukup satu URL
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl('/'), priority: 1 }];
}
