import type { Metadata, Viewport } from 'next';
import { Archivo, Geist } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { RevealObserver } from '@/components/RevealObserver';
import { company } from '@/data/site';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime, aman untuk CSP font-src 'self')
const body = Geist({ subsets: ['latin'], variable: '--font-body' });
// Archivo: sans-serif tebal dan lebar, selaras dengan huruf pada logo
const heading = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Roster Beton Minimalis & Bata Tempel`,
    template: `%s | ${siteConfig.name}`,
  },
  description: company.description,
  applicationName: siteConfig.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#f3f3f0',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${body.variable} ${heading.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
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
        {/* Structured data aman: lewat komponen JsonLd, tanpa dangerouslySetInnerHTML */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: siteConfig.name,
            description: company.description,
            url: siteConfig.url,
            logo: `${siteConfig.url}/brand/logo-400.png`,
            image: `${siteConfig.url}/brand/og-image.jpg`,
            telephone: `+${siteConfig.waNumber}`,
            ...(company.email && { email: company.email }),
            address: {
              '@type': 'PostalAddress',
              ...(company.address && { streetAddress: company.address }),
              addressCountry: 'ID',
            },
            areaServed: 'Jabodetabek',
            sameAs: [company.instagram, company.threads, company.shopee],
          }}
        />
      </body>
    </html>
  );
}
