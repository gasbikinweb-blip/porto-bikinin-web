import type { Metadata, Viewport } from 'next';
import { Jost, Newsreader } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { RevealObserver } from '@/components/RevealObserver';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
// Jost: sans geometris yang senada dengan huruf logo; Newsreader: serif untuk aksen italic
const sans = Jost({ subsets: ['latin'], variable: '--font-sans-body' });
const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif-head',
});

const title = 'Studio AG | Jasa Desain Interior & Build Jakarta';

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: '/images/situs/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
  },
};

export const viewport: Viewport = { themeColor: '#f6f2ec' };

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesigner',
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: config.siteUrl,
  email: site.email,
  telephone: `+${config.waNumber}`,
  foundingDate: String(site.founded),
  areaServed: site.areaServed,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'ID',
  },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <RevealObserver />
        <JsonLd data={localBusiness} />
      </body>
    </html>
  );
}
