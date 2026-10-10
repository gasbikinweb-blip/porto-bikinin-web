import type { Metadata } from 'next';
import type { Content } from '@/content/types';
import { siteConfig } from '@/lib/config';
import { FloatingWhatsApp } from '../FloatingWhatsApp';
import { JsonLd } from '../JsonLd';
import { Footer } from '../site/Footer';
import { Header } from '../site/Header';
import { Closing } from './Closing';
import { Faq } from './Faq';
import { Hero } from './Hero';
import { Manifesto } from './Manifesto';
import { Packages } from './Packages';
import { PhotoWall } from './PhotoWall';
import { Places } from './Places';
import { Process } from './Process';
import { Reels } from './Reels';
import { Stories } from './Stories';
import { Testimonials } from './Testimonials';

export function homeMetadata(t: Content): Metadata {
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: t.home,
      languages: { id: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      locale: t.meta.ogLocale,
      url: t.home,
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: '/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
    },
  };
}

// Seluruh beranda satu halaman; dipakai oleh / (ID) dan /en (EN)
export function HomePage({ t }: { t: Content }) {
  return (
    <div lang={t.lang} className="flex min-h-dvh flex-col overflow-x-clip">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {t.skip}
      </a>
      <Header t={t} />
      <main id="konten" className="flex-1">
        <Hero t={t} />
        <Manifesto t={t} />
        <Stories t={t} />
        <Places t={{ lang: t.lang, places: t.places }} />
        <Reels t={{ reels: t.reels, wa: t.wa }} />
        <PhotoWall t={t} />
        <Testimonials t={t} />
        <Packages t={t} />
        <Process t={t} />
        <Faq t={t} />
        <Closing t={t} />
      </main>
      <Footer t={t} />
      <FloatingWhatsApp t={t} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: siteConfig.name,
          description: t.meta.description,
          url: new URL(t.home, siteConfig.url).href,
          image: new URL('/og.jpg', siteConfig.url).href,
          telephone: `+${siteConfig.waNumber}`,
          areaServed: ['Makkah', 'Madinah'],
          address: { '@type': 'PostalAddress', addressCountry: 'SA' },
          sameAs: [siteConfig.instagram],
        }}
      />
    </div>
  );
}
