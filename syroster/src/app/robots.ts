import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export const dynamic = 'force-static';

// Dibuat dari NEXT_PUBLIC_SITE_URL agar alamat sitemap selalu sesuai domain
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${siteConfig.url}/sitemap.xml` };
}
