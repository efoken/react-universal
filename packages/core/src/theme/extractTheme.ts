import { isNumber, isObject } from '@react-universal/utils';
import type { AnyObject } from '@react-universal/utils';
import type { Theme, ThemeColor } from './defaultTheme';

export type ExtractedTheme<T extends AnyObject = Theme> = {
  [K in keyof T]: T[K] extends number | string | ThemeColor
    ? string
    : T[K] extends AnyObject
      ? ExtractedTheme<T[K]>
      : T[K];
};

export function extractTheme(theme: Theme, mode: 'light' | 'dark') {
  const traverse = (obj: any) => {
    if (isNumber(obj)) {
      return `${obj}px`;
    }
    if (!isObject(obj)) {
      return obj;
    }
    if (Object.hasOwn(obj, '_light') && Object.hasOwn(obj, '_dark')) {
      return obj[`_${mode}`];
    }
    return Object.keys(obj).reduce<AnyObject>((acc, prop) => {
      acc[prop] = traverse(obj[prop]);
      return acc;
    }, {});
  };
  return traverse(theme) as ExtractedTheme;
}
