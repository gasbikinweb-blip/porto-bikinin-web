import Image from 'next/image';
import { FaqList } from '@/components/FaqList';
import { FlashSale } from '@/components/FlashSale';
import { HeroShowcase, type HeroVariant } from '@/components/HeroShowcase';
import { JsonLd } from '@/components/JsonLd';
import { OrderSteps } from '@/components/OrderSteps';
import { SectionHeading } from '@/components/SectionHeading';
import { ShowcasePanel, type ShowcaseItem } from '@/components/ShowcasePanel';
import { faqs } from '@/data/faq';
import { looks } from '@/data/lookbook';
import { getAllProducts, getCategory, getProductBySlug, statusLabel } from '@/data/products';
import { highlights } from '@/data/site';
import { siteConfig } from '@/lib/config';
import { formatPrice } from '@/lib/format';
import { productMessage } from '@/lib/whatsapp';

// Foto kecil di strip keunggulan
const highlightImages = [
  '/lookbook/detail-bordir.webp',
  '/products/nehir-abaya-baby-salem/03.webp',
  '/lookbook/trio-nehir.webp',
  '/lookbook/afifah-06.webp',
] as const;

// Varian warna Nehir untuk hero: [slug, nama warna]
const heroVariants = (
  [
    ['nehir-abaya-baby-salem', 'Baby Salem'],
    ['nehir-abaya-baby-yellow', 'Baby Yellow'],
    ['nehir-abaya-jetblack', 'Jetblack'],
  ] as const
).flatMap(([slug, color]): HeroVariant[] => {
  const p = getProductBySlug(slug);
  if (!p) return [];
  return [{ slug, color, cover: p.images[0], detail: p.images[2] ?? p.images[0] }];
});

const collectionItems: ShowcaseItem[] = getAllProducts().map((p) => ({
  id: p.slug,
  title: p.name.replace(' – ', ' · '),
  subtitle: `${getCategory(p.category).name} · ${statusLabel[p.status]}`,
  meta: p.colors.join(', '),
  description: `${p.description} Bahan: ${p.material}. Ukuran ${p.sizes.join(', ')}.`,
  image: p.images[0],
  badge: formatPrice(p.price),
  waMessage: productMessage(p),
}));

const lookItems: ShowcaseItem[] = looks.slice(0, 6).map((l) => {
  const products = l.products.map((s) => getProductBySlug(s)?.name).filter(Boolean);
  return {
    id: l.id,
    title: l.title,
    subtitle: products.join(' + '),
    meta: `@${l.credit}`,
    description: l.note,
    image: l.image,
    waMessage: `Halo ${siteConfig.name}, saya suka look "${l.title}" (${products.join(', ')}). Apakah produknya masih tersedia?`,
  };
});

export default function HomePage() {
  const [firstVariant, ...restVariants] = heroVariants;
  const [firstProduct, ...restProducts] = collectionItems;
  const [firstLook, ...restLooks] = lookItems;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ClothingStore',
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          telephone: `+${siteConfig.waNumber}`,
          sameAs: [siteConfig.instagram, siteConfig.threads],
        }}
      />

      {firstVariant && (
        <HeroShowcase
          collection="Nehir Abaya"
          variants={[firstVariant, ...restVariants]}
          sizes={['S', 'M', 'L', 'XL']}
        />
      )}

      {/* ---------- Keunggulan ---------- */}
      <section aria-labelledby="keunggulan" className="px-4 pt-10 sm:px-6">
        <h2 id="keunggulan" className="sr-only">
          Keunggulan Sahane.id
        </h2>
        <ul data-stagger className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <li
              key={h.title}
              className="reveal flex items-center gap-4 rounded-2xl border border-line p-3"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={highlightImages[i] ?? highlightImages[0]}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
              <span>
                <span className="block font-mono text-xs font-medium tracking-[0.15em] uppercase">
                  {h.title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-muted">{h.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <FlashSale />

      <div id="koleksi">
        {firstProduct && (
          <ShowcasePanel
            id="judul-koleksi"
            title="Koleksi Sahane.id"
            listTitle="Pilih produk"
            items={[firstProduct, ...restProducts]}
            ctaLabel="Pesan"
          />
        )}
      </div>

      <div id="lookbook" className="border-t border-white/10">
        {firstLook && (
          <ShowcasePanel
            id="judul-lookbook"
            title="Dikenakan oleh Sahabat Sahane"
            listTitle="Inspirasi OOTD"
            items={[firstLook, ...restLooks]}
            ctaLabel="Tanya"
            reverse
          />
        )}
      </div>

      <OrderSteps />

      {/* ---------- FAQ ---------- */}
      <section aria-labelledby="faq" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            id="faq"
            eyebrow="FAQ"
            title="Pertanyaan Seputar PO"
            description="Belum menemukan jawaban? Admin kami siap membantu lewat WhatsApp."
          />
          <FaqList items={faqs} />
        </div>
      </section>
    </>
  );
}
