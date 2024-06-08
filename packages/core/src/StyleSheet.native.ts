import { isFunction } from '@universal-ui/utils';
import { StyleSheet as RNStyleSheet } from 'react-native';
import type { UnistylesValues } from 'react-native-unistyles';
import { createStyleSheet as createUnistylesStyleSheet } from 'react-native-unistyles';
import type { StyleRuntime } from './StyleRuntime';
import type { Theme } from './theme';
import type { StyleProp, StyleValues } from './types';

function parseStyle<T extends Record<string, any>>(
  style: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _runtime: typeof StyleRuntime,
): Omit<T, keyof UnistylesValues> & UnistylesValues {
  return style;
}

export const StyleSheet = {
  flatten<T extends StyleValues>(style: StyleProp<T>): T[] {
    return [RNStyleSheet.flatten([style])] as T[];
  },

  props<T extends StyleValues>(style: StyleProp<T>) {
    return { className: undefined, style };
  },

  create<T extends Record<string, StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: typeof StyleRuntime) => T),
  ) {
    return (theme: Theme, runtime: typeof StyleRuntime) => {
      // FIXME: Use `runIfFunction`
      const _stylesheet = isFunction(stylesheet) ? stylesheet(theme, runtime) : stylesheet;

      return createUnistylesStyleSheet(
        Object.fromEntries(
          Object.entries(_stylesheet).map(([name, style]) => [name, parseStyle(style, runtime)]),
        ),
      );
    };
  },
};
