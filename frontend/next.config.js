/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['face-api.js']);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure fs module is not resolved in the client-side code
      config.resolve.fallback = { fs: false };
    }

    return config;
  },
};

module.exports = withTM(nextConfig);
