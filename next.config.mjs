/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;


// allowedDevOrigins: ['192.168.100.14', 'localhost']