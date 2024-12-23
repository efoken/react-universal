import { mergeDeep } from '@react-universal/utils';
import { defaultTheme } from './defaultTheme';
import type { Theme } from './defaultTheme';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export function createTheme(theme: DeepPartial<Theme> = {}) {
  return mergeDeep<Theme>(defaultTheme, theme);
}
