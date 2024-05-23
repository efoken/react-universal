import { isFunction, isObject, mergeDeep } from '@universal-ui/utils';
import type { StyleProp } from 'react-native';
import type { UnistylesRuntime, UnistylesValues } from 'react-native-unistyles';
import createReactDOMStyle from 'react-native-web/dist/exports/StyleSheet/compiler/createReactDOMStyle';
import preprocess from 'react-native-web/dist/exports/StyleSheet/preprocess';
import type { Theme } from './theme';
import type { StyleObject } from './types';

function getBreakpointsStyles<T extends Record<string, any>>(
  prop: string,
  style: T,
  runtime: typeof UnistylesRuntime,
) {
  return Object.entries(style).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      const breakpoint =
        runtime.breakpoints[key as keyof typeof runtime.breakpoints];

      if (breakpoint != null) {
        acc[`@media screen and (min-width: ${breakpoint}px)`] =
          createReactDOMStyle(preprocess({ [prop]: value }));
      }

      return acc;
    },
    {},
  ) as T;
}

export function parseStyle<T extends Record<string, any>>(
  style: T,
  runtime: typeof UnistylesRuntime,
) {
  const nextStyle = Object.entries(style ?? {}).reduce<Record<string, any>>(
    (acc, [key, value]) => {
      if (key === 'shadowOffset' || key === 'textShadowOffset') {
        acc[key] = parseStyle(value, runtime);
        return acc;
      }

      if (key === 'transform' && Array.isArray(value)) {
        acc[key] = value.map((v) => parseStyle(v, runtime));
        return acc;
      }

      if (isObject(value)) {
        return mergeDeep(acc, getBreakpointsStyles(key, value, runtime));
      }

      return {
        ...acc,
        [key]: value,
      };
    },
    {},
  );

  return createReactDOMStyle(preprocess(nextStyle));
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

      return Object.fromEntries(
        Object.entries(_stylesheet).map(([name, style]) => [
          name,
          parseStyle(style, runtime),
        ]),
      );
    },
  flatten: <T extends UnistylesValues>(style: StyleProp<T>): T[] =>
    // eslint-disable-next-line unicorn/no-magic-array-flat-depth
    [style].flat(5).filter(Boolean) as T[],
};
