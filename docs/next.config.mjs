/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    '@react-universal/components',
    '@react-universal/core',
    '@react-universal/elements',
    '@react-universal/svg',
    '@react-universal/utils',
  ],
  webpack: (config) => ({
    ...config,
    plugins: [
      ...config.plugins,
      new (class {
        apply(compiler) {
          compiler.hooks.afterEnvironment.tap('@react-universal/webpack-plugin', () => {
            compiler.options.resolve.conditionNames = [
              ...compiler.options.resolve.conditionNames,
              'source',
            ];
          });
        }
      })(),
    ],
  }),
};

export default nextConfig;
