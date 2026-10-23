import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { site } from '@/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', '/proyek/', '/layanan/', '/tentang/', '/kontak/', '/faq/'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...services.map((s) => ({ url: `${site.url}/layanan/${s.slug}/` })),
    ...projects.map((p) => ({ url: `${site.url}/proyek/${p.slug}/` })),
  ];
}
