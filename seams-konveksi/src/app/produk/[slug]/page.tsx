import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { CheckList } from '@/components/sections';
import { CtaBand, WhatsAppButton, container } from '@/components/ui';
import { getProduct, products } from '@/data/products';
import { projects } from '@/data/projects';
import { pageMetadata } from '@/lib/metadata';
import { productMessage } from '@/lib/whatsapp';

// Semua halaman produk dibuat saat build; slug lain langsung 404
export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return pageMetadata({
    title: `Konveksi ${product.name}`,
    description: `${product.summary} ${product.description}`.slice(0, 160),
    path: `/produk/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = projects.filter((p) => p.category === product.category);

  return (
    <>
      <section className={`${container} grid gap-10 py-10 sm:py-14 lg:grid-cols-2`}>
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-surface">
          {product.image ? (
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 448px, 90vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col justify-end bg-gradient-to-br from-mauve/60 via-surface to-sage/40 p-8">
              <span aria-hidden="true" className="font-serif text-8xl text-plum/80">
                {product.name.charAt(0)}
              </span>
              <span className="mt-3 text-sm text-muted">
                Contoh hasil {product.name.toLowerCase()} bisa Anda minta saat konsultasi.
              </span>
            </div>
          )}
        </div>
        <div>
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
            <Link href="/produk" className="hover:text-plum">
              Produk
            </Link>{' '}
            / <span aria-current="page">{product.name}</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl">Konveksi {product.name}</h1>
          <p className="mt-4 text-muted">{product.description}</p>

          <h2 className="mt-8 mb-3 font-semibold">Cocok untuk</h2>
          <CheckList items={product.suitableFor} />

          <h2 className="mt-8 mb-3 font-semibold">Yang perlu Anda tahu</h2>
          <CheckList items={product.details} />

          <WhatsAppButton message={productMessage(product.name)} className="mt-8" />
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="hasil" className={`${container} pb-16`}>
          <h2 id="hasil" className="mb-6 font-serif text-3xl">
            Contoh hasil {product.name.toLowerCase()}
          </h2>
          <PortfolioGallery projects={related} showFilter={false} />
        </section>
      )}

      <CtaBand message={productMessage(product.name)} />
    </>
  );
}
