import { isFunction } from '@universal-ui/utils';
import type { StyleProp } from 'react-native';
import { StyleSheet as RNStyleSheet } from 'react-native';
import type { UnistylesRuntime, UnistylesValues } from 'react-native-unistyles';
import { createStyleSheet } from 'react-native-unistyles';
import type { Theme } from './theme';
import type { StyleObject } from './types';

export function parseStyle<T extends Record<string, any>>(style: T) {
  return style;
}

export const StyleSheet = {
  create:
    <T extends StyleObject>(
      stylesheet: T | ((theme: Theme, runtime: typeof UnistylesRuntime) => T),
    ) =>
    (theme: Theme, runtime: typeof UnistylesRuntime) => {
      const _stylesheet = isFunction(stylesheet)
        ? stylesheet(theme, runtime)
        : stylesheet;

      return createStyleSheet(_stylesheet);
    },
  flatten: <T extends UnistylesValues>(style: StyleProp<T>): T[] =>
    [RNStyleSheet.flatten(style)] as T[],
};
