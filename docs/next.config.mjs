/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@universal-ui/components',
    '@universal-ui/core',
    '@universal-ui/elements',
    '@universal-ui/svg',
    '@universal-ui/utils',
  ],
  webpack: (config) => ({
    ...config,
    plugins: [
      ...config.plugins,
      new (class {
        apply(compiler) {
          compiler.hooks.afterEnvironment.tap('@universal-ui/webpack-plugin', () => {
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
