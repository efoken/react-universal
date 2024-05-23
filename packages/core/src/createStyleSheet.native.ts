import { isFunction } from '@universal-ui/utils';
import type { UnistylesRuntime, UnistylesValues } from 'react-native-unistyles';
import { createStyleSheet as createUnistylesStyleSheet } from 'react-native-unistyles';
import type { Theme } from './theme';
import type { StyleObject } from './types';

export function parseStyle<T extends Record<string, any>>(
  style: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  runtime: typeof UnistylesRuntime,
): Omit<T, 'position' | 'transform'> & {
  position?: UnistylesValues['position'];
  transform?: UnistylesValues['transform'];
} {
  return style;
}

export function createStyleSheet<T extends StyleObject>(
  stylesheet: T | ((theme: Theme, runtime: typeof UnistylesRuntime) => T),
) {
  return (theme: Theme, runtime: typeof UnistylesRuntime) => {
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
