import type { AnyObject } from '@react-universal/utils';
import { mergeDeep } from '@react-universal/utils';
import type { Theme } from './defaultTheme';
import { defaultTheme } from './defaultTheme';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export function createTheme(theme: DeepPartial<Theme> = {}) {
  return mergeDeep<AnyObject>(defaultTheme, theme) as Theme;
}
