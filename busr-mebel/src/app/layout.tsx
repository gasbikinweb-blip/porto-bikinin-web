import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Geist } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Pabrik Furnitur Kayu Solid, Kantor & Custom Jepara`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'pabrik furnitur kantor',
    'jual meja kerja custom',
    'kursi ergonomis',
    'jasa pembuatan lemari HPL',
    'furnitur kayu jati jepara',
    'custom furniture kantor kafe hotel',
    'meja resepsionis jati',
    'sofa modular curve',
    'pengadaan mebel b2b jepara',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Pabrik Furnitur Kayu Solid, Kantor & Custom Jepara`,
    description: siteConfig.description,
    images: [
      {
        url: '/products/meja-kerja-eksekutif-volo/og.jpg',
        width: 600,
        height: 750,
        type: 'image/jpeg',
        alt: 'Busr Mebel - Pabrik Furnitur Kayu Solid & Custom Interior',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Pabrik Furnitur Kayu Solid & Kantor Jepara`,
    description: siteConfig.description,
    images: ['/products/meja-kerja-eksekutif-volo/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#faf8f5',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html lang="id" className={`${geist.variable} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        {/* Sengaja sinkron (blocking) agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FurnitureStore',
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            logo: `${siteConfig.url}/brand/logo.webp`,
            image: `${siteConfig.url}/products/meja-kerja-eksekutif-volo/og.jpg`,
            telephone: siteConfig.waDisplay,
            email: siteConfig.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: siteConfig.address,
              addressLocality: siteConfig.city,
              addressRegion: siteConfig.province,
              addressCountry: siteConfig.country,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '17:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '08:00',
                closes: '15:00',
              },
            ],
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
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
      </body>
    </html>
  );
}
