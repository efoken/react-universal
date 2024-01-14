import { isObject, mergeDeep } from '@universal-ui/utils';

export const breakpoints = {
  xs: 0,
  sm: 360,
  md: 600,
  lg: 1024,
  xl: 1440,
  xxl: 1920,
};

export type Breakpoints = typeof breakpoints;

const breakpointKeys = Object.keys(breakpoints) as (keyof Breakpoints)[];

export type BreakpointValue<T> =
  | T
  | (T | undefined)[]
  | Partial<Record<keyof Breakpoints, T | undefined>>;

export function handleBreakpoints<
  T extends (value: any) => Record<string, any>,
>(propValue: unknown, styleFromPropValue: T): ReturnType<T> {
  if (Array.isArray(propValue)) {
    return propValue.reduce<Record<string, any>>(
      (acc, _item, index) =>
        mergeDeep(
          acc,
          Object.fromEntries(
            Object.entries(styleFromPropValue(propValue[index])).map(
              ([key, value]) => [key, { [breakpointKeys[index]]: value }],
            ),
          ),
          { clone: false },
        ),
      {},
    ) as ReturnType<T>;
  }

  if (isObject(propValue)) {
    return Object.keys(propValue).reduce<Record<string, any>>(
      (acc, breakpoint) =>
        mergeDeep(
          acc,
          Object.fromEntries(
            Object.entries(styleFromPropValue(propValue[breakpoint])).map(
              ([key, value]) => [key, { [breakpoint]: value }],
            ),
          ),
          { clone: false },
        ),
      {},
    ) as ReturnType<T>;
  }

  return styleFromPropValue(propValue) as ReturnType<T>;
}
