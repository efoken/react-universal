import type { Breakpoints } from '../breakpoints';
import { defaultBreakpoints } from '../breakpoints';

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

export const defaultTheme = {
  breakpoints: defaultBreakpoints,
  colors: {
    black: '#000',
    white: '#fff',
    green: '#f00',
  },
  fonts: {
    body: {
      family: 'Roboto, sans-serif',
      weights: {
        400: { normal: 'Roboto-Regular' },
        700: { normal: 'Roboto-Bold' },
      },
    },
  },
  space: {
    0: 0,
    px: 1,
    0.5: 2,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 56,
    11: 64,
    12: 80,
    13: 96,
    14: 112,
    15: 128,
    16: 144,
  },
  radii: [0, 4, 8, 16],
  zIndices: {},
  sxConfig: undefined as any,
};

export type Theme = typeof defaultTheme;

export type ThemeValue<T extends Record<string, any>> = {
  [K in keyof T]-?: Join<
    K,
    T[K] extends Record<string, any> ? ThemeValue<T[K]> : ''
  >;
}[keyof T];

declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: Theme;
    dark: Theme;
  }
  export interface UnistylesBreakpoints extends Breakpoints {}
}
