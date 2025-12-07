import type { Breakpoints } from './breakpoints';
import type { Theme } from './defineConfig';
import { defaultTheme } from './theme';
import type { ExtractedTheme } from './theme/extractTheme';
import { extractTheme } from './theme/extractTheme';

export class StyleRuntime {
  static #themes: Record<'light' | 'dark', ExtractedTheme> = {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    light: extractTheme(defaultTheme as Theme, 'light'),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    dark: extractTheme(defaultTheme as Theme, 'dark'),
  };

  static #currentTheme: ExtractedTheme = StyleRuntime.#themes.light;

  static getTheme(name: 'light' | 'dark') {
    return StyleRuntime.#themes[name];
  }

  static setTheme(name: 'light' | 'dark') {
    StyleRuntime.#currentTheme = StyleRuntime.#themes[name];
  }

  static updateTheme(name: 'light' | 'dark', updater: (theme: ExtractedTheme) => ExtractedTheme) {
    StyleRuntime.#themes[name] = updater(StyleRuntime.#themes[name]);
  }

  static get breakpoints() {
    return StyleRuntime.#currentTheme.breakpoints;
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
