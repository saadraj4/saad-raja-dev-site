const path = require('path')
 
module.exports = {
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  
  // SASS configuration
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
    ],
  },
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion', 'lottie-react'],
  },
}