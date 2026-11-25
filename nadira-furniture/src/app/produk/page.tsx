import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SectionHeading } from '@/components/SectionHeading';
import { getAllProducts, getCategories } from '@/data/products';

export const metadata: Metadata = {
  title: 'Portofolio Karya',
  description:
    'Portofolio Nadira Furniture Bandung: kitchen set, lemari, backdrop TV, meja rias, kamar set, dan partisi custom. Survei gratis, pesan via WhatsApp.',
  alternates: { canonical: '/produk' },
};

export default function ProductsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Portofolio"
        title="Karya Nadira Furniture"
        description="Hasil pengerjaan asli di rumah pelanggan. Klik karya untuk melihat foto lengkap, lalu minta model serupa via WhatsApp."
        align="center"
      />
      <div className="mt-12">
        <ProductCatalog products={getAllProducts()} categories={getCategories()} />
      </div>
    </section>
  );
}
