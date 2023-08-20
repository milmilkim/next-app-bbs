// @ts-check

/**
 * @type {import('next').NextConfig}
 */

import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  reactStrictMode: true,
  // @ts-ignore
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  compiler: {
    styledComponents: true,
  },
};

export default withPlaiceholder(nextConfig);
