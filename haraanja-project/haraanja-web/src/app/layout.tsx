import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProductModal } from '@/components/ProductModal';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });
const pinyon = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-pinyon' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Souvenir Pernikahan Custom Probolinggo | Haraanja Project Souvenir',
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'souvenir pernikahan Probolinggo',
    'souvenir pernikahan custom murah',
    'souvenir khitan',
    'souvenir tumbler kaca pernikahan',
    'box souvenir custom',
    'souvenir haji dan umroh',
    'kemasan souvenir pernikahan',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title: 'Souvenir Custom untuk Setiap Momen Bahagia | Haraanja Project',
    description: siteConfig.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
};

export const viewport: Viewport = {
  themeColor: '#7a1f2b',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html
      lang="id"
      className={`${jost.variable} ${cormorant.variable} ${pinyon.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Sengaja sinkron (blocking) agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
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
        <ProductModal />
        <RevealObserver />
      </body>
    </html>
  );
}
