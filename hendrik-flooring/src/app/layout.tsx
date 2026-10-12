import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

const title = 'Lantai Vinyl Rumah Sakit & Klinik';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${title} | ${siteConfig.name}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title: `${title} | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [{ url: '/img/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

// Structured data bisnis. TODO: lengkapi alamat terstruktur setelah data asli tersedia.
const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: new URL('/img/brand/logo-bulat.png', siteConfig.url).href,
  image: new URL('/img/og.jpg', siteConfig.url).href,
  telephone: `+${siteConfig.waNumber}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.addressParts.street,
    addressLocality: siteConfig.addressParts.locality,
    addressRegion: siteConfig.addressParts.region,
    postalCode: siteConfig.addressParts.postalCode,
    addressCountry: 'ID',
  },
  openingHours: 'Mo-Sa 09:00-17:00',
  sameAs: siteConfig.socials.map((s) => s.href),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" tabIndex={-1} className="flex flex-1 flex-col outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <RevealObserver />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
