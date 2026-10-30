import type { Metadata } from 'next';

const DEFAULT_OG = '/images/situs/og.jpg';

// Metadata per halaman: judul, deskripsi, canonical, dan gambar OG
export function pageMeta(
  title: string,
  description: string,
  path: string,
  ogImage = DEFAULT_OG,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      locale: 'id_ID',
      siteName: 'Studio AG',
      images: [{ url: ogImage, width: 1200, height: 630, type: 'image/jpeg' }],
    },
  };
}
