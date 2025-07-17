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
  };
}
