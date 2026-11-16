import type { Metadata, Viewport } from 'next';
import { Jost, Montserrat } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ProductModal } from '@/components/ProductModal';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
// Tipografi: Montserrat (teks, sama seperti konten IG Teakpeak) + Jost (judul, tegas & rapi ala toko furnitur)
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-body' });
const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    // TODO: tambahkan gambar OG klien (1200x630), mis. images: [{ url: '/og.jpg', width: 1200, height: 630 }]
  },
};

export const viewport: Viewport = {
  themeColor: '#16130f',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html lang="id" className={`${montserrat.variable} ${jost.variable}`} suppressHydrationWarning>
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
