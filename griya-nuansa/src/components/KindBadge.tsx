import type { ImageKind } from '@/data/types';
import type { Lang } from '@/i18n';
import { ui } from '@/i18n/ui';

/** Label kecil di pojok gambar untuk render/before/after. Foto biasa tidak diberi label. */
export function KindBadge({
  kind,
  className = '',
  lang = 'id',
}: {
  kind: ImageKind;
  className?: string;
  lang?: Lang;
}) {
  const label = kind === 'foto' ? undefined : ui[lang].kind[kind];
  if (!label) return null;
  return (
    <span
      className={`pointer-events-none absolute top-3 left-3 rounded-full bg-black/55 backdrop-blur-sm px-2.5 py-1 text-[11px] tracking-wider text-white uppercase ${className}`}
    >
      {label}
    </span>
  );
}
