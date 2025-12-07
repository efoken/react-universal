import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  noExternal: ['@tamagui/constants', '@tamagui/use-constant'],
});
