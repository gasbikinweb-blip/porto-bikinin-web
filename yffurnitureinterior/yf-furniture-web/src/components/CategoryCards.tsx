import Image from 'next/image';
import Link from 'next/link';
import { activeCategories } from '@/lib/catalog';

// Kartu kategori besar bergambar, mudah di-tap di HP
export function CategoryCards() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {activeCategories.map((c) => (
        <li key={c.slug}>
          <Link
            href={`/katalog/${c.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-surface"
          >
            {c.cover && (
              <Image
                src={c.cover.thumb}
                alt=""
                fill
                sizes="(min-width: 1024px) 270px, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
              <span className="block text-base leading-tight font-bold sm:text-lg">{c.name}</span>
              <span className="mt-0.5 block text-xs text-white/85 sm:text-sm">{c.count} karya</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
