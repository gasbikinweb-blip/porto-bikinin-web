import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml. Website ini hanya satu halaman.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${config.url}/`, changeFrequency: 'weekly', priority: 1 }];
}
