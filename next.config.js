/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/uniswap/assets/master/blockchains/ethereum/assets/**",
      },
    ],
  },
};

module.exports = nextConfig;
