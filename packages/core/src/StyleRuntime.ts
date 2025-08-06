import type { Breakpoints } from './breakpoints';
import type { Theme } from './theme';
import { defaultTheme } from './theme';

export class StyleRuntime {
  static #theme: Theme = defaultTheme as Theme;

  static getTheme(_name: 'light' | 'dark') {
    return StyleRuntime.#theme;
  }

  static setTheme(_name: 'light' | 'dark') {
    // noop
  }

  static updateTheme(_name: 'light' | 'dark', updater: (theme: Theme) => Theme) {
    StyleRuntime.#theme = updater(StyleRuntime.#theme);
  }

  static get breakpoints() {
    return StyleRuntime.#theme.breakpoints;
  }

  static fontScale = 1;

  static get insets(): {
    bottom: string | number;
    left: string | number;
    right: string | number;
    top: string | number;
  } {
    return {
      bottom: 'env(safe-area-inset-bottom)',
      left: 'env(safe-area-inset-left)',
      right: 'env(safe-area-inset-right)',
      top: 'env(safe-area-inset-top)',
    };
  }
}

export interface StyleMiniRuntime {
  breakpoints: Breakpoints;
  fontScale: number;
  insets: {
    bottom: string | number;
    left: string | number;
    right: string | number;
    top: string | number;
  };
}
