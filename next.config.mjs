/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint during builds
  },
  images: {
    domains: ["avatars.githubusercontent.com"], // Add this line to allow GitHub avatars
  },
};

export default nextConfig;
