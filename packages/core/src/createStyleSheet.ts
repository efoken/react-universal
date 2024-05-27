import { isFunction, isObject, mergeDeep } from '@universal-ui/utils';
import type { StyleRuntime } from './StyleRuntime';
import { createReactDOMStyle } from './createReactDOMStyle';
import { preprocess } from './preprocess';
import type { Theme } from './theme';
import type { StyleSheet } from './types';

function getBreakpointsStyles<T extends Record<string, any>>(
  prop: string,
  style: T,
  runtime: typeof StyleRuntime,
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
  runtime: typeof StyleRuntime,
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

export function createStyleSheet<T extends StyleSheet>(
  stylesheet: T | ((theme: Theme, runtime: typeof StyleRuntime) => T),
) {
  return (theme: Theme, runtime: typeof StyleRuntime) => {
    // FIXME: Use `runIfFunction`
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
