import type { PluginCustomOptions } from '@pigment-css/react/utils';
import type { PigmentOptions } from '@pigment-css/vite-plugin';
// import { pigment } from '@pigment-css/vite-plugin';
import type { Theme } from '@react-universal/core';
import type { Plugin } from 'vite';

export { extendTheme } from '@pigment-css/vite-plugin';

export interface ReactUniversalOptions
  extends Omit<PigmentOptions, 'theme' | keyof PluginCustomOptions>,
    Omit<PluginCustomOptions, 'themeArgs'> {
  /**
   * The theme object that you want to be passed to the `styled` function
   */
  theme?: Theme;
}

// biome-ignore lint/correctness/noUnusedVariables:
export function reactUniversal(options: ReactUniversalOptions = {}): Plugin {
  return {
    name: 'react-universal',
    config: (config) => {
      config.define = {
        ...config.define,
        'process.env.TEST_NATIVE_PLATFORM': JSON.stringify(false),
      };
      // config.plugins?.push(pigment(options));
    },
  };
}
