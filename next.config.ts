import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.akamaized.net',
        pathname: '/products/**',
      },
    ],
    deviceSizes: [320, 384, 640],
    imageSizes: [176, 216],
  },
}

export default nextConfig
