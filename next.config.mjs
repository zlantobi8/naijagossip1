/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  transpilePackages: ['owl.carousel', 'slick-carousel', 'line-awesome'],

  webpack: (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOf) => {
          if (oneOf.test && oneOf.test.toString().includes('css')) {
            if (oneOf.use && Array.isArray(oneOf.use)) {
              oneOf.use.forEach((loader) => {
                if (loader.loader && loader.loader.includes('css-loader')) {
                  loader.options = {
                    ...loader.options,
                    url: false, // keep this so vendor assets don't break
                  };
                }
              });
            }
          }
        });
      }
    });
    return config;
  },
};

export default nextConfig;
