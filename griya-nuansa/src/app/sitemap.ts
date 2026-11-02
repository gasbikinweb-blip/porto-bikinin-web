import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { lp } from '@/i18n';

export const dynamic = 'force-static';

// Setiap halaman tercatat dalam versi ID, dengan pasangan EN sebagai alternatif hreflang
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/proyek/',
    '/layanan/',
    '/tentang/',
    '/kontak/',
    '/media-sosial/',
    '/faq/',
    ...services.map((s) => `/layanan/${s.slug}/`),
    ...projects.map((p) => `/proyek/${p.slug}/`),
  ];
  return paths.flatMap((p) => {
    const languages = { id: `${site.url}${p}`, en: `${site.url}${lp('en', p)}` };
    return [
      { url: languages.id, alternates: { languages } },
      { url: languages.en, alternates: { languages } },
    ];
  });
}
