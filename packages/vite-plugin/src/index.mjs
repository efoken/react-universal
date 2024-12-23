export { extendTheme } from '@pigment-css/vite-plugin';

// biome-ignore lint/correctness/noUnusedVariables:
export function reactUniversal(options = {}) {
  return {
    name: 'react-universal',
    config: (config) => {
      config.define = {
        ...config.define,
        'process.env.TEST_NATIVE_PLATFORM': JSON.stringify(false),
      };
    },
  };
}
