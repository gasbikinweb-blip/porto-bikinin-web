import type { Metadata } from 'next';
import { site } from '@/data/site';
import { type Lang, lp } from '@/i18n';

/**
 * Metadata per halaman: title, description, canonical, hreflang (ID/EN), Open Graph, Twitter card.
 * `path` = path versi Indonesia (tanpa /en), mis. "/proyek/".
 */
export function pageMeta({
  title,
  absoluteTitle,
  description,
  path,
  image,
  lang = 'id',
}: {
  title?: string;
  /** Judul utuh tanpa akhiran "| Griya Nuansa" (untuk beranda) */
  absoluteTitle?: string;
  description: string;
  path: string;
  image?: string;
  lang?: Lang;
}): Metadata {
  const ogImage = image ?? '/images/og-default.webp';
  const url = lp(lang, path);
  const fullTitle = absoluteTitle ?? (title ? `${title} | ${site.name}` : site.name);
  return {
    // Jangan kirim title: undefined, karena akan menimpa judul bawaan layout
    ...(absoluteTitle ? { title: { absolute: absoluteTitle } } : title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: { id: path, en: lp('en', path), 'x-default': path },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'id_ID',
      alternateLocale: lang === 'en' ? 'id_ID' : 'en_US',
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
