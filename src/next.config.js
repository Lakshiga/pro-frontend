// next.config.js
const webpack = require('webpack');

module.exports = {
  webpack: (config, { isServer }) => {
    // Only add fallbacks for client-side code
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Prevents errors related to 'fs' module
        stream: require.resolve('stream-browserify'), // Polyfill for 'stream'
        zlib: require.resolve('browserify-zlib'), // Polyfill for 'zlib'
      };

      // Optional: Add these if you encounter similar issues with 'http' or 'https'
      config.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );
    }

    return config;
  },
};
