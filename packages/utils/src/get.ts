import type { AnyObject } from './is';
import { isNumber, isString } from './is';

export function get<T extends AnyObject>(
  obj: T,
  path: string | number | undefined,
  fallback?: any,
): unknown {
  if (!path || (!isString(path) && !isNumber(path))) {
    return undefined;
  }
  return (
    `${path}`.split('.').reduce((acc, item) => {
      if (acc && acc[item] != null) {
        return acc[item];
      }
      return undefined;
    }, obj) ?? fallback
  );
}
