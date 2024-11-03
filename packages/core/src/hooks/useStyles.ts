import type { AnyFunction } from '@react-universal/utils';
import { isFunction } from '@react-universal/utils';
import type { Breakpoints } from '../breakpoints';
import { useTheme } from '../contexts/ThemeContext';
import { StyleRuntime } from '../StyleRuntime';
import type { Theme } from '../theme';
import type { StyleSheetWithSuperPowers } from '../types';

interface ParsedStylesheet<T extends StyleSheetWithSuperPowers> {
  breakpoint: keyof Breakpoints;
  styles: T extends AnyFunction ? ReturnType<T> : T;
  theme: Theme;
}

export function useStyles<T extends StyleSheetWithSuperPowers>(stylesheet: T): ParsedStylesheet<T> {
  const theme = useTheme();

  return {
    breakpoint: 'xs',
    styles: isFunction(stylesheet) ? stylesheet(theme, StyleRuntime) : (stylesheet as any),
    theme,
  };
}
