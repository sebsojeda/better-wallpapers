/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/better-wallpapers/**",
      },
    ],
  },
};

module.exports = nextConfig;
