export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export type AnyFunction = (...args: any[]) => any;

export function isFunction<T extends AnyFunction = (...args: any[]) => any>(
  value: any,
): value is T {
  return typeof value === 'function';
}

export function isArray<T>(value: any): value is T[] {
  return Array.isArray(value);
}

export type AnyObject<T = any> = Record<string, T>;

export function isObject(value: any): value is AnyObject {
  return value != null && typeof value === 'object' && !isArray(value);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isEqualShallow(prev: AnyObject, next: AnyObject) {
  for (const key in next) {
    if (prev[key] !== next[key]) {
      return false;
    }
  }
  return true;
}
