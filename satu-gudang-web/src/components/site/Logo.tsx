import Image from 'next/image';

// Logo: tanda "G" dengan titik oranye + teks. Dua versi warna, dipilih CSS sesuai tema.
export function Logo({ name, priority = false }: { name: string; priority?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative size-10 shrink-0">
        <Image
          src="/brand/mark-dark.webp"
          alt=""
          width={256}
          height={253}
          priority={priority}
          className="logo-dark size-10"
        />
        <Image
          src="/brand/mark-light.webp"
          alt=""
          width={256}
          height={253}
          priority={priority}
          className="logo-light size-10"
        />
      </span>
      <span className="flex flex-col text-[0.8rem] leading-[1.05] font-extrabold tracking-[0.14em] uppercase">
        <span>{name}</span>
        <span className="text-accent">Project.</span>
      </span>
    </span>
  );
}
