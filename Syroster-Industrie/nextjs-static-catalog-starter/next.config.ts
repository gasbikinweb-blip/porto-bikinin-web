import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hasil build berupa file statis di folder /out
  output: 'export',
  // Optimasi gambar butuh server, jadi dimatikan. Gambar dioptimasi lewat `npm run optimize-images`.
  images: { unoptimized: true },
  // URL berakhiran "/" agar hosting statis selalu menemukan index.html tiap halaman
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Catatan: headers() TIDAK berfungsi di static export.
  // Security headers diatur di hosting: public/_headers (Netlify/Cloudflare) atau vercel.json.
};

export default nextConfig;
