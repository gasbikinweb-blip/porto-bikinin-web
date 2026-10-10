import type { Metadata, Viewport } from 'next';
import { Amiri, Cormorant_Garamond, Jost } from 'next/font/google';
import { RevealObserver } from '@/components/RevealObserver';
import { siteConfig } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });
// Hanya untuk kata-kata Arab dekoratif (nama paket, lokasi)
const amiri = Amiri({ subsets: ['arabic'], weight: '400', variable: '--font-amiri' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: { icon: '/icon.png' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3ede3' },
    { media: '(prefers-color-scheme: dark)', color: '#12100d' },
  ],
};

// Bahasa default Indonesia; halaman /en membungkus kontennya dengan lang="en"
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React aktif
    <html
      lang="id"
      className={`${cormorant.variable} ${jost.variable} ${amiri.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Sengaja sinkron (blocking) agar tema terpasang sebelum halaman digambar; file kecil & lokal */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
