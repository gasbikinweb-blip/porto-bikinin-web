import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SectionHeading } from '@/components/SectionHeading';
import { getAllProducts, getCategories } from '@/data/products';

export const metadata: Metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog furnitur kayu jati Teakpeak: kursi, sofa, meja, tempat tidur, dan penyimpanan. Bisa custom, pesan langsung via WhatsApp.',
  alternates: { canonical: '/produk' },
};

export default function ProductsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Katalog"
        title="Koleksi Teakpeak"
        description="Semua produk bisa disesuaikan ukuran, warna, dan finishing-nya. Klik produk untuk detail, lalu tanyakan langsung via WhatsApp."
        align="center"
      />
      <div className="mt-12">
        <ProductCatalog products={getAllProducts()} categories={getCategories()} />
      </div>
    </section>
  );
}
