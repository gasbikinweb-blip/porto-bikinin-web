import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { ProductCard } from '@/components/ProductCard';
import { ProductGallery } from '@/components/ProductGallery';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { getAllProducts, getCategory, getProductBySlug } from '@/data/products';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { consultMessage, productMessage } from '@/lib/whatsapp';

type Props = { params: Promise<{ slug: string }> };

// Semua halaman produk dibuat saat build; slug lain otomatis 404
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  if (!product) return {};
  const url = `/produk/${product.slug}`;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      // JPG kecil (dibuat optimize-images) agar kartu pratinjau WhatsApp selalu muncul
      images: [
        {
          url: `/products/${product.slug}/og.jpg`,
          type: 'image/jpeg',
          alt: product.images[0].alt,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getAllProducts()
    .filter((p) => p.slug !== product.slug)
    .sort(
      (a, b) => Number(b.category === product.category) - Number(a.category === product.category),
    )
    .slice(0, 4);

  const specs = product.specs;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          category: category.name,
          image: product.images.map((img) => new URL(img.src, siteConfig.url).href),
          brand: { '@type': 'Brand', name: siteConfig.name },
          ...(product.priceFrom !== undefined && {
            offers: {
              '@type': 'Offer',
              price: product.priceFrom,
              priceCurrency: 'IDR',
              availability: 'https://schema.org/InStock',
              seller: { '@type': 'Organization', name: siteConfig.name },
            },
          }),
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <Breadcrumb
          items={[
            { label: 'Beranda', href: '/' },
            { label: 'Produk', href: '/produk' },
            { label: category.name, href: `/produk?kategori=${category.slug}` },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} />

          <div className="animate-in">
            <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
              {category.name}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight font-medium sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl text-accent-strong">
              {formatPrice(product.priceFrom, product.priceUnit)}
            </p>
            <p className="mt-6 leading-relaxed text-foreground/85">{product.description}</p>

            <h2 className="mt-10 font-serif text-2xl">Spesifikasi</h2>
            <dl className="mt-4 divide-y divide-line border-y border-line">
              {specs.map((s) => (
                <div key={s.label} className="grid grid-cols-3 gap-4 py-4 text-sm">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="col-span-2">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton message={productMessage(product)} className="sm:flex-1" />
              <WhatsAppButton
                variant="outline"
                message={consultMessage(product.name)}
                className="sm:flex-1"
              >
                Minta Ukur Gratis
              </WhatsAppButton>
            </div>
            <p className="mt-4 text-xs text-muted">
              Foto dari konten Instagram SA Living. Warna di layar bisa sedikit berbeda; lihat
              contoh bahan asli di toko atau saat survei. Penawaran harga dikirim via WhatsApp
              setelah ukur.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="produk-lain" className="border-t border-line py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="produk-lain" className="reveal font-serif text-3xl sm:text-4xl">
              Produk Lainnya
            </h2>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug} className="reveal">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
