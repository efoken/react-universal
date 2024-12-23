import { isNumber, isObject } from '@react-universal/utils';
import type { AnyObject } from '@react-universal/utils';
import type { Theme } from './defaultTheme';

export type ExtractedTheme<T extends AnyObject = Theme> = {
  [K in keyof T]: T[K] extends number | string | { _light: string; _dark: string }
    ? string
    : T[K] extends AnyObject
      ? ExtractedTheme<T[K]>
      : T[K];
};

export function extractTheme(theme: Theme, mode: 'light' | 'dark') {
  const traverse = (obj: any) => {
    if (!isObject(obj) || obj == null) {
      return obj;
    }
    if (isNumber(obj)) {
      return `${obj}px`;
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
