import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SkipLink } from '@/components/SkipLink';
import { site } from '@/data/site';
import './globals.css';

// Font di-self-host otomatis oleh next/font saat build (tidak ada request ke Google saat runtime)
// Mengikuti template klien: Montserrat untuk teks, Times New Roman (font sistem) untuk judul
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Arsitek & Desain Interior Serpong, Tangerang Selatan`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f2ec' },
    { media: '(prefers-color-scheme: dark)', color: '#1d1c1b' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: atribut data-theme dipasang theme-init.js sebelum React berjalan
    <html lang="id" className={montserrat.variable} suppressHydrationWarning>
      <head>
        {/* Skrip kecil sinkron agar tema tidak berkedip; file lokal, aman untuk CSP 'self' */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body className="min-h-screen">
        <SkipLink />
        <Header />
        <main id="konten" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ScrollReveal />
      </body>
    </html>
  );
}
