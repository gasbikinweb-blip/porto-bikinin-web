import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SectionHeading } from '@/components/SectionHeading';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WorkGrid } from '@/components/WorkGrid';
import { getCategory, type CategorySlug } from '@/data/categories';
import { getWorksByCategory, works } from '@/data/works';
import { activeCategories, categoryNames } from '@/lib/catalog';

type Props = { params: Promise<{ kategori: string }> };

// Hanya kategori yang punya karya yang dibuat halamannya; slug lain → 404
export const dynamicParams = false;

export function generateStaticParams() {
  return activeCategories.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).kategori);
  if (!category) return {};
  const title = `${category.name} Custom Boyolali`;
  const description = `${category.description} Contoh hasil karya ${category.name.toLowerCase()} dari YF Furniture & Interior, workshop di Boyolali. Pesan via WhatsApp.`;
  const url = `/katalog/${category.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function KategoriPage({ params }: Props) {
  const category = getCategory((await params).kategori);
  if (!category) notFound();
  const items = getWorksByCategory(category.slug as CategorySlug);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumb items={[{ label: 'Katalog', href: '/katalog' }, { label: category.name }]} />
      <div className="mt-4">
        <SectionHeading as="h1" title={category.name} description={category.description} />
      </div>
      <div className="mt-8">
        <CategoryFilter categories={activeCategories} total={works.length} active={category.slug} />
      </div>
      <div className="mt-6">
        <WorkGrid works={items} categoryNames={categoryNames} />
      </div>
      <div className="mt-14 rounded-3xl bg-surface p-6 text-center sm:p-10">
        <h2 className="text-2xl font-extrabold">Ingin {category.name.toLowerCase()} custom?</h2>
        <p className="mt-2 text-muted">Kirim ukuran dan contoh model, kami bantu hitungkan.</p>
        <WhatsAppButton
          className="mt-5"
          message={`Halo YF Furniture, saya ingin konsultasi pembuatan ${category.name.toLowerCase()} custom.`}
        />
      </div>
    </div>
  );
}
