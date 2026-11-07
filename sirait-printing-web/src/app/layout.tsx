import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Figtree } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { site } from '@/data/site';
import { config } from '@/lib/config';
import './globals.css';

// Font di-host sendiri saat build (tidak memanggil Google saat runtime)
// Judul & harga: Bricolage Grotesque (tebal, ekspresif). Teks: Figtree (bersih, ramah).
const heading = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-heading' });
const body = Figtree({ subsets: ['latin'], variable: '--font-body' });

const title = `${site.name} | Print Skripsi Murah Medan Mulai Rp190/lembar`;

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, type: 'image/jpeg' }],
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: '#c8231b',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${heading.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* Link lewati navigasi untuk pengguna keyboard / pembaca layar */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <Header />
        <main id="konten" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
