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
import { productMessage } from '@/lib/whatsapp';

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
    title: `${product.name} | Furnitur Kayu Solid & Custom`,
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
          width: 600,
          height: 750,
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
          ...(product.price !== undefined && {
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'IDR',
              availability: 'https://schema.org/InStock',
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
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
                {category.name}
              </span>
              {product.isCustomizable && (
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-semibold text-accent-strong">
                  Custom Available
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-3xl leading-tight font-medium sm:text-5xl text-foreground">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-medium text-accent-strong">
              {formatPrice(product.price)}
            </p>

            <p className="mt-6 leading-relaxed text-foreground/85 text-sm sm:text-base">
              {product.description}
            </p>



            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                message={productMessage(product)}
                className="sm:flex-1 py-4 text-sm"
              >
                Pesan via WhatsApp
              </WhatsAppButton>
              <WhatsAppButton
                variant="outline"
                message={`Halo ${siteConfig.name}, saya tertarik dengan produk "${product.name}". Apakah bisa dibuat custom (menyesuaikan ukuran atau warna)?`}
                className="sm:flex-1 py-4 text-sm"
              >
                Tanya Custom Ukuran/Warna
              </WhatsAppButton>
            </div>
            <p className="mt-4 text-xs text-muted">
              Website ini berfungsi sebagai etalase katalog. Semua konsultasi, survei, dan penawaran
              dilayani langsung via WhatsApp tanpa perantara.
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="produk-lain" className="border-t border-line py-20 bg-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 id="produk-lain" className="reveal font-serif text-3xl sm:text-4xl text-foreground">
              Produk Terkait Lainnya
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
