import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hasil build berupa file statis di folder /out
  output: 'export',
  // Optimasi gambar butuh server, jadi dimatikan; gambar dioptimasi lewat `npm run optimize-images`
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Hanya untuk `npm run dev`: izinkan membuka dev server dari HP lewat IP lokal.
  // Tanpa ini JavaScript tidak jalan di HP (navbar scroll & menu aktif mati). Sesuaikan IP komputer.
  allowedDevOrigins: ['192.168.100.5', 'localhost'],
  // Catatan: headers() TIDAK berfungsi di static export.
  // Security headers diatur di hosting (public/_headers atau vercel.json).
};

export default nextConfig;
