import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['squareup.com', 'squarecdn.com', 'items-images-production.s3.us-west-2.amazonaws.com'], // Add Square image domains
  },
  // Removed experimental.typedRoutes for Turbopack compatibility
};

export default nextConfig; 