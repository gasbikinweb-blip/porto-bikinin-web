// Cuplikan video pendek dari akun Busr Mebel + tautan ke Instagram, TikTok, dan YouTube.
// Video diputar dari file lokal (tanpa embed pihak ketiga) agar ringan dan aman untuk CSP.
import { siteConfig } from '@/lib/config';
import { AutoVideo } from './AutoVideo';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from './icons';

const reels = [
  { src: '/media/reels/reel-1.mp4', label: 'Video pendek proses produksi furnitur Busr Mebel 1' },
  { src: '/media/reels/reel-2.mp4', label: 'Video pendek proses produksi furnitur Busr Mebel 2' },
  { src: '/media/reels/reel-3.mp4', label: 'Video pendek proses produksi furnitur Busr Mebel 3' },
  { src: '/media/reels/reel-4.mp4', label: 'Video pendek proses produksi furnitur Busr Mebel 4' },
];

const channels = [
  { href: siteConfig.tiktok, label: 'TikTok', handle: '@busrmebel', Icon: TikTokIcon },
  { href: siteConfig.youtube, label: 'YouTube', handle: '@busrmebel1904', Icon: YouTubeIcon },
  { href: siteConfig.instagram, label: 'Instagram', handle: '@busrmebel', Icon: InstagramIcon },
];

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function SocialReels() {
  return (
    <section aria-labelledby="judul-sosial" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="reveal max-w-xl">
            <p className="text-[11px] font-medium tracking-[0.32em] text-muted uppercase">Ikuti kami</p>
            <h2 id="judul-sosial" className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl">
              Proses di balik layar, setiap minggu.
            </h2>
            <p className="mt-5 leading-relaxed text-muted">
              Lihat produk baru, proses pengerjaan, dan detail finishing di akun resmi kami.
            </p>
          </div>
          <ul className="reveal flex flex-wrap gap-3">
            {channels.map(({ href, label, handle, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...external}
                  className="group flex items-center gap-3 border border-line px-5 py-3 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  <Icon className="size-5" />
                  <span className="text-left leading-tight">
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase">{label}</span>
                    <span className="block text-xs text-muted group-hover:text-background/70">{handle}</span>
                  </span>
                  <span className="sr-only"> (membuka tab baru)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ul
          data-stagger
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible sm:px-0"
        >
          {reels.map((r) => (
            <li key={r.src} className="reveal w-[62%] shrink-0 snap-start sm:w-auto">
              <a
                href={siteConfig.tiktok}
                {...external}
                aria-label={`${r.label}, tonton lebih banyak di TikTok`}
                className="group relative block aspect-[9/16] overflow-hidden bg-surface-2"
              >
                <AutoVideo
                  src={`${r.src}#t=0.5`}
                  label={r.label}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-4 text-[10px] font-semibold tracking-[0.2em] text-white uppercase">
                  <TikTokIcon className="size-4" /> Tonton
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
