import type { Breakpoints } from './breakpoints';
import type { Theme } from './theme';
import { defaultTheme } from './theme';

// biome-ignore lint/complexity/noStaticOnlyClass:
export class StyleRuntime {
  static #theme: Theme = defaultTheme as Theme;

  // biome-ignore lint/suspicious/noEmptyBlockStatements:
  static setTheme(_name: 'light' | 'dark') {}

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
