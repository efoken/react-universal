import type { AnyObject, DeepPartial, Override } from '@react-universal/utils';
import { mergeDeep } from '@react-universal/utils';
import type { Breakpoints } from './breakpoints';
import type { ThemeColor, ThemeFont } from './theme';
import { defaultTheme } from './theme';

export interface GenericConfig {
  debug: boolean;
  theme: typeof defaultTheme;
}

export interface CustomConfig {}

export interface Config extends Override<GenericConfig, CustomConfig> {}

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export function defineConfig<T extends DeepPartial<{ debug: boolean; theme: AnyObject }>>(
  config: T,
) {
  return mergeDeep<AnyObject>(
    {
      debug: false,
      theme: defaultTheme,
    },
    config,
  ) as T & { theme: typeof defaultTheme & T['theme'] };
}

export type Theme = Config['theme'];

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

// biome-ignore lint/suspicious/noTsIgnore: Sometimes errors, sometimes not
// @ts-ignore: react-native-unistyles is not always installed, as it's optional
declare module 'react-native-unistyles' {
  export interface UnistylesThemes {
    light: ExtractTheme<Theme>;
    dark: ExtractTheme<Theme>;
  }
  export interface UnistylesBreakpoints extends Breakpoints {}
}
