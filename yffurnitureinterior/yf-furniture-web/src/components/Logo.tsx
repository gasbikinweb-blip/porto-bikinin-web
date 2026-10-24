import Image from 'next/image';

// Logo asli (lencana bulat) + nama usaha sebagai teks agar tetap terbaca di ukuran kecil
export function Logo({ size = 44, priority = false }: { size?: number; priority?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/brand/logo.webp"
        alt=""
        width={size}
        height={size}
        priority={priority}
        className="shrink-0 rounded-full"
        style={{ width: size, height: size }}
      />
      <span className="leading-none">
        <span className="block text-sm font-semibold tracking-[0.3em] uppercase">YF Furniture</span>
        <span className="mt-1 block font-serif text-sm text-wood italic">&amp; Interior</span>
      </span>
    </span>
  );
}
