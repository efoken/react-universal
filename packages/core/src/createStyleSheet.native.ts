import { isFunction } from '@universal-ui/utils';
import type { UnistylesValues } from 'react-native-unistyles';
import { createStyleSheet as createUnistylesStyleSheet } from 'react-native-unistyles';
import type { StyleRuntime } from './StyleRuntime';
import type { Theme } from './theme';
import type { StyleSheet } from './types';

export function parseStyle<T extends Record<string, any>>(
  style: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runtime: typeof StyleRuntime,
): Omit<T, keyof UnistylesValues> & UnistylesValues {
  return style;
}

export function createStyleSheet<T extends StyleSheet>(
  stylesheet: T | ((theme: Theme, runtime: typeof StyleRuntime) => T),
) {
  return (theme: Theme, runtime: typeof StyleRuntime) => {
    // FIXME: Use `runIfFunction`
    const _stylesheet = isFunction(stylesheet)
      ? stylesheet(theme, runtime)
      : stylesheet;

    return createUnistylesStyleSheet(
      Object.fromEntries(
        Object.entries(_stylesheet).map(([name, style]) => [
          name,
          parseStyle(style, runtime),
        ]),
      ),
    );
  };
}
