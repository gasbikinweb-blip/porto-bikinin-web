import type { Metadata } from 'next';
import { siteConfig } from './config';

/** Gambar OpenGraph: JPG kecil (dibuat optimize-images) agar pratinjau WhatsApp selalu muncul */
export function ogImage(slug = 'nehir-abaya-baby-salem', alt = 'Koleksi Nehir Abaya Sahane.id') {
  // Lebar tetap 600px; tinggi mengikuti rasio foto asli
  return { url: `/products/${slug}/og.jpg`, width: 600, type: 'image/jpeg', alt };
}

/** Metadata standar per halaman: title, description, canonical, openGraph, twitter */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  image?: ReturnType<typeof ogImage>;
}): Metadata {
  const image = opts.image ?? ogImage();
  const title = `${opts.title} | ${siteConfig.name}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      siteName: siteConfig.name,
      url: opts.path,
      title,
      description: opts.description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: opts.description,
      images: [image.url],
    },
  };
}
