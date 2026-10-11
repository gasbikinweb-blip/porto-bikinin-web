import type { Metadata } from 'next';
import { defaultLocale, homePath, isMultilingual, locales } from '@/content';
import type { SiteContent } from '@/content/types';
import { bedroomPackages } from '@/data/packages';
import { serviceIds } from '@/data/services';
import { siteConfig } from './config';

const absolute = (path: string) => new URL(path, `${siteConfig.url}/`).href;
const ogLocaleOf = { en: 'en_US', id: 'id_ID' } as const;

/** Metadata beranda per bahasa: canonical, hreflang (+ x-default), openGraph, twitter */
export function buildMetadata(content: SiteContent): Metadata {
  const path = homePath(content.locale);
  const languages = Object.fromEntries(locales.map((l) => [l, homePath(l)]));
  return {
    metadataBase: new URL(siteConfig.url),
    title: content.meta.title,
    description: content.meta.description,
    keywords: [...content.meta.keywords],
    alternates: {
      canonical: path,
      // hreflang hanya bila lebih dari satu bahasa aktif
      ...(isMultilingual
        ? { languages: { ...languages, 'x-default': homePath(defaultLocale) } }
        : {}),
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: siteConfig.name,
      title: content.meta.title,
      description: content.meta.description,
      locale: content.ogLocale,
      alternateLocale: locales.filter((l) => l !== content.locale).map((l) => ogLocaleOf[l]),
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: content.hero.imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta.title,
      description: content.meta.description,
      images: [siteConfig.ogImage],
    },
    formatDetection: { telephone: false },
  };
}

/**
 * JSON-LD bisnis. Dipilih HomeAndConstructionBusiness (turunan LocalBusiness) karena Satu Gudang
 * mendesain, memproduksi, dan membangun/merenovasi ruang — lebih tepat daripada ProfessionalService
 * yang umumnya untuk jasa konsultan murni (hukum, akuntan).
 */
export function businessJsonLd(content: SiteContent): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    slogan: content.common.tagline,
    description: content.meta.description,
    url: absolute(homePath(content.locale)),
    image: absolute(siteConfig.ogImage),
    logo: absolute('/brand/mark-dark.webp'),
    telephone: siteConfig.phoneE164,
    // TODO: tambahkan streetAddress & geo bila alamat workshop ingin dipublikasikan
    address: {
      '@type': 'PostalAddress',
      addressRegion: siteConfig.region,
      addressCountry: siteConfig.country,
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Bali, Indonesia' },
    sameAs: [siteConfig.instagram, siteConfig.threads],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phoneE164,
      contactType: 'customer service',
      availableLanguage: ['Indonesian', 'English'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: content.services.title,
      itemListElement: [
        ...serviceIds.map((id) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: content.services.items[id].title,
            description: content.services.items[id].summary,
            areaServed: 'Bali',
          },
        })),
        ...bedroomPackages.map((p) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: `${content.packages.title}: ${content.packages.items[p.id].name}`,
            description: content.packages.items[p.id].includes.join(', '),
          },
          ...(p.priceFrom ? { price: p.priceFrom, priceCurrency: 'IDR' } : {}),
        })),
      ],
    },
  };
}
