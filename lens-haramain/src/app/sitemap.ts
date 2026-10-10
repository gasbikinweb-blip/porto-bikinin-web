import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/sitemap.xml
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).href;
  const languages = { id: url('/'), en: url('/en') };
  return [
    { url: url('/'), changeFrequency: 'monthly', priority: 1, alternates: { languages } },
    { url: url('/en'), changeFrequency: 'monthly', priority: 0.9, alternates: { languages } },
  ];
}
