import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
});

const title = `${siteConfig.name} Batam | Wallpaper Dinding, Gorden & Lantai SPC`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.name} Batam` },
  description: siteConfig.description,
  keywords: [
    'wallpaper Batam',
    'wallpaper dinding Batam',
    'gorden Batam',
    'gorden blackout Batam',
    'lantai SPC Batam',
    'kasa nyamuk magnet Batam',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [
      {
        url: '/products/wallpaper-custom-mural/og.jpg',
        type: 'image/jpeg',
        alt: 'Kamar dengan wallpaper mural hasil pasang SA Living',
      },
    ],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#171513' },
  ],
};

const { address, hours } = siteConfig;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html lang="id" className={`${jakarta.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Sengaja sinkron (blocking) agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'HomeAndConstructionBusiness',
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            image: new URL('/products/wallpaper-custom-mural/og.jpg', siteConfig.url).href,
            telephone: `+${siteConfig.waNumber}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: address.street,
              addressLocality: `${address.locality}, ${address.city}`,
              addressRegion: address.region,
              postalCode: address.postalCode,
              addressCountry: 'ID',
            },
            areaServed: 'Batam',
            hasMap: siteConfig.mapsUrl,
            openingHoursSpecification: hours.flatMap((h) =>
              'opens' in h
                ? [
                    {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                      ],
                      opens: h.opens,
                      closes: h.closes,
                    },
                  ]
                : [],
            ),
            sameAs: [siteConfig.instagram, siteConfig.threads],
          }}
        />
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
