/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'react-native': 'react-native-web',
      },
      extensions: [
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        ...config.resolve.extensions,
      ],
    },
  }),
};

export default nextConfig;
