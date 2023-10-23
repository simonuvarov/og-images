/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js\.map$/,
      use: ['ignore-loader'],
    });
    return config;
  },
};
