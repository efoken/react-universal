import type { AnyObject } from '@react-universal/utils';
import type { Breakpoints } from '../breakpoints';
import { defaultBreakpoints } from '../breakpoints';

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ThemeColor = string | { _light: string; _dark: string };

export type ThemeFont = {
  family: string;
  weights: Partial<Record<100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, { normal: string }>>;
};

interface DefaultTheme {
  breakpoints: Breakpoints;
  colors: {
    black: ThemeColor;
    white: ThemeColor;
    background: {
      default: ThemeColor;
    };
    text: {
      default: ThemeColor;
    };
    border: {
      default: ThemeColor;
    };
  };
  fonts: {
    body: ThemeFont;
    heading: ThemeFont;
    mono: ThemeFont;
  };
  space: {
    0: number;
    /** 1px */ px: string;
    /** 2px */ 0.5: string;
    /** 4px */ 1: string;
    /** 8px */ 2: string;
    /** 12px */ 3: string;
    /** 16px */ 4: string;
    /** 20px */ 5: string;
    /** 24px */ 6: string;
    /** 28px */ 7: string;
    /** 32px */ 8: string;
    /** 36px */ 9: string;
    /** 40px */ 10: string;
    /** 44px */ 11: string;
    /** 48px */ 12: string;
    /** 56px */ 13: string;
    /** 64px */ 14: string;
    /** 80px */ 15: string;
    /** 96px */ 16: string;
    /** 112px */ 17: string;
    /** 128px */ 18: string;
    /** 144px */ 19: string;
  };
  radii: number[];
  zIndices: Record<string, number>;
  sxConfig: any;
}

export const defaultTheme: DefaultTheme = {
  breakpoints: defaultBreakpoints,
  colors: {
    black: '#09090b',
    white: '#fff',
    background: {
      default: { _light: '#fff', _dark: '#000' },
    },
    text: {
      default: { _light: '#09090b', _dark: '#fafafa' },
    },
    border: {
      default: { _light: '#e4e4e7', _dark: '#27272a' },
    },
  },
  fonts: {
    body: {
      family: 'Roboto, sans-serif',
      weights: {
        400: { normal: 'Roboto-Regular' },
        700: { normal: 'Roboto-Bold' },
      },
    },
    heading: {
      family: 'Roboto, sans-serif',
      weights: {
        400: { normal: 'Roboto-Regular' },
        700: { normal: 'Roboto-Bold' },
      },
    },
    mono: {
      family: 'Roboto Mono, sans-serif',
      weights: {
        400: { normal: 'RobotoMono-Regular' },
        700: { normal: 'RobotoMono-Bold' },
      },
    },
  },
  space: {
    0: 0,
    /** 1px */ px: '1px',
    /** 2px */ 0.5: '0.125rem',
    /** 4px */ 1: '0.25rem',
    /** 8px */ 2: '0.5rem',
    /** 12px */ 3: '0.75rem',
    /** 16px */ 4: '1rem',
    /** 20px */ 5: '1.25rem',
    /** 24px */ 6: '1.5rem',
    /** 28px */ 7: '1.75rem',
    /** 32px */ 8: '2rem',
    /** 36px */ 9: '2.25rem',
    /** 40px */ 10: '2.5rem',
    /** 44px */ 11: '2.75rem',
    /** 48px */ 12: '3rem',
    /** 56px */ 13: '3.5rem',
    /** 64px */ 14: '4rem',
    /** 80px */ 15: '5rem',
    /** 96px */ 16: '6rem',
    /** 112px */ 17: '7rem',
    /** 128px */ 18: '8rem',
    /** 144px */ 19: '9rem',
  },
  radii: [0, 4, 8, 16],
  zIndices: {},
  sxConfig: undefined,
};

export interface Theme extends DefaultTheme {}

export type ThemeValue<T extends AnyObject> = {
  [K in keyof T]-?: Join<K, T[K] extends AnyObject ? ThemeValue<T[K]> : ''>;
}[keyof T];

export type ExtractTheme<T> = Prettify<{
  [K in keyof T]: K extends 'sxConfig'
    ? T[K]
    : T[K] extends number
      ? number
      : T[K] extends ThemeColor | ThemeFont
        ? string
        : T[K] extends AnyObject
          ? ExtractTheme<T[K]>
          : T[K];
}>;

// @ts-ignore: react-native-unistyles is not always installed, as it's optional
declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: ExtractTheme<Theme>;
    dark: ExtractTheme<Theme>;
  }
  export interface UnistylesBreakpoints extends Breakpoints {}
}
