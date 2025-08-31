/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add external domains if you host images elsewhere
  },
  experimental: {
    appDir: true, // For Next.js 13+ app directory
  },
};

module.exports = nextConfig;
