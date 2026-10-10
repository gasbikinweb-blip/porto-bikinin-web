import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

// Wajib statis agar bisa diekspor menjadi out/robots.txt; domain mengikuti NEXT_PUBLIC_SITE_URL
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', siteConfig.url).href,
  };
}
