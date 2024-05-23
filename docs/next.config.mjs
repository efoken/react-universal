/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // 'react-native': 'react-native-web', not needed anymore
      },
    },
  }),
};

export default nextConfig;
