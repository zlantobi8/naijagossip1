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
  // Add this transpile block for vendor libraries
  transpilePackages: ['owl.carousel', 'slick-carousel', 'line-awesome'],
  
  webpack: (config) => {
    config.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        rule.oneOf.forEach((oneOf) => {
          // Look for CSS loaders
          if (oneOf.test && oneOf.test.toString().includes('css')) {
            if (oneOf.use && Array.isArray(oneOf.use)) {
              oneOf.use.forEach((loader) => {
                // Disable url() resolving to ignore missing vendor assets
                if (loader.loader && loader.loader.includes('css-loader')) {
                  loader.options = { 
                    ...loader.options, 
                    url: false 
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
