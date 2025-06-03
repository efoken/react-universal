import type { AnyObject } from '@react-universal/utils';
import { isArray, isObject, mergeDeep } from '@react-universal/utils';

export const defaultBreakpoints = {
  xs: 0,
  sm: 360, // 600
  md: 600, // 840
  lg: 1024, // 1200
  xl: 1440, // 1600
};

export type Breakpoints = typeof defaultBreakpoints;

export type Breakpoint = keyof Breakpoints;

export type BreakpointValue<T> = T | (T | undefined)[] | Partial<Record<Breakpoint, T | undefined>>;

export function handleBreakpoints<T extends (value: any) => AnyObject>(
  props: { theme: { breakpoints: Record<string, any> } },
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
