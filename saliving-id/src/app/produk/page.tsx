import type { Metadata } from 'next';
import { ProductCatalog } from '@/components/ProductCatalog';
import { SectionHeading } from '@/components/SectionHeading';
import { getAllProducts, getCategories } from '@/data/products';

export const metadata: Metadata = {
  title: 'Katalog Wallpaper, Gorden & Lantai SPC',
  description:
    'Katalog wallpaper dinding, gorden blackout, dimout, vitrase, lantai SPC, dan kasa nyamuk magnet di Batam. Gratis ukur & konsultasi via WhatsApp.',
  alternates: { canonical: '/produk' },
};

export default function ProductsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow="Katalog"
        title="Koleksi SA Living"
        description="Semua produk dibuat dan dipasang sesuai ukuran ruangan Anda. Pilih koleksi, lalu minta ukur gratis lewat WhatsApp."
        align="center"
      />
      <div className="mt-12">
        <ProductCatalog products={getAllProducts()} categories={getCategories()} />
      </div>
    </section>
  );
}
