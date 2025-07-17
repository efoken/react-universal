import type { AnyObject } from '@react-universal/utils';
import { isObject, isString, mergeDeep, runIfFunction } from '@react-universal/utils';
import { createReactDOMStyle } from './createReactDOMStyle';
import type { StyleMiniRuntime } from './StyleRuntime';
import type { Theme } from './theme';
import type { StyleProp, StyleValues } from './types';

function getBreakpointsStyles<T extends AnyObject>(
  prop: string,
  style: T,
  runtime: StyleMiniRuntime,
) {
  return Object.entries(style).reduce<AnyObject>((acc, [key, value]) => {
    const breakpoint = runtime.breakpoints[key as keyof typeof runtime.breakpoints];

    if (breakpoint != null) {
      acc[`@media screen and (min-width: ${breakpoint}px)`] = createReactDOMStyle({
        [prop]: value,
      });
    }

    return acc;
  }, {}) as T;
}

function parseStyle<T extends AnyObject>(style: T, runtime: StyleMiniRuntime) {
  const nextStyle = Object.entries(style ?? {}).reduce<AnyObject>((acc, [key, value]) => {
    if (isObject(value) && !key.startsWith('&')) {
      return mergeDeep(acc, getBreakpointsStyles(key, value, runtime));
    }
    acc[key] = value;
    return acc;
  }, {});

  return createReactDOMStyle(nextStyle);
}

type CSS = {
  props<T extends AnyObject>(style: StyleProp<T>): { className?: string; style: T };
  create<T extends AnyObject<StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: StyleMiniRuntime) => T),
  ): (theme: Theme, runtime: StyleMiniRuntime) => Record<keyof T, AnyObject>;
};

export const css = {
  props<T extends AnyObject>(style: StyleProp<T>): { className?: string; style: T } {
    const flatStyle = [style].flat<AnyObject, number>(Number.POSITIVE_INFINITY).filter(Boolean);

    let classNames: string[] = [];

    const inlineStyle = flatStyle.reduce((acc, a) => {
      if (isObject(a)) {
        if ('$$css' in a && a.$$css === true) {
          classNames = [...classNames, ...Object.values(a).filter((b): b is string => isString(b))];
        } else {
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

  create<T extends AnyObject<StyleValues>>(
    stylesheet: T | ((theme: Theme, runtime: StyleMiniRuntime) => T),
  ) {
    return (theme: Theme, runtime: StyleMiniRuntime) => {
      const _stylesheet = runIfFunction(stylesheet, theme, runtime);

      return Object.fromEntries(
        Object.entries(_stylesheet).map(([name, style]) => [name, parseStyle(style, runtime)]),
      ) as Record<keyof T, AnyObject>;
    };
  },
} as CSS;
