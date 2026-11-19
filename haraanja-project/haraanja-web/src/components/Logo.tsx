// Logo asli Haraanja Project (dibuat dari assets-src/logo lewat scripts/build-logo.mjs).
// Versi terang & gelap ditukar lewat CSS sesuai tema.
import Image from 'next/image';

export function Logo({ small = false }: { small?: boolean }) {
  const cls = small ? 'h-9 w-auto sm:h-10' : 'h-12 w-auto';
  return (
    <span className="flex items-center">
      <Image
        src="/logo.png"
        alt="Haraanja Project Souvenir"
        width={980}
        height={169}
        priority={small}
        className={`logo-light ${cls}`}
      />
      <Image
        src="/logo-dark.png"
        alt=""
        aria-hidden="true"
        width={980}
        height={169}
        className={`logo-dark ${cls}`}
      />
    </span>
  );
}
