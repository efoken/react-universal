import type { Theme } from './theme';
import { defaultTheme } from './theme';

export class StyleRuntime {
  static #theme: Theme = defaultTheme;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static setTheme(name: 'default') {}

  static updateTheme(name: 'default', updater: (theme: Theme) => Theme) {
    this.#theme = updater(this.#theme);
  }

  static get breakpoints() {
    return this.#theme.breakpoints;
  }

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
