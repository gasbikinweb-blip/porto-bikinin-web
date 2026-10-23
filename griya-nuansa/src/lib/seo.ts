import type { Metadata } from 'next';
import { site } from '@/data/site';

/** Metadata per halaman: title, description, canonical, Open Graph, Twitter card. */
export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const ogImage = image ?? '/images/og-default.webp';
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      siteName: site.name,
      title: title ? `${title} | ${site.name}` : site.name,
      description,
      url: path,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${site.name}` : site.name,
      description,
      images: [ogImage],
    },
  };
}
