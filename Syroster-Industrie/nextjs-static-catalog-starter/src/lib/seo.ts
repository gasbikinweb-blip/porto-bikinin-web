import type { Metadata } from 'next';
import { siteConfig } from './config';

const OG_IMAGE = { url: '/brand/og-image.jpg', width: 1200, height: 630, alt: siteConfig.name };

/** Metadata per halaman: title, description, canonical, OpenGraph, dan Twitter card. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const img = image ?? OG_IMAGE;
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  return {
    title: title ?? { absolute: `${siteConfig.name} | Roster Beton & Bata Dekoratif Custom` },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [img],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [img.url] },
  };
}
