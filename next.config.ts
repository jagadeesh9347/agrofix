import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'example.com',
      'cdn.yoursite.com',
      'images.unsplash.com',
      'tse1.mm.bing.net'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ This line disables ESLint errors in Vercel builds
  },
};

export default nextConfig;
