/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: { dirs: ['/src'], ignoreDuringBuilds: true },
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 604800,
  },
  i18n,
};

module.exports = nextConfig;
