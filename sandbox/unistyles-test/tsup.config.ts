import babelPlugin from '@chialab/esbuild-plugin-babel';
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  esbuildPlugins: [
    babelPlugin({
      presets: ['@babel/preset-typescript'],
      plugins: [['react-native-unistyles/plugin', { root: 'src', debug: true }]],
    }),
  ],
  format: ['cjs', 'esm'],
});
