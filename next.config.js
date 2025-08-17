/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  basePath: '/astronomyclub-iitdh',
  assetPrefix: '/astronomyclub-iitdh/',  // assetPrefix REQUIRES trailing slash for GitHub Pages
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;