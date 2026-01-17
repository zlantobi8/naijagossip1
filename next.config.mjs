/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'videohotmovs.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    unoptimized: true, // Disable image optimization for external URLs
  },

  transpilePackages: ['owl.carousel', 'slick-carousel', 'line-awesome'],

  webpack: (config) => {
    // Add JSON support
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });

    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOf) => {
          if (oneOf.test && oneOf.test.toString().includes('css')) {
            if (oneOf.use && Array.isArray(oneOf.use)) {
              oneOf.use.forEach((loader) => {
                if (loader.loader && loader.loader.includes('css-loader')) {
                  loader.options = {
                    ...loader.options,
                    url: false,
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