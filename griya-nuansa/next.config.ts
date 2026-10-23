import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hasil build berupa file statis di folder /out
  output: 'export',
  // Optimasi gambar butuh server, jadi dimatikan. Gambar sudah dioptimasi lewat `npm run optimize-images`.
  images: { unoptimized: true },
  // URL berakhiran "/" agar kompatibel dengan hosting statis apa pun (folder/index.html)
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Hanya untuk `npm run dev` (akses dari HP lewat IP lokal). Tidak berpengaruh ke hasil build.
  allowedDevOrigins: ['192.168.*.*', '*.ngrok-free.app'],
  // Sembunyikan indikator bulat "N" Next.js yang muncul di pojok saat `npm run dev`
  devIndicators: false,
  // Catatan: headers() TIDAK berfungsi di static export.
  // Security headers diatur di hosting: public/_headers (Netlify/Cloudflare Pages) atau vercel.json.
};

export default nextConfig;
