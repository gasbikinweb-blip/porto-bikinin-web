import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Hasil build berupa file statis di folder /out
  output: 'export',
  // Optimasi gambar butuh server, jadi dimatikan untuk static export
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Hanya untuk `npm run dev`: izinkan membuka dev server dari HP/laptop lain di jaringan lokal.
  // Tidak berpengaruh pada hasil build. Sesuaikan dengan IP komputer kamu.
  allowedDevOrigins: ['192.168.100.5'],
  // Catatan: headers() TIDAK berfungsi di static export.
  // Atur security headers di hosting (public/_headers atau vercel.json).
};

export default nextConfig;
