import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['example.com','cdn.yoursite.com','images.unsplash.com','tse1.mm.bing.net'],
  },
};

export default nextConfig;
