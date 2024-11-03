import { isFunction } from '@react-universal/utils';
import { StyleSheet } from 'react-native';
import type { UnistylesValues } from 'react-native-unistyles';
import { createStyleSheet as createUnistylesStyleSheet } from 'react-native-unistyles';
import type { StyleMiniRuntime } from './StyleRuntime';
import type { Theme } from './theme';
import type { StyleProp, StyleValues } from './types';

function parseStyle<T extends Record<string, any>>(
  style: T,
): Omit<T, keyof UnistylesValues> & UnistylesValues {
  return style;
}

export const css = {
  props<T extends Record<string, any>>(style: StyleProp<T>): { className?: string; style: T } {
    return { style: StyleSheet.flatten(style) };
  },

  create<T extends Record<string, StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: StyleMiniRuntime) => T),
  ) {
    return createUnistylesStyleSheet((theme, runtime) => {
      // FIXME: Use `runIfFunction`
      const _stylesheet = isFunction(stylesheet)
        ? stylesheet(theme, { ...runtime, breakpoints: theme.breakpoints })
        : stylesheet;

      return Object.fromEntries(
        Object.entries(_stylesheet).map(([name, style]) => [name, parseStyle(style)]),
      );
    });
  },
};
