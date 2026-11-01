import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Young_Serif } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ScrollEffects } from '@/components/ScrollEffects';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
// Young Serif: serif hangat ala label toko jamu/kue tradisional untuk judul.
// Plus Jakarta Sans: sans-serif rancangan desainer Indonesia, nyaman dibaca untuk isi.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-body' });
const youngSerif = Young_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
});

const title = 'Sari Kacang Ijo Jogja Tanpa Pengawet | Heyda';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s | ${siteConfig.shortName}` },
  description: siteConfig.description,
  keywords: [
    'sari kacang ijo Jogja',
    'oleh-oleh khas Jogja',
    'minuman kacang hijau tanpa pengawet',
    'sari kacang hijau no sugar',
    'sari kacang ijo free ongkir Jogja',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Sari Kacang Ijo by Heyda' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteConfig.description,
    images: ['/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#fbf7ee',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${youngSerif.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-3 focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollEffects />
      </body>
    </html>
  );
}
