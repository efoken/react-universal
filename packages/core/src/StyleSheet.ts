import { isFunction, isObject, isString, mergeDeep } from '@universal-ui/utils';
import type { StyleRuntime } from './StyleRuntime';
import { createReactDOMStyle } from './createReactDOMStyle';
import { preprocess } from './preprocess';
import type { Theme } from './theme';
import type { StyleProp, StyleValues } from './types';

function getBreakpointsStyles<T extends Record<string, any>>(
  prop: string,
  style: T,
  runtime: typeof StyleRuntime,
) {
  return Object.entries(style).reduce<Record<string, any>>((acc, [key, value]) => {
    const breakpoint = runtime.breakpoints[key as keyof typeof runtime.breakpoints];

    if (breakpoint != null) {
      acc[`@media screen and (min-width: ${breakpoint}px)`] = createReactDOMStyle(
        preprocess({ [prop]: value }),
      );
    }

    return acc;
  }, {}) as T;
}

function parseStyle<T extends Record<string, any>>(style: T, runtime: typeof StyleRuntime) {
  const nextStyle = Object.entries(style ?? {}).reduce<Record<string, any>>(
    (acc, [key, value]) =>
      isObject(value) && !key.startsWith('&')
        ? mergeDeep(acc, getBreakpointsStyles(key, value, runtime))
        : { ...acc, [key]: value },
    {},
  );

  return createReactDOMStyle(preprocess(nextStyle));
}

export const StyleSheet = {
  flatten<T extends StyleValues>(style: StyleProp<T>): T[] {
    // eslint-disable-next-line unicorn/no-magic-array-flat-depth
    return [style].flat(20).filter(Boolean) as T[];
  },

  props<T extends StyleValues>(style: StyleProp<T>) {
    const flatStyle = this.flatten(style);

    let classNames: string[] = [];

    const inlineStyle = flatStyle.reduce((acc, a) => {
      if (isObject(a)) {
        if ('$$css' in a && a.$$css === true) {
          classNames = [...classNames, ...Object.values(a).filter((b): b is string => isString(b))];
        } else {
          // eslint-disable-next-line no-param-reassign
          acc = mergeDeep(acc, a);
        }
      }
      return acc;
    }, {});

    return {
      className: classNames.length > 0 ? classNames.join(' ') : undefined,
      style: inlineStyle,
    };
  },

  create<T extends Record<string, StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: typeof StyleRuntime) => T),
  ) {
    return (theme: Theme, runtime: typeof StyleRuntime) => {
      // FIXME: Use `runIfFunction`
      const _stylesheet = isFunction(stylesheet) ? stylesheet(theme, runtime) : stylesheet;

      return Object.fromEntries(
        Object.entries(_stylesheet).map(([name, style]) => [name, parseStyle(style, runtime)]),
      );
    };
  },
};
