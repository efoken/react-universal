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

type Color = string | { _light: string; _dark: string };

type Font = {
  family: string;
  weights: Partial<Record<100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, { normal: string }>>;
};

interface DefaultTheme {
  breakpoints: Breakpoints;
  colors: {
    black: Color;
    white: Color;
    background: {
      default: Color;
      muted: Color;
    };
    text: {
      default: Color;
      muted: Color;
    };
    border: {
      default: Color;
      muted: Color;
    };
  };
  fonts: {
    heading: Font;
    body: Font;
  };
  space: {
    0: number;
    px: string;
    0.5: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    13: string;
    14: string;
    15: string;
    16: string;
  };
  radii: number[];
  zIndices: Record<string, number>;
  sxConfig: any;
}

export const defaultTheme: DefaultTheme = {
  breakpoints: defaultBreakpoints,
  colors: {
    black: '#09090b',
    white: '#ffffff',
    background: {
      default: { _light: '#fff', _dark: '#000' },
      muted: { _light: '#f4f4f5', _dark: '#18181b' },
    },
    text: {
      default: { _light: '#09090b', _dark: '#fafafa' },
      muted: { _light: '#52525b', _dark: '#a1a1aa' },
    },
    border: {
      default: { _light: '#e4e4e7', _dark: '#27272a' },
      muted: { _light: '#f4f4f5', _dark: '#18181b' },
    },
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
    /** 1px */ px: '1px',
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
  sxConfig: undefined,
};

export interface Theme extends DefaultTheme {}

export type ThemeValue<T extends AnyObject> = {
  [K in keyof T]-?: Join<K, T[K] extends AnyObject ? ThemeValue<T[K]> : ''>;
}[keyof T];

export type ExtractTheme<T> = Prettify<{
  [K in keyof T]: K extends 'sxConfig'
    ? T[K]
    : T[K] extends number | Color
      ? string
      : T[K] extends Font
        ? T[K]
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
