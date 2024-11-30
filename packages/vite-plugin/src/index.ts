import type { PluginCustomOptions } from '@pigment-css/react/utils';
import type { PigmentOptions } from '@pigment-css/vite-plugin';
import { pigment } from '@pigment-css/vite-plugin';
import type { Theme } from '@react-universal/core';

export { extendTheme } from '@pigment-css/vite-plugin';

export interface ReactUniversalOptions
  extends Omit<PigmentOptions, 'theme' | keyof PluginCustomOptions>,
    Omit<PluginCustomOptions, 'themeArgs'> {
  /**
   * The theme object that you want to be passed to the `styled` function
   */
  theme?: Theme;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function reactUniversal(options?: ReactUniversalOptions) {
  return pigment({});
}
