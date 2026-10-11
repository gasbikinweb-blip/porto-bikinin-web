import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="Hendrik Flooring & Wall Covering, ke beranda"
    >
      {/* Logo bulat; teks di sampingnya agar nama tetap terbaca pada ukuran kecil */}
      <Image
        src="/img/brand/logo-bulat.png"
        alt=""
        width={52}
        height={52}
        className="size-13 rounded-full shadow-md shadow-black/20"
      />
      <span className="leading-tight">
        <span className="block text-lg font-bold tracking-tight">hendrik</span>
        <span className="block text-[0.7rem] font-semibold tracking-wider text-muted uppercase">
          Flooring &amp; Wall Covering
        </span>
      </span>
    </Link>
  );
}
