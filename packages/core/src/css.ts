import { isFunction, isObject, isString, mergeDeep } from '@react-universal/utils';
import type { StyleMiniRuntime } from './StyleRuntime';
import { createReactDOMStyle } from './createReactDOMStyle';
import { preprocess } from './preprocess';
import type { Theme } from './theme';
import type { StyleProp, StyleValues } from './types';

function getBreakpointsStyles<T extends Record<string, any>>(
  prop: string,
  style: T,
  runtime: StyleMiniRuntime,
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

function parseStyle<T extends Record<string, any>>(style: T, runtime: StyleMiniRuntime) {
  const nextStyle = Object.entries(style ?? {}).reduce<Record<string, any>>(
    (acc, [key, value]) =>
      isObject(value) && !key.startsWith('&')
        ? mergeDeep(acc, getBreakpointsStyles(key, value, runtime))
        : { ...acc, [key]: value },
    {},
  );

  return createReactDOMStyle(preprocess(nextStyle));
}

export const css = {
  props<T extends Record<string, any>>(style: StyleProp<T>): { className?: string; style: T } {
    const flatStyle = [style]
      .flat<Record<string, any>, number>(Number.POSITIVE_INFINITY)
      .filter(Boolean);

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
      style: inlineStyle as T,
    };
  },

  create<T extends Record<string, StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: StyleMiniRuntime) => T),
  ) {
    return (theme: Theme, runtime: StyleMiniRuntime) => {
      // FIXME: Use `runIfFunction`
      const _stylesheet = isFunction(stylesheet) ? stylesheet(theme, runtime) : stylesheet;

      return Object.fromEntries(
        Object.entries(_stylesheet).map(([name, style]) => [name, parseStyle(style, runtime)]),
      ) as Record<string, Record<string, any>>;
    };
  },
};
