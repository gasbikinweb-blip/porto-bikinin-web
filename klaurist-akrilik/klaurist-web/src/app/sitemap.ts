import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${config.siteUrl}/`, changeFrequency: 'weekly', priority: 1 }];
}
