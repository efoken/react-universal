import { transformAsync } from '@babel/core';
import type { Theme } from '@react-universal/core';
import type { Plugin } from 'vite';

export interface ReactUniversalOptions {
  /**
   * The theme object that you want to be passed to the `styled` function
   */
  theme?: Theme;
}

export function reactUniversal(_options: ReactUniversalOptions = {}): Plugin {
  return {
    name: 'react-universal',
    config: (config) => {
      config.define = {
        ...config.define,
        'process.env.TEST_NATIVE_PLATFORM': JSON.stringify(false),
      };
    },
    transform: async (code, id) => {
      const result = await transformAsync(code, {
        filename: id,
        sourceMaps: true,
        plugins: [['@react-universal/babel-plugin', { root: 'src', debug: true, platform: 'web' }]],
      });
      return result?.code ? { code: result.code, map: result.map } : null;
    },
  };
}
