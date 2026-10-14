import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SectionHeading } from '@/components/SectionHeading';
import { getAllProducts, getCategories } from '@/data/products';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Katalog Furnitur Kayu Solid, Kantor & Custom',
  description:
    'Jelajahi 28 koleksi furnitur Busr Mebel Jepara: meja kerja eksekutif, kursi ergonomis, lemari, sofa modular, hingga custom furniture.',
  alternates: { canonical: '/produk' },
  openGraph: {
    type: 'website',
    url: '/produk',
    title: `Katalog Produk Furnitur | ${siteConfig.name}`,
    description:
      'Koleksi lengkap furnitur kayu jati solid dan modern ready-stock maupun custom pesanan.',
    images: [
      {
        url: '/products/meja-kerja-eksekutif-volo/og.jpg',
        width: 600,
        height: 750,
        alt: 'Katalog Produk Busr Mebel',
      },
    ],
  },
};

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getCategories();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Katalog Produk"
        title="Koleksi Furnitur Busr Mebel"
        description="Semua produk dibuat dari bahan kayu jati solid dan material berkualitas tinggi. Tersedia ready-stock maupun pesanan custom ukuran dan finishing."
        align="center"
      />

      <div className="mt-8 flex justify-center">
        <a
          href={siteConfig.catalogPdfUrl}
          download="katalog-busr-mebel.pdf"
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-2.5 text-xs font-semibold text-foreground hover:border-accent hover:text-accent-strong transition-colors"
        >
          📄 Unduh E-Katalog Resmi (PDF)
        </a>
      </div>

      <div className="mt-12">
        <ProductCatalog products={products} categories={categories} />
      </div>
    </section>
  );
}
