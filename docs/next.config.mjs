import { build } from 'velite';

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
        static started = false;
        apply(compiler) {
          compiler.hooks.afterEnvironment.tap('@react-universal/webpack-plugin', () => {
            compiler.options.resolve.conditionNames = [
              ...compiler.options.resolve.conditionNames,
              'source',
            ];
          });
          compiler.hooks.beforeCompile.tapPromise('@react-universal/webpack-plugin', async () => {
            if (!this.started) {
              this.started = true;
              const dev = compiler.options.mode === 'development';
              await build({ watch: dev, clean: !dev });
            }
          });
        }
      })(),
    ],
  }),
};

export default nextConfig;
