import type { NextConfig } from 'next';
import type { Compiler, WebpackPluginInstance } from 'webpack';

const nextConfig: NextConfig = {
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
      new (class implements WebpackPluginInstance {
        apply(compiler: Compiler) {
          compiler.hooks.afterEnvironment.tap('@react-universal/webpack-plugin', () => {
            compiler.options.resolve.conditionNames = [
              ...(compiler.options.resolve.conditionNames ?? []),
              'source',
            ];
          });
        }
      })(),
    ],
  }),
};

export default nextConfig;
