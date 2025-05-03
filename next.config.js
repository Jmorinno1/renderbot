/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      _http_common: false,
    };
    return config;
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['renderbot-bbpf.onrender.com'],
    },
  },
};

module.exports = nextConfig; 