/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'healthyfitnessmeals.com', pathname: '/**' },
      { protocol: 'https', hostname: 'iheartvegetables.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.eatingwell.com', pathname: '/**' },
      { protocol: 'https', hostname: 'sweetsavoryandsteph.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
