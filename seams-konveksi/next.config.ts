import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hasil build berupa file statis di folder /out
  output: 'export',
  // Optimasi gambar butuh server, jadi dimatikan; gambar dioptimasi lewat `npm run optimize-images`
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Catatan: headers() TIDAK berfungsi di static export.
  // Security headers diatur di hosting (public/_headers atau vercel.json).
};

export default nextConfig;
