import type { AnyObject } from '@react-universal/utils';
import { isArray, isObject, mergeDeep } from '@react-universal/utils';
import type { Theme } from './theme/defaultTheme.js';

export const defaultBreakpoints = {
  xs: 0,
  sm: 360,
  md: 600,
  lg: 1024,
  xl: 1440,
  xxl: 1920,
};

export type Breakpoints = typeof defaultBreakpoints;

export type Breakpoint = keyof Breakpoints;

export type BreakpointValue<T> = T | (T | undefined)[] | Partial<Record<Breakpoint, T | undefined>>;

export function handleBreakpoints<T extends (value: any) => AnyObject>(
  props: { theme: Theme },
  propValue: unknown,
  styleFromPropValue: T,
): ReturnType<T> {
  const breakpointKeys = Object.keys(props.theme.breakpoints);

  if (isArray(propValue)) {
    return propValue.reduce<AnyObject>(
      (acc, _item, index) =>
        mergeDeep(
          acc,
          Object.fromEntries(
            Object.entries(styleFromPropValue(propValue[index])).map(([key, value]) => [
              key,
              { [breakpointKeys[index]]: value },
            ]),
          ),
          { clone: false },
        ),
      {},
    ) as ReturnType<T>;
  }

  if (isObject(propValue)) {
    return Object.keys(propValue).reduce<AnyObject>(
      (acc, breakpoint) =>
        mergeDeep(
          acc,
          Object.fromEntries(
            Object.entries(styleFromPropValue(propValue[breakpoint])).map(([key, value]) => [
              key,
              { [breakpoint]: value },
            ]),
          ),
          { clone: false },
        ),
      {},
    ) as ReturnType<T>;
  }

  return styleFromPropValue(propValue) as ReturnType<T>;
}
