/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allows any HTTPS domain
      },
    ],
  },
};

export default nextConfig;
