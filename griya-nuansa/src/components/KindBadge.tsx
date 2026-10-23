import type { ImageKind } from '@/data/types';

const labels: Partial<Record<ImageKind, string>> = {
  render: 'Render Desain',
  before: 'Sebelum',
  after: 'Sesudah',
};

/** Label kecil di pojok gambar untuk render/before/after. Foto biasa tidak diberi label. */
export function KindBadge({ kind, className = '' }: { kind: ImageKind; className?: string }) {
  const label = labels[kind];
  if (!label) return null;
  return (
    <span
      className={`pointer-events-none absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[11px] tracking-wider text-white uppercase ${className}`}
    >
      {label}
    </span>
  );
}
