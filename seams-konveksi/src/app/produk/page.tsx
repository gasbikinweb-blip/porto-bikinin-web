import { ProductCard } from '@/components/sections';
import { CtaBand, PageHeader, WhatsAppButton, container } from '@/components/ui';
import { products } from '@/data/products';
import { pageMetadata } from '@/lib/metadata';
import { generalMessage, productMessage } from '@/lib/whatsapp';

export const metadata = pageMetadata({
  title: 'Produk',
  description:
    'Jenis busana muslimah yang dikerjakan Seams Konveksi: abaya, khimar, gamis, dan outer. Jasa konveksi abaya dan jasa jahit khimar untuk brand.',
  path: '/produk',
});

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Produk"
        title="Jenis busana muslimah yang kami kerjakan"
        intro="Konveksi abaya, khimar, gamis, dan busana muslimah lainnya untuk brand, butik, dan komunitas. Pilih jenis produk untuk melihat detailnya."
      />
      <section className={`${container} py-14`}>
        <ul className="grid gap-10">
          {products.map((p) => (
            <li
              key={p.slug}
              className="reveal grid items-center gap-6 border-b border-line pb-10 last:border-0 sm:grid-cols-[240px_1fr]"
            >
              <div className="max-w-60">
                <ProductCard product={p} />
              </div>
              <div>
                <p className="text-muted">{p.description}</p>
                <p className="mt-4 text-sm font-semibold">Cocok untuk:</p>
                <p className="text-sm text-muted">{p.suitableFor.join(' · ')}</p>
                <WhatsAppButton
                  message={productMessage(p.name)}
                  label={`Tanya produksi ${p.name}`}
                  variant="outline"
                  className="mt-5"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand message={generalMessage} />
    </>
  );
}
