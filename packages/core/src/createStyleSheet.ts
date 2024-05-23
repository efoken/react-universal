import { isFunction, isObject, mergeDeep } from '@universal-ui/utils';
import type { UnistylesRuntime } from 'react-native-unistyles';
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

export function createStyleSheet<T extends StyleObject>(
  stylesheet: T | ((theme: Theme, runtime: typeof UnistylesRuntime) => T),
) {
  return (theme: Theme, runtime: typeof UnistylesRuntime) => {
    const _stylesheet = isFunction(stylesheet)
      ? stylesheet(theme, runtime)
      : stylesheet;

    return Object.fromEntries(
      Object.entries(_stylesheet).map(([name, style]) => [
        name,
        parseStyle(style, runtime),
      ]),
    );
  };
}
