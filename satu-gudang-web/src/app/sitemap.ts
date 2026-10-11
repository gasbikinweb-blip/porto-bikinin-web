import type { MetadataRoute } from 'next';
import { homePath, locales } from '@/content';
import { siteConfig } from '@/lib/config';

export const dynamic = 'force-static';

// Sitemap otomatis dari NEXT_PUBLIC_SITE_URL, lengkap dengan alternatif bahasa
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (p: string) => new URL(p, `${siteConfig.url}/`).href;
  const languages = Object.fromEntries(locales.map((l) => [l, abs(homePath(l))]));
  return locales.map((l) => ({
    url: abs(homePath(l)),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: l === 'en' ? 1 : 0.9,
    alternates: { languages },
  }));
}
