import type { AnyObject } from '@react-universal/utils';
import { runIfFunction } from '@react-universal/utils';
import { StyleSheet } from 'react-native';
import type { UnistylesValues } from 'react-native-unistyles';
import { createStyleSheet as createUnistylesStyleSheet } from 'react-native-unistyles';
import type { StyleMiniRuntime } from './StyleRuntime';
import type { Theme } from './theme';
import type { StyleProp, StyleValues } from './types';

function parseStyle<T extends AnyObject>(
  style: T,
): Omit<T, keyof UnistylesValues> & UnistylesValues {
  return style;
}

export const css = {
  props<T extends AnyObject>(style: StyleProp<T>): { className?: string; style: T } {
    return { style: StyleSheet.flatten(style) };
  },

  create<T extends AnyObject<StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: StyleMiniRuntime) => T),
  ) {
    return createUnistylesStyleSheet((theme, runtime) => {
      // @ts-expect-error
      const _stylesheet = runIfFunction(stylesheet, theme, {
        ...runtime,
        breakpoints: theme.breakpoints,
      });

      return Object.fromEntries(
        Object.entries(_stylesheet).map(([name, style]) => [name, parseStyle(style)]),
      ) as Record<keyof T, AnyObject>;
    });
  },
};
