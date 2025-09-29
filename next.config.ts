/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['tds-compliance-doctor.s3.ap-south-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
