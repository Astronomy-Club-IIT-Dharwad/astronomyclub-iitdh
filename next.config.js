/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  basePath: '/astronomyclub-iitdh',
  assetPrefix: '/astronomyclub-iitdh/',
};

module.exports = nextConfig;
