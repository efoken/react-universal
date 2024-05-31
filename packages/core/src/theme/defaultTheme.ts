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
    heading: {
      family: 'Roboto, sans-serif',
      weights: {
        400: { normal: 'Roboto-Regular' },
        700: { normal: 'Roboto-Bold' },
      },
    },
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
    px: '1px',
    /** 2px */ 0.5: '0.125rem',
    /** 4px */ 1: '0.25rem',
    /** 8px */ 2: '0.5rem',
    /** 12px */ 3: '0.75rem',
    /** 16px */ 4: '1rem',
    /** 20px */ 5: '1.25rem',
    /** 24px */ 6: '1.5rem',
    /** 32px */ 7: '2rem',
    /** 40px */ 8: '2.5rem',
    /** 48px */ 9: '3rem',
    /** 56px */ 10: '3.5rem',
    /** 64px */ 11: '4rem',
    /** 80px */ 12: '5rem',
    /** 96px */ 13: '6rem',
    /** 112px */ 14: '7rem',
    /** 128px */ 15: '8rem',
    /** 144px */ 16: '9rem',
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
    default: Theme;
  }
  export interface UnistylesBreakpoints extends Breakpoints {}
}
