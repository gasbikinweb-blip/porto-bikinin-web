import Link from 'next/link';
import type { Category } from '@/data/categories';

type Props = {
  categories: readonly (Category & { count: number })[];
  total: number;
  active?: string;
};

// Filter kategori berupa link (bisa dibagikan & tanpa JavaScript)
export function CategoryFilter({ categories, total, active }: Props) {
  const chip =
    'inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors';
  const on = 'border-wood bg-wood text-white';
  const off = 'border-line bg-white hover:border-wood';
  return (
    <nav aria-label="Filter kategori" className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      <ul className="flex gap-2 sm:flex-wrap">
        <li>
          <Link
            href="/katalog"
            aria-current={!active ? 'page' : undefined}
            className={`${chip} ${!active ? on : off}`}
          >
            Semua <span className="opacity-75">({total})</span>
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/katalog/${c.slug}`}
              aria-current={active === c.slug ? 'page' : undefined}
              className={`${chip} ${active === c.slug ? on : off}`}
            >
              {c.name} <span className="opacity-75">({c.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
