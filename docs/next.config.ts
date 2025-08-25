import type { NextConfig } from 'next';
import { build } from 'velite';
import type { Compiler, WebpackPluginInstance } from 'webpack';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    '@react-universal/components',
    '@react-universal/core',
    '@react-universal/elements',
    '@react-universal/next',
    '@react-universal/svg',
    '@react-universal/utils',
  ],
  webpack: (config) => ({
    ...config,
    plugins: [
      ...config.plugins,
      new (class WebpackPlugin implements WebpackPluginInstance {
        static started = false;
        apply(compiler: Compiler) {
          compiler.hooks.afterEnvironment.tap('@react-universal/webpack-plugin', () => {
            compiler.options.resolve.conditionNames = [
              ...(compiler.options.resolve.conditionNames ?? []),
              'source',
            ];
          });
          compiler.hooks.beforeCompile.tapPromise('@react-universal/webpack-plugin', async () => {
            if (!WebpackPlugin.started) {
              WebpackPlugin.started = true;
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
