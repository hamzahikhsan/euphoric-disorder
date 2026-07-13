/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // R3F / three ecosystem plays nicer when transpiled by Next.
  transpilePackages: ["three"],
};

export default nextConfig;
